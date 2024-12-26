import { Button, DataTable, Modal, ShareForm } from 'components';
import Columns from 'hooks/Suppliers/Columns';
import { RootState } from 'store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import SupplierCreateForm from './Create';
import SupplierEditForm from './Edit';

import FilterForm from './Filter';


import {
  loadFilterSuppilerRequested,
  loadRequested,
  loadRequestedExcel,
  loadRequestedPdf,
  uploadExcelRequestedFile,
} from 'features';
import {
  useArchiveSupplier,
  useFilterSuppliers,
  useStoreSuppliers,
  useUpdateSupplier,
} from 'hooks/Suppliers';
import { CREATE_SUPPLIERS, EDIT_SUPPLIERS } from 'constants/routes';


interface Filters {
  // stockTransferStatus?: string;
  // date?: string;
}


interface Filters {
  isActive?: { isActive: boolean };
}
function Index() {
  const dispatch = useDispatch();
  const [createModal, setCreateModal] = React.useState(false);
  const [filterModal, setFilterModal] = React.useState(false);

  const [updateModal, setUpdateModal] = React.useState(false);
  const [archiveModal, setArchiveModal] = React.useState(false);
  const [item, setItem] = useState<any>({});
  const [request, setRequest] = useState<any>({
    contactType: "SUPPLIERS",
    pageSize: 10,
    pageCount: 1,
  });
  const {
    contactFilter,
    suppliers,
    conLoading,
    createdSupplier,
    updatedContact,
    archivedContact,
  } = useSelector((state: RootState) => state.contact);



  
  useMemo(() => {
    if (createdSupplier || updatedContact || archivedContact) {
      setCreateModal(false);
      setUpdateModal(false);
      setArchiveModal(false);
      setFilterModal(false);
      dispatch(loadRequested());
    }
  }, [createdSupplier, updatedContact, archivedContact]);

  const { onStore } = useStoreSuppliers();
  const { onUpdate } = useUpdateSupplier();
  const { onArchive } = useArchiveSupplier();
  const {onSuppliersTax}=useFilterSuppliers();
  useEffect(() => {
    dispatch(loadFilterSuppilerRequested(request));
  }, [dispatch]);

  const toggleFilterModal = () => {
    setFilterModal((prev) => !prev);
  };
  // const pdfInputRef = useRef<HTMLInputElement | null>(null);
  // const csvInputRef = useRef<HTMLInputElement | null>(null);
  // const handleImportPdf = (file:any) => {
  //   // Dispatch your import action for PDF
  //   dispatch({ type: 'IMPORT_PDF_REQUESTED', payload: { file } });
 

  // const handleImportCsv = (file:any) => {
  //   // Dispatch your import action for CSV
  //   dispatch({ type: 'IMPORT_CSV_REQUESTED', payload: { file } });
  // };

  // const handlePdfInputChange = (e:any) => {
  //   if (e.target.files) {
  //     handleImportPdf(e.target.files[0]); // Call the import handler for PDF
  //   }
  // };

  // const handleCsvInputChange = (e:any) => {
  //   if (e.target.files) {
  //     handleImportCsv(e.target.files[0]); // Call the import handler for CSV
  //   }
  // };

  // const pdfInputRef = useRef<HTMLInputElement | null>(null);
  const csvInputRef = useRef<HTMLInputElement | null>(null);

  // const handleImportPdf = (file:any) => {
  //   if (file) {
  //     dispatch(uploadExcelRequestedFile({ file }));
  //     setFile(null);
  //   }
  // };

  const handleImportCsv = (file: any) => {
    if (file) {
      dispatch(uploadExcelRequestedFile({ file }));
    }
  };

  const handleCsvInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleImportCsv(e.target.files[0]); // Pass the selected file to the handler
    }
  };

  // const handlePdfInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     handleImportPdf(e.target.files[0]);
  //   }
  // };

  // const handleCsvInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFile(e.target.files[0]);
  //     handleImportCsv();
  //   }
  // };

  const handleFilter = (
    filters: Filters,
    pageNumber: number,
    pageSize: number,
    
  ) => {
    const updatedRequest = {
      ...request,
      pageCount: pageNumber,
      pageSize: pageSize,
      isActive: filters?.isActive ?? request.isActive,
      contactType: "SUPPLIERS",
    };

    setRequest(updatedRequest);
    dispatch(loadFilterSuppilerRequested(updatedRequest));
  };
  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <input
        type="file"
        accept=".csv"
        ref={csvInputRef}
        style={{ display: 'none' }}
        onChange={handleCsvInputChange}
      />

      {/* {!updateModal && !createModal && ( */}
        {/* <> */}
          <div className="font-bold text-xl">Suppliers</div>
          <DataTable
            export_pdf={() => dispatch(loadRequestedPdf())}
            export_csv={() => dispatch(loadRequestedExcel())}
            // import_pdf={()=>handleImportPdf}
            // import_csv={()=>handleImportCsv}
            // import_pdf={() => {
            //   if (pdfInputRef.current) {
            //     pdfInputRef.current.click();
            //   }
            // }}
            import_csv={() => {
              if (csvInputRef.current) {
                csvInputRef.current.click();
              }
            }}
            columns={Columns}
            data={contactFilter}
            actionMenu={{
              view: { item: item, onsubmit: onUpdate },
              edit: {
                onsubmit: onStore,
                item: item,
              },
              delete: {},
            }}
            create_route={CREATE_SUPPLIERS}
            edit_route={EDIT_SUPPLIERS}
            // dataItem={'Supplier'}
            loading={conLoading}
            modalData={setItem}
            editModal={setUpdateModal}
            archiveModal={setArchiveModal}
            createModal={setCreateModal}
            filterModal={setFilterModal}
            toggleFilterModal={toggleFilterModal}

            // dataItem={"Warranty"}
            // content={
            //   filterModal && (
            //     <FilterForm
            //       setModal={setFilterModal}
            //       item={item}
            //       filterModal={filterModal}
            //       onSubmit={onSuppliersTax}
            //       resetForm={() => setFilterModal(false)}
            //     />
            //   )
            // }
            handleFilter={(filters, pageNumber: any, pageSize: any) => {
              handleFilter(filters, pageNumber, pageSize);
            }}
          />
        {/* </> */}
      {/* )} */}

      {/* {createModal && ( */}
        {/* <ShareForm
          isOpen={createModal}
          title="Create Supplier"
          content={
            <SupplierCreateForm onSubmit={onStore} setModal={setCreateModal} />
          }
        /> */}
      {/* )} */}

      {/* {updateModal && ( */}
        {/* <ShareForm
          // head="edit"
          isOpen={updateModal}
          title="Update Supplier"
          content={
            <SupplierEditForm
              onSubmit={onUpdate}
              setModal={setUpdateModal}
              item={item}
            />
          }
        /> */}
      {/* )} */}

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
