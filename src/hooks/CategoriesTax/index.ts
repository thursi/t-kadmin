import {
  archiveCategoryTaxRequested,
  createCategoryTaxRequested,
  loadFilterCategoriesTaxRequested,
  updateCategoryTaxRequested,
} from 'features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useStoreCategoryTax() {
  const dispatch = useDispatch();

  const onStore = useCallback(
    async (values: any, action: any) => {
      await dispatch(createCategoryTaxRequested(values));

      action.setSubmitting(false);
    },
    [dispatch]
  );

  return { onStore };
}

export function useUpdateCategoryTax() {
  const dispatch = useDispatch();

  const onUpdate = useCallback(
    async (values: any, action: any) => {
      await dispatch(
        updateCategoryTaxRequested({
          id: values?.id,
          values: {
            categoryId: values?.categoryId,
            taxId: values?.taxId,
          },
        })
      );
      action.setSubmitting(false);
    },
    [dispatch]
  );

  return { onUpdate };
}

export function useArchiveCategoryTax() {
  const dispatch = useDispatch();

  const onArchive = useCallback(
    async (id: any) => {
      await dispatch(
        archiveCategoryTaxRequested({
          id: id,
        })
      );
    },
    [dispatch]
  );

  return { onArchive };
}


export function useFilterCategoriesTax() {
  const dispatch = useDispatch();
  const onCategoriesTax = useCallback(
    async (values: any, action: any) => {
      await dispatch(loadFilterCategoriesTaxRequested(values));
      action.setSubmitting(false);
    },
    [dispatch]
  );
  return { onCategoriesTax };
}

