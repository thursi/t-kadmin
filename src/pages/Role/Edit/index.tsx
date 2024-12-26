
import Form from '../Form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'store/reducer';
import { useEffect } from 'react';
import {
  loadDeliveryChargesRequested,
  loadOneDeliveryChargesRequested,
  loadOneDiscountsRequested,
  loadOneProductsRequested,
} from 'features';
import { useEditDeliveryCharge } from 'hooks/deliveryCharge';
import { useEditDiscount } from 'hooks/discounts';

const Index = () => {
  const { onUpdate } = useEditDiscount();
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const {onediscounts,
  } = useSelector((state: RootState) => state.discount);


  useEffect(() => {
    dispatch(loadOneDiscountsRequested(id));
  }, [dispatch,id]);
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="text-xl font-semibold">Edit Discount</div>
      <div className="w-full">
        
      <Form  onSubmit={onUpdate} item={onediscounts} />
      </div>
    </div>
  );
};

export default Index;
