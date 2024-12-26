import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, FileDown, Upload, X } from 'lucide-react';
import { Button, DataTable, Modal } from 'components';
import { loadCitiesRequested, loadFilterPurchasesRequested } from 'features';
import Columns from 'hooks/Purchases/Columns';
import { RootState } from 'store/reducer';
import { PURCHASE_CREATE, PURCHASE_EDIT } from 'constants/routes';
import { useArchiveSupplier } from 'hooks/Products';
import DetailsFrom from './DetailsFrom';
import FilterForm from './Filter';
import { useFilterPurchases } from 'hooks/Purchases';
import { useNavigate } from 'react-router-dom';
// import ProductDetailsFrom from './ProductDetailsFrom';

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

interface Filters {
  purchaseStatus?: string;
  discountType?: string;
  purchaseDate?: string;
}

function Index() {
  const dispatch = useDispatch();
  const [archiveModal, setArchiveModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [importModal, setImportModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filterModal, setFilterModal] = React.useState(false);

  const [item, setItem] = useState<any>({});
  const [request, setRequest] = useState<any>({
    purchaseStatus: undefined,
    discountType: undefined,
    purchaseDate: undefined,
    pageSize: 10,
    pageCount: 1,
  });
  const { filterPurchases, purchases, purchaseLoading } = useSelector(
    (state: RootState) => state.purchase
  );

  const { onArchive } = useArchiveSupplier();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(loadFilterPurchasesRequested(request));
  }, [dispatch, request]);
  const toggleFilterModal = () => {
    setFilterModal((prev) => !prev);
  };

  const { onFilterPurchases } = useFilterPurchases();

  const handleFilter = (
    filters: Filters,
    pageNumber: number,
    pageSize: number
  ) => {
    const updatedRequest = {
      ...request,
      discountType: filters?.discountType ?? request.discountType,
      purchaseDate: filters?.purchaseDate ?? request.purchaseDate,
      purchaseStatus: filters?.purchaseStatus ?? request.purchaseStatus,
      pageCount: pageNumber,
      pageSize: pageSize,
    };

    setRequest(updatedRequest);
    dispatch(loadFilterPurchasesRequested(updatedRequest));
  };

  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Purchases</div>

      <DataTable
        columns={Columns}
        data={filterPurchases}
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}
        // editModal={() => {
        //   console.log(`${PURCHASE_EDIT}/${item?.id}`, "PURCHASE_EDIT");
        //   // navigate(`${PURCHASE_EDIT}/${item?.id}`);
        // }}
        edit_route={PURCHASE_EDIT}
        modalData={setItem}
        editModal={setUpdateModal}
        loading={purchaseLoading}
        // archiveModal={setArchiveModal}
        rowViewModal={setViewModal}
        toggleFilterModal={toggleFilterModal}
        // content={
        //   filterModal && (
        //     <FilterForm
        //       setModal={setFilterModal}
        //       item={item}
        //       filterModal={filterModal}
        //       resetForm={() => setFilterModal(false)}
        //       onSubmit={onFilterPurchases}
        //     />
        //   )
        // }
        handleFilter={(filters, pageNumber: any, pageSize: any) => {
          handleFilter(filters, pageNumber, pageSize);
        }}
        create_route={PURCHASE_CREATE}
      />

      <div className="flex align-top justify-start top-0  ">
        <Modal
          isOpen={viewModal}
          setISOpen={setViewModal}
          title={item?.name}
          content={
            <div className="flex align-top justify-start top-0  ">
              <DetailsFrom item={item} setModal={setViewModal} />
            </div>
          }
        />
      </div>

      <Modal
        isOpen={archiveModal}
        setISOpen={setArchiveModal}
        title="Change Status?"
        content={
          <div className="flex flex-col justify-center gap-4 p-5">
            <div>
              Do you really want to change the status of this create supplier?
            </div>
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
