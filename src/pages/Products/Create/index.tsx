import { useStoreProduct } from "hooks/Products";
import MyForm from "../Form";

const Index = () => {
  const { onStore } = useStoreProduct();
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="text-xl font-semibold">Add New Product</div>
      <div className="w-full">
        <MyForm onSubmit={onStore} />
      </div>
    </div>
  );
};

export default Index;
