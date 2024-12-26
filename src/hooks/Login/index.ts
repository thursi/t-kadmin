import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { loginRequested, signUpRequested, Sociallogin, SocialLoginRequest } from 'features';

export function useLogin() {
  const dispatch = useDispatch();

  const onLogin = useCallback(
    async (values: any, actions: any) => {
      console.log('valuesvaluesvalues',values)
      actions.setSubmitting(true);
      await dispatch(loginRequested(values));
    },
    [dispatch]
  );

  return { onLogin };
}

export function useSignUp() {
  const dispatch = useDispatch();

  const OnSignUp = useCallback(
    async (values: any, actions: any) => {
      console.log('valuesvaluesvalues',values)
      actions.setSubmitting(true);
      await dispatch(signUpRequested(values));
    },
    [dispatch]
  );

  return { OnSignUp };
}


export function useAdminSignUp() {
  const dispatch = useDispatch();

  const OnAdminSignUp = useCallback(
    async (values: any, actions: any) => {
      console.log('valuesvaluesvalues',values)
      actions.setSubmitting(true);
      await dispatch(signUpRequested(values));
    },
    [dispatch]
  );

  return { OnAdminSignUp };
}


export function useSocialLogin() {
  const dispatch = useDispatch();

  const onSocialLogin = useCallback(
    async (values: any, actions: any) => {
      try {
        dispatch(SocialLoginRequest({
          authProvider: "GOOGLE",
          token: values.credential,
        }));
      } catch (e: any) {
        console.error("Social login failed", e);
      }
    },
    [dispatch]
  );

  return { onSocialLogin };
}



