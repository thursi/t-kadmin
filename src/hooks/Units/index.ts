import {
  archiveUnitRequested,
  createUnitRequested,
  updateUnitRequested,
} from 'features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useStoreUnit() {
  const dispatch = useDispatch();

  const onStore = useCallback(
    async (values: any, action: any) => {
      await dispatch(createUnitRequested(values));

      action.setSubmitting(false);
    },
    [dispatch]
  );

  return { onStore };
}

export function useUpdateUnit() {
  const dispatch = useDispatch();

  const onUpdate = useCallback(
    async (values: any, action: any) => {
      await dispatch(
        updateUnitRequested({
          id: values?.id,
          values: {
            categoryId:values?.categoryId,
            uniCode: values?.uniCode,
            unitName: values?.unitName,
            allowDecimal: values?.allowDecimal,
          },
        })
      );
      action.setSubmitting(false);
    },
    [dispatch]
  );

  return { onUpdate };
}

export function useArchiveUnit() {
  const dispatch = useDispatch();

  const onArchive = useCallback(
    async (id: any) => {
      await dispatch(
        archiveUnitRequested({
          id: id,
        })
      );
    },
    [dispatch]
  );

  return { onArchive };
}
