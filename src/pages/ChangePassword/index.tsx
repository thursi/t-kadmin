import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/reducer';
import { useEffect } from 'react';
import { ChangePassword } from 'components/ChangePassword';
import { useChangePassword } from 'hooks/ChangePassword';

function Index() {
  const navigate = useNavigate();
  const { onChangePassword } = useChangePassword();

  const { auth } = useSelector((state: RootState) => state.auth);
  const { changePassword, error } = useSelector(
    (state: RootState) => state.changePassword
  );
  useEffect(() => {
    if (changePassword) {
      navigate("/login");
    }
  }, [changePassword, navigate]);

  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div>
     
     <ChangePassword onSubmit={onChangePassword} />
    </div>
  );
}

export default Index;
