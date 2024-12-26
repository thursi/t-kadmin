// import { Button, DataTable, Modal } from 'components';
// import React, { useEffect, useMemo, useState } from 'react';
// import CategoryTaxForm from './Create';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   loadCategoriesRequested,
//   loadFilterCategoriesTaxRequested,
//   loadTaxsRequested,
// } from 'features';
// import { RootState } from 'store/reducer';
// import Columns from 'hooks/CategoriesTax/Columns';
// import {
//   useArchiveCategoryTax,
//   useFilterCategoriesTax,
//   useStoreCategoryTax,
//   useUpdateCategoryTax,
// } from 'hooks/CategoriesTax';
// import FilterForm from './Filter';

// interface Filters {
//   taxId?: string;
//   categoryId?: string;
// }
// interface RequestState {
//   taxId?: string;
//   categoryId?: string;
//   pageSize: number;
//   pageCount: number;
// }
// const Index = () => {
//   const dispatch = useDispatch();
//   const [createModal, setCreateModal] = React.useState(false);
//   const [updateModal, setUpdateModal] = React.useState(false);
//   const [archiveModal, setArchiveModal] = React.useState(false);
//   const [item, setItem] = useState<any>({});
//   const [filterModal, setFilterModal] = React.useState(false);

//   const [request, setRequest] = useState<RequestState>({
//     taxId: undefined,
//     categoryId: undefined,
//     pageSize: 10,
//     pageCount: 1,
//   });

//   const {
//     filterCategoryTax,
//     categoriesTax,
//     catLoading,
//     createdCategoryTax,
//     updatedCategoryTax,
//     archivedCategoryTax,
//   } = useSelector((state: RootState) => state.categoryTax);

//   // useMemo(() => {
//   //   if (createdCategoryTax || updatedCategoryTax || archivedCategoryTax) {
//   //     setCreateModal(false);
//   //     setUpdateModal(false);
//   //     setArchiveModal(false);
//   //     dispatch(loadFilterCategoriesTaxRequested(request));
//   //   }
//   // }, [createdCategoryTax, updatedCategoryTax, archivedCategoryTax]);

//   const { onStore } = useStoreCategoryTax();
//   const { onUpdate } = useUpdateCategoryTax();
//   const { onArchive } = useArchiveCategoryTax();
//   const { onCategoriesTax } = useFilterCategoriesTax();

//   useEffect(() => {
//     dispatch(loadFilterCategoriesTaxRequested(request));
//   }, [dispatch]);

//   const toggleFilterModal = () => {
//     setFilterModal((prev) => !prev);
//   };

//   const handleFilter = (filters: Filters, pageNumber: any, pageSize: any) => {
//     const updatedRequest = {
//       ...request,
//       taxId: filters?.taxId?.taxId ?? request?.taxId,
//       categoryId: filters?.categoryId?.categoryId ?? request.categoryId,
//       pageCount: pageNumber,
//       pageSize: pageSize,
//     };

//     setRequest(updatedRequest);
//     console.log('objectthellipalai', updatedRequest);
//     dispatch(loadFilterCategoriesTaxRequested(updatedRequest));
//   };
//   return (
//     <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
//       <div className="font-bold text-xl">CategoriesTax</div>
//       <DataTable
//         actionMenu={{
//           view: {},
//           edit: {},
//           delete: {},
//         }}
//         columns={Columns}
//         data={filterCategoryTax}
//         createModal={setCreateModal}
//         loading={catLoading}
//         modalData={setItem}
//         editModal={setUpdateModal}
//         archiveModal={setArchiveModal}
//         toggleFilterModal={toggleFilterModal}
//         // dataItem={"Warranty"}
//         // content={
//         //   filterModal && (
//         //     <FilterForm
//         //       setModal={setFilterModal}
//         //       item={item}
//         //       filterModal={filterModal}
//         //       onSubmit={onCategoriesTax}
//         //       resetForm={() => setFilterModal(false)}
//         //     />
//         //   )
//         // }
//         handleFilter={(filters, pageNumber, pageSize) =>
//           handleFilter(
//             {
//               taxId: filters.taxId,
//               categoryId: filters.categoryId,
//             },
//             pageNumber,
//             pageSize
//           )
//         }
//         // filters={{unit: units}}
//       />
//       <Modal
//         isOpen={createModal}
//         setISOpen={setCreateModal}
//         title="Create Category Tax"
//         content={
//           <CategoryTaxForm onSubmit={onStore} setModal={setCreateModal} />
//         }
//       />
//       <Modal
//         isOpen={updateModal}
//         setISOpen={setUpdateModal}
//         title="Update Category Tax"
//         content={
//           <CategoryTaxForm
//             onSubmit={onUpdate}
//             setModal={setUpdateModal}
//             item={item}
//           />
//         }
//       />
//       <Modal
//         isOpen={archiveModal}
//         setISOpen={setArchiveModal}
//         title="Change Status?"
//         content={
//           <div className="flex flex-col justify-center  gap-4 p-5">
//             <div>
//               Do you really want to change the status of this categorytax?
//             </div>
//             <div className="flex justify-center gap-8 p-2">
//               <Button
//                 name="Yes"
//                 onClick={() => onArchive(item.id)}
//                 className={
//                   'text-xs text-white bg-primary text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer'
//                 }
//               />
//               <Button
//                 name="No"
//                 onClick={() => setArchiveModal(false)}
//                 className={
//                   'text-xs text-black bg-white border-[1px] text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer'
//                 }
//               />
//             </div>
//           </div>
//         }
//       />
//     </div>
//   );
// };

