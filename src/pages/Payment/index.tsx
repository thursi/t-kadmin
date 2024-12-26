import { DataTable, Modal } from 'components';
import { loadPaymentsRequested } from 'features/payment/paymentsSlice';
import Columns from 'hooks/payments/Columns';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import DetailsFrom from './DetailsFrom';
import FilterForm from './Filter';
import { useFilterPayment } from 'hooks/payments';
function Index() {
  const dispatch = useDispatch();
  const [viewModal, setViewModal] = React.useState(false);
  const [filterModal, setFilterModal] = React.useState(false);
  const { onFilterPayement } = useFilterPayment();

  const [item, setItem] = React.useState<any>({});
  const { payments, paymentLoading } = useSelector(
    (state: RootState) => state.payment
  );
  const toggleFilterModal = () => {
    setFilterModal((prev) => !prev);
  };
  useEffect(() => {
    dispatch(loadPaymentsRequested());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(loadPaymentsRequested());
    if (!filterModal) {
      dispatch(loadPaymentsRequested());
    }
  }, [dispatch, filterModal]);

  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Payments</div>
      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}
        columns={Columns}
        data={payments}
        loading={paymentLoading}
        modalData={setItem}
        rowViewModal={setViewModal}
        toggleFilterModal={toggleFilterModal}
        content={
          filterModal && (
            <FilterForm
              setModal={setFilterModal}
              item={item}
              filterModal={filterModal}
              onSubmit={onFilterPayement}
              resetForm={() => setFilterModal(false)}
            />
          )
        }
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
    </div>
  );
}
export default Index;
