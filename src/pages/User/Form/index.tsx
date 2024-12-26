import { Button, DatePicker, Input } from 'components';
import { withFormik, FormikProps } from 'formik';
import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';
import { string, object, array, date } from 'yup';

export interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
  setModal?: (state: boolean) => void;
}

interface FormikValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
  dateOfBirth: string;
}

function Form(props: FormikProps<FormikValues> & IFormProps) {
  async function cancelForm() {
    if (props.setModal) props.setModal(false);
    props.resetForm();
  }

  if (props.isSubmitting) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    props.setFieldValue(name, value);
  };

  const handleRoleChange = (selectedRoles: string[]) => {
    props.setFieldValue('roles', selectedRoles);
  };

  const handleDateChange = (date: string) => {
    props.setFieldValue('dateOfBirth', date);
  };

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div className="flex flex-col gap-3">
          <Input
            label="First Name"
            name="firstName"
            values={props.values.firstName}
            onChange={handleInputChange}
            onBlur={props.handleBlur}
            errors={props.errors.firstName}
            placeholder="First Name"
          />
          <Input
            label="Last Name"
            name="lastName"
            values={props.values.lastName}
            onChange={handleInputChange}
            onBlur={props.handleBlur}
            errors={props.errors.lastName}
            placeholder="Last Name"
          />
          <Input
            label="Email"
            name="email"
            values={props.values.email}
            onChange={handleInputChange}
            onBlur={props.handleBlur}
            errors={props.errors.email}
            placeholder="Email"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            values={props.values.password}
            onChange={handleInputChange}
            onBlur={props.handleBlur}
            errors={props.errors.password}
            placeholder="Password"
          />
          <SearchDropDown
            name="roles"
            value={props.values.roles}
            options={[
              { name: 'Admin', value:1 },
              { name: 'User', value:2 },
              { name: 'Manager', value: 3 },
            ]}
            onChange={handleRoleChange}
            label="Roles"
            multiSelect={true}
          />
          <DatePicker
            name="dateOfBirth"
            value={props.values.dateOfBirth}
            onChange={handleDateChange}
            onBlur={props.handleBlur}
            error={props.errors.dateOfBirth}
            label="Date of Birth"
          />
        </div>
        <div className="py-4 flex justify-end gap-4">
          <Button
            onClick={cancelForm}
            name="Cancel"
            className="btn-cancel"
          />
          <Button
            type="submit"
            name="Save"
            className="btn-save"
            loading={props.isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}

export default withFormik<IFormProps, FormikValues>({
  validationSchema: object().shape({
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    email: string().email('Invalid email').required('Email is required'),
    password: string().required('Password is required'),
    roles: array().of(string()).min(1, 'At least one role must be selected'),
    dateOfBirth: date()
      .required('Date of birth is required')
      .max(new Date(), 'Date of birth cannot be in the future'),
  }),
  mapPropsToValues: ({ item }) => ({
    firstName: item?.firstName || '',
    lastName: item?.lastName || '',
    email: item?.email || '',
    password: item?.password || '',
    roles: item?.roles || [],
    dateOfBirth: item?.dateOfBirth || '',
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log('Submitted values:', {
      ...values,
      password: '******', // Mask password in logs
    });
    props.onSubmit(values, { setSubmitting });
  },
})(Form);
