// import React from 'react';
// import { withFormik, FormikProps } from 'formik';
// import { object, string } from 'yup';

// export interface IFilterFormProps {
//   resetForm(): any;
//   onSubmit: (values: any, actions: any) => any;
//   item?: any;
//   setModal?: (isOpen: boolean) => void;
//   filterModal: boolean;
// }

// interface FormikValues {
//   discountType: string;
//   purchaseStatus: string;
//   purchaseDate: string;
// }

// function FilterForm(props: FormikProps<FormikValues> & IFilterFormProps) {
//   const cancelForm = async () => {
//     props.setModal?.(false);
//   };

//   const handleFilterChange = (
//     e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
//   ) => {
//     const { name, value } = e.target;
//     props.setFieldValue(name, value);
//     const actions = {
//       setSubmitting: (isSubmitting: boolean) => {},
//     };

//     props.onSubmit({ ...props.values, [name]: value }, actions);
//   };

//   return (
//     <div
//       style={{
//         right: props.filterModal ? '0' : '-300px',
//       }}
//     >
//       <form onSubmit={props.handleSubmit} className="p-4">
//         <div className="flex space-x-14">
//           <div className="py-1 rounded-md text-xs flex-1">
//             <label className="block mb-3 text-sm font-medium text-gray-700 text-nowrap">
//               Discount Type:
//             </label>
//             <select
//               name="discountType"
//               value={props.values.discountType || ''}
//               onChange={handleFilterChange}
//               onBlur={props.handleBlur}
//               className="block w-auto px-2 h-10 py-2 border text-xs border-[#b0afb3] focus:outline-none rounded-md"
//             >
//               <option value="" disabled>
//                 Choose a discount type...
//               </option>
//               <option value="FIXED">Fixed</option>
//               <option value="PERCENTAGE">Percentage</option>
//             </select>
//             {props.touched.discountType && props.errors.discountType ? (
//               <div className="text-red-600 text-xs mt-1">
//                 {props.errors.discountType}
//               </div>
//             ) : null}
//           </div>

//           <div className="py-1 rounded-md text-xs flex-1">
//             <label className="block mb-3 text-sm font-medium text-gray-700 text-nowrap">
//               Purchase Status:
//             </label>
//             <select
//               name="purchaseStatus"
//               value={props.values.purchaseStatus || ''}
//               onChange={handleFilterChange}
//               onBlur={props.handleBlur}
//               className="block w-auto px-2 h-10 py-2 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
//             >
//               <option value="" disabled>
//                 Choose a purchase status...
//               </option>
//               <option value="ORDERED">Ordered</option>
//               <option value="PENDING">Pending</option>
//               <option value="RECEIVED">Received</option>
//             </select>
//             {props.touched.purchaseStatus && props.errors.purchaseStatus ? (
//               <div className="text-red-600 text-xs mt-1">
//                 {props.errors.purchaseStatus}
//               </div>
//             ) : null}
//           </div>

