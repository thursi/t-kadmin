import { useEditPurchase } from "hooks/Purchases";
import Form from "../Form";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { loadOnePurchasesRequested } from "features";
import { useUpdateProduct } from "hooks/Products";

const Index = () => {
  const { onUpdate } = useUpdateProduct();
  const dispatch = useDispatch();
  const { id }: any = useParams();

  const { purchase } = useSelector((state: RootState) => state.purchase);

  useEffect(() => {
    dispatch(loadOnePurchasesRequested({ id }));
  }, [dispatch]);

  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="text-xl font-semibold">Edit Purchase</div>
      <div className="w-full">
        <Form onSubmit={onUpdate} item={purchase} />
      </div>
    </div>
  );
};

export default Index;
