import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/reducer';
import { ResetPassword } from 'components/ResetPassword';
import { useResetPassword } from 'hooks/ResetPassword';
// import { ForgotPawword } from 'components/Login';

function Index() {
  const navigation = useNavigate();
  const { onResetPassword } = useResetPassword();

  const { auth } = useSelector((state: RootState) => state.auth);

  // useEffect(() => {
  //   if (auth?.success) navigation(DASHBOARD);
  // }, [auth?.success]);

  // useEffect(() => {
  //   localStorage.clear();
  // }, []);

  return (
    <div>
     
     <ResetPassword onSubmit={onResetPassword} />
    </div>
  );
}

export default Index;
