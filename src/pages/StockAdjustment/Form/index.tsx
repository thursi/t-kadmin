import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store/reducer';

import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';
import Input from 'pages/Products/Form/components/input';
import TextArea from 'pages/Products/Form/components/TextArea';
import { MdDeleteForever } from 'react-icons/md';
import { Button, Modal } from 'components';
import DatePicker from 'pages/Products/Form/components/DatePicker';
import { loadBusinessLocationsRequested, productSearch } from 'features';
import Warning from 'assets/images/svg/Warning/Warning';
import DropDown from 'pages/Products/Form/components/DropDown';
import { STOCKADJUSTMENTS, STOCKTRANSFER } from 'constants/routes';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FormikProps, withFormik } from 'formik';

interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
}

interface StockTransferFormValues {
  date: string;
  businessLocationId: number;
  shopProductVariableRequests: Array<{
    productVariableId: number;
    productName: string;
    shopQuantity: number;
    marginType: 'FIXED' | 'PERCENTAGE';
    marginPercentage?: number;
    sellingPrice: number;
  }>;
  note?: string;
}

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
    businessLocationId: 0,
    date: '',
    shopProductVariableRequests: [],
    note: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {} = useSelector((state: RootState) => state.stocktransfer);
  const { businessLocations, businessLocationLoading } = useSelector(
    (state: RootState) => state.businessLocation
  );
  const { searchedProduct, product } = useSelector(
    (state: RootState) => state.product
  );
  const allProductVariableResponses = searchedProduct?.flatMap(
    (product: any) => product?.productVariableResponses
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
    setFormData((prevBody: any) => ({
      ...prevBody,
      [name]: value,
    }));
  };

  const handleSelectProduct = (value: any) => {
    setFormData((prevBody: any) => {
      const existingProductIndex = (
        prevBody.shopProductVariableRequests || []
      ).findIndex(
        (product: any) => product.productVariableId === value?.target?.value?.id
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...prevBody.shopProductVariableRequests];
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          shopQuantity: updatedProducts[existingProductIndex].shopQuantity + 1,
        };
        return {
          ...prevBody,
          shopProductVariableRequests: updatedProducts,
        };
      } else {
        return {
          ...prevBody,
          shopProductVariableRequests: [
            ...(prevBody.shopProductVariableRequests || []),
            {
              productVariableId: value?.target?.value?.id,
              productName: value?.target?.name,
              marginType: value?.target?.value?.marginType,
              marginPercentage: value?.target?.value?.marginPercentage ?? 0,
              sellingPrice: value?.target?.value?.sellingPrice ?? 0,
              shopQuantity: 1,
            },
          ],
        };
      }
    });
  };

  const handleStockTransferProductsChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index: number
  ) => {
    const { name, value } = event.target;
    const updatedStockTransferProducts: any = [
      ...formData.shopProductVariableRequests,
    ];
    updatedStockTransferProducts[index][name] = value;
    setFormData({
      ...formData,
      shopProductVariableRequests: updatedStockTransferProducts,
    });
  };

  const removeProductRequest = (index: number) => {
    const updatedStockTransferProducts =
      formData.shopProductVariableRequests.filter(
        (_: any, i: number) => i !== index
      );
    setFormData({
      ...formData,
      shopProductVariableRequests: updatedStockTransferProducts,
    });
  };

  const calculateTotalPrice = (data: any) => {
    const totalPrice = data?.shopProductVariableRequests?.reduce(
      (acc: any, product: any) =>
        acc + product.sellingPrice * product.shopQuantity,
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

    const isDateValid = formData.date.trim() !== '';
    const isBusinessLocationValid = formData.businessLocationId > 0;
    const isProductsValid = formData.shopProductVariableRequests.length > 0;

    if (!isDateValid || !isBusinessLocationValid || !isProductsValid) {
      !isDateValid && setFieldValue('date', '');
      !isBusinessLocationValid && setFieldValue('businessLocationId', 0);
      return;
    }

    props.onSubmit(formData, null);
  };

  return (
    // <form
    //   onSubmit={(e) => {
    //     e.preventDefault();

    //     const isDateValid = formData.date.trim() !== '';
    //     const isBusinessLocationValid = formData.businessLocationId > 0;
    //     const isProductsValid = formData.shopProductVariableRequests.length > 0;

    //     if (!isDateValid || !isBusinessLocationValid || !isProductsValid) {
    //       !isDateValid && setFieldValue('date', '');
    //       !isBusinessLocationValid && setFieldValue('businessLocationId', 0);
    //       return;
    //     }

    //     props.onSubmit(formData, null);
    //   }}
    //   className="flex flex-col gap-4"
    // >

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="rounded-md bg-white p-8 grid grid-cols-2 gap-6 shadow-sm">
        <div>
          <DatePicker
            name="date"
            values={formData?.date}
            defaultValue={formData?.date}
            onChange={handleInputChange}
            placeholder="Date"
            label="Date :"
            className={`flex items-center appearance-none w-full px-2 h-6 py-4 border text-xs rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]`}
          />
          {formSubmitted && formData.date.trim() === '' && (
            <span className="text-red-500 text-xs">Date is required</span>
          )}
        </div>

        <div>
          <SearchDropDown
            name="businessLocationId"
            value={formData?.businessLocationId}
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
            onBlur={handleBlur}
            placeholder="Select a location"
            label="Business Location :"
            className={`${
              !formData.businessLocationId || formData.businessLocationId === 0
                ? 'border-red-500'
                : ''
            } text-xs`}
            
          />
          {formSubmitted && formData.businessLocationId <= 0 && (
            <span className="text-red-500 text-xs">
              Business location is required
            </span>
          )}
        </div>
      </div>

      <div className="rounded-md bg-white p-8 flex flex-col gap-6 shadow-sm">
        <div className="w-3/4 self-center">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Product for Stock Transfer :
          </label>
          <SearchDropDown
            value={formData?.shopProductVariableRequests.map(
              (val: any) => val.productVariableId
            )}
            optionsFromAPI={allProductVariableResponses?.map(
              (product: any) => ({
                name: product?.name,
                value: product,
              })
            )}
            inputOnChange={(value) => {
              dispatch(productSearch(value));
            }}
            onChange={(e) => handleSelectProduct(e)}
            placeholder="Search product for stock transfer"
            className={`${
              formData?.shopProductVariableRequests?.length === 0
                ? 'border-red-500'
                : ''
            } text-xs`}
            
          />

          {formSubmitted &&
            formData.shopProductVariableRequests.length === 0 && (
              <span className="text-red-500 text-xs">
                At least one product is required
              </span>
            )}
        </div>
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
                <th className="w-52 border-r px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Margin
                </th>
                <th className="px-5 border-r py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Unit Price
                </th>
                <th className="px-5 border-r py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Subtotal
                </th>

                <th className="px-5 py-3 border-b-2 w-20 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <MdDeleteForever size={25} />
                </th>
              </tr>
            </thead>
            <tbody>
              {formData?.shopProductVariableRequests?.map(
                (product: any, index: number) => (
                  <tr key={index}>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full">
                      {index + 1}
                    </td>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full">
                      {product?.productName}
                    </td>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full">
                      <Input
                        name="shopQuantity"
                        value={
                          formData?.shopProductVariableRequests[index]
                            ?.shopQuantity
                        }
                        onChange={(e: any) =>
                          handleStockTransferProductsChange(e, index)
                        }
                        placeholder="Unit Cost"
                        type="number"
                        className="w-full text-sm h-10 border border-solid  px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                      />
                    </td>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full">
                      <DropDown
                        name="marginType"
                        value={
                          formData?.shopProductVariableRequests[index]
                            ?.marginType
                        }
                        options={[
                          {
                            name: 'Fixed',
                            value: 'FIXED',
                          },
                          {
                            name: 'Percentage',
                            value: 'PERCENTAGE',
                          },
                        ]}
                        required
                        onChange={(e) =>
                          handleStockTransferProductsChange(e, index)
                        }
                        placeholder="Select a margin type"
                        className='text-xs'
                      />
                    </td>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full">
                      {formData?.shopProductVariableRequests[index]
                        ?.marginType === 'PERCENTAGE' ? (
                        <div className="flex-1 min-w-[120px]">
                          <Input
                            name="marginPercentage"
                            value={
                              formData?.shopProductVariableRequests[index]
                                ?.marginPercentage
                            }
                            onChange={(e: any) =>
                              handleStockTransferProductsChange(e, index)
                            }
                            placeholder="Margin %"
                            type="number"
                            className="w-full text-sm h-10 border border-solid  px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                          />
                        </div>
                      ) : (
                        <div className="flex-1 min-w-[120px]">
                          <Input
                            name="sellingPrice"
                            value={
                              formData?.shopProductVariableRequests[index]
                                ?.sellingPrice
                            }
                            onChange={(e: any) =>
                              handleStockTransferProductsChange(e, index)
                            }
                            placeholder="Selling Price"
                            type="number"
                            className="w-full text-sm h-10 border border-solid  px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                          />
                        </div>
                      )}
                    </td>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full">
                      {product?.sellingPrice}
                    </td>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full">
                      {product?.shopQuantity * product?.sellingPrice}
                    </td>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  text-center items-center flex-1 h-full cursor-pointer">
                      <MdDeleteForever
                        size={25}
                        color="red"
                        onClick={() => {
                          setSelectedIndex(index);
                          setIsModalVisible(true);
                        }}
                      />
                    </td>
                  </tr>
                )
              )}
              <tr>
                <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full"></td>
                <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full"></td>
                <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full"></td>
                <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full"></td>
                <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full"></td>
                <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full"></td>
                <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full">
                  <div className="flex flex-row self-end justify-end">
                    <p className="font-medium">Total :</p>
                    <p className="ml-5 text-right">
                      {calculateTotalPrice(formData).toFixed(2)}
                    </p>
                  </div>
                </td>
                <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  text-center items-center flex-1 h-full cursor-pointer"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-md bg-white p-8 grid grid-cols-3 gap-6 shadow-sm">
        <TextArea
          name="note"
          value={formData?.note}
          defaultValue={formData?.note}
          onChange={handleInputChange}
          placeholder="Enter Additional Notes"
          label="Additional Notes :"
          className={
            'flex items-center w-full px-2 h-40 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] no-scrollbar'
          }
        />
      </div>
      <div className="flex justify-end gap-8 p-2">
        <Button
          name="Cancel"
          onClick={() => {
            navigation(STOCKADJUSTMENTS);
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
    date: Yup.date().required('Date is required'),
    businessLocationId: Yup.number()
      .positive('Please select a business location')
      .required('Business location is required'),
    shopProductVariableRequests: Yup.array()
      .of(
        Yup.object().shape({
          productVariableId: Yup.number().required('Product is required'),
          shopQuantity: Yup.number()
            .positive('Quantity must be positive')
            .required('Quantity is required'),
          marginType: Yup.string()
            .oneOf(['FIXED', 'PERCENTAGE'], 'Invalid margin type')
            .required('Margin type is required'),
          sellingPrice: Yup.number()
            .positive('Selling price must be positive')
            .required('Selling price is required'),
        })
      )
      .min(1, 'At least one product is required'),
    note: Yup.string(), // Optional note field
  }),
  mapPropsToValues: ({ item }: IFormProps) => ({
    date: item?.date || '',
    businessLocationId: item?.businessLocationId || 0,
    shopProductVariableRequests: item?.shopProductVariableRequests || [],
    note: item?.note || '',
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values, { setSubmitting });
  },
  enableReinitialize: true,
  validateOnBlur: true,
  validateOnChange: true,
})(Form);
