import { useUpdateProduct } from 'hooks/Products';
import Form from '../Form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'store/reducer';
import { useEffect } from 'react';
import {
  loadDeliveryChargesRequested,
  loadOneDeliveryChargesRequested,
  loadOneProductsRequested,
} from 'features';
import { useEditDeliveryCharge } from 'hooks/deliveryCharge';

const Index = () => {
  const { onUpdate } = useEditDeliveryCharge();
  const dispatch = useDispatch();
  const { id }: any = useParams();

  const { onedeliveryCharge } = useSelector(
    (state: RootState) => state.deliveryCharge
  );

  useEffect(() => {
    dispatch(loadOneDeliveryChargesRequested(id));
  }, [dispatch]);
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="text-xl font-semibold">Edit Delivery Charges</div>
      <div className="w-full">
        <Form onSubmit={onUpdate} item={onedeliveryCharge} />
      </div>
    </div>
  );
};

export default Index;
