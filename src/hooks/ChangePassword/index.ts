
import { changePasswordRequested } from 'features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useChangePassword() {
  const dispatch = useDispatch();

  const onChangePassword = useCallback(
    async (values: any, actions: any) => {
      console.log('valuesvaluesvalues',values)
      actions.setSubmitting(true);
      await dispatch(changePasswordRequested(values));
    },
    [dispatch]
  );

  return { onChangePassword };
}
