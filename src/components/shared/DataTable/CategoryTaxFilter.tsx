// import React, { useEffect } from 'react';
// import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from 'store/reducer';
// import { loadCategoriesRequested, loadTaxsRequested } from 'features';
// import { CloudHail } from 'lucide-react';

// interface ICategoryTaxFilterProps {
//   filters?: any;
//   handleFilter?: (categoryId?: any, taxId?: any) => void;
// }

// export default function CategoryTaxFilter(props: ICategoryTaxFilterProps) {
//   const dispatch = useDispatch();

//   const { categories } = useSelector(
//     (state: RootState) =>
//       state.category as { categories: { id: string; name: string }[] }
//   );

//   const { taxs } = useSelector(
//     (state: RootState) =>
//       state.tax as { taxs: { id: string; taxName: string }[] }
//   );

//   useEffect(() => {
//     dispatch(loadCategoriesRequested());
//     dispatch(loadTaxsRequested());
//   }, [dispatch]);

//   const defaultOption = { name: 'ALL', value: '' };
//   const categoryOptions = [
//     defaultOption,
//     ...(categories?.map((cat) => ({ name: cat.name, value: cat.id })) || []),
//   ];

//   const taxOptions = [
//     defaultOption,
//     ...(taxs?.map((tax) => ({ name: tax.taxName, value: tax.id })) || []),
//   ];

//   const updateFilters = (newFilter: {
//     categoryId?: string;
//     taxId?: string;
//   }) => {
//     const currentFilters = props.filters;
//     const updatedFilters = { ...currentFilters, ...newFilter };

// console.log("filtersToSendfiltersToSend",updatedFilters)
//     props.handleFilter?.(updatedFilters);
//   };

//   // const updateFilters = (newFilter: {
//   //   categoryId?: string;
//   //   taxId?: string;
//   // }) => {
//   //   console.log("taxId",newFilter.taxId)
//   //   const currentFilters = props.filters || {};
//   //   const updatedFilters = { ...currentFilters, ...newFilter };
//   //   console.log("updatedFiltersupdatedFilters",updatedFilters)
//   //   props.handleFilter?.(updatedFilters);
//   // };

//   return (
//     <div className="p-5">
//       <div className="flex gap-10">
//         {/* Category Filter */}
//         <div className="flex flex-col">
//           <SearchDropDown
//             name="categoryId"
//             options={categoryOptions}
//             onChange={(selectedOption) =>
//               updateFilters({ categoryId: selectedOption.target.value })
//             }
//             placeholder="Select Category"
//             label="Category"
//           />
//         </div>

//         {/* Tax Filter */}
//         <div className="flex flex-col">
//           <SearchDropDown
//             name="taxId"
//             options={taxOptions}
//             onChange={(selectedOption) =>
//               updateFilters({ taxId: selectedOption.target.value })
//             }
//             placeholder="Select Tax"
//             label="Tax"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect } from 'react';
// import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from 'store/reducer';
// import { loadCategoriesRequested, loadTaxsRequested } from 'features';

// interface ICategoryTaxFilterProps {
//   handleFilter?: (filters: { categoryId?: string; taxId?: string }) => void;
// }

// export default function CategoryTaxFilter(props: ICategoryTaxFilterProps) {
//   const dispatch = useDispatch();

//   const { categories } = useSelector(
//     (state: RootState) =>
//       state.category as { categories: { id: string; name: string }[] }
//   );

//   const { taxs } = useSelector(
//     (state: RootState) =>
//       state.tax as { taxs: { id: string; taxName: string }[] }
//   );

//   useEffect(() => {
//     dispatch(loadCategoriesRequested());
//     dispatch(loadTaxsRequested());
//   }, [dispatch]);

//   const defaultOption = { name: 'ALL', value: '' };
//   const categoryOptions = [
//     defaultOption,
//     ...(categories?.map((cat) => ({ name: cat.name, value: cat.id })) || []),
//   ];

//   const taxOptions = [
//     defaultOption,
//     ...(taxs?.map((tax) => ({ name: tax.taxName, value: tax.id })) || []),
//   ];

//   const updateFilters = (newFilter: {
//     categoryId?: string;
//     taxId?: string;
//   }) => {
//     const updatedFilters = { ...props.filters, ...newFilter };

//     // Ensure we send both categoryId and taxId when they are selected
//     const filtersToSend = {
//       categoryId: updatedFilters.categoryId || undefined,
//       taxId: updatedFilters.taxId || undefined,
//     };

//     // If both categoryId and taxId are defined, send both
//     if (filtersToSend.categoryId && filtersToSend.taxId) {
//       props.handleFilter?.(filtersToSend);
//     } else {
//       // If only one of them is selected, send it
//       props.handleFilter?.(filtersToSend);
//     }
//   };

//   return (
// <div className="p-5">
//   <div className="flex gap-10">
//     {/* Category Filter */}
//     <div className="flex flex-col">
//       <SearchDropDown
//         name="categoryId"
//         options={categoryOptions}
//         onChange={(selectedOption) =>
//           updateFilters({
//             ...props.filters, // Spread the existing filters
//             categoryId: selectedOption.target.value, // Set the selected category
//           })
//         }
//         placeholder="Select Category"
//         label="Category"
//       />
//     </div>

