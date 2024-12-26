import {
  archiveBrandRequested,
  createBrandRequested,
  updateBrandRequested,
} from 'features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useStoreBrands() {
  const dispatch = useDispatch();

  const onStore = useCallback(
    async (values: any, action: any) => {
      await dispatch(createBrandRequested(values));
      action.setSubmitting(false);
    },
    [dispatch]
  );

  return { onStore };
}

export function useUpdateBrand() {
  const dispatch = useDispatch();

  const onUpdate = useCallback(
    async (values: any, action: any) => {
      await dispatch(
        updateBrandRequested({
          id: values?.id,
          values: {
            uniCode: values?.uniCode,
            brandName: values?.brandName,
            description: values?.description,
            categoryId:values?.categoryId,

          },
        })
      );
      action.setSubmitting(false);
    },
    [dispatch]
  );

  return { onUpdate };
}

export function useArchiveBrand() {
  const dispatch = useDispatch();

  const onArchive = useCallback(
    async (id: any) => {

      await dispatch(
        archiveBrandRequested({
          id: id,
        })
      );
    },
    [dispatch]
  );

  return { onArchive };
}



