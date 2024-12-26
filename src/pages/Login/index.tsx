// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useLogin } from 'hooks/Login';
// import { DASHBOARD } from 'constants/routes';
// import { RootState } from 'store/reducer';
// import Login from 'pages/Login';

// function Index() {
//   const navigation = useNavigate();
//   const { onLogin } = useLogin();

//   const { auth } = useSelector((state: RootState) => state.auth);

//   useEffect(() => {
//     if (auth?.success) navigation(DASHBOARD);
//   }, [auth?.success]);

//   useEffect(() => {
//     localStorage.clear();
//   }, []);

//   return (
//     <div>
//       <Login onSubmit={onLogin} />
//     </div>
//   );
// }

// export default Index;

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogin, useSocialLogin } from 'hooks/Login';
import { DASHBOARD } from 'constants/routes';
import { RootState } from 'store/reducer';
import Login from './Login';

function Index() {
  const navigation = useNavigate();
  const { onLogin } = useLogin();
  const { onSocialLogin } = useSocialLogin();

  const { auth } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (auth?.success) navigation(DASHBOARD);
  }, [auth?.success]);

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div>
      <Login onSubmit={onLogin} onSocialLogin={() => onSocialLogin} />
    </div>
  );
}

export default Index;
