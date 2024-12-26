import {
  archiveCityRequested,
  createCityRequested,
  loadFilterCitiesRequested,
  updateCityRequested,
} from 'features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useCityStore() {
  const dispatch = useDispatch();

  const onStore = useCallback(
    async (values: any, action: any) => {
      await dispatch(createCityRequested(values));

      action.setSubmitting(false);
    },
    [dispatch]
  );

  return { onStore };
}

export function useUpdateCity() {
  const dispatch = useDispatch();
  const onUpdate = useCallback(
    async (values: any, action: any) => {
      await dispatch(updateCityRequested(values));
      action.setSubmitting(false);
    },
    [dispatch]
  );
  return { onUpdate };
}

export function useArchiveCity() {
  const dispatch = useDispatch();
  const onArchive = useCallback(
    async (id: any) => {
      await dispatch(archiveCityRequested({ id: id }));
    },
    [dispatch]
  );
  return { onArchive };
}

export function useFilterCity() {
  const dispatch = useDispatch();
  const onFilter = useCallback(
    async (values: any, action: any) => {
      await dispatch(loadFilterCitiesRequested(values));
      action.setSubmitting(false);
    },
    [dispatch]
  );
  return { onFilter };
}
