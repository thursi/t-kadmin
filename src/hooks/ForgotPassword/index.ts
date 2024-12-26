
import { forgotPasswordRequested } from 'features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useForgotPassword() {
  const dispatch = useDispatch();

  const onForgotPassword = useCallback(
    async (values: any, actions: any) => {
      console.log('valuesvaluesvalues',values)
      actions.setSubmitting(true);
      await dispatch(forgotPasswordRequested(values));
    },
    [dispatch]
  );

  return { onForgotPassword };
}
