import Form from "../Form";
import { useStockTransfer } from "hooks/StockTransfers";

const Index = () => {
  const { onStore } = useStockTransfer();
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="text-xl font-semibold">Add Stock Transfer</div>
      <div className="w-full">
        <Form onSubmit={onStore} />
      </div>
    </div>
  );
};
export default Index;
