import { Button, DataTable, Modal } from 'components';
import {
  loadFilterStockAdjustmentRequested,
  loadStockAdjustmentRequested,
  loadStockTransferRequested,
} from 'features';
import Columns from 'hooks/StockAdjustment/Columns';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import FilterForm from './Filter';
import { useFilterStockAdjustment } from 'hooks/StockAdjustment';
import DetailsFrom from './DetailsFrom';
import { STOCKADJUSTMENTS_CREATE } from 'constants/routes';

interface Filters {
  variationId?: { variationId: string };
  warrantyId?: { warrantyId: string };
  businessLocationId?: { businessLocationId: string };
  categoryId?: { categoryId: string };
  subCategoryId?: { subCategoryId: string };
  brands?: { brands: string };
  unitId?: { unitId: string };
  cityId?: { cityId: string };
  productId?: { productId: string };
  isFreeShipping?: { isFreeShipping: string };
}

function Index() {
  const dispatch = useDispatch();
  const { onFilterStockAdjustment } = useFilterStockAdjustment();
  const [item, setItem] = React.useState<any>({});
  const [filterModal, setFilterModal] = React.useState(false);
  const [viewModal, setViewModal] = React.useState(false);
  const [request, setRequest] = useState<any>({
    variationId: undefined,
    businessLocationId: undefined,
    categoryId: undefined,
    subCategoryId: undefined,
    brands: undefined,
    unitId: undefined,
    cityId: undefined,
    productId: undefined,
    isFreeShipping: undefined,
    pageSize: 10,
    pageCount: 1,
  });
  const { stockadjustmentFilter,stockadjustment, stockadjustmentLoading } = useSelector(
    (state: RootState) => state.stockadjustment
  );

  useEffect(() => {
    dispatch(loadFilterStockAdjustmentRequested(request));
   
  }, [dispatch, filterModal]);

  const toggleFilterModal = () => {
    setFilterModal((prev) => !prev);
  };


  console.log(stockadjustmentFilter,"..........................rushanthan anna")
  const handleFilter = (
    filters: Filters,
    pageNumber: number,
    pageSize: number
  ) => {
    const updatedRequest = {
      ...request,
      variationId: filters?.variationId ?? request.variationId,
      businessLocationId:
      filters?.businessLocationId ?? request.businessLocationId,
      categoryId: filters?.categoryId ?? request.categoryId,
      subCategoryId: filters?.subCategoryId ?? request.subCategoryId,
      unitId: filters?.unitId ?? request.unitId,
      cityId: filters?.cityId ?? request.cityId,
      productId: filters?.productId ?? request.productId,
      isFreeShipping: filters?.isFreeShipping ?? request.isFreeShipping,
      pageCount: pageNumber,
      pageSize: pageSize,
    };

    setRequest(updatedRequest);
    dispatch(loadFilterStockAdjustmentRequested(updatedRequest));
  };
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Stock Adjustments</div>
      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}
        columns={Columns}
        // data={cities}
        data={stockadjustmentFilter}
        rowViewModal={setViewModal}
        loading={stockadjustmentLoading}
        modalData={setItem}
        toggleFilterModal={toggleFilterModal}
        // content={
        //   filterModal && (
        //     <FilterForm
        //       setModal={setFilterModal}
        //       item={item}
        //       filterModal={filterModal}
        //       onSubmit={onFilterStockAdjustment}
        //       resetForm={() => setFilterModal(false)}
        //     />
        //   )
        // }
        handleFilter={(filters, pageNumber: any, pageSize: any) => {
          handleFilter(filters, pageNumber, pageSize);
        }}
        create_route={STOCKADJUSTMENTS_CREATE}
      />

      <div className="flex align-top justify-start top-0  ">
        <Modal
          isOpen={viewModal}
          setISOpen={() => setViewModal(false)}
          title={item?.name}
          content={
            <div className="flex align-top justify-start top-0  ">
              <DetailsFrom item={item} setModal={setViewModal} />
            </div>
          }
        />
      </div>
    </div>
  );
}

export default Index;
