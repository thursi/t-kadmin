import {
  createDeliveryChargesRequested,
  updateDeliveryChargeRequested,
} from 'features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useCreateDeliveryCharge() {
  const dispatch = useDispatch();

  const onStore = useCallback(
    async (values: any, action: any) => {
      const deliveryChargeDetails = {
        minAmount: values.minAmount,
        deliveryAmount: values.deliveryAmount,
        businessLocationIds: values.businessLocationIds,
        fixedDeliveryCharge: values.fixedDeliveryCharge,
        deliveryDays: values.deliveryDays,
      };

      await dispatch(createDeliveryChargesRequested(deliveryChargeDetails));
      // navigation(PRODUCTS); // Uncomment if needed for navigation
      // action.setSubmitting(false); // Uncomment to stop form submission state
    },
    [dispatch]
  );

  return { onStore };
}

export function useEditDeliveryCharge() {
  const dispatch = useDispatch();

  const onUpdate = useCallback(
    async (values: any, action: any) => {
      await dispatch(
        updateDeliveryChargeRequested({ id: action, values: values })
      );
    },
    [dispatch]
  );
  return { onUpdate };
}
// export function useArchiveCity() {
//   const dispatch = useDispatch();
//   const onArchive = useCallback(
//     async (id: any) => {
//       await dispatch(archiveCityRequested({ id: id }));
//     },
//     [dispatch]
//   );
//   return { onArchive };
// }

// export function useFilterCity() {
//   const dispatch = useDispatch();
//   const onFilter = useCallback(
//     async (values: any, action: any) => {
//       await dispatch(loadFilterCitiesRequested(values));
//       action.setSubmitting(false);
//     },
//     [dispatch]
//   );
//   return { onFilter };
// }
