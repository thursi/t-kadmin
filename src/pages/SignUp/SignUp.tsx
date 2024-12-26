import { Field, FormikProps, withFormik } from 'formik';
import { string, object, array, date } from 'yup';
import { Button, DatePicker, Input } from 'components';
import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React, { useState } from 'react';
import Logo from '../../assets/images/png/t_and_k_logo.png';

export interface ISignUpProps {
  onSubmit: (values: any, actions: any) => void;
}

interface FormikValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: string[];
  dateOfBirth: string;
}

function SignUp(props: FormikProps<FormikValues> & ISignUpProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
                Already have an account?{' '}
                <a href="/login" className="text-white hover:underline">
                  Login
                </a>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
            {/* <label
        htmlFor={props.name}
        className={`text-[11px] font-bold text-white`}
      >
        {props.label}
      </label> */}


              <Input
                name="firstName"
                label="First Name"
                color="text-white"
                values={props.values.firstName}
                errors={props.errors}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                touches={props.touched}
                placeholder="First Name"
                className="bg-[#2C2C30] border-0 rounded-lg p-4 text-white placeholder-gray-500 focus:ring-2"
              />
              <Input
                // name="lastName"
                name="lastName"
                label="Last Name"
                color="text-white"
                values={props.values.lastName}
                errors={props.errors}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                touches={props.touched}
                placeholder="Last Name"
                className="bg-[#2C2C30] border-0 rounded-lg p-4 text-white placeholder-gray-500 focus:ring-2"
              />
            </div>

            <Input
              label="Email"
              name="email"
              color="text-white"
              values={props.values.email}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              placeholder="Enter your Email"
              className="bg-[#2C2C30] border-0 rounded-lg p-4 text-white placeholder-gray-500 focus:ring-2 w-full"
            />

            <div className="relative">
              <Input
                label="Password"
                name="password"
                color="text-white"
                type={showPassword ? 'text' : 'password'}
                values={props.values.password}
                errors={props.errors}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                touches={props.touched}
                placeholder="Enter your password"
                className="bg-[#2C2C30] border-0 rounded-lg p-4 text-white placeholder-gray-500 focus:ring-2 w-full pr-12"
              />
              <span
                className="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <SearchDropDown
              name="roles"
              color="text-white"
              value={props.values.roles}
              options={[
                { name: 'Admin', value: 1 },
                { name: 'User', value: 2 },
                { name: 'Manager', value: 3 },
              ]}
              onChange={props.handleChange}
              placeholder="Select a Role"
              label="Roles"
              multiSelect={true}
            />

            <DatePicker
              name="dateOfBirth"
              color="text-white"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touched={props.touched}
              placeholder="Date Of Birth"
              label="Date Of Birth"
              className="flex items-center appearance-none w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
              required
            />

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-4 transition-all font-medium"
              name={props.isSubmitting ? 'Signing Up...' : 'Sign Up'}
              type="submit"
              loading={props.isSubmitting}
            />
          </div>
        </div>
      </section>
    </form>
  );
}

export default withFormik<ISignUpProps, FormikValues>({
  validationSchema: object().shape({
    email: string().required('Email is required'),
    // password: string().required('Password is required'),
    roles: array().of(string()).min(1, 'At least one role must be selected'),
    dateOfBirth: date()
      .required('Date of birth is required')
      .max(new Date(), 'Date of birth cannot be in the future'),
  }),
  mapPropsToValues: () => ({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    roles: [],
    dateOfBirth: '',
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log('Submitted Values:', values); // Log the submitted values
    props.onSubmit(values, { setSubmitting });
  },
})(SignUp);
