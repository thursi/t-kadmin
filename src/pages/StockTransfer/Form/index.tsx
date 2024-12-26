// import React, { useEffect, useLayoutEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from 'store/reducer';
// import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';
// import Input from 'pages/Products/Form/components/input';
// import TextArea from 'pages/Products/Form/components/TextArea';
// import { MdDeleteForever } from 'react-icons/md';
// import { Button, Modal } from 'components';
// import DatePicker from 'pages/Products/Form/components/DatePicker';
// import { loadBusinessLocationsRequested, productSearch } from 'features';
// import Warning from 'assets/images/svg/Warning/Warning';
// import { useNavigate } from 'react-router-dom';
// import { STOCKTRANSFER } from 'constants/routes';

// interface IFormProps {
//   onSubmit: (values: any, actions: any) => void;
//   item?: any;
//   // navigation?: any;
// }

// function Form(props: IFormProps) {
//   const dispatch = useDispatch();
//   const navigation = useNavigate();
//   const [loadingsub, setLoadingSub] = useState(false);

//   //  console.log(" props.item props.item", props.item)
//   const [formData, setFormData] = useState<any>(
//     // props.item ||
//     {
//       date: '',
//       locationToId: props.item?.locationToId?.businessName || 0,
//       stockTransferProducts: [],
//       shippingChargeAmount: 0,
//       additionalNotes: '',
//       stockTransferStatus: 'COMPLETED',
//     }
//   );
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

//   const {} = useSelector((state: RootState) => state.stocktransfer);
//   const { businessLocations, businessLocationLoading } = useSelector(
//     (state: RootState) => state.businessLocation
//   );
//   const { searchedProduct, product } = useSelector(
//     (state: RootState) => state.product
//   );
//   const allProductVariableResponses = searchedProduct?.flatMap(
//     (product: any) => product?.productVariableResponses || []
//   );

//   useEffect(() => {
//     if (props.item) {
//       setFormData({
//         ...props.item,
//         locationToId: props.item.locationTo?.id,
//       });
//     }
//   }, [props.item, props.item?.date]);

//   useEffect(() => {
//     dispatch(loadBusinessLocationsRequested());
//   }, [dispatch]);

//   const cancelForm = () => {
//     console.log('STOCKTRANSFER');
//     navigation(STOCKTRANSFER);
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     console.log(name, value, 'sssss');

//     setFormData((prevBody: any) => ({
//       ...prevBody,
//       [name]: value,
//     }));
//   };
//   const handleLocationToIdChange = (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const selectedValue = e.target.value;
//     console.log('selectedValue');
//     setFormData((prevBody: any) => ({
//       ...prevBody,
//       locationToId: selectedValue,
//     }));
//   };

//   const handleStockTransferStatusChange = (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setFormData((prevBody: any) => ({
//       ...prevBody,
//       stockTransferStatus: e.target.value,
//     }));
//   };
//   const handleSelectProduct = (value: any) => {
//     setFormData((prevBody: any) => {
//       const existingProductIndex = (
//         prevBody.stockTransferProducts || []
//       ).findIndex(
//         (product: any) => product.productVariableId === value?.target?.value?.id
//       );

//       if (existingProductIndex !== -1) {
//         // Increase the quantity of the existing product
//         const updatedProducts = [...prevBody.stockTransferProducts];
//         updatedProducts[existingProductIndex] = {
//           ...updatedProducts[existingProductIndex],
//           quantity: updatedProducts[existingProductIndex].quantity + 1,
//         };
//         return {
//           ...prevBody,
//           stockTransferProducts: updatedProducts,
//         };
//       } else {
//         // Add a new product if it doesn't exist
//         return {
//           ...prevBody,
//           stockTransferProducts: [
//             ...(prevBody.stockTransferProducts || []),
//             {
//               productVariableId: value?.target?.value?.id,
//               productName: value?.target?.name,
//               unitPrice: value?.target?.value?.price,
//               quantity: 1,
//             },
//           ],
//         };
//       }
//     });
//   };

//   const handleStockTransferProductsChange = (e: any, index: any) => {
//     const { name, value } = e.target;
//     const updatedProducts = [...formData?.stockTransferProducts];
//     updatedProducts[index] = { ...updatedProducts[index], [name]: value };
//     setFormData({ ...formData, stockTransferProducts: updatedProducts });
//   };

