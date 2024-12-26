import { PRODUCTS } from 'constants/routes';
import {
  archiveProductRequested,
  createProductRequested,
  updateProductRequested,
} from 'features';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/reducer';

export function useStoreProduct() {
  const dispatch = useDispatch();
  // const navigation = useNavigate();
  const { auth } = useSelector((state: RootState) => state.auth);
console.log("auth?.auth?.userId.................",auth?.userId);
  const onStore = useCallback(
    async (values: any, action: any) => {
      const productDetails = {
        name: values.name,
        description: values.description,
        categoryId: values.categoryId,
        unitId: values.unitId,
        brandId: values.brandId,
        productType: values.productType,
        warrantyId: values.warrantyId,
        productVariableRequests: values.productVariableRequests,
        imageUrls: values?.imageUrls,
        images: values?.images,

      };

      await dispatch(
        createProductRequested({ ...productDetails, updaterId: auth?.userId })
      );
      // navigation(PRODUCTS);
      // action.setSubmitting(flse);
    },
    [dispatch]
  );
  return { onStore };
}

export function useUpdateProduct() {
  const dispatch = useDispatch();
  const onUpdate = useCallback(
    async (values: any, action: any) => {
      await dispatch(updateProductRequested({ id: action, values: values }));
      // action.setSubmitting(false);
    },
    [dispatch]
  );
  return { onUpdate };
}

export function useArchiveSupplier() {
  const dispatch = useDispatch();

  const onArchive = useCallback(
    async (id: any) => {
      await dispatch(
        archiveProductRequested({
          id: id,
        })
      );
    },
    [dispatch]
  );

  return { onArchive };
}
