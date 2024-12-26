import { useEditPurchaseReturn } from "hooks/PurchaseReturn";
import Form from "../Form";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { loadOnePurchasesReturnRequested } from "features";
import { Loading } from "components";

const Index = () => {
  const { onStore } = useEditPurchaseReturn();
  const dispatch = useDispatch();
  const { id }: any = useParams();

  const { purchasesReturn } = useSelector((state: RootState) => state.purchaseReturn);

  console.log(purchasesReturn)

  useEffect(() => {
    dispatch(loadOnePurchasesReturnRequested({ id }));
  }, [dispatch]);

  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="text-xl font-semibold">Edit Purchase</div>
      <div className="w-full">
        
        <Form onSubmit={onStore} item={purchasesReturn} />
        
      </div>
    </div>
  );
};

export default Index;
