import {
  createStockAdjustmentRequested,
  loadFilterStockAdjustmentRequested,
  StatusStockAdjustmentRequested,
} from "features";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export function useFilterStockAdjustment() {
  const dispatch = useDispatch();
  const onFilterStockAdjustment = useCallback(
    async (values: any, action: any) => {
      await dispatch(loadFilterStockAdjustmentRequested(values));
      action.setSubmitting(false);
    },
    [dispatch]
  );
  return { onFilterStockAdjustment };
}

export function useStockAdjustment() {
  const dispatch = useDispatch();

  const onStore = useCallback(
    async (values: any, action: any) => {
      const updatedData = {
        ...values,
        shopProductVariableRequests: values.shopProductVariableRequests.map(
          ({
            productVariableId,
            shopQuantity,
            sellingPrice,
            marginPercentage,
            marginType,
          }: any) => ({
            productVariableId,
            shopQuantity,
            sellingPrice,
            marginPercentage,
            marginType,
          })
        ),
      };

      console.log(updatedData, "updatedDataStTr");

      await dispatch(createStockAdjustmentRequested(updatedData));
    },
    [dispatch]
  );
  return { onStore };
}
export function useStatusAdjustment() {
  const dispatch = useDispatch();
  const onStatus = useCallback(
    async (id: any) => {
      await dispatch(
        StatusStockAdjustmentRequested({
          id: id,
        })
      );
    },
    [dispatch]
  );
  return { onStatus };
}



