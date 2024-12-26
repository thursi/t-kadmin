import { Button, DataTable, Modal } from 'components';
import Columns from 'hooks/Brands/Columns';
import { RootState } from 'store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import BrandForm from './Create';
import { loadBrandFilterRequested, loadBrandRequested } from 'features';
import { useArchiveBrand, useStoreBrands, useUpdateBrand } from 'hooks/Brands';

interface Filters {
  isActive?: { isActive: boolean };
  brandName?: { brandName: string };
}

function Index() {
  const dispatch = useDispatch();
  const [createModal, setCreateModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [archiveModal, setArchiveModal] = React.useState(false);
  const [item, setItem] = useState<any>({});
  const [request, setRequest] = useState<any>({
    isActive: undefined,
    brandName: undefined,
    pageSize: 10,
    pageCount: 1,
  });

  const {
    filterBrand,
    brands,
    brandLoading,
    createdBrand,
    updatedBrand,
    archivedBrand,
  } = useSelector((state: RootState) => state.brand);
  useMemo(() => {
    if (createdBrand || updatedBrand || archivedBrand) {
      setCreateModal(false);
      setUpdateModal(false);
      setArchiveModal(false);
      dispatch(loadBrandFilterRequested(request));
    }
  }, [createdBrand, updatedBrand, archivedBrand]);

  const { onStore } = useStoreBrands();
  const { onUpdate } = useUpdateBrand();
  const { onArchive } = useArchiveBrand();

  useEffect(() => {
    dispatch(loadBrandFilterRequested(request));
  }, [dispatch]);

  const handleFilter = (
    filters: Filters,
    pageNumber: number,
    pageSize: number
  ) => {
    const updatedRequest = {
      ...request,
      brandName: filters?.brandName ?? request.brandName,
      isActive: filters?.isActive ?? request.isActive,
      pageCount: pageNumber,
      pageSize: pageSize,
    };

    setRequest(updatedRequest);
    console.log('Updated Request:', updatedRequest);
    dispatch(loadBrandFilterRequested(updatedRequest));
  };
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Brands</div>
      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}
        columns={Columns}
        data={filterBrand}
        createModal={setCreateModal}
        loading={brandLoading}
        modalData={setItem}
        editModal={setUpdateModal}
        archiveModal={setArchiveModal}
        handleFilter={(filters, pageNumber: any, pageSize: any) =>
          handleFilter(filters, pageNumber, pageSize)
        }
      />
      <Modal
        isOpen={createModal}
        setISOpen={setCreateModal}
        title="Create Brand"
        content={<BrandForm onSubmit={onStore} setModal={setCreateModal} />}
      />
      <Modal
        isOpen={updateModal}
        setISOpen={setUpdateModal}
        title="Update Brand"
        content={
          <BrandForm
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
            <div>Do you really want to change the status of this brand?</div>
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
}

export default Index;
