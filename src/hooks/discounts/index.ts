import { createDiscountRequested, updateDiscountRequested } from 'features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useCreateDiscount() {
  const dispatch = useDispatch();

  const onStore = useCallback(
    async (values: any, action: any) => {
      const discountDetails = {
        discountType: values.discountType,
        productVariableId: values.productVariableId,
        businessLocationIds: values.businessLocationIds,
        discountPercentage: values.discountPercentage,
        discountValue: values.discountValue,
        discountName: values.discountName,
        discountPrice: values.discountPrice,
        marginType: values.marginType,
        discountStartDate: values.discountStartDate,
        discountEndDate: values.discountEndDate,
        noOfProducts: values.noOfProducts,

        freeProductVariableId: values.freeProductVariableId,
      };

      await dispatch(createDiscountRequested(discountDetails));
      // navigation(PRODUCTS); // Uncomment if needed for navigation
      // action.setSubmitting(false); // Uncomment to stop form submission state
    },
    [dispatch]
  );

  return { onStore };
}

export function useEditDiscount() {
  const dispatch = useDispatch();

  const onUpdate = useCallback(
    async (values: any, action: any) => {
      await dispatch(updateDiscountRequested({ id: action, values: values }));
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