//   const removeProductRequest = (index: number) => {
//     const updatedStockTransferProducts = formData.stockTransferProducts.filter(
//       (_: any, i: number) => i !== index
//     );
//     setFormData({
//       ...formData,
//       stockTransferProducts: updatedStockTransferProducts,
//     });
//   };

//   const calculateTotalPrice = (data: any) => {
//     const totalPrice = data.stockTransferProducts
//       ? data.stockTransferProducts.reduce(
//           (acc: any, product: any) =>
//             acc + (product.unitPrice || 0) * (product.quantity || 0),
//           0
//         )
//       : 0;
//     return totalPrice;
//   };

//   if (businessLocationLoading) {
//     return <div></div>;
//   }

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         props.onSubmit(formData, null);
//       }}
//       className="flex flex-col gap-4"
//     >
//       {/* <div className="rounded-md bg-white p-8 grid grid-cols-2 gap-6 shadow-sm">
//         <DatePicker
//           name="date"
//           values={formData?.date}
//           defaultValue={formData?.date}
//           onChange={handleInputChange}
//           placeholder="Date"
//           label="Date : "
//           className={
//             'flex items-center appearance-none w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]'
//           }
//         />

//         <div className="py-1 rounded-md text-xs flex-1">
//           <label className="block mb-3 text-sm font-medium text-gray-700 text-nowrap">
//             Location (To):
//           </label>
//           <select
//             name="locationToId"
//             value={formData?.locationToId || ''}
//             // onChange={handleInputChange}
//             onChange={handleLocationToIdChange}
//             required
//             className="block w-full p-2 border border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
//           >
//             <option value="" disabled>
//               Select a location
//             </option>
//             {businessLocations
//               ? businessLocations?.map((business: any) => (
//                   <option key={business?.id} value={business?.id}>
//                     {business?.businessName}
//                   </option>
//                 ))
//               : []}
//           </select>
//         </div>
//         {!props.item && (
//           <div className="py-1 rounded-md text-xs flex-1 mb-10">
//             <label className="block mb-3 text-sm font-medium text-gray-700">
//               Stock Transfer Status:
//             </label>
//             <select
//               name="stockTransferStatus"
//               value={formData.stockTransferStatus || ''}
//               onChange={handleStockTransferStatusChange}
//               className="block w-full px-2 py-2 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
//             >
//               <option value="COMPLETED">Completed</option>
//               <option value="PENDING">Pending</option>
//               <option value="IN_TRANSIT">In Transit</option>
//               <option value="CANCELLED">Cancelled</option>
//             </select>
//           </div>
//         )}
//       </div> */}

//       <div className="rounded-md bg-white p-8 grid grid-cols-3 gap-6 shadow-sm">
//         <div className="flex flex-col">
//           <label className="block text-sm font-medium text-gray-700">
//             Date :
//           </label>
//           <DatePicker
//             name="date"
//             value={formData?.date}
//             onChange={handleInputChange}
//             placeholder="Select Date"
//             className="w-full px-2 py-2 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Location (To) :
//           </label>
//           <select
//             name="locationToId"
//             value={formData?.locationToId || ''}
//             onChange={handleLocationToIdChange}
//             required
//             className="w-full px-2 py-2 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
//           >
//             <option value="" disabled>
//               Select a location :
//             </option>
//             {businessLocations?.map((business: any) => (
//               <option key={business?.id} value={business?.id}>
//                 {business?.businessName}
//               </option>
//             ))}
//           </select>
//         </div>

//         {!props.item && (
//           <div className="flex flex-col">
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Stock Transfer Status
//             </label>
//             <select
//               name="stockTransferStatus"
//               value={formData.stockTransferStatus || ''}
//               onChange={handleStockTransferStatusChange}
//               className="w-full px-2 py-2 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
//             >
//               <option value="COMPLETED">Completed</option>
//               <option value="PENDING">Pending</option>
//               <option value="IN_TRANSIT">In Transit</option>
//               <option value="CANCELLED">Cancelled</option>
//             </select>
//           </div>
//         )}
//       </div>

