// import React from 'react';
// import { withFormik, FormikProps } from 'formik';
// import { object, boolean } from 'yup';

// export interface IFilterFormProps {
//   resetForm(): any;
//   onSubmit: (values: any, actions: any) => any;
//   item?: any;
//   setModal?: (isOpen: boolean) => void;
//   filterModal: boolean;
// }

// interface FormikValues {
//   isActive: boolean;
// }

// function FilterForm(props: FormikProps<FormikValues> & IFilterFormProps) {
//   const cancelForm = async () => {
//     props.setModal?.(false);
//     // props.resetForm();
//   };

//   const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const isActive = e.target.value === 'true';
//     props.setFieldValue('isActive', isActive);
//     const actions = {
//       setSubmitting: (isSubmitting: boolean) => {},
//     };

//     props.onSubmit({ isActive }, actions);
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
//             <label className="block mb-3 text-sm font-medium text-gray-700 ">
//               Allow Decimal:
//             </label>
//             <select
//               name="isActive"
//               value={
//                 props.values.isActive === undefined
//                   ? ''
//                   : props.values.isActive
//                   ? 'true'
//                   : 'false'
//               }
//               onChange={
//                 handleFilterChange
//                 // (e) => props.setFieldValue('isActive', e.target.value === 'true')
//               }
//               onBlur={props.handleBlur}
//               className="block w-full px-2 h-10 py-2 border text-xs border-[#b0afb3] focus:outline-none rounded-md"
//             >
//               <option value="" disabled>
//                 Choose an option...
//               </option>
//               <option value="true">True</option>
//               <option value="false">False</option>
//             </select>
//             {props.touched.isActive && props.errors.isActive ? (
//               <div className="text-red-600 text-xs mt-1">
//                 {props.errors.isActive}
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
//     isActive: boolean().required('Please select an option.'),
//   }),
//   mapPropsToValues: ({ item }: IFilterFormProps) => ({
//     isActive: item?.isActive ?? undefined,
//   }),
//   handleSubmit: (values, { props, ...actions }) => {
//     props.onSubmit(values, actions);
//     actions.setSubmitting(false);
//     props.resetForm();
//   },
//   enableReinitialize: true,
// })(FilterForm);

import React, { useState } from 'react';
import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';

interface ICategoryTaxFilterProps {
  handleFilter?: (filter: { isActive?: boolean }) => void;
}

export default function CategoryTaxFilter(props: ICategoryTaxFilterProps) {
  const [selectedFilters, setSelectedFilters] = useState<{
    isActive?: boolean;
  }>({
    isActive: undefined,
  });

  const isActiveOptions = [
    { name: 'All', label: 'Choose an option...', value: ' ' },
    { name: 'true', label: 'True', value: true },
    { name: 'false', label: 'False', value: false },
  ];

  // const updateFilters = (newFilter: { isActive?: boolean }) => {
  //   const updatedFilters = { ...selectedFilters, ...newFilter };
  //   setSelectedFilters(updatedFilters);

  //   // Ensure the filter is passed only if it's defined
  //   if (updatedFilters.isActive !== undefined) {
  //     props.handleFilter?.(updatedFilters);
  //   }

  //   console.log('Updated Filters:', updatedFilters);
  // };

  const selectedValue = isActiveOptions.find(
    (option) => option.value === selectedFilters.isActive
  )?.value;

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-10">
        <div className="flex flex-col">
          <SearchDropDown
            name="isActive"
            options={isActiveOptions}
            onChange={(selectedOption) => {
              console.log('Selected Option:', selectedOption.target.value);
              props.handleFilter?.({
                isActive: selectedOption.target.value,
              });
            }}
            value={selectedValue}
            placeholder="Choose an option..."
            label="Status :"
          />
        </div>
      </div>
    </div>
  );
}
