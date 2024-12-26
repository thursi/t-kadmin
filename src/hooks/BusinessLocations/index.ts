import {
  archiveBusinessLocationRequested,
  createBusinessLocationRequested,
  updateBusinessLocationdayAllocationRequested,
  updateBusinessLocationRequested,
} from 'features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useBusinessLocationStore() {
  const dispatch = useDispatch();

  const onStore = useCallback(
    async (values: any, action: any) => {
      console.log(values);
      await dispatch(createBusinessLocationRequested(values));

      action.setSubmitting(false);
    },
    [dispatch]
  );

  return { onStore };
}

export function useUpdateBusinessLocation() {
  const dispatch = useDispatch();
  const onUpdate = useCallback(
    async (values: any, action: any) => {
      await dispatch(updateBusinessLocationRequested(values));
      action.setSubmitting(false);
    },
    [dispatch]
  );
  return { onUpdate };
}

export function useUpdateBusinessLocationTime() {
  const dispatch = useDispatch();

  const onUpdateTime = useCallback(
    async (values: any, action: any) => {
      // const payload = {
      //   id: props.item.id,
      //   dayAllocationRequestList: [
      //     {
      //       day: values.day,
      //       timeSlots: [
      //         {
      //           startTime: values.startTime,
      //           endTime: values.endTime,
      //           deliveryCount: values.deliveryCount || 0,
      //         },
      //       ],
      //     },
      //   ],
      // };
      await dispatch(updateBusinessLocationdayAllocationRequested(values));
      action.setSubmitting(false);
    },
    [dispatch]
  );

  return { onUpdateTime };
}

export function useArchiveBusinessLocation() {
  const dispatch = useDispatch();
  const onArchive = useCallback(
    async (id: any) => {
      await dispatch(archiveBusinessLocationRequested({ id: id }));
    },
    [dispatch]
  );
  return { onArchive };
}