// export default Index;

import { Button, DataTable, Modal } from 'components';
import React, { useEffect, useState } from 'react';
import CategoryTaxForm from './Create';
import { useDispatch, useSelector } from 'react-redux';
import { loadFilterCategoriesTaxRequested } from 'features';
import { RootState } from 'store/reducer';
import Columns from 'hooks/CategoriesTax/Columns';
import {
  useArchiveCategoryTax,
  useStoreCategoryTax,
  useUpdateCategoryTax,
} from 'hooks/CategoriesTax';

interface Filters {
  taxId?: { taxId: string };
  categoryId?: { categoryId: string };
}

interface RequestState {
  taxId?: string;
  categoryId?: string;
  pageSize: number;
  pageCount: number;
}

const Index = () => {
  const dispatch = useDispatch();
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [archiveModal, setArchiveModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [item, setItem] = useState<any>({});

  const [request, setRequest] = useState<any>({
    taxId: undefined,
    categoryId: undefined,
    pageSize: 10,
    pageCount: 1,
  });

  const {
    filterCategoryTax,
    catLoading,
    createdCategoryTax,
    updatedCategoryTax,
    archivedCategoryTax,
  } = useSelector((state: RootState) => state.categoryTax);

  const { onStore } = useStoreCategoryTax();
  const { onUpdate } = useUpdateCategoryTax();
  const { onArchive } = useArchiveCategoryTax();

  useEffect(() => {
    dispatch(loadFilterCategoriesTaxRequested(request));
  }, [dispatch, request]);

  const toggleFilterModal = () => {
    setFilterModal((prev) => !prev);
  };

  const handleFilter = (
    filters: Filters,
    pageNumber: number,
    pageSize: number
  ) => {
    const updatedRequest = {
      ...request,
      taxId: filters?.taxId ?? request.taxId,
      categoryId: filters?.categoryId ?? request.categoryId,
      pageCount: pageNumber,
      pageSize: pageSize,
    };

    setRequest(updatedRequest);
    dispatch(loadFilterCategoriesTaxRequested(updatedRequest));
  };

  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Categories Tax</div>
      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}
        columns={Columns}
        data={filterCategoryTax}
        createModal={setCreateModal}
        loading={catLoading}
        modalData={setItem}
        editModal={setUpdateModal}
        archiveModal={setArchiveModal}
        toggleFilterModal={toggleFilterModal}
        handleFilter={(filters, pageNumber: any, pageSize: any) => {
          console.log('Filters from DataTable:', filters);
          handleFilter(filters, pageNumber, pageSize);
        }}

        // {
        // taxId: filters.taxId,
        // categoryId: filters.categoryId,

        // }, pageNumber, pageSize
      />
      <Modal
        isOpen={createModal}
        setISOpen={setCreateModal}
        title="Create Category Tax"
        content={
          <CategoryTaxForm onSubmit={onStore} setModal={setCreateModal} />
        }
      />
      <Modal
        isOpen={updateModal}
        setISOpen={setUpdateModal}
        title="Update Category Tax"
        content={
          <CategoryTaxForm
            onSubmit={onUpdate}
            setModal={setUpdateModal}
            item={item}
          />
        }
      />
      <Modal
        isOpen={archiveModal}
        setISOpen={setArchiveModal}
        title="Change Status?"
        content={
          <div className="flex flex-col justify-center gap-4 p-5">
            <div>
              Do you really want to change the status of this category tax?
            </div>
            <div className="flex justify-center gap-8 p-2">
              <Button
                name="Yes"
                onClick={() => onArchive(item.id)}
                className="text-xs text-white bg-primary text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
              />
              <Button
                name="No"
                onClick={() => setArchiveModal(false)}
                className="text-xs text-black bg-white border-[1px] text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Index;
