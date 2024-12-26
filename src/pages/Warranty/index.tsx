import { Button, DataTable, Modal } from 'components';
import React, { useEffect, useMemo, useState } from 'react';
import WarrantyForm from './Create';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadFiltereWarrantyRequested,
  loadWarrantiesRequested,
} from 'features';
import { RootState } from 'store/reducer';
import Columns from 'hooks/Warranties/Columns';
import {
  useArchiveWarranty,
  useFilterWarranty,
  useStoreWarranty,
  useUpdateWarranty,
} from 'hooks/Warranties';
import FilterForm from './Filter';

interface Filters {
  isActive?: { isActive: boolean };
  warrantyName?: { warrantyName: string };
}

const Index = () => {
  const dispatch = useDispatch();
  const [createModal, setCreateModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [archiveModal, setArchiveModal] = React.useState(false);
  const [filterModal, setFilterModal] = React.useState(false);
  const [request, setRequest] = useState<any>({
    // taxId: undefined,
    // categoryId: undefined,
    isActive: undefined,
    warrantyName: undefined,
    pageSize: 10,
    pageCount: 1,
  });
  const [item, setItem] = useState<any>({});
  const {
    filterWarranty,
    warranties,
    warrantyLoading,
    createdWarranty,
    updatedWarranty,
    archivedWarranty,
  } = useSelector((state: RootState) => state.warranty);

  useMemo(() => {
    if (createdWarranty || updatedWarranty || archivedWarranty) {
      setCreateModal(false);
      setUpdateModal(false);
      setArchiveModal(false);
      setFilterModal(false);

      dispatch(loadFiltereWarrantyRequested(request));
    }
  }, [createdWarranty, updatedWarranty, archivedWarranty]);

  const { onStore } = useStoreWarranty();
  const { onUpdate } = useUpdateWarranty();
  const { onArchive } = useArchiveWarranty();
  const { onWarrantyFilter } = useFilterWarranty();

  useEffect(() => {
    dispatch(loadFiltereWarrantyRequested(request));
  }, [dispatch, filterModal]);

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
      warrantyName: filters?.warrantyName ?? request.warrantyName,
      isActive: filters?.isActive ?? request.isActive,
      pageCount: pageNumber,
      pageSize: pageSize,
    };

    setRequest(updatedRequest);
    dispatch(loadFiltereWarrantyRequested(updatedRequest));
  };

  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Warranties</div>
      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}
        columns={Columns}
        data={filterWarranty}
        createModal={setCreateModal}
        loading={warrantyLoading}
        modalData={setItem}
        editModal={setUpdateModal}
        archiveModal={setArchiveModal}
        toggleFilterModal={toggleFilterModal}
        handleFilter={(filters, pageNumber: any, pageSize: any) => {
          console.log('Filters from DataTable:', filters);
          handleFilter(filters, pageNumber, pageSize);
        }}
        // dataItem={"Warranty"}
        // content={
        //   filterModal && (
        //     <FilterForm
        //       setModal={setFilterModal}
        //       item={item}
        //       filterModal={filterModal}
        //       onSubmit={onWarrantyFilter}
        //       resetForm={() => setFilterModal(false)}
        //     />
        //   )
        // }
      />
      <Modal
        isOpen={createModal}
        setISOpen={setCreateModal}
        title="Create Warranty"
        content={<WarrantyForm onSubmit={onStore} setModal={setCreateModal} />}
      />
      <Modal
        isOpen={updateModal}
        setISOpen={setUpdateModal}
        title="Update Warranty"
        content={
          <WarrantyForm
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
            <div>Do you really want to change the status of this Warranty?</div>
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