//       <div className="rounded-md bg-white p-8 flex flex-col gap-6 shadow-sm">
//         <div className="w-3/4 self-center">
//           <SearchDropDown
//             // name="warrantyId"
//             value={
//               formData?.stockTransferProducts
//                 ? formData?.stockTransferProducts.map(
//                     (val: any) => val.productVariableId
//                   )
//                 : []
//             }
//             optionsFromAPI={
//               allProductVariableResponses
//                 ? allProductVariableResponses?.map((product: any) => ({
//                     name: product?.name,
//                     value: { id: product?.id, price: product?.sellingPrice },
//                   }))
//                 : []
//             }
//             inputOnChange={(value) => {
//               dispatch(productSearch(value));
//             }}
//             onChange={(e) => handleSelectProduct(e)}
//             placeholder="Search product for stock transfer"
//           />
//         </div>
//         <div className="overflow-hidden rounded-md w-3/4 self-center">
//           <table className="min-w-full leading-normal rounded-lg">
//             <thead className="rounded-lg">
//               <tr>
//                 <th className="w-10 border-r p-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   #
//                 </th>
//                 <th className="w-52 border-r px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Product Name
//                 </th>
//                 <th className="w-52 border-r px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Quantity
//                 </th>
//                 <th className="px-5 border-r py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Unit Price
//                 </th>
//                 <th className="px-5 border-r py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Subtotal
//                 </th>

