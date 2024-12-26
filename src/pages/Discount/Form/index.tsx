import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store/reducer';

import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';
import Input from 'pages/Products/Form/components/input';
import TextArea from 'pages/Products/Form/components/TextArea';
import { MdDeleteForever } from 'react-icons/md';
import { Button, Modal } from 'components';
import { loadBusinessLocationsRequested, loadShopProductSearchFilterRequested, productSearch } from 'features';
import Warning from 'assets/images/svg/Warning/Warning';
import DropDown from 'pages/Products/Form/components/DropDown';
import { DISCOUNT, STOCKADJUSTMENTS, STOCKTRANSFER } from 'constants/routes';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ErrorMessage, Field, FormikProps, withFormik } from 'formik';
import DateTimePicker from 'components/shared/DateTimePicker';

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
  discountName: string;
  freeProductVariableId?: number;
  marginType?: 'FIXED' | 'PERCENTAGE';
  marginPercentage?: number;
  discountPrice?: any;
  noOfProducts?: number;
  discountPercentage?: number;
  discountValue?: number;
}

// function Form(props: IFormProps) {
function Form(props: IFormProps & FormikProps<StockTransferFormValues>) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    // handleSubmit,
    setFieldValue,
  } = props;

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [formData, setFormData] = useState<any>({
    // date: "",
    discountStartDate: '',
    discountEndDate: '',
    businessLocationIds: [],
    // businessLocationIds: []as number[],
    productVariableId: 0,
    discountName:'',
    discountType: 'BUY_ONE_GET_ONE',
    freeProductVariableId: 0,
    marginType: 'FIXED',
    marginPercentage: 0,
    discountPrice: 0,
    noOfProducts: 0,
    discountPercentage: 0,
    discountValu: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {} = useSelector((state: RootState) => state.stocktransfer);
  const { businessLocations, businessLocationLoading } = useSelector(
    (state: RootState) => state.businessLocation
  );
  // const { searchedProduct, product } = useSelector(
  //   (state: RootState) => state.product
  // );
  const { filterShopProductSearch } = useSelector(
    (state: RootState) => state.discount
  );
  // const allProductVariableResponses = searchedProduct?.flatMap(
  //   (product: any) => product?.productVariableResponses
  // );

  const allProductVariableResponse = filterShopProductSearch?.flatMap(
    (product: any) => product?.productVariableResponses
  );

  useEffect(() => {
    dispatch(loadBusinessLocationsRequested());
    // dispatch(loadShopProductSearchFilterRequested({ businessLocations: formData?.businessLocationIds}));
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    console.log(name, value, 'sssss');

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]:
        name === 'discountStartDate' || name === 'discountEndDate'
          ? new Date(value).toISOString() || ''
          : value,
    }));
  };

  const handleSelectProduct = (
    e: any,
    field: 'productVariableId' | 'freeProductVariableId'
  ) => {
    const selectedProduct = e?.target?.value;

    if (selectedProduct) {
      setFormData((prevFormData: FormData) => ({
        ...prevFormData,
        [field]: selectedProduct.id,
        ...(field === 'productVariableId' && {
          noOfProducts: 0,
          marginType: 'FIXED',
          discountPercentage: 0,
          discountPrice: 0,
          discountValue: 0,
        }),
      }));
    } else {
      setFormData((prevFormData: FormData) => ({
        ...prevFormData,
        [field]: null,
      }));
    }
  };

  const handleStockTransferProductsChange = (event: any) => {
    const { name, value } = event.target;

    setFormData((prevFormData: any) => {
      const newValue =
        name === 'discountPercentage' ||
        name === 'noOfProducts' ||
        name === 'discountPrice' ||
        name === 'discountValue'
          ? parseFloat(value) || ''
          : value;

      let updatedValues = { ...prevFormData, [name]: newValue };

      // Find the selected product for calculations
      const product = allProductVariableResponse.find(
        (product) => product?.id === prevFormData.productVariableId
      );
      const sellingPrice = product?.sellingPrice || 0;

      // Perform calculations based on the input field
      if (name === 'discountPrice' && newValue) {
        const discountValue = sellingPrice - parseFloat(newValue);
        updatedValues = { ...updatedValues, discountValue };
      } else if (name === 'discountValue' && newValue) {
        const discountPrice = sellingPrice - parseFloat(newValue);
        updatedValues = { ...updatedValues, discountPrice };
      }

      return updatedValues;
    });
  };

  const removeProductRequest = (selectedIndex: any) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      productVariableId: null,
      noOfProducts: '',
      marginType: '',
      discountPercentage: '',
      discountPrice: '',
      discountValue: '',
    }));
  };

  const calculateTotalPrice = (data: any) => {
    const totalPrice = data?.shopProductVariableRequests?.reduce(
      (acc: any, product: any) =>
        acc + product.sellingPrice * product.noOfProducts,
      0
    );
    return totalPrice;
  };

  if (businessLocationLoading) {
    return <div></div>;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormSubmitted(true);

    const isDiscountTypeValid = formData.discountType.trim() !== '';
    const isDiscountNameValid = formData.discountName.trim() !== '';
    const isBusinessLocationValid = formData.businessLocationIds.length > 0;
    const isStartDateValid = formData.discountStartDate.trim() !== '';
    const isEndDateValid = formData.discountEndDate.trim() !== '';
    const isProductVariableIdValid =
      formData.productVariableId?.trim?.() !== '';

    if (
      !isDiscountTypeValid ||
      !isBusinessLocationValid ||
      !isStartDateValid ||
      !isEndDateValid ||
      !isDiscountNameValid ||
      !isProductVariableIdValid
    ) {
      !isDiscountTypeValid && setFieldValue('discountType', '');
      !isDiscountNameValid && setFieldValue('discountName', '');
      !isStartDateValid && setFieldValue('discountStartDate', '');
      !isEndDateValid && setFieldValue('discountEndDate', '');
      !isBusinessLocationValid && setFieldValue('businessLocationIds', []);
      !isProductVariableIdValid && setFieldValue('productVariableId', '');

      return;
    }
console.log("thuC......",formData)
    props.onSubmit(formData, props.item ? props.item.id :null);
  };

  return (
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
        <div className="py-3 rounded-md w-full text-xs">
          <Input
            name="discountName"
            value={formData.discountName}
            errors={props.errors}
            onChange={handleInputChange}
            onBlur={props.handleBlur}
            touches={props.touched}
            defaultValue={props.item?.discountName ?? ''}
            placeholder="Enter Discount Name"
            label="Discount Name :"
            className={
              'flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] '
            }
          />
        </div>

        <div className="flex flex-col">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Discount Type :
          </label>
          <select
            name="discountType"
            value={formData.discountType || ''}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border text-sm border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
          >
            <option value="">Select discount Type</option>
            <option value="BUY_ONE_GET_ONE">Buy one get one</option>
            <option value="BUY_ONE_GET_OTHER_ONE">Buy one get other one</option>
            <option value="BUY_TWO_OR_MORE_DISCOUNT">
              Buy two or more discount
            </option>
            <option value="BUY_ONE_DISCOUNT">Buy one discount</option>
          </select>
          {formSubmitted && formData.discountType.trim() === '' && (
            <span className="text-red-500 text-xs mt-1">
              Discount Type required
            </span>
          )}
        </div>
      </div>

      <div className="rounded-md bg-white p-8 grid grid-cols-2 gap-6 shadow-sm">
        <div>
          <DateTimePicker
            name="discountStartDate"
            value={formData?.discountStartDate}
            onChange={handleInputChange}
            placeholder="Select Start Date and Time"
            label="Discount Start Date:"
            // className="flex items-center appearance-none w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
          />
          {formSubmitted && formData.discountStartDate.trim() === '' && (
            <span className="text-red-500 text-xs">
              Discount Start Date required
            </span>
          )}
        </div>

        <div>
          <DateTimePicker
            name="discountEndDate"
            value={formData?.discountEndDate}
            onChange={handleInputChange}
            // showTimeSelect={true}
            placeholder="Select End Date and Time"
            label="Discount End Date : "
            // className={'flex items-center appearance-none w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]'} autoFocus={undefined} onKeyDown={undefined}  // required
          />
          {formSubmitted && formData.discountEndDate.trim() === '' && (
            <span className="text-red-500 text-xs">
              Discount End Date required
            </span>
          )}
        </div>
      </div>

      <div className="rounded-md bg-white p-8 flex flex-col gap-6 shadow-sm">
        <div className="w-3/4 self-center">
          <SearchDropDown
            value={formData?.productVariableId}
            optionsFromAPI={allProductVariableResponse?.map(
              (product: any) => ({
              name: product?.name,
              value: product,
              })
            )}
            // inputOnChange={(value) => {
            //   // dispatch(productSearch(value));
            //   dispatch(loadShopProductSearchFilterRequested(value));

            // }}

            inputOnChange={(value) => {
              dispatch(loadShopProductSearchFilterRequested({ value, businessLocationIds: formData?.businessLocationIds || [] }));
            }}
            required
            label="Product for : "
            onChange={(e) => handleSelectProduct(e, 'productVariableId')}
            placeholder="Search product for add discount"
          />
          {formSubmitted &&
            (!formData.productVariableId ||
              formData.productVariableId === 0) && (
              <span className="text-red-500 text-xs">Product is required</span>
            )}
        </div>

        {formData.discountType === 'BUY_ONE_GET_OTHER_ONE' &&
          formData?.productVariableId && (
            <div className="w-3/4 self-center">
              <SearchDropDown
                // name="warrantyId"
                value={formData?.freeProductVariableId}
                optionsFromAPI={allProductVariableResponse?.map(
                  (product: any) => ({
                    name: product?.name,
                    value: product,
                  })
                )}
                // inputOnChange={(value) => {
                //   dispatch(productSearch(value));
                // }}
                inputOnChange={(value) => {
                  dispatch(loadShopProductSearchFilterRequested({ value, businessLocationIds: formData?.businessLocationIds || [] }));                 
                }}
                required
                label="Get other one Product :"
                onChange={(e) =>
                  handleSelectProduct(e, 'freeProductVariableId')
                }
                placeholder="Search product for add discount"
              />
            </div>
          )}

        <div className="overflow-hidden rounded-md  self-center">
          <table className="min-w-full leading-normal rounded-lg">
            <thead className="rounded-lg">
              <tr>
                <th className="w-10 border-r p-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  #
                </th>
                <th className="w-52 border-r px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="w-52 border-r px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="w-52 border-r px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Margin Type
                </th>
                <th className="w-52 border-r px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
                <th className="px-5 border-r py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
                <th className="px-5 border-r py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Subtotal
                </th>

                <th className="px-5 py-3 border-b-2 w-20 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <MdDeleteForever size={25} />
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.discountType !== 'BUY_ONE_GET_OTHER_ONE' &&
                formData.discountType !== 'BUY_ONE_GET_ONE' &&
                formData?.productVariableId && (
                  <tr>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm flex-1">
                      {/* Optional Additional Content */}
                    </td>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm flex-1">
                      {allProductVariableResponse.find(
                        (product) => product?.id === formData.productVariableId
                      )?.name || 'Product not found'}
                    </td>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm flex-1">
                      {formData.discountType !== 'BUY_ONE_DISCOUNT' && (
                        <Input
                          name="noOfProducts"
                          value={formData?.noOfProducts || ''}
                          onChange={handleStockTransferProductsChange}
                          placeholder="Unit Cost"
                          type="number"
                          label="Quantity"
                          className="w-full text-sm h-10 border border-gray-300 rounded-md"
                        />
                      )}
                    </td>

                    {formData.discountType == 'BUY_TWO_OR_MORE_DISCOUNT' && (
                      <td>
                        <Input
                          name="discountPrice"
                          value={formData?.discountPrice || ''}
                          onChange={handleStockTransferProductsChange}
                          placeholder="Discount Price"
                          label="Discount Price:"
                          type="number"
                          className="w-full text-sm h-10 border border-gray-300 rounded-md"
                        />
                      </td>
                      // <td>

                      // </td>
                    )}

                    {formData.discountType !== 'BUY_TWO_OR_MORE_DISCOUNT' && (
                      <td className="p-3 border-r border-b border-gray-200 bg-white text-sm flex-1">
                        <DropDown
                          name="marginType"
                          value={formData?.marginType || ''}
                          options={[
                            { name: 'Fixed', value: 'FIXED' },
                            { name: 'Percentage', value: 'PERCENTAGE' },
                          ]}
                          onChange={handleStockTransferProductsChange}
                          placeholder="Select a margin type"
                        />
                      </td>
                    )}
                    {formData.discountType === 'BUY_ONE_DISCOUNT' && (
                      <td className="p-3 border-r border-b border-gray-200 bg-white text-sm flex-1">
                        {formData?.marginType === 'PERCENTAGE' ? (
                          <Input
                            name="discountPercentage"
                            value={formData?.discountPercentage || ''}
                            onChange={handleStockTransferProductsChange}
                            placeholder="Discount %"
                            label="Discount Percentage:"
                            type="number"
                            className="w-full text-sm h-10 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <Input
                            name="discountPrice"
                            value={formData?.discountPrice || ''}
                            onChange={handleStockTransferProductsChange}
                            placeholder="Discount Price"
                            label="Discount Price:"
                            type="number"
                            className="w-full text-sm h-10 border border-gray-300 rounded-md"
                          />
                        )}
                      </td>
                    )}
                    {formData.discountType === 'BUY_ONE_DISCOUNT' && (
                      <td className="p-3 border-r border-b border-gray-200 bg-white text-sm flex-1">
                        {formData?.marginType === 'FIXED' && (
                          <Input
                            name="discountValue"
                            value={formData?.discountValue || ''}
                            onChange={handleStockTransferProductsChange}
                            placeholder="Discount Value"
                            label="Discount Value:"
                            type="number"
                            className="w-full text-sm h-10 border border-gray-300 rounded-md"
                          />
                        )}
                      </td>
                    )}
                    {formData.discountType === 'BUY_ONE_DISCOUNT' && (
                      <td className="p-3 border-r border-b border-gray-200 bg-white text-sm flex-1">
                        {formData.marginType === 'FIXED' ? (
                          <>
                            <p className="font-medium">Discount Percentage:</p>
                            <p className="ml-5">
                              {(() => {
                                const product =
                                  allProductVariableResponse.find(
                                  (product) =>
                                    product?.id === formData.productVariableId
                                );
                                const sellingPrice = product?.sellingPrice || 0;
                                const discountValue =
                                  formData?.discountValue || 0;
                                const discountPercentage = sellingPrice
                                  ? (
                                      (discountValue / sellingPrice) *
                                      100
                                    ).toFixed(2)
                                  : 0;
                                return `${discountPercentage}%`;
                              })()}
                            </p>
                          </>
                        ) : formData.marginType === 'PERCENTAGE' ? (
                          <>
                            <p className="font-medium">Discount Value:</p>
                            <p className="ml-5">
                              {(() => {
                                const product =
                                  allProductVariableResponse.find(
                                  (product) =>
                                    product?.id === formData.productVariableId
                                );
                                const sellingPrice = product?.sellingPrice || 0;
                                const discountPercentage =
                                  formData?.discountPercentage || 0;
                                const discountValue = sellingPrice
                                  ? (
                                      (discountPercentage / 100) *
                                      sellingPrice
                                    ).toFixed(2)
                                  : 0;
                                return `${discountValue}`;
                              })()}
                            </p>
                            <p className="font-medium">Discount Price:</p>
                            <p className="ml-5">
                              {(() => {
                                const product =
                                  allProductVariableResponse.find(
                                  (product) =>
                                    product?.id === formData.productVariableId
                                );
                                const sellingPrice = product?.sellingPrice || 0;
                                const discountValue = sellingPrice
                                  ? (formData?.discountPercentage / 100) *
                                    sellingPrice
                                  : 0;
                                const discountPrice =
                                  sellingPrice - discountValue;
                                return `${discountPrice}`;
                              })()}
                            </p>
                          </>
                        ) : null}
                      </td>
                    )}

                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm text-center">
                      <MdDeleteForever
                        size={25}
                        color="red"
                        onClick={removeProductRequest}
                      />
                    </td>
                  </tr>
                )}

              {/* <tr>
                <td
                  colSpan={6}
                  className="p-3 border-r border-b border-gray-200 bg-white text-sm flex justify-end"
                >
                  <p className="font-medium">Total:</p>
                  <p className="ml-5">
                    {/* {calculateTotalPrice(formData).toFixed(2)} */}
              {/* </p>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-8 p-2">
        <Button
          name="Cancel"
          onClick={() => {
            navigation(DISCOUNT);
            window.location.reload();
          }}
          className="text-xs text-black bg-white-400 border-[1px] text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
        />

        <Button
          name={props.item ? 'Update ' : 'Save'}
          type={'submit'}
          className="text-xs text-white bg-primary text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
        />
      </div>
      <Modal
        isOpen={isModalVisible}
        setISOpen={setIsModalVisible}
        // title="Create Brand"
        content={
          <div className="flex flex-col gap-5 p-5 items-center">
            <Warning className="h-24 w-24" />
            <h1 className="font-semibold text-lg">
              Are you sure you want to remove?
            </h1>
            <div className="flex flex-row gap-5">
              <Button
                onClick={() => {
                  if (selectedIndex !== null) {
                    removeProductRequest(selectedIndex);
                    setSelectedIndex(null);
                  }
                  setIsModalVisible(false);
                }}
                name={'Delete'}
                className={
                  'text-sm hover:shadow-md hover:shadow-red-300 transition-all self-end h-full text-nowrap text-white bg-red-500 text-center font-[500] py-2 px-4 rounded-md cursor-pointer'
                }
              />
              <Button
                onClick={() => setIsModalVisible(false)}
                name={'Cancel'}
                className={
                  'text-sm hover:shadow-md transition-all self-end h-full text-nowrap text-white bg-gray-300 text-center font-[500] py-2 px-4 rounded-md cursor-pointer'
                }
              />
            </div>
          </div>
        }
      />
    </form>
  );
}

export default withFormik<IFormProps, StockTransferFormValues>({
  validationSchema: Yup.object().shape({
    // date: Yup.date().required("Date is required"),
    businessLocationIds: Yup.number()
      .positive('Please select a business location')
      .required('Business location is required'),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values, { setSubmitting });
  },
  enableReinitialize: true,
  validateOnBlur: true,
  validateOnChange: true,
})(Form);
