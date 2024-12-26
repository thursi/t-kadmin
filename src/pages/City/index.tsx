import { Button, DataTable, Modal } from 'components';
import { loadFilterCitiesFailed, loadFilterCitiesRequested } from 'features';
import {
  useArchiveCity,
  useCityStore,
  useFilterCity,
  useUpdateCity,
} from 'hooks/Cities';
import Columns from 'hooks/Cities/Columns';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import CityForm from './Create';
// import FilterForm from './Filter';

interface Filters {
  isActive?: { isActive: boolean };
}

function Index() {
  const dispatch = useDispatch();
  const { onFilter } = useFilterCity();
  const [createModal, setCreateModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [archiveModal, setArchiveModal] = React.useState(false);
  const [item, setItem] = React.useState<any>({});

  const [request, setRequest] = useState<any>({
    isActive: undefined,
    pageSize: 10,
    pageCount: 1,
  });
  const {
    citiesFilter,
    cities,
    cityLoading,
    createdCity,
    archivedCity,
    updatedCity,
  } = useSelector((state: RootState) => state.city);
  useMemo(() => {
    if (createdCity || archivedCity || updatedCity) {
      setCreateModal(false);
      setUpdateModal(false);
      setArchiveModal(false);
      dispatch(loadFilterCitiesRequested(request));
    }
  }, [createdCity, updatedCity, archivedCity]);


  const { onStore } = useCityStore();
  const { onUpdate } = useUpdateCity();
  const { onArchive } = useArchiveCity();


  useEffect(() => {
    dispatch(loadFilterCitiesRequested(request));
  }, [dispatch]);

  // const toggleFilterModal = () => {
  //   setFilterModal((prev) => !prev);
  // };

  const handleFilter = (
    filters: Filters,
    pageNumber: number,
    pageSize: number
  ) => {
    const updatedRequest = {
      ...request,
      isActive: filters?.isActive ?? request.isActive,
      pageCount: pageNumber,
      pageSize: pageSize,
    };
    console.log('par', updatedRequest);
    setRequest(updatedRequest);
    dispatch(loadFilterCitiesRequested(updatedRequest));
  };

  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Cities</div>
      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}
        columns={Columns}
        // data={cities}
        data={citiesFilter}
        createModal={setCreateModal}
        loading={cityLoading}
        modalData={setItem}
        editModal={setUpdateModal}
        archiveModal={setArchiveModal}
        // toggleFilterModal={toggleFilterModal}
        handleFilter={(filters, pageNumber: any, pageSize: any) => {
          console.log('Filters from DataTablecityies:thusipa', filters);
          handleFilter(filters, pageNumber, pageSize);
        }}

        // content={
        //   filterModal && (
        //     <FilterForm
        //       setModal={setFilterModal}
        //       item={item}
        //       filterModal={filterModal}
        //       onSubmit={onFilter}
        //       resetForm={() => setFilterModal(false)}
        //     />
        //   )
        // }
      />
      <Modal
        isOpen={createModal}
        setISOpen={setCreateModal}
        title="Create City"
        content={<CityForm onSubmit={onStore} setModal={setCreateModal} />}
      />
      <Modal
        isOpen={updateModal}
        setISOpen={setUpdateModal}
        title="Edit City"
        content={
          <CityForm onSubmit={onUpdate} setModal={setUpdateModal} item={item} />
        }
      />
      <Modal
        isOpen={archiveModal}
        setISOpen={setArchiveModal}
        title="Change Status?"
        content={
          <div className="flex flex-col justify-center  gap-4 p-5">
            <div>Do you really want to change the status of this city?</div>
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
