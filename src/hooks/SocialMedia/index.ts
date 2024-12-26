import { updateSocialMediaRequested } from 'features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useUpdateSocialMedia() {
  const dispatch = useDispatch();

  const onUpdateSocialMedia = useCallback(
    async (values: any, actions: any) => {
      console.log("🚀 ~ values:", values)
      
      actions.setSubmitting(true);
      await dispatch(updateSocialMediaRequested({id: values.id, values: values }));
    },
    [dispatch]
  );

  return { onUpdateSocialMedia };
}