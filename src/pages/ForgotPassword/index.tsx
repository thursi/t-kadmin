import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/reducer';
import { useForgotPassword } from 'hooks/ForgotPassword';
import toast from 'react-hot-toast';
import { ForgotPassword } from 'components/ForgotPaswsord';

function Index() {
  const navigate = useNavigate();
  const { onForgotPassword } = useForgotPassword();

  const { error } = useSelector((state: RootState) => state.forgotPassword);
  const { success } = useSelector((state: RootState) => state.forgotPassword); // Assuming you have a success state

  useEffect(() => {
    if (success) {
      navigate("/resetPassword"); // Navigate on success
    }
  }, [success, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error); // Display error notification
    }
  }, [error]);

  useEffect(() => {
    localStorage.clear(); // Clear local storage
  }, []);

  return (
    <div>
      <ForgotPassword onSubmit={onForgotPassword} />
    </div>
  );
}

export default Index;
