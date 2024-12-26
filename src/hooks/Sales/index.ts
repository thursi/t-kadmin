import { 
  loadFilterSalesRequested ,
  statusSalesChangeRequested,

} from "features";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export function useFilterSales() {
  const dispatch = useDispatch();
  const onFilterSales = useCallback(
    async (values: any, action: any) => {
      await dispatch(loadFilterSalesRequested(values));
      action.setSubmitting(false);
    },
    [dispatch]
  );
  return { onFilterSales };
}

export function useSalesStatusChange() {
  const dispatch = useDispatch();
  const onStatus = useCallback(
    async (id: any, status: any) => {
      await dispatch(
        statusSalesChangeRequested({
          id: id,
          status: status,
        })
      );
    },
    [dispatch]
  );
  return { onStatus };
}

