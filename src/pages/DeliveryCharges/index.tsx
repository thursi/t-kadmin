import { Button, DataTable, Modal } from 'components';
import { DELIVERYCHARGES_CREATE, DISCOUNT_CREATE, EDIT_DELIVERYCHARGES } from 'constants/routes';
import { loadDeliveryChargesRequested, loadFilterCitiesFailed, loadFilterCitiesRequested, loadFilterDeliveryChargesRequested } from 'features';
import {
  loadDiscountsRequested,
  loadFilterDiscountsRequested,
} from 'features/discount/discountSlice';
import {
  useArchiveCity,
  useCityStore,
  useFilterCity,
  useUpdateCity,
} from 'hooks/Cities';
import Columns from 'hooks/deliveryCharge/Columns';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';

interface Filters {
  // isActive?: { isActive: boolean };
}

function Index() {
  const dispatch = useDispatch();
  const { onStore } = useCityStore();
  const { onUpdate } = useUpdateCity();
  const { onFilter } = useFilterCity();
  const { onArchive } = useArchiveCity();
  const [createModal, setCreateModal] = React.useState(false);
  const [item, setItem] = React.useState<any>({});
  const [updateModal, setUpdateModal] = React.useState(false);
  const [archiveModal, setArchiveModal] = React.useState(false);
  const [filterModal, setFilterModal] = React.useState(false);

  const [request, setRequest] = useState<any>({
    pageSize: 10,
    pageCount: 1,
  });
  const {
    deliveryChargFilter,
    deliveryCharges,
    deeliveryLoading,

  } = useSelector((state: RootState) => state.deliveryCharge);
  // useMemo(() => {
  //   if (createdCity || archivedCity || updatedCity) {
  //     setCreateModal(false);
  //     setUpdateModal(false);
  //     setArchiveModal(false);
  //     setFilterModal(false);
  //     dispatch(loadFilterCitiesRequested(request));
  //   }
  // }, [createdCity, updatedCity, archivedCity]);

  useEffect(() => {
    dispatch(loadFilterDeliveryChargesRequested(request));
    // dispatch(loadDeliveryChargesRequested());
  }, [dispatch,request]);

  const toggleFilterModal = () => {
    setFilterModal((prev) => !prev);
  };

  const handleFilter = (
    // filters: Filters,
    pageNumber: number,
    pageSize: number
  ) => {
    const updatedRequest = {
      ...request,
      // isActive: filters?.isActive ?? request.isActive,
      pageCount: pageNumber,
      pageSize: pageSize,
    };
    console.log('par', updatedRequest);
    setRequest(updatedRequest);
    dispatch(loadFilterDeliveryChargesRequested(updatedRequest));
    // dispatch(loadDeliveryChargesRequested());
  };

  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Delivery Charges</div>
      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}
        columns={Columns}
        // data={cities}
        data={deliveryChargFilter}
        createModal={setCreateModal}
        loading={deeliveryLoading}
        create_route={DELIVERYCHARGES_CREATE}
        edit_route={EDIT_DELIVERYCHARGES}
        modalData={setItem}
        editModal={setUpdateModal}
        archiveModal={setArchiveModal}
        toggleFilterModal={toggleFilterModal}
        handleFilter={(pageNumber: any, pageSize: any) => {
          handleFilter(pageNumber, pageSize);
        }}
      />
    </div>
  );
}

export default Index;
