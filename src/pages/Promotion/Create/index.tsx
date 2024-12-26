
import { useStorePromotion } from "hooks/Promotion";
import Form from "../Form";

const Index = () => {
  const { onStore } = useStorePromotion();
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="text-xl font-semibold">Add Promotion</div>
      <div className="w-full">
        <Form onSubmit={onStore} />
      </div>
    </div>
  );
};

export default Index;
