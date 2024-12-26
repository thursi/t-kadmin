import {
  archiveWarrantyRequested,
  createWarrantyRequested,
  
  updateWarrantyRequested,
} from 'features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useStoreWarranty() {
  const dispatch = useDispatch();

  const onStore = useCallback(
    async (values: any, action: any) => {
      await dispatch(createWarrantyRequested(values));

      action.setSubmitting(false);
    },
    [dispatch]
  );

  return { onStore };
}

export function useUpdateWarranty() {
  const dispatch = useDispatch();

  const onUpdate = useCallback(
    async (values: any, action: any) => {
      await dispatch(
        updateWarrantyRequested({
          id: values?.id,
          values: {
            uniCode: values?.uniCode,
            warrantyName: values?.warrantyName,
            duration: values?.duration,
            durationType: values?.durationType,
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

export function useArchiveWarranty() {
  const dispatch = useDispatch();

  const onArchive = useCallback(
    async (id: any) => {
      await dispatch(
        archiveWarrantyRequested({
          id: id,
        })
      );
    },
    [dispatch]
  );

  return { onArchive };
}


export function useFilterWarranty() {
  const dispatch = useDispatch();
  const onWarrantyFilter = useCallback(
    async (values: any, action: any) => {
      // await dispatch(loadFilterWarrantiesRequested(values));
      action.setSubmitting(false);
    },
    [dispatch]
  );
  return { onWarrantyFilter };
}

