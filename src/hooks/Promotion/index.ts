import { PROMOTION } from "constants/routes";
import { archivePromotionRequested, createPromotionRequested, updatePromotionRequested } from "features";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export function useStorePromotion() {
  const dispatch = useDispatch();

  const onStore = useCallback(
    async (values: any) => {
   
      await dispatch(createPromotionRequested(values));

    },
    [dispatch]
  );

  return { onStore };
}



export function useUpdateProductPromotion() {
  const dispatch = useDispatch();
  const onUpdate = useCallback(
    async (values: any, action: any) => {
      console.log("values",values,action)
      await dispatch(updatePromotionRequested({ id: action, values: values }));
      // action.setSubmitting(false);
    },
    [dispatch]
  );
  return { onUpdate };
}

export function useArchiveProductPromotion() {
  const dispatch = useDispatch();

  const onArchive = useCallback(
    async (id: any) => {
      console.log("id...........................",id)
      await dispatch(
        archivePromotionRequested({
          id: id,
        })
      );
    },
    [dispatch]
  );

  return { onArchive };
}