//     {/* Tax Filter */}
//     <div className="flex flex-col">
//       <SearchDropDown
//         name="taxId"
//         options={taxOptions}
//         onChange={(selectedOption) =>
//           updateFilters({
//             ...props.filters, // Spread the existing filters
//             taxId: selectedOption.target.value, // Set the selected tax
//           })
//         }
//         placeholder="Select Tax"
//         label="Tax"
//       />
//     </div>
//   </div>
// </div>

//   );
// }

// import React, { useEffect } from 'react';
// import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from 'store/reducer';
// import { loadCategoriesRequested, loadTaxsRequested } from 'features';

// interface ICategoryTaxFilterProps {
//   handleFilter?: (filter: { categoryId?: string; taxId?: string }) => void;
//   filters?: { categoryId?: string; taxId?: string };
// }

// export default function CategoryTaxFilter(props: ICategoryTaxFilterProps) {
//   const dispatch = useDispatch();

//   const { categories } = useSelector(
//     (state: RootState) =>
//       state.category as { categories: { id: string; name: string }[] }
//   );

//   const { taxs } = useSelector(
//     (state: RootState) =>
//       state.tax as { taxs: { id: string; taxName: string }[] }
//   );

//   useEffect(() => {
//     dispatch(loadCategoriesRequested());
//     dispatch(loadTaxsRequested());
//   }, [dispatch]);

//   const defaultOption = { name: 'All', value: '' };
//   const categoryOptions = [
//     defaultOption,
//     ...(categories?.map((cat) => ({ name: cat.name, value: cat.id })) || []),
//   ];

//   const taxOptions = [
//     defaultOption,
//     ...(taxs?.map((tax) => ({ name: tax.taxName, value: tax.id })) || []),
//   ];

//   const updateFilters = (newFilter: { categoryId?: string; taxId?: string }) => {
//     const updatedFilters = { ...props.filters, ...newFilter };

// console.log("updatedFilters",updatedFilters)
//     props.handleFilter?.(updatedFilters);
//   };

//   return (
//     <div className="p-5">
//       <div className="flex flex-wrap gap-10">
//         {/* Category Filter */}
//         <div className="flex flex-col">
//           <SearchDropDown
//             name="categoryId"
//             options={categoryOptions}
//             onChange={(selectedOption) =>
//               updateFilters({
//                 ...props.filters,
//                 categoryId: selectedOption.target.value,
//               })
//             }
//             placeholder="Select Category"
//             label="Category"
//           />
//         </div>

//         {/* Tax Filter */}
//         <div className="flex flex-col">
//           <SearchDropDown
//             name="taxId"
//             options={taxOptions}
//             onChange={(selectedOption) =>
//               updateFilters({
//                 ...props.filters,
//                 taxId: selectedOption.target.value,
//               })
//             }
//             placeholder="Select Tax"
//             label="Tax"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from 'react';
import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import { loadCategoriesRequested, loadTaxsRequested } from 'features';

interface ICategoryTaxFilterProps {
  handleFilter?: (filter: { categoryId?: string; taxId?: string }) => void;
}

export default function CategoryTaxFilter(props: ICategoryTaxFilterProps) {
  const dispatch = useDispatch();

  const [selectedFilters, setSelectedFilters] = useState<{
    categoryId?: string;
    taxId?: string;
  }>({
    categoryId: '',
    taxId: '',
  });

  const { categories } = useSelector(
    (state: RootState) =>
      state.category as { categories: { id: string; name: string }[] }
  );

  const { taxs } = useSelector(
    (state: RootState) =>
      state.tax as { taxs: { id: string; taxName: string }[] }
  );

  useEffect(() => {
    dispatch(loadCategoriesRequested());
    dispatch(loadTaxsRequested());
  }, [dispatch]);

  const defaultOption = { name: 'All', value: '' };
  const categoryOptions = [
    defaultOption,
    ...(categories?.map((cat) => ({ name: cat.name, value: cat.id })) || []),
  ];

  const taxOptions = [
    defaultOption,
    ...(taxs?.map((tax) => ({ name: tax.taxName, value: tax.id })) || []),
  ];

  // Update filters and save to local state
  const updateFilters = (newFilter: {
    categoryId?: string;
    taxId?: string;
  }) => {
    const updatedFilters = { ...selectedFilters, ...newFilter };
    setSelectedFilters(updatedFilters);

    if (updatedFilters.taxId) {
      props.handleFilter?.(updatedFilters);
    }

    if (updatedFilters.categoryId) {
      props.handleFilter?.(updatedFilters);
    }

    if (updatedFilters.categoryId && updatedFilters.taxId) {
      props.handleFilter?.(updatedFilters);
    }

    console.log('updatedFilters', updatedFilters);
  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-10">
        <div className="flex flex-col">
          <SearchDropDown
            name="categoryId"
            options={categoryOptions}
            onChange={(selectedOption) =>
              updateFilters({
                categoryId: selectedOption.target.value,
              })
            }
            placeholder="Select Category"
            label="Category"
          />
        </div>

        <div className="flex flex-col">
          <SearchDropDown
            name="taxId"
            options={taxOptions}
            onChange={(selectedOption) =>
              updateFilters({
                taxId: selectedOption.target.value,
              })
            }
            placeholder="Select Tax"
            label="Tax"
          />
        </div>
      </div>
    </div>
  );
}
