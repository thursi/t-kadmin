
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogin, useSignUp } from 'hooks/Login';
import { DASHBOARD } from 'constants/routes';
import { RootState } from 'store/reducer';
import SignUp from './SignUp';



function Index() {
  const navigation = useNavigate();
  const { OnSignUp } = useSignUp();

  const { auth } = useSelector((state: RootState) => state.auth);
console.log(auth,"auth.......................................");
  useEffect(() => {
    if (auth?.success) navigation(DASHBOARD);
  }, [auth?.success]);

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div>
     
     <SignUp onSubmit={OnSignUp} />
    </div>
  );
}

export default Index;
