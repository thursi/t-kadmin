// import { FormikProps, withFormik } from 'formik';
// import { string, object } from 'yup';
// import { Button, Input } from 'components';
// import loginImage from 'assets/images/jpg/loginBg.jpg';

// export interface ILoginProps {
//   onSubmit: (values: any, actions: any) => void;
// }

// interface FormikValues {
//   userName: string;
//   password: string;
// }

// function Login(props: FormikProps<FormikValues> & ILoginProps) {
//   return (
//     <form onSubmit={props.handleSubmit}>
//       <section className="min-h-screen flex">
//         {/* Left Section: Image */}
//         <div className="w-1/2">
//           <img
//             src={loginImage}
//             alt="Login"
//             className="h-screen w-full object-cover"
//           />
//         </div>

//         {/* Right Section: Login Form */}
//         <div className="w-1/2 flex items-center justify-center">
//           <div className="bg-white flex shadow-lg w-full max-w-md p-0">
//             <div className="px-4 items-center justify-center w-full">
//               <h2 className="font-bold text-2xl text-[#080808] text-center">LOGIN</h2>

//               <div className="grid grid-cols-1 gap-5 mt-6">
//                 <Input
//                   label="Email"
//                   name="userName"
//                   values={props.values}
//                   errors={props.errors}
//                   onChange={props.handleChange}
//                   onBlur={props.handleBlur}
//                   touches={props.touched}
//                   placeholder="Enter your Email"
//                   className="p-3 rounded-xl border w-full text-xs"
//                 />

//                 <div className="relative">
//                   <Input
//                     label="Password"
//                     name="password"
//                     values={props.values}
//                     errors={props.errors}
//                     onChange={props.handleChange}
//                     onBlur={props.handleBlur}
//                     touches={props.touched}
//                     placeholder="Enter your Password"
//                     className="p-3 rounded-xl border w-full text-xs pr-64"
//                   />
//                 </div>

//                 <Button
//                   className="bg-[#337ffa] rounded-xl text-white py-2 w-full mt-4 hover:scale-105 duration-300"
//                   name={props.isSubmitting ? 'Logging In...' : 'Login'}
//                   type="submit"
//                   loading={props.isSubmitting}
//                   disabled={props.isSubmitting}
//                 />
//               </div>

//               <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
//                 <hr className="border-gray-400" />
//                 <p className="text-center text-sm">OR</p>
//                 <hr className="border-gray-400" />
//               </div>

//               <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
//                 <svg
//                   className="mr-3"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 48 48"
//                   width="25px"
//                 >
//                   <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
//                   <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
//                   <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
//                   <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
//                 </svg>
//                 Login with Google
//               </button>

//               <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
//                 <a href="/forgotPassword">Forgot your password?</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </form>
//   );
// }

// export default withFormik<ILoginProps, FormikValues>({
//   validationSchema: object().shape({
//     userName: string().required('Email is required'),
//     password: string().required('Password is required'),
//   }),
//   mapPropsToValues: () => ({
//     userName: '',
//     password: '',
//   }),
//   handleSubmit: (values, { props, ...actions }) => {
//     props.onSubmit(values, actions);
//   },
// })(Login);

import { FormikProps, withFormik } from 'formik';
import { string, object } from 'yup';
import { Button, Input } from 'components';
import { EyeIcon } from 'lucide-react';
import React, { useState } from 'react';
import Logo from '../../assets/images/png/t_and_k_logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

export interface ILoginProps {
  onSubmit: (values: any, actions: any) => void;
  onSocialLogin: (response: any) => void;
}

interface FormikValues {
  userName: string;
  password: string;
}

