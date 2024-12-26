import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import { loadBusinessLocationsRequested } from 'features';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Button } from 'components';
import { ErrorMessage, Field, FormikProps, withFormik } from 'formik';
import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';
import Input from 'pages/Products/Form/components/input';
import ReactTooltip, { Tooltip } from 'react-tooltip';
interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
}

interface StockTransferFormValues {
  discountStartDate: string;
  discountEndDate: string;
  businessLocationIds: [];
  productVariableId: number;
  discountType: string;
  freeProductVariableId?: number;
  marginType?: 'FIXED' | 'PERCENTAGE';
  marginPercentage?: number;
  discountPrice?: any;
  noOfProducts?: number;
  discountPercentage?: number;
  discountValue?: number;
}

function Form(props: IFormProps & FormikProps<StockTransferFormValues>) {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    props;

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [formData, setFormData] = useState<any>({
    businessLocationIds: [],
    minAmount: 0,
    deliveryAmount: 0,
    fixedDeliveryCharge: 0,
    deliveryDays: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { businessLocations, businessLocationLoading } = useSelector(
    (state: RootState) => state.businessLocation
  );

  useEffect(() => {
    dispatch(loadBusinessLocationsRequested());
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    let parsedValue: any = value;

    if (
      name === 'minAmount' ||
      name === 'deliveryAmount' ||
      name === 'fixedDeliveryCharge' ||
      name === 'deliveryDays'
    ) {
      parsedValue = value ? parseFloat(value) : 0;
    }

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = (values: any) => {
    values.preventDefault();

    setFormSubmitted(true);

    const isMinAmountValid = formData.minAmount >= 0;
    const isDeliveryAmountValid = formData.deliveryAmount >= 0;
    const isBusinessLocationIdsValid = formData.businessLocationIds?.length > 0;
    const isFixedDeliveryChargeValid = formData.fixedDeliveryCharge >= 0;
    const isDeliveryDaysValid = formData.deliveryDays >= 0;

    if (
      !isMinAmountValid ||
      !isDeliveryAmountValid ||
      !isBusinessLocationIdsValid ||
      !isFixedDeliveryChargeValid ||
      !isDeliveryDaysValid
    ) {
      !isMinAmountValid && setFieldValue('minAmount', '');
      !isDeliveryAmountValid && setFieldValue('deliveryAmount', '');
      !isFixedDeliveryChargeValid && setFieldValue('fixedDeliveryCharge', '');
      !isBusinessLocationIdsValid && setFieldValue('businessLocationIds', []);
      !isDeliveryDaysValid && setFieldValue('deliveryDays', '');
      return;
    }

    props.onSubmit(formData, props.item ? props.item?.id : null);
  };
  useEffect(() => {
    if (props.item) {
      setFormData({
        businessLocationIds: props.item.businessLocationIds || [],
        minAmount: props.item.minAmount || 0,
        deliveryAmount: props.item.deliveryAmount || 0,
        fixedDeliveryCharge: props.item.fixedDeliveryCharge || 0,
        deliveryDays: props.item.deliveryDays || 0,
      });
    }
  }, [props.item]);

  return (
    // <form onSubmit={(e) => {
    //   e.preventDefault();
    //   handleSubmit(values);
    // }} className="flex flex-col gap-4">
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="rounded-md bg-white p-8 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-sm">
        <div className="flex flex-col">
          <SearchDropDown
            name="businessLocationIds"
            value={formData?.businessLocationIds}
            options={
              businessLocations
                ? businessLocations?.map((business: any) => ({
                    name: business?.businessName,
                    value: business?.id,
                  }))
                : []
            }
            required
            onChange={handleInputChange}
            placeholder="Select a location"
            label="Business Location :"
            multiSelect={true}
          />
          {formSubmitted && formData.businessLocationIds.length === 0 && (
            <span className="text-red-500 text-xs mt-1">
              Business Location required
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <Field
            name="fixedDeliveryCharge"
            as={Input}
            placeholder="Enter Fixed Delivery Charge"
            label="Fixed Delivery Charge :"
            type="number"
            value={formData?.fixedDeliveryCharge}
            onChange={handleInputChange}
            className="flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
          />
        </div>
      </div>

      <div className="rounded-md bg-white p-8 grid grid-cols-2 gap-6 shadow-sm">
        <div className="flex flex-col">
          <Field
            name="deliveryDays"
            value={formData?.deliveryDays}
            as={Input}
            placeholder="Enter Delivery Days"
            label="Delivery Days :"
            type="number"
            onChange={handleInputChange}
            className="flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
          />
        </div>
        {/* <div className="flex flex-col">
          <Field
            name="minAmount"
            as={Input}
            placeholder="Enter minAmount"
            label="minAmount :"
            type="number"
            value={formData?.minAmount}
            onChange={handleInputChange}
            className="flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
          />
        </div> */}

        <div className="flex flex-col">
          <label
            htmlFor="minAmount"
            className="block text-sm font-medium mb-2 text-black"
          >
            Minimum Amount :
          </label>
          <Field
            name="minAmount"
            as="input"
            placeholder="Enter minAmount"
            label="minAmount :"
            type="number"
            value={formData?.minAmount}
            onChange={handleInputChange}
            className="flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
            data-tooltip-id="minAmountTooltip"
            data-tooltip-content="This is the minimum amount required."
          />

          <Tooltip id="minAmountTooltip" className="bg-gray-300" place="top" />
        </div>


        <div className="flex flex-col">
          <label
            htmlFor="minAmount"
            className="block text-sm font-medium mb-2 text-black"
          >
            Delivery Amount :
          </label>
          <Field
            name="deliveryAmount"
            as="input"
            placeholder="Enter deliveryAmount"
            label="deliveryAmount :"
            type="number"
            value={formData?.deliveryAmount}
            onChange={handleInputChange}
            className="flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
            data-tooltip-id="deliveryAmountTooltip"
            data-tooltip-content="This is the deliveryAmount amount required."
          />

          <Tooltip id="deliveryAmountTooltip" className="bg-gray-300" place="top" />
        </div>
 
      </div>

      <div className="flex justify-end gap-8 p-2">
        <Button
          name="Cancel"
          onClick={() => {
            navigation('/delivery-charges');
            window.location.reload();
          }}
          className="text-xs text-black bg-white-400 border-[1px] text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
        />

        <Button
          name={props.item ? 'Update' : 'Save'}
          type={'submit'}
          className="text-xs text-white bg-primary text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
        />
      </div>
    </form>
  );
}

export default withFormik<IFormProps, StockTransferFormValues>({
  validationSchema: Yup.object().shape({
    businessLocationIds: Yup.array().min(1, 'Business location is required'),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values, { setSubmitting });
  },
  enableReinitialize: true,
  validateOnBlur: true,
  validateOnChange: true,
})(Form);
