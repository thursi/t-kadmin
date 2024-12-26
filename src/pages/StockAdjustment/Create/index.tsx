import Form from "../Form";
import { useStockAdjustment } from "hooks/StockAdjustment";

const Index = () => {
  const { onStore } = useStockAdjustment();
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="text-xl font-semibold">Add Stock Adjustment</div>
      <div className="w-full">
        <Form onSubmit={onStore} />
      </div>
    </div>
  );
};

export default Index;
