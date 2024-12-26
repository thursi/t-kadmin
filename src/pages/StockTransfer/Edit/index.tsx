import { useEditPurchase } from 'hooks/Purchases';
import Form from '../Form';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RootState } from 'store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { loadOneStockTransferRequested } from 'features';
import { useUpdateStockTransfers } from 'hooks/StockTransfers';

const Index = () => {
  const { onUpdate } = useUpdateStockTransfers();
  const dispatch = useDispatch();
  const { id }: any = useParams();

  useEffect(() => {
    dispatch(loadOneStockTransferRequested({ id }));
  }, [dispatch]);

  const { StockTransferOne } = useSelector(
    (state: RootState) => state.stocktransfer
  );
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="text-xl font-semibold">Edit StockTransfer</div>
      <div className="w-full">
        <Form onSubmit={onUpdate} item={StockTransferOne} />
      </div>
    </div>
  );
};
export default Index;
