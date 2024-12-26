import { Button, DataTable, Modal } from "components";
import React, { useEffect, useMemo, useState } from "react";
import TaxForm from "./Create";
import { useDispatch, useSelector } from "react-redux";
import { loadTaxFilterRequested, loadTaxsRequested } from "features";
import { RootState } from "store/reducer";
import Columns from "hooks/Taxs/Columns";
import {
  useArchiveTax,
  useStoreTax,
  useUpdateTax,
} from "hooks/Taxs";

interface Filters {
  tax?: { tax: boolean };
}

const Index = () => {
  const dispatch = useDispatch();
  const [createModal, setCreateModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [archiveModal, setArchiveModal] = React.useState(false);
  const [item, setItem] = useState<any>({});
  const [request, setRequest] = useState<any>({
    tax: undefined,
    pageSize: 10,
    pageCount: 1,
  });
  const {
    filtertax,
    taxs,
    taxLoading,
    createdTax,
    updatedTax,
    archivedTax,
  } = useSelector((state: RootState) => state.tax);



  useMemo(() => {
    if (createdTax || updatedTax || archivedTax) {
      setCreateModal(false);
      setUpdateModal(false);
      setArchiveModal(false);
      dispatch(loadTaxFilterRequested(request));
    }
  }, [createdTax, updatedTax, archivedTax]);

  const { onStore } = useStoreTax();
  const { onUpdate } = useUpdateTax();
  const { onArchive } = useArchiveTax();

  useEffect(() => {
    dispatch(loadTaxFilterRequested(request));
  }, [dispatch]);

  // const handleFilter = (p0: string, pageCount: number, pageSize: number) => {
  //   const updatedRequest = {
  //     ...request,
  //     pageCount: pageCount,
  //     pageSize: pageSize,
  //   };
  //   setRequest(updatedRequest);
  //   dispatch(loadTaxFilterRequested(updatedRequest));
  // };

  const handleFilter = (    filters: Filters,pageNumber: number, pageSize: number) => {
    const updatedRequest = {
      ...request,
      tax: filters?.tax ?? request.tax,
      pageCount: pageNumber,
      pageSize: pageSize,
    };

    setRequest(updatedRequest);
    console.log("Updated Request:", updatedRequest);
    dispatch(loadTaxFilterRequested(updatedRequest));
  };

  const handleSearch = (searchTerm: string) => {
    const updatedRequest = {
      ...request,
      taxName: searchTerm, 
    };
    setRequest(updatedRequest);
    console.log("Search Term Request:", updatedRequest);
    dispatch(loadTaxFilterRequested(updatedRequest));
  }
  
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Taxs</div>
      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}
        columns={Columns}
        data={filtertax}
        createModal={setCreateModal}
        loading={taxLoading}
        modalData={setItem}
        editModal={setUpdateModal}
        archiveModal={setArchiveModal}
        handleFilter={(filters,pageNumber:any, pageSize:any) =>
          handleFilter(filters,pageNumber, pageSize)
        }
        handleSearch={handleSearch}
        placeholderhandleSearch="Search Tax name"
        // dataItem={"Tax"}
      />
      <Modal
        isOpen={createModal}
        setISOpen={setCreateModal}
        title="Create Tax"
        content={<TaxForm onSubmit={onStore} setModal={setCreateModal} />}
      />
      <Modal
        isOpen={updateModal}
        setISOpen={setUpdateModal}
        title="Update Tax"
        content={
          <TaxForm
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
            <div>Do you really want to change the status of this tax?</div>
            <div className="flex justify-center gap-8 p-2">
              <Button
                name="Yes"
                onClick={() => onArchive(item.id)}
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
};

export default Index;
