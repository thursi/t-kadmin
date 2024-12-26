import React from 'react';
import { withFormik, FormikProps } from 'formik';
import { object, string } from 'yup';

export interface IFilterFormProps {
  resetForm(): any;
  onSubmit: (values: any, actions: any) => any;
  item?: any;
  setModal?: (isOpen: boolean) => void;
  filterModal: boolean;
}

interface FormikValues {
  paymentGatewayStatus: string;
}

function FilterForm(props: FormikProps<FormikValues> & IFilterFormProps) {
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    console.log('object', name, value);

    props.setFieldValue(name, value);
    const actions = {
      setSubmitting: (isSubmitting: boolean) => {},
    };

    props.onSubmit({ ...props.values, [name]: value }, actions);
  };

  return (
    <div
      style={{
        right: props.filterModal ? '0' : '-300px',
      }}
    >
      <form onSubmit={props.handleSubmit} className="p-4">
        <div className="flex space-x-14">
          <div className="py-1 rounded-md text-xs flex-1">
            <label className="block mb-3 text-sm font-medium text-gray-700 text-nowrap">
              paymentGatewayStatus:
            </label>
            <select
              name="paymentGatewayStatus"
              value={props.values.paymentGatewayStatus || ''}
              onChange={handleFilterChange}
              onBlur={props.handleBlur}
              className="block w-auto px-2 h-10 py-2 border text-xs border-[#b0afb3] focus:outline-none rounded-md"
            >
              <option value="" disabled>
                Choose a Payment Status...
              </option>
              <option value="PAID">Paid</option>
              <option value="PENDING">Pending</option>
              <option value="REFUND">Refund</option>
              <option value="FAILED">Failed</option>
            </select>
            {props.touched.paymentGatewayStatus &&
            props.errors.paymentGatewayStatus ? (
              <div className="text-red-600 text-xs mt-1">
                {props.errors.paymentGatewayStatus}
              </div>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}

export default withFormik<IFilterFormProps, FormikValues>({
  validationSchema: object().shape({
    paymentGatewayStatus: string().required('Please select a purchase status.'),
  }),
  mapPropsToValues: ({ item }: IFilterFormProps) => ({
    paymentGatewayStatus: item?.paymentGatewayStatus ?? '',
  }),
  handleSubmit: (values, { props, ...actions }) => {
    props.onSubmit(values, actions);
    actions.setSubmitting(false);
    props.resetForm();
  },
  enableReinitialize: true,
})(FilterForm);
