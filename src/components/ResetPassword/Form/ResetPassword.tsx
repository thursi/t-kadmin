import { FormikProps, withFormik } from 'formik';
import { string, object } from 'yup';
import { Button, Input } from 'components';
import loginImage from 'assets/images/jpg/loginBg.jpg'; // Import the image

export interface ILoginProps {
  onSubmit: (values: any, actions: any) => void;
}

interface FormikValues {
  otp: string;
  password: string;
}

function Login(props: FormikProps<FormikValues> & ILoginProps) {
  return (
    <form onSubmit={props.handleSubmit}>
      <section className="min-h-screen flex">
        {/* Left Section: Image */}
        <div className="w-1/2">
          <img
            src={loginImage}
            alt="Login"
            className="h-screen w-full object-cover"
          />
        </div>

        {/* Right Section: Login Form */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="bg-white flex shadow-lg w-full max-w-md p-7">
            <div className="px-4 items-center justify-center w-full">
              <h2 className="font-bold text-2xl text-[#080808] text-center">RESET PASSWORD</h2>

              <div className="grid grid-cols-1 gap-5 mt-6">
                <Input
                  label="OTP"
                  name="otp"
                  values={props.values}
                  errors={props.errors}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  touches={props.touched}
                  placeholder="Enter your OTP"
                  className="p-3 rounded-xl border w-full text-xs"
                />
                 <Input
                  label="Password"
                  name="password"
                  values={props.values}
                  errors={props.errors}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  touches={props.touched}
                  placeholder="Enter your password"
                  className="p-3 rounded-xl border w-full text-xs"
                />


                <Button
                  className="bg-[#337ffa] rounded-xl text-white py-2 w-full mt-4 hover:scale-105 duration-300"
                  name={props.isSubmitting ? 'Submitting ...' : 'Submit'}
                  type="submit"
                  loading={props.isSubmitting}
                  disabled={props.isSubmitting}
                />
              </div>

            </div>
          </div>
        </div>
      </section>
    </form>
  );
}

export default withFormik<ILoginProps, FormikValues>({
  validationSchema: object().shape({
    otp: string().required('OTP is required'),
    password: string().required('Password is required'),
  }),
  mapPropsToValues: () => ({
    otp: '',
    password: '',
  }),
  handleSubmit: (values, { props, ...actions }) => {
    props.onSubmit(values, actions);
  },
})(Login);