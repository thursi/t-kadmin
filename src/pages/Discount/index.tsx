import { Button, DataTable, Modal } from 'components';
import { DISCOUNT_CREATE, EDIT_DISCOUNT } from 'constants/routes';
import { loadFilterCitiesFailed, loadFilterCitiesRequested } from 'features';
import {
  loadDiscountsRequested,
  loadFilterDiscountsRequested,
  // uploadExcelDiscountRequestedFile,
} from 'features/discount/discountSlice';
import { uploadExcelDiscountRequestedFile } from 'features/discount/discountSlice';

import {
  useArchiveCity,
  useCityStore,
  useFilterCity,
  useUpdateCity,
} from 'hooks/Cities';
import Columns from 'hooks/discounts/Columns';
import { ArrowLeft, FileDown, Upload, X } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';

interface Filters {
  isActive?: { isActive: boolean };
}
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

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
  const [importModal, setImportModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [request, setRequest] = useState<any>({
    isActive: undefined,
    pageSize: 10,
    pageCount: 1,
  });
  const {
    discountsFilter,
    discounts,
    discountLoading,
    archivedCity,
    updatedCity,
  } = useSelector((state: RootState) => state.discount);
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
    dispatch(loadFilterDiscountsRequested(request));
    // dispatch(loadDiscountsRequested());
  }, [dispatch]);

  const toggleFilterModal = () => {
    setFilterModal((prev) => !prev);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const { auth } = useSelector((state: RootState) => state.auth);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      setFile(droppedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      dispatch(uploadExcelDiscountRequestedFile({ file,updaterId:auth?.auth?.userId}));
      setFile(null);
      setImportModal(false);
    }
  };

  // const handleUpload = () => {
  //   if (file) {
  //     // Verify the action exists and is a function
  //     console.log('Upload action:', uploadExcelDiscountRequestedFile);

  //     if (typeof uploadExcelDiscountRequestedFile === 'function') {
  //       dispatch(uploadExcelDiscountRequestedFile({ file });
  //     } else {
  //       console.error('Upload action is not a function');
  //     }

  //     setFile(null);
  //     setImportModal(false);
  //   }
  // };
  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };
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
    dispatch(loadFilterDiscountsRequested(updatedRequest));
    // dispatch(loadDiscountsRequested());
  };

  const ImportContactsModal = () => (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex items-center mb-4">
        <ArrowLeft className="mr-2" />
        <h2 className="text-xl font-semibold">Import File</h2>
      </div>

      <p className="mb-4">
        To import File please use our{' '}
        <a href="#" className="text-blue-500 hover:underline">
          CSV Template
        </a>
      </p>

      <div className="border-dashed border-2 border-gray-300 rounded-lg">
        <div
          className="flex flex-col items-center justify-center py-10"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <FileDown size={48} className="text-gray-400 mb-4" />
          <p className="text-center mb-4">
            Drag and Drop your files here.
            <br />
            (.csv)
          </p>
          <p className="text-center mb-4">OR</p>
          <button
            onClick={handleBrowseClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Browse Files
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv"
            className="hidden"
          />
        </div>
      </div>

      {file && (
        <div className="mt-4 border border-gray-200 rounded-lg">
          <div className="py-4 px-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FileDown size={24} className="text-gray-400 mr-2" />
                <span className="font-semibold">{file.name}</span>
              </div>
              <button
                onClick={handleRemoveFile}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
              <div>Type: {file.type || 'N/A'}</div>
              <div>Size: {formatFileSize(file.size)}</div>
              <div>
                Last Modified:{' '}
                {file.lastModified
                  ? new Date(file.lastModified).toLocaleString()
                  : 'N/A'}
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleUpload}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <Upload size={16} className="mr-2" />
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full min-h-fit p-4 font-inter flex flex-col gap-6">
      <div className="font-bold text-xl">Discounts</div>
      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}
        import_csv={() => setImportModal(true)}
        columns={Columns}
        // data={cities}
        data={discountsFilter}
        createModal={setCreateModal}
        loading={discountLoading}
        create_route={DISCOUNT_CREATE}
        edit_route={EDIT_DISCOUNT}
        modalData={setItem}
        editModal={setUpdateModal}
        archiveModal={setArchiveModal}
        toggleFilterModal={toggleFilterModal}
        handleFilter={(filters, pageNumber: any, pageSize: any) => {
          console.log('Filters from DataTablecityies:thusipa', filters);
          handleFilter(filters, pageNumber, pageSize);
        }}
      />
      <Modal
        isOpen={importModal}
        setISOpen={setImportModal}
        title="Import Contacts"
        content={<ImportContactsModal />}
      />
    </div>
  );
}

export default Index;
