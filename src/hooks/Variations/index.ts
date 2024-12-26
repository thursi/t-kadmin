
import { archiveVariationRequested, createVariationRequested, updateVariationRequested } from "features/variation/variationSlice";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export function useStoreVariation() {
  const dispatch = useDispatch();

  const onStore = useCallback(
    async (values: any, action: any) => {
      await dispatch(createVariationRequested(values));
      action.setSubmitting(false);
    },
    [dispatch]
  );

  return { onStore };
}

export function useUpdateVariation() {
  const dispatch = useDispatch();
  console.log("valuesthursika")

  const onUpdate = useCallback(
    
    async (values: any, action: any) => {
      console.log("pleases",values);
      await dispatch(
        updateVariationRequested({
          id: values?.id,
          values: {
            uinCode: values?.uniCode,
            categoryId:values?.categoryId,
            variationName: values?.variationName,
            variationValues: values?.variationValues,
          },
        })
      );
      action.setSubmitting(false);
    },
    [dispatch]
  );

  return { onUpdate };
}

export function useArchiveVariation() {
  const dispatch = useDispatch();

  const onArchive = useCallback(
    async (id: any) => {
      console.log(id);
      await dispatch(
        archiveVariationRequested({
          id: id,
        })
      );
      
    },
    [dispatch]
  );

  return { onArchive };
}