//           <div className="py-1 rounded-md text-xs flex-1">
//             <label className="block mb-3 text-sm font-medium text-gray-700 text-nowrap">
//               Purchase Date:
//             </label>
//             <input
//               type="date"
//               name="purchaseDate"
//               value={props.values.purchaseDate || ''}
//               onChange={handleFilterChange}
//               onBlur={props.handleBlur}
//               className="block w-auto px-2 h-10 py-2 border text-xs border-[#b0afb3] focus:outline-none rounded-md"
//             />
//             {props.touched.purchaseDate && props.errors.purchaseDate ? (
//               <div className="text-red-600 text-xs mt-1">
//                 {props.errors.purchaseDate}
//               </div>
//             ) : null}
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default withFormik<IFilterFormProps, FormikValues>({
//   validationSchema: object().shape({
//     discountType: string().required('Please select a discount type.'),
//     purchaseStatus: string().required('Please select a purchase status.'),
//     purchaseDate: string().required('Please select a purchase date.'),
//   }),
//   mapPropsToValues: ({ item }: IFilterFormProps) => ({
//     discountType: item?.discountType ?? '',
//     purchaseStatus: item?.purchaseStatus ?? '',
//     purchaseDate: item?.purchaseDate ?? '',
//   }),
//   handleSubmit: (values, { props, ...actions }) => {
//     props.onSubmit(values, actions);
//     actions.setSubmitting(false);
//     props.resetForm();
//   },
//   enableReinitialize: true,
// })(FilterForm);



// import React from 'react';
// import { withFormik, FormikProps } from 'formik';
// import { object, string } from 'yup';

// export interface IFilterFormProps {
//   resetForm(): any;
//   onSubmit: (values: any, actions: any) => any;
//   item?: any;
//   setModal?: (isOpen: boolean) => void;
//   filterModal: boolean;
// }

// interface FormikValues {
//   discountType: string;
//   date: string;
// }

// function FilterForm(props: FormikProps<FormikValues> & IFilterFormProps) {
//   const handleFilterChange = (
//     e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
//   ) => {
//     const { name, value } = e.target;

//     console.log('object', name, value);

//     props.setFieldValue(name, value);
//     const actions = {
//       setSubmitting: (isSubmitting: boolean) => {},
//     };

//     props.onSubmit({ ...props.values, [name]: value }, actions);
//   };

//   return (
//     <div
//       style={{
//         right: props.filterModal ? '0' : '-300px',
//       }}
//     >
//       <form onSubmit={props.handleSubmit} className="p-4">
//         <div className="flex space-x-14">
//           <div className="py-1 rounded-md text-xs flex-1">
//             <label className="block mb-3 text-sm font-medium text-gray-700 text-nowrap">
//               stockTransferStatus:
//             </label>
//             <select
//               name="stockTransferStatus"
//               value={props.values.stockTransferStatus || ''}
//               onChange={handleFilterChange}
//               onBlur={props.handleBlur}
//               className="block w-auto px-2 h-10 py-2 border text-xs border-[#b0afb3] focus:outline-none rounded-md"
//             >
//               <option value="" disabled>
//                 Choose a Stock Transfer Status...
//               </option>
//               <option value="COMPLETED">Completed</option>
//               <option value="PENDING">Pending</option>
//               <option value="IN_TRANSIT">In Transit</option>
//               <option value="CANCELLED">Cancelled</option>
//             </select>
//             {props.touched.stockTransferStatus &&
//             props.errors.stockTransferStatus ? (
//               <div className="text-red-600 text-xs mt-1">
//                 {props.errors.stockTransferStatus}
//               </div>
//             ) : null}
//           </div>

//           <div className="py-1 rounded-md text-xs flex-1">
//             <label className="block mb-3 text-sm font-medium text-gray-700 text-nowrap">
//               Date:
//             </label>
//             <input
//               type="date"
//               name="date"
//               value={props.values.date || ''}
//               onChange={handleFilterChange}
//               onBlur={props.handleBlur}
//               className="block w-auto px-2 h-10 py-2 border text-xs border-[#b0afb3] focus:outline-none rounded-md"
//             />
//             {props.touched.date && props.errors.date ? (
//               <div className="text-red-600 text-xs mt-1">
//                 {props.errors.date}
//               </div>
//             ) : null}
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default withFormik<IFilterFormProps, FormikValues>({
//   validationSchema: object().shape({
//     stockTransferStatus: string().required('Please select a purchase status.'),
//     date: string().required('Please select a purchase date.'),
//   }),
//   mapPropsToValues: ({ item }: IFilterFormProps) => ({
//     stockTransferStatus: item?.stockTransferStatus ?? '',
//     date: item?.date ?? '',
//   }),
//   handleSubmit: (values, { props, ...actions }) => {
//     props.onSubmit(values, actions);
//     actions.setSubmitting(false);
//     props.resetForm();
//   },
//   enableReinitialize: true,
// })(FilterForm);




import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';

import { RootState } from 'store/reducer';

interface IFilterFormProps {
  handleFilter?: (filter: Record<string, any>) => void;
}

export default function FilterPurchaseReturnForm(props: IFilterFormProps) {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState<{
    purchaseStatus?: string;
    discountType?: string;
    date?: string;
  }>({
    purchaseStatus: '',
    discountType: '',
    date: '',
  });


  const purchaseStatusOptions = [
    { name: 'All', label: 'Choose an option...', value: ' ' },
    { name: 'Ordered', label: 'Ordered', value: 'ORDERED' },
    { name: 'Pending', label: 'Pending', value: 'PENDING' },
    { name: 'Received', label: 'Received', value: 'RECEIVED' },

  ];

 

  
  const handleFilterChange = async (name: string, value: any) => {
    const newFilter = { [name]: value };
    setSelectedFilters((prev) => ({ ...prev, ...newFilter }));
    props.handleFilter?.(newFilter);
  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-10">
        <div className="flex flex-col">
          <SearchDropDown
            name="purchaseStatus"
            options={purchaseStatusOptions}
            onChange={(e) => handleFilterChange('purchaseStatus', e.target.value)}
            placeholder="Select Purchase Status"
            label=" Purchase Status:"
          />
        </div>




      </div>
    </div>
  );
}
