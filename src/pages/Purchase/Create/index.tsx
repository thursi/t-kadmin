
import { useStorePurchase } from "hooks/Purchases";
import Form from "../Form";

const Index = () => {
  const { onStore } = useStorePurchase();
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="text-xl font-semibold">Add Purchase</div>
      <div className="w-full">
        <Form onSubmit={onStore} />
      </div>
    </div>
  );
};

export default Index;