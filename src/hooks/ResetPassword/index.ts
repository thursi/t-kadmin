
// import {  resetPasswordRequested } from 'features';
// import { resetPasswordRequested } from 'features/resetPassword/resetPasswordSlice';
import { resetPasswordRequested } from 'features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useResetPassword() {
  const dispatch = useDispatch();

  const onResetPassword = useCallback(
    async (values: any, actions: any) => {
      console.log('valuesvaluesvalues',values)
      actions.setSubmitting(true);
      await dispatch(resetPasswordRequested(values));
    },
    [dispatch]
  );

  return { onResetPassword };
}
