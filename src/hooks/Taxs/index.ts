import {
  archiveTaxRequested,
  createTaxRequested,
  updateTaxRequested,
} from 'features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useStoreTax() {
  const dispatch = useDispatch();

  const onStore = useCallback(
    async (values: any, action: any) => {
      await dispatch(createTaxRequested(values));

      action.setSubmitting(false);
    },
    [dispatch]
  );

  return { onStore };
}

export function useUpdateTax() {
  const dispatch = useDispatch();

  const onUpdate = useCallback(
    async (values: any, action: any) => {
      await dispatch(
        updateTaxRequested({
          id: values?.id,
          values: {
            uniCode: values?.uniCode,
            taxName: values?.taxName,
            tax: values?.tax,
          },
        })
      );
      action.setSubmitting(false);
    },
    [dispatch]
  );

  return { onUpdate };
}

export function useArchiveTax() {
  const dispatch = useDispatch();

  const onArchive = useCallback(
    async (id: any) => {
      await dispatch(
        archiveTaxRequested({
          id: id,
        })
      );
    },
    [dispatch]
  );

  return { onArchive };
}
