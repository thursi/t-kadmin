import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, DataTable, Modal } from "components";

import Columns from "hooks/Sales/Columns";
import { RootState } from "store/reducer";
import { useArchiveSupplier } from "hooks/Products";
import FilterForm from "./Filter";
import { loadFilterSalesRequested } from "features/sales/salesSlice";
import { useFilterSales } from "hooks/Sales";
import DetailsFrom from "./DetailsFrom";
import { loadFilterSuppilerRequested } from "features";



interface Filters {
  customerId?: { customerId: string };
  paymentGatewayStatus?: { paymentGatewayStatus: string };
  businessLocationId?: { businessLocationId: string };
  orderDate?: { orderDate: string };
  paymentType?: { paymentType: string };
}



function Index() {
  const dispatch = useDispatch();
  const [archiveModal, setArchiveModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [filterModal, setFilterModal] = React.useState(false);
  const [item, setItem] = useState<any>();
  const {salesFilter, sales, saleLoading, error } = useSelector(
    (state: RootState) => state.sales
  );

  const [request, setRequest] = useState<any>({
    orderDate: undefined,
    businessLocationId: undefined,
    paymentGatewayStatus: undefined,
    customerId: undefined,
    paymentType: undefined,
    pageSize: 10,
    pageCount: 1,
  });
  console.log(sales, "sales12");

  const { onArchive } = useArchiveSupplier();

  useEffect(() => {
    dispatch(loadFilterSalesRequested(request));
  }, [dispatch,request]);

  const toggleFilterModal = () => {
    setFilterModal((prev) => !prev);
  };

  const { onFilterSales } = useFilterSales();
  const handleFilter = (
    filters: Filters,
    pageNumber: number,
    pageSize: number
  ) => {
    const updatedRequest = {
      ...request,
      orderDate: filters?.orderDate ?? request.orderDate,
      businessLocationId: filters?.businessLocationId ?? request.businessLocationId,
      paymentGatewayStatus: filters?.paymentGatewayStatus ?? request.paymentGatewayStatus,
      customerId: filters?.customerId ?? request.customerId,
      paymentType: filters?.paymentType ?? request.paymentType,
      pageCount: pageNumber,
      pageSize: pageSize,
    };

    setRequest(updatedRequest);
    dispatch(loadFilterSalesRequested(updatedRequest));
  };
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Sales</div>

      <DataTable
        columns={Columns}
        data={salesFilter}
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}
        modalData={setItem}
        archiveModal={setArchiveModal}
        rowViewModal={setViewModal}
        toggleFilterModal={toggleFilterModal}
        // content={
        //   filterModal && (
        //     <FilterForm
        //       setModal={setFilterModal}
        //       item={item}
        //       filterModal={filterModal}
        //       resetForm={() => setFilterModal(false)}
        //       onSubmit={onFilterSales}
        //     />
        //   )
        // }

        handleFilter={(filters, pageNumber: any, pageSize: any) => {
          console.log('Filters from DataTable:', filters);
          handleFilter(filters, pageNumber, pageSize);
        }}
      />

      {/* <div className="flex align-top justify-start top-0  "> */}
      <Modal
        isOpen={viewModal}
        setISOpen={(open) => setViewModal(open)}
        title={item?.name}
        content={<DetailsFrom item={item} setModal={setViewModal} />}
      />
      {/* </div> */}

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
                onClick={() => onArchive(item?.id)}
                className={
                  "text-xs text-white bg-primary text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
                }
              />
              <Button
                name="No"
                onClick={() => setArchiveModal(false)}
                className={
                  "text-xs text-black bg-white border-[1px] text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
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
