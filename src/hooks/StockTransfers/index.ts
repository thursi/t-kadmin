import {
  archiveCityRequested,
  createCityRequested,
  createStockTransferRequested,
  loadFilterCitiesRequested,
  loadFilterStockTransferRequested,
  StatusStockTransferRequested,
  updateCityRequested,
  updateStockTransfereRequested,
} from 'features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useFilterStockTransfer() {
  const dispatch = useDispatch();
  const onFilterStockTransfer = useCallback(
    async (values: any, action: any) => {
      await dispatch(loadFilterStockTransferRequested(values));
      action.setSubmitting(false);
    },
    [dispatch]
  );
  return { onFilterStockTransfer };
}

export function useStockTransfer() {
  const dispatch = useDispatch();

  const onStore = useCallback(
    async (values: any, action: any) => {
      const updatedData = {
        ...values,
        stockTransferProducts: values.stockTransferProducts.map(
          ({ productVariableId, quantity }: any) => ({
            productVariableId,
            quantity,
          })
        ),
      };

      await dispatch(createStockTransferRequested(updatedData));
    },
    [dispatch]
  );
  return { onStore };
}
export function useUpdateStockTransfers() {
  const dispatch = useDispatch();

  const onUpdate = useCallback(
    async (values: any, action: any) => {
      const { id, stockTransferProducts, ...restValues } = values;
      const newData = {
        ...restValues,
        stockTransferProducts: stockTransferProducts.map((product: any) => {
          const { productVariableId, quantity } = product;
          return { productVariableId, quantity };
        }),
      };
      await dispatch(
        updateStockTransfereRequested({ id: values.id, values: newData })
      );
    },
    [dispatch]
  );
  return { onUpdate };
}
export function useStatusStockTransfer() {
  const dispatch = useDispatch();
  const onStatus = useCallback(
    async (id: any, status: any) => {
      await dispatch(
        StatusStockTransferRequested({
          id: id,
          status: status,
        })
      );
    },
    [dispatch]
  );
  return { onStatus };
}
