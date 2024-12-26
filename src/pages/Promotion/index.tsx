import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, FileDown, Upload, X } from 'lucide-react';
import { Button, DataTable, Modal } from 'components';
import { loadPromotionsRequested } from 'features';
import Columns from 'hooks/Promotion/Columns';
import { RootState } from 'store/reducer';
import { EDIT_PROMOTION, PROMOTION, PROMOTION_CREATE } from 'constants/routes';
import { useArchiveSupplier } from 'hooks/Products';
import { useArchiveProductPromotion } from 'hooks/Promotion';
import DetailsFrom from './DetailsFrom';
//import DetailsFrom from './DetailsFrom';
//import FilterForm from './Filter';
//import { useFilterPurchases } from 'hooks/Purchases';
//import { useNavigate } from "react-router-dom";
// import ProductDetailsFrom from './ProductDetailsFrom';

interface Filters {
  // taxId?: { taxId: string };
  // categoryId?: { categoryId: string };
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
  const { filterPromotion, promotions, promotionLoading } = useSelector(
    (state: RootState) => state.promotions
  );

  const { onArchive } = useArchiveProductPromotion();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(loadPromotionsRequested());
  }, [dispatch, filterModal]);
  const toggleFilterModal = () => {
    setFilterModal((prev) => !prev);
  };

  //const { onFilterPurchases } = useFilterPurchases();
  // const handleFilter = (
  //   filters: Filters,
  //   pageNumber: number,
  //   pageSize: number
  // ) => {
  //   const updatedRequest = {
  //     ...request,
  //     // taxId: filters?.taxId ?? request.taxId,
  //     // categoryId: filters?.categoryId ?? request.categoryId,
  //     pageCount: pageNumber,
  //     pageSize: pageSize,
  //   };

  //   setRequest(updatedRequest);
  //   dispatch(loadFiltereWarrantyRequested(updatedRequest));
  // };

  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Promotions</div>

      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}
        columns={Columns}
        data={promotions}
        createModal={setCreateModal}
        loading={promotionLoading}
        modalData={setItem}
        editModal={setUpdateModal}
        rowViewModal={setViewModal}
        archiveModal={setArchiveModal}
        create_route={PROMOTION_CREATE}
        edit_route={EDIT_PROMOTION}

        // handleFilter={(filters, pageNumber: any, pageSize: any) => {
        //   console.log('Filters from DataTable:', filters);
        //   handleFilter(filters, pageNumber, pageSize);
        // }}

        //edit_route={PURCHASE_RETURN_EDIT}
      />

      <Modal
        isOpen={viewModal}
        setISOpen={(open) => setViewModal(open)}
        title={item?.name}
        content={<DetailsFrom item={item} setModal={setViewModal} />}
      />

      <Modal
        isOpen={archiveModal}
        setISOpen={setArchiveModal}
        title="Change Status?"
        content={
          <div className="flex flex-col justify-center gap-4 p-5">
            <div>
              Do you really want to change the status of this Product Promotion?
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
