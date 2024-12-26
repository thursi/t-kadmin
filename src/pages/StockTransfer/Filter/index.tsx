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
//   stockTransferStatus: string;
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

export default function FilterStockTransferForm(props: IFilterFormProps) {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState<{
    stockTransferStatus?: string;
    date?: string;
  }>({
    stockTransferStatus: '',
    date: '',
  });


  const isActiveOptions = [
    { name: 'All', label: 'Choose an option...', value: ' ' },
    { name: 'inTransit', label: 'In Transit', value: 'IN_TRANSIT' },
    { name: 'completed', label: 'Completed', value: 'COMPLETED' },
  ];


  const handleFilterChange = (name: string, value: any) => {
    const newFilter = { [name]: value };
    setSelectedFilters((prev) => ({ ...prev, ...newFilter }));

    if (newFilter.date) {
         props.handleFilter?.(newFilter);
    }

    if (newFilter.stockTransferStatus) {
         props.handleFilter?.(newFilter);
    }

    if (newFilter.stockTransferStatus && newFilter.date) {
         props.handleFilter?.(newFilter);
    }

  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-10">

        {/* Stock Transfer Status */}
        <div className="flex flex-col">
          <SearchDropDown
            name="stockTransferStatus"
            options={isActiveOptions}
            onChange={(e) => handleFilterChange('stockTransferStatus', e.target.value)}
            placeholder="Select Status"
            label="Stock Transfer Status:"
          />
        </div>


        <div className="flex flex-col">
          <label className="mb-0">Date:</label>
          <input
            type="date"
            name="date"
            className="border rounded text-sm"
            onChange={(e) => handleFilterChange('date', e.target.value)}
          />
        </div>

      </div>
    </div>
  );
}