//                 <th className="px-5 py-3 border-b-2 w-20 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   <MdDeleteForever size={25} />
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {formData?.stockTransferProducts
//                 ? formData?.stockTransferProducts.map(
//                     (product: any, index: number) => (
//                       <tr key={index}>
//                         <td className="p-3 border-r border-b border-gray-200 bg-white text-sm justify-center flex-1 h-full">
//                           {index + 1}
//                         </td>
//                         <td className="p-3 border-r border-b border-gray-200 bg-white text-sm justify-center flex-1 h-full">
//                           {product?.productName}
//                         </td>
//                         <td className="p-3 border-r border-b border-gray-200 bg-white text-sm justify-center flex-1 h-full">
//                           <Input
//                             name="quantity"
//                             value={product?.quantity}
//                             onChange={(e: any) =>
//                               handleStockTransferProductsChange(e, index)
//                             }
//                             placeholder="Unit Cost"
//                             type="number"
//                             className="w-full text-sm h-10 border border-solid  px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
//                           />
//                         </td>
//                         <td className="p-3 border-r border-b border-gray-200 bg-white text-sm justify-center flex-1 h-full">
//                           {product?.unitPrice}
//                         </td>
//                         <td className="p-3 border-r border-b border-gray-200 bg-white text-sm justify-center flex-1 h-full">
//                           {product?.quantity * product?.unitPrice}
//                         </td>
//                         <td className="p-3 border-r border-b border-gray-200 bg-white text-sm text-center items-center flex-1 h-full cursor-pointer">
//                           <MdDeleteForever
//                             size={25}
//                             color="red"
//                             onClick={() => {
//                               setSelectedIndex(index);
//                               setIsModalVisible(true);
//                             }}
//                           />
//                         </td>
//                       </tr>
//                     )
//                   )
//                 : []}
//               <tr>
//                 <td className="p-3 border-r border-b border-gray-200 bg-white text-sm justify-center flex-1 h-full"></td>
//                 <td className="p-3 border-r border-b border-gray-200 bg-white text-sm justify-center flex-1 h-full"></td>
//                 <td className="p-3 border-r border-b border-gray-200 bg-white text-sm justify-center flex-1 h-full"></td>
//                 <td className="p-3 border-r border-b border-gray-200 bg-white text-sm justify-center flex-1 h-full"></td>
//                 <td className="p-3 border-r border-b border-gray-200 bg-white text-sm justify-center flex-1 h-full">
//                   <div className="flex flex-row self-end justify-end">
//                     <p className="font-medium">Total :</p>
//                     <p className="ml-5 text-right">
//                       {calculateTotalPrice(formData).toFixed(2)}
//                     </p>
//                   </div>
//                 </td>
//                 <td className="p-3 border-r border-b border-gray-200 bg-white text-sm text-center items-center flex-1 h-full cursor-pointer"></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="rounded-md bg-white p-8 grid grid-cols-3 gap-6 shadow-sm">
//         <Input
//           name="shippingChargeAmount"
//           value={formData?.shippingChargeAmount}
//           onChange={handleInputChange}
//           defaultValue={formData?.shippingChargeAmount}
//           placeholder="Enter Shipping Charges"
//           label="Shipping Charges :"
//           className={
//             'flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]'
//           }
//           type="number"
//           // required
//         />
//         <TextArea
//           name="additionalNotes"
//           value={formData?.additionalNotes}
//           defaultValue={formData?.additionalNotes}
//           onChange={handleInputChange}
//           placeholder="Enter Additional Notes"
//           label="Additional Notes :"
//           className={
//             'flex items-center w-full px-2 h-40 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] no-scrollbar'
//           }
//           // required
//         />
//         <div className="flex flex-row self-end justify-end">
//           <p className="font-medium">Total Amount:</p>
//           <p className="ml-5 text-right">
//             {calculateTotalPrice(formData) +
//               (parseInt(formData?.shippingChargeAmount) ?? 0)}
//           </p>
//         </div>
//       </div>

//       <div className="flex justify-end gap-8 p-2">
//         <Button
//           name="Cancel"
//           onClick={() => {
//             navigation(STOCKTRANSFER);
//             window.location.reload();
//           }}
//           className="text-xs text-black bg-white-400 border-[1px] text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
//         />

//       <Button
//           name={props.item ? 'Update ' : 'Save'}
//           type={'submit'}
//           className="text-xs text-white bg-primary text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
//         />
//       </div>
//       {/* <Button
//         // name={"Save"}
//         name={props.item ? 'Update ' : 'Save'}
//         className={
//           'text-sm hover:shadow-md hover:shadow-primary transition-all self-end h-full text-nowrap text-white bg-primary text-center font-[500] py-2 px-4 rounded-md cursor-pointer'
//         }
//         type={'submit'}
//       /> */}

//       <Modal
//         isOpen={isModalVisible}
//         setISOpen={setIsModalVisible}
//         // title="Create Brand"
//         content={
//           <div className="flex flex-col gap-5 p-5 items-center">
//             <Warning className="h-24 w-24" />
//             <h1 className="font-semibold text-lg">
//               Are you sure you want to remove?
//             </h1>
//             <div className="flex flex-row gap-5">
//               <Button
//                 onClick={() => {
//                   if (selectedIndex !== null) {
//                     removeProductRequest(selectedIndex);
//                     setSelectedIndex(null);
//                   }
//                   setIsModalVisible(false);
//                 }}
//                 name={'Delete'}
//                 className={
//                   'text-sm hover:shadow-md hover:shadow-red-300 transition-all self-end h-full text-nowrap text-white bg-red-500 text-center font-[500] py-2 px-4 rounded-md cursor-pointer'
//                 }
//               />
//               <Button
//                 onClick={() => setIsModalVisible(false)}
//                 name={'Cancel'}
//                 className={
//                   'text-sm hover:shadow-md transition-all self-end h-full text-nowrap text-white bg-gray-300 text-center font-[500] py-2 px-4 rounded-md cursor-pointer'
//                 }
//               />
//             </div>
//           </div>
//         }
//       />
//     </form>
//   );
// }

// export default Form;

import React, { useEffect } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/reducer';
import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';
import Input from 'pages/Products/Form/components/input';
import TextArea from 'pages/Products/Form/components/TextArea';
import { MdDeleteForever } from 'react-icons/md';
import { Button, Modal } from 'components';
import DatePicker from 'pages/Products/Form/components/DatePicker';
import { loadBusinessLocationsRequested, productSearch } from 'features';
import Warning from 'assets/images/svg/Warning/Warning';
import { STOCKTRANSFER } from 'constants/routes';

interface StockTransferProduct {
  productVariableId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
}

interface StockTransferFormValues {
  date: string;
  locationToId: number | string;
  stockTransferProducts: StockTransferProduct[];
  shippingChargeAmount: number;
  additionalNotes: string;
  stockTransferStatus: string;
}

interface IFormProps {
  onSubmit: (values: StockTransferFormValues, actions: any) => void;
  item?: Partial<StockTransferFormValues>;
}

const StockTransferForm: React.FC<IFormProps> = ({ onSubmit, item }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const { businessLocations } = useSelector(
    (state: RootState) => state.businessLocation
  );
  const { searchedProduct } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(loadBusinessLocationsRequested());
  }, [dispatch]);

  const allProductVariableResponses = searchedProduct?.flatMap(
    (product: any) => product?.productVariableResponses || []
  );
  const validationSchema = Yup.object().shape({
    date: Yup.date().required('Date is required'),
    locationToId: Yup.number().required('Destination location is required'),
    stockTransferProducts: Yup.array()
      .of(
        Yup.object().shape({
          productVariableId: Yup.number().required('Product is required'),
          quantity: Yup.number()
            .positive('Quantity must be positive')
            .required('Quantity is required'),
          unitPrice: Yup.number()
            .positive('Unit price must be positive')
            .required('Unit price is required'),
        })
      )
      .min(1, 'At least one product is required'),
    stockTransferStatus: Yup.string()
      .oneOf(
        ['COMPLETED', 'PENDING', 'IN_TRANSIT', 'CANCELLED'],
        'Invalid stock transfer status'
      )
      .required('Stock transfer status is required'),
  });

  const initialValues: StockTransferFormValues = {
    date: item?.date || '',
    locationToId: item?.locationToId || '',
    stockTransferProducts: item?.stockTransferProducts || [],
    shippingChargeAmount: item?.shippingChargeAmount || 0,
    additionalNotes: item?.additionalNotes || '',
    stockTransferStatus: item?.stockTransferStatus || 'COMPLETED',
  };

  const calculateTotalPrice = (values: StockTransferFormValues) => {
    return values.stockTransferProducts.reduce(
      (acc, product) => acc + product.unitPrice * product.quantity,
      0
    );
  };

  const calculateTotalAmount = (values: StockTransferFormValues) => {
    const productTotal = calculateTotalPrice(values);
    return productTotal + (values.shippingChargeAmount || 0);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        onSubmit(values, actions);
        actions.setSubmitting(false);
      }}
    >
      {({
        values,
        setFieldValue,
        handleChange,
        handleSubmit,
        errors,
        touched,
      }) => (
        <FormikForm onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Date, Location, and Status Section */}
          <div className="rounded-md bg-white p-8 grid grid-cols-3 gap-6 shadow-sm">
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Date :
              </label>
              <Field
                name="date"
                as={DatePicker}
                className="w-full px-2 py-2 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
              />
              <ErrorMessage
                name="date"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Location (To) :
              </label>
              <Field
                name="locationToId"
                as="select"
                className="w-full px-2 py-2 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
              >
                <option value="" disabled>
                  Select a location
                </option>
                {businessLocations?.map((business: any) => (
                  <option key={business?.id} value={business?.id}>
                    {business?.businessName}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="locationToId"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {!item && (
              <div className="flex flex-col">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Stock Transfer Status
                </label>
                <Field
                  name="stockTransferStatus"
                  as="select"
                  className="w-full px-2 py-2 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                >
                  <option value="COMPLETED">Completed</option>
                  <option value="PENDING">Pending</option>
                  <option value="IN_TRANSIT">In Transit</option>
                  <option value="CANCELLED">Cancelled</option>
                </Field>
                <ErrorMessage
                  name="stockTransferStatus"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            )}
          </div>

          {/* Product Selection Section */}
          <div className="rounded-md bg-white p-8 flex flex-col gap-6 shadow-sm">
            <div className="w-3/4 self-center">
              <SearchDropDown
                value={values.stockTransferProducts.map(
                  (val) => val.productVariableId
                )}
                optionsFromAPI={
                  allProductVariableResponses?.map((product: any) => ({
                    name: product?.name,
                    value: {
                      id: product?.id,
                      price: product?.sellingPrice,
                    },
                  })) || []
                }
                inputOnChange={(value) => {
                  dispatch(productSearch(value));
                }}
                onChange={(e) => {
                  const selectedProduct = e?.target?.value;
                  if (selectedProduct) {
                    const existingProductIndex =
                      values.stockTransferProducts.findIndex(
                        (product) =>
                          product.productVariableId === selectedProduct.id
                      );

                    if (existingProductIndex !== -1) {
                      const updatedProducts = [...values.stockTransferProducts];
                      updatedProducts[existingProductIndex] = {
                        ...updatedProducts[existingProductIndex],
                        quantity:
                          updatedProducts[existingProductIndex].quantity + 1,
                      };
                      setFieldValue('stockTransferProducts', updatedProducts);
                    } else {
                      setFieldValue('stockTransferProducts', [
                        ...values.stockTransferProducts,
                        {
                          productVariableId: selectedProduct.id,
                          productName: selectedProduct.name,
                          unitPrice: selectedProduct.price,
                          quantity: 1,
                        },
                      ]);
                    }
                  }
                }}
                placeholder="Search product for stock transfer"
              />
              <ErrorMessage
                name="stockTransferProducts"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Product Table */}
            <div className="overflow-hidden rounded-md w-3/4 self-center">
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
                  {values.stockTransferProducts.map((product, index) => (
                    <tr key={product.productVariableId}>
                      <td className="p-3 border-r border-b border-gray-200 bg-white text-sm justify-center flex-1 h-full">
                        {index + 1}
                      </td>
                      <td className="p-3 border-r border-b border-gray-200 bg-white text-sm justify-center flex-1 h-full">
                        {product.productName}
                      </td>
                      <td className="p-3 border-r border-b border-gray-200 bg-white text-sm justify-center flex-1 h-full">
                        <div>
                          <Field
                            name={`stockTransferProducts.${index}.quantity`}
                            type="number"
                            min="1"
                            className="w-full text-sm h-10 border border-solid px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                          />
                          <ErrorMessage
                            name={`stockTransferProducts.${index}.quantity`}
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>
                      </td>
                      <td className="p-3 border-r border-b border-gray-200 bg-white text-sm justify-center flex-1 h-full">
                        {product.unitPrice.toFixed(2)}
                      </td>
                      <td className="p-3 border-r border-b border-gray-200 bg-white text-sm justify-center flex-1 h-full">
                        {(product.quantity * product.unitPrice).toFixed(2)}
                      </td>
                      <td className="p-3 border-r border-b border-gray-200 bg-white text-sm text-center items-center flex-1 h-full cursor-pointer">
                        <button
                          type="button"
                          onClick={() => {
                            const updatedProducts =
                              values.stockTransferProducts.filter(
                                (_, i) => i !== index
                              );
                            setFieldValue(
                              'stockTransferProducts',
                              updatedProducts
                            );
                          }}
                        >
                          <MdDeleteForever size={25} color="red" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td
                      colSpan={4}
                      className="p-3 border-r border-b border-gray-200 bg-white text-sm text-right font-medium"
                    >
                      Total:
                    </td>
                    <td className="p-3 border-r border-b border-gray-200 bg-white text-sm font-medium">
                      {calculateTotalPrice(values).toFixed(2)}
                    </td>
                    <td className="p-3 border-r border-b border-gray-200 bg-white"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-md bg-white p-8 grid grid-cols-3 gap-6 shadow-sm">
            <div>
              <Field
                name="shippingChargeAmount"
                as={Input}
                placeholder="Enter Shipping Charges"
                label="Shipping Charges :"
                type="number"
                className="flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
              />
              <ErrorMessage
                name="shippingChargeAmount"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <Field
                name="additionalNotes"
                as={TextArea}
                placeholder="Enter Additional Notes"
                label="Additional Notes :"
                className="flex items-center w-full px-2 h-40 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] no-scrollbar"
              />
            </div>

            <div className="flex flex-row self-end justify-end">
              <p className="font-medium">Total Amount:</p>
              <p className="ml-5 text-right">
                {calculateTotalAmount(values).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-8 p-2">
            <Button
              type="button"
              name="Cancel"
              onClick={() => navigation(STOCKTRANSFER)}
              className="text-xs text-black bg-white-400 border-[1px] text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
            />

            <Button
              type="submit"
              name={item ? 'Update' : 'Save'}
              className="text-xs text-white bg-primary text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
            />
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};
export default StockTransferForm;
