import {
  archiveCategoryRequested,
  createCategoryRequested,
  updateCategoryRequested,
} from 'features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useStoreCategory() {
  const dispatch = useDispatch();

  const onStore = useCallback(
    async (values: any, action: any) => {
      await dispatch(createCategoryRequested(values));

      action.setSubmitting(false);
    },
    [dispatch]
  );

  return { onStore };
}

export function useUpdateCategory() {
  const dispatch = useDispatch();

  const onUpdate = useCallback(
    async (values: any, action: any) => {
      await dispatch(
        updateCategoryRequested({
          id: values?.id,
          values: {
            name: values?.name,
            uniCode: values?.uniCode,
            parentId: values?.parentId,
            featuredCategory: values?.featuredCategory,
            ageRestriction: values?.ageRestriction,
          },
        })
      );
      action.setSubmitting(false);
    },
    [dispatch]
  );

  return { onUpdate };
}

export function useArchiveCategory() {
  const dispatch = useDispatch();

  const onArchive = useCallback(
    async (id: any) => {
      await dispatch(
        archiveCategoryRequested({
          id: id,
        })
      );
    },
    [dispatch]
  );

  return { onArchive };
}
