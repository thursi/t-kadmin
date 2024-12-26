import { Button, DataTable, Modal } from 'components';
import React, { useEffect, useMemo, useState } from 'react';
import UnitForm from './Create';
import { useDispatch, useSelector } from 'react-redux';
import { loadUnitFilterRequested, loadUnitsRequested } from 'features';
import { RootState } from 'store/reducer';
import Columns from 'hooks/Units/Columns';
import { useArchiveUnit, useStoreUnit, useUpdateUnit } from 'hooks/Units';

interface Filters {
  uniCode?: { uniCode: string };
}

const Index = () => {
  const dispatch = useDispatch();
  const [createModal, setCreateModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [archiveModal, setArchiveModal] = React.useState(false);
  const [item, setItem] = useState<any>({});
  const [request, setRequest] = useState<any>({
    uniCode: undefined,
    // categoryId: undefined,
    pageSize: 10,
    pageCount: 1,
  });

  const {
    filterUnit,
    units,
    unitLoading,
    createdUnit,
    updatedUnit,
    archivedUnit,
  } = useSelector((state: RootState) => state.unit);

  useMemo(() => {
    if (createdUnit || updatedUnit || archivedUnit) {
      setCreateModal(false);
      setUpdateModal(false);
      setArchiveModal(false);
      dispatch(loadUnitFilterRequested(request));
    }
  }, [createdUnit, updatedUnit, archivedUnit]);

  const { onStore } = useStoreUnit();
  const { onUpdate } = useUpdateUnit();
  const { onArchive } = useArchiveUnit();

  useEffect(() => {
    dispatch(loadUnitFilterRequested(request));
  }, [dispatch]);
  // const handleFilter = (p0: string, pageCount: number, pageSize: number) => {
  //   const updatedRequest = {
  //     ...request,
  //     pageCount: pageCount,
  //     pageSize: pageSize,
  //   };
  //   setRequest(updatedRequest);
  //   dispatch(loadUnitFilterRequested(updatedRequest));
  // };

  const handleFilter = (
    filters: Filters,
    pageNumber: number,
    pageSize: number
  ) => {
    const updatedRequest = {
      ...request,
      uniCode: filters?.uniCode ?? request.uniCode,
      pageCount: pageNumber,
      pageSize: pageSize,
    };

    setRequest(updatedRequest);
    console.log('Updated Request:', updatedRequest);
    dispatch(loadUnitFilterRequested(updatedRequest));
  };

  const handleSearch = (searchTerm: string) => {
    const updatedRequest = {
      ...request,
      unitName: searchTerm,
    };
    setRequest(updatedRequest);
    console.log('Search Term Request:', updatedRequest);
    dispatch(loadUnitFilterRequested(updatedRequest));
  };
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Units</div>
      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}
        columns={Columns}
        data={filterUnit}
        createModal={setCreateModal}
        loading={unitLoading}
        modalData={setItem}
        editModal={setUpdateModal}
        archiveModal={setArchiveModal}
        // handleFilter={(unitId: string, pageNumber: number, pageSize: number) =>
        //   handleFilter(' ', pageNumber, pageSize)
        // }
        handleFilter={(filters, pageNumber: any, pageSize: any) =>
          handleFilter(filters, pageNumber, pageSize)
        }
        handleSearch={handleSearch}
        placeholderhandleSearch="Search Unit Name"
        // dataItem={'Unit'}
      />
      <Modal
        isOpen={createModal}
        setISOpen={setCreateModal}
        title="Create Unit"
        content={<UnitForm onSubmit={onStore} setModal={setCreateModal} />}
      />
      <Modal
        isOpen={updateModal}
        setISOpen={setUpdateModal}
        title="Update Unit"
        content={
          <UnitForm onSubmit={onUpdate} setModal={setUpdateModal} item={item} />
        }
      />
      <Modal
        isOpen={archiveModal}
        setISOpen={setArchiveModal}
        title="Change Status?"
        content={
          <div className="flex flex-col justify-center  gap-4 p-5">
            <div>Do you want to archive this unit?</div>
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
