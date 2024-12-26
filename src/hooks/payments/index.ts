import { loadPaymentFilterRequested } from 'features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useFilterPayment() {
  const dispatch = useDispatch();
  const onFilterPayement = useCallback(
    async (values: any, action: any) => {
      await dispatch(loadPaymentFilterRequested(values));
      action.setSubmitting(false);
    },
    [dispatch]
  );
  return { onFilterPayement };
}
