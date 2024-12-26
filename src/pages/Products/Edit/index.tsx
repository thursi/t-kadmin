import { useUpdateProduct } from "hooks/Products";
import MyForm from "../Form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "store/reducer";
import { useEffect } from "react";
import { loadOneProductsRequested } from "features";

const Index = () => {
  const { onUpdate } = useUpdateProduct();
  const dispatch = useDispatch();
  const { id }: any = useParams();

  const { product } = useSelector((state: RootState) => state.product);
  console.log(product, "product12121");

  useEffect(() => {
    dispatch(loadOneProductsRequested(id));
  }, [dispatch]);
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="text-xl font-semibold">Edit Product</div>
      <div className="w-full">
        <MyForm onSubmit={onUpdate} item={product} />
      </div>
    </div>
  );
};

export default Index;
