//import { PURCHASE } from "constants/routes";
import {
    createPurchaseReturnRequested,
    upadatePurchasesReturnRequested,
} from "features";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
//import { useNavigate } from "react-router-dom";

export function useStorePurchaseReturn() {
  const dispatch = useDispatch();
  // const navigation = useNavigate();

  const onStore = useCallback(
    async (values: any, action: any) => {
      console.log(values)
      const newData = {
        ...values,
        productPurchaseReturnRequests: values.productPurchaseReturnRequests?.map(
          (request: any) => {
            const { name, ...rest } = request; // destructure and remove 'name'
            return rest; // return the rest of the properties
          }
        ),
      };

      await dispatch(createPurchaseReturnRequested(newData));
      // navigation(PURCHASE);
      // action.setSubmitting(flse);
    },
    [dispatch]
  );
  return { onStore };
}

export function useEditPurchaseReturn() {
  const dispatch = useDispatch();
  // const navigation = useNavigate();

  const onStore = useCallback(
    async (values: any, action: any) => {
      const { id, ...valueWihoutID } = values;
      const newData = {
        ...valueWihoutID,
        productPurchaseReturnRequests: values.productPurchaseReturnRequests.map(
          (request: any) => {
            const { name, ...rest } = request; 
            return rest;
          }
        ),
      };

      await dispatch(
        upadatePurchasesReturnRequested({ id: values.id, values: newData })
      );
      // navigation(PURCHASE);
      // action.setSubmitting(flse);
    },
    [dispatch]
  );
  return { onStore };
}