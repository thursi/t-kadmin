import * as React from 'react';
import { Button, DataTable, Modal, SearchDropDown } from 'components';
import { loadFilterStockTransferRequested, } from 'features';
import Columns from 'hooks/StockTransfers/Columns';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import FilterForm from './Filter';
import {
  useFilterStockTransfer,
  useStatusStockTransfer,
} from 'hooks/StockTransfers';
import DetailsFrom from './DetailsFrom';
import {
  EDIT_STOCKTRANSFER,
  STOCKSTOCKTRANSFER_CREATE,
} from 'constants/routes';


interface Filters {
  stockTransferStatus?: string;
  date?: string;
}


function Index() {
  const dispatch = useDispatch();
  const { onFilterStockTransfer } = useFilterStockTransfer();
  const { onStatus } = useStatusStockTransfer();
  const [item, setItem] = React.useState<any>({});
  const [filterModal, setFilterModal] = React.useState(false);
  const [viewModal, setViewModal] = React.useState(false);
  const [statusChangeModel, setStatusChangeModel] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<any>('');
  const [request, setRequest] = React.useState<any>({
    StockTransferFilter: undefined,
    date: undefined,
    pageSize: 10,
    pageCount: 1,
  });
  const {StockTransferFilter, StockTransfer, stocktransferLoading } = useSelector(
    (state: RootState) => state.stocktransfer
  );

  // React.useMemo(() => {
  //   if (statusChangeModel ) {
  //     setStatusChangeModel(false);
  //     dispatch(loadFilterStockTransferRequested());
  //   }
  // }, [statusChangeModel,]);

  React.useEffect(() => {
    dispatch(loadFilterStockTransferRequested(request));
  
  }, [dispatch, filterModal]);

  const toggleFilterModal = () => {
    setFilterModal((prev) => !prev);
  };

  // const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedStatus(event.target.value);
  // };

  const handleFilter = (
    filters: Filters,
    pageNumber: number,
    pageSize: number
  ) => {
    const updatedRequest = {
      ...request,
      stockTransferStatus: filters?.stockTransferStatus ?? request.stockTransferStatus,
      date: filters?.date ?? request.date,
      pageCount: pageNumber,
      pageSize: pageSize,
    };

    setRequest(updatedRequest);
    dispatch(loadFilterStockTransferRequested(updatedRequest));
  };

  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Stock Transfers</div>
      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
          statusChange: {},
        }}
        columns={Columns}
        data={StockTransferFilter}
        rowViewModal={setViewModal}
        // statusChangeModel={setStatusChangeModel}
        loading={stocktransferLoading}
        modalData={setItem}
        // toggleFilterModal={toggleFilterModal}
        // content={
        //   filterModal && (
        //     <FilterForm
        //       setModal={setFilterModal}
        //       item={item}
        //       filterModal={filterModal}
        //       onSubmit={onFilterStockTransfer}
        //       resetForm={() => setFilterModal(false)}
        //     />
        //   )
        // }

        handleFilter={(filters, pageNumber: any, pageSize: any) => {
          handleFilter(filters, pageNumber, pageSize);
        }}
        create_route={STOCKSTOCKTRANSFER_CREATE}
        edit_route={EDIT_STOCKTRANSFER}
      />

      <div className="flex align-top justify-start top-0">
        <Modal
          isOpen={viewModal}
          setISOpen={() => setViewModal(false)}
          title={item?.name}
          content={
            <div className="flex align-top justify-start top-0">
              <DetailsFrom item={item} setModal={setViewModal} />
            </div>
          }
        />
      </div>
      {/* <Modal
        isOpen={statusChangeModel}
        setISOpen={setStatusChangeModel}
        title="Change Status?"
        content={
          <div className="flex flex-col justify-center gap-4 p-5">
            <div>
              Do you really want to change the status of this Stock Transfer?
            </div>
            <div className="py-1 rounded-md text-xs flex-1 mb-10">
              <label className="block mb-3 text-sm font-medium text-gray-700">
                Stock Transfer Status:
              </label>
              <select
                name="stockTransferStatus"
                value={selectedStatus || ''}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block w-full px-2 py-2  border text-xs border-[#b0afb3] focus:outline-none rounded-md"
              >
                <option>Choose Status</option>
                <option value="COMPLETED">Completed</option>
                <option value="PENDING">Pending</option>
                <option value="IN_TRANSIT">In Transit</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div className="flex justify-end gap-8 p-2">
              <Button
                name="No"
                onClick={() => setStatusChangeModel(false)}
                className="text-xs text-black bg-white border-[1px] text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
              />
              <Button
                name="Yes"
                onClick={() => {
                  onStatus(item.id, selectedStatus);
                  // dispatch(StatusStockTransferRequested({ id:item.id,
                  //   status: selectedStatus,}));

                  setStatusChangeModel(false);
                }}
                className="text-xs text-white bg-primary text-center font-[500] p-3 w-[100px] rounded-md cursor-pointer"
              />
            </div>
          </div>
        }
      /> */}
    </div>
  );
}

export default Index;
