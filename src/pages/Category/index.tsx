import { Button, DataTable, Modal } from 'components';
import React, { useEffect, useMemo, useState } from 'react';
import CategoryForm from './Create';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategoryFilterRequested } from 'features';
import { RootState } from 'store/reducer';
import Columns from 'hooks/Categories/Columns';
import {
  useArchiveCategory,
  useStoreCategory,
  useUpdateCategory,
} from 'hooks/Categories';





interface Filters {
  featuredCategory?: { featuredCategory: string };
}
const Index = () => {
  const dispatch = useDispatch();
  const [createModal, setCreateModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [archiveModal, setArchiveModal] = React.useState(false);
  const [item, setItem] = useState<any>({});
  const [request, setRequest] = useState<any>({
    featuredCategory:undefined,
    pageSize: 10,
    pageCount: 1,
  });

  const {
    filterCategory,
    categories,
    catLoading,
    createdCategory,
    updatedCategory,
    archivedCategory,
  } = useSelector((state: RootState) => state.category);

  useMemo(() => {
    if (createdCategory || updatedCategory || archivedCategory) {
      setCreateModal(false);
      setUpdateModal(false);
      setArchiveModal(false);
      dispatch(loadCategoryFilterRequested(request));
    }
  }, [createdCategory, updatedCategory, archivedCategory]);

  const { onStore } = useStoreCategory();
  const { onUpdate } = useUpdateCategory();
  const { onArchive } = useArchiveCategory();

  useEffect(() => {
    dispatch(loadCategoryFilterRequested(request));
  }, [dispatch,request]);


  const handleFilter = (filters:Filters,pageNumber: number, pageSize: number) => {
    const updatedRequest = {
      ...request,
      featuredCategory: filters?.featuredCategory?.featuredCategory ?? request.featuredCategory,
      // categoryId: filters?.categoryId?.categoryId ?? request.categoryId,
      pageCount: pageNumber,
      pageSize: pageSize,
    };

    setRequest(updatedRequest);
    console.log("Updated Requestthis:", filters );
    dispatch(loadCategoryFilterRequested(updatedRequest));
  };
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Categories</div>
      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}
        columns={Columns}
        data={filterCategory}
        createModal={setCreateModal}
        loading={catLoading}
        modalData={setItem}
        editModal={setUpdateModal}
        archiveModal={setArchiveModal}
        // dataItem={"Category"}
        handleFilter={(filters, pageNumber:any, pageSize:any) =>
          handleFilter(filters,pageNumber, pageSize)
        }
        // handleSearch={(searchTerm) => handleSearch(searchTerm)}
        // filters={{unit: units}}
      />
      <Modal
        isOpen={createModal}
        setISOpen={setCreateModal}
        title="Create Category"
        content={<CategoryForm onSubmit={onStore} setModal={setCreateModal} />}
      />
      <Modal
        isOpen={updateModal}
        setISOpen={setUpdateModal}
        title="Update Category"
        content={
          <CategoryForm
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
          <div className="flex flex-col justify-center  gap-4 p-5">
            <div>Do you really want to change the status of this category?</div>
            <div className="flex justify-center gap-8 p-2">
              <Button
                name="Yes"
                onClick={() => onArchive(item.id)}
                className={
                  'text-xs text-white bg-primary text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer'
                }
              />
              <Button
                name="No"
                onClick={() => setArchiveModal(false)}
                className={
                  'text-xs text-black bg-white border-[1px] text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer'
                }
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Index;
