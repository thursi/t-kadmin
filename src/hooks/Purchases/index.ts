import { PURCHASE } from 'constants/routes';
import {
  archiveCityRequested,
  createCityRequested,
  createPurchaseRequested,
  loadFilterCitiesRequested,
  loadFilterPurchasesRequested,
  upadatePurchasesRequested,
  updateCityRequested,
} from 'features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function useStorePurchase() {
  const dispatch = useDispatch();
  // const navigation = useNavigate();

  const onStore = useCallback(
    async (values: any, action: any) => {
      const newData = {
        ...values,
        productPurchaseRequests: values.productPurchaseRequests.map(
          (request: any) => {
            const { name, ...rest } = request; // destructure and remove 'name'
            return rest; // return the rest of the properties
          }
        ),
      };

      await dispatch(createPurchaseRequested(newData));
      // navigation(PURCHASE);
      // action.setSubmitting(flse);
    },
    [dispatch]
  );
  return { onStore };
}
export function useEditPurchase() {
  const dispatch = useDispatch();
  // const navigation = useNavigate();

  const onStore = useCallback(
    async (values: any, action: any) => {
      const { id, ...valueWihoutID } = values;
      const newData = {
        ...valueWihoutID,
        productPurchaseRequests: values.productPurchaseRequests.map(
          (request: any) => {
            const { name, ...rest } = request;
            return rest;
          }
        ),
      };

      await dispatch(
        upadatePurchasesRequested({ id: values.id, values: newData })
      );
      // navigation(PURCHASE);
      // action.setSubmitting(flse);
    },
    [dispatch]
  );
  return { onStore };
}

export function useFilterPurchases() {
  const dispatch = useDispatch();
  const onFilterPurchases = useCallback(
    async (values: any, action: any) => {
      await dispatch(loadFilterPurchasesRequested(values));
      action.setSubmitting(false);
    },
    [dispatch]
  );
  return { onFilterPurchases };
}
