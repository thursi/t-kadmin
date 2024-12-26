
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
  loadOnePromotionRequested,
} from 'features';
import { useEditDeliveryCharge } from 'hooks/deliveryCharge';
import { useEditDiscount } from 'hooks/discounts';
import { useUpdateProductPromotion } from 'hooks/Promotion';

const Index = () => {
   const { onUpdate } = useUpdateProductPromotion();
 
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const {onePromotion,
  } = useSelector((state: RootState) => state.promotions);


  useEffect(() => {
    dispatch(loadOnePromotionRequested(id));
  }, [dispatch,id]);
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="text-xl font-semibold">Edit Product Promotion</div>
      <div className="w-full">
        
      <Form  onSubmit={onUpdate} item={onePromotion} />
      </div>
    </div>
  );
};

export default Index;