function Login(props: FormikProps<FormikValues> & ILoginProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <GoogleOAuthProvider clientId="283137376225-1itf8dsud8m57m8b7mhfnokh9ugpi7ek.apps.googleusercontent.com">
      <form onSubmit={props.handleSubmit}>
        <section className="min-h-screen flex bg-[#1C1C1F]">
          <div className="w-1/2 relative bg-purple-900">
            <div className="absolute top-4 left-4">
              <img src={Logo} alt="logo" className="h-8" />
            </div>
            <div className="absolute top-4 right-4">
              <button className="text-white/80 hover:text-white px-4 py-2 rounded-full bg-white/10 text-sm">
                Back to website →
              </button>
            </div>
            <div className="h-screen w-full flex items-center justify-center p-12">
              <div className="max-w-md">
                <h1 className="text-4xl font-medium text-white mb-4">
                  Capturing Moments,
                  <br />
                  Creating Memories
                </h1>
                <div className="flex gap-2 mt-8">
                  <div className="w-8 h-1 bg-white/30 rounded-full"></div>
                  <div className="w-8 h-1 bg-white/30 rounded-full"></div>
                  <div className="w-8 h-1 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 flex items-center justify-center p-12">
            <div className="w-full max-w-md space-y-8">
              <div className="space-y-2">
                <h2 className="text-4xl font-medium text-white">
                  Create an account
                </h2>
                <p className="text-gray-400">
                  Are You New User?{' '}
                  <a href="/signup" className="text-white hover:underline">
                    Register
                  </a>
                </p>
              </div>

              {/* <div className="grid grid-cols-2 gap-4">
              <Input
                name="firstName"
                values={props.values}
                errors={props.errors}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                touches={props.touched}
                placeholder="Fletcher"
                className="bg-[#2C2C30] border-0 rounded-lg p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
              />
              <Input
                name="lastName"
                values={props.values}
                errors={props.errors}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                touches={props.touched}
                placeholder="Last name"
                className="bg-[#2C2C30] border-0 rounded-lg p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
              />
            </div> */}

              <Input
                label="Email"
                name="userName"
                color="text-white"
                values={props.values}
                errors={props.errors}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                touches={props.touched}
                placeholder="Enter your Email"
                className="bg-[#2C2C30] border-0 rounded-lg p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 w-full"
              />

              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  color="text-white"
                  type={showPassword ? 'text' : 'password'}
                  values={props.values}
                  errors={props.errors}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  touches={props.touched}
                  placeholder="Enter your password"
                  className="bg-[#2C2C30] border-0 rounded-lg p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 w-full pr-12"
                />

                <span
                  className="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
                {/* <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <EyeIcon className="h-5 w-5" />
              </button> */}

                {/* <Button
                className="bg-[#337ffa] rounded-xl text-white py-2 w-full mt-4 hover:scale-105 duration-300"
                name={props.isSubmitting ? 'Logging In...' : 'Login'}
                type="submit"
                loading={props.isSubmitting}
                disabled={props.isSubmitting}
              /> */}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-600 bg-[#2C2C30]"
                />
                <span className="text-gray-400 text-sm">
                  I agree to the{' '}
                  <a href="/terms" className="text-white hover:underline">
                    Terms & Conditions
                  </a>
                </span>
              </div>

              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-4 transition-all font-medium"
                // name="Create account"
                name={props.isSubmitting ? 'Logging In...' : 'Login'}
                type="submit"
                loading={props.isSubmitting}
                disabled={props.isSubmitting}
              />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#1C1C1F] text-gray-400">
                    Or register with
                  </span>
                </div>
              </div>

              {/* <div className="grid grid-cols-2 gap-4"> */}
              {/* <div className="flex items-center justify-center gap-2 p-4 rounded-lg border border-gray-800 text-white hover:bg-[#2C2C30] transition-all">
              <GoogleLogin
                onSuccess={props.onSocialLogin}
                width={300}
                logo_alignment="center"
              />
            </div> */}

              <div className="flex justify-center mt-4 ">
                <GoogleLogin
                  onSuccess={props.onSocialLogin}
                  width={500}
                  logo_alignment="center"
                />
              </div>

              {/* <button className="flex items-center justify-center gap-2 p-4 rounded-lg border border-gray-800 text-white hover:bg-[#2C2C30] transition-all">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
                FaceBook
              </button> */}
              {/* </div> */}
            </div>
          </div>
        </section>
      </form>
    </GoogleOAuthProvider>
  );
}

export default withFormik<ILoginProps, FormikValues>({
  validationSchema: object().shape({
    userName: string().required('Email is required'),
    password: string().required('Password is required'),
  }),
  mapPropsToValues: () => ({
    userName: '',
    password: '',
  }),
  handleSubmit: (values, { props, ...actions }) => {
    props.onSubmit(values, actions);
  },
})(Login);
