import { Button, DataTable, Modal } from 'components';
import {
  loadCitiesRequested,
  loadFiltereBusLoctionRequested,
  uploadExcelShopRequestedFile,
} from 'features';
import {
  useArchiveBusinessLocation,
  useBusinessLocationStore,
  useUpdateBusinessLocation,
  useUpdateBusinessLocationTime,
} from 'hooks/BusinessLocations';
import Columns from 'hooks/BusinessLocations/Columns';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import BusinessLocationForm from './BusinessLocationForm';
import TimeUpdate from './Form/TimeUpdate';
import { ArrowLeft, FileDown, Upload, X } from 'lucide-react';

// import BusinessLocationForm from "./Create";
interface Filters {
  isActive?: { isActive: boolean };
  businessName?: { businessName: string };
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
  const { onStore } = useBusinessLocationStore();
  const { onUpdate } = useUpdateBusinessLocation();
  const { onUpdateTime } = useUpdateBusinessLocationTime();
  const { onArchive } = useArchiveBusinessLocation();
  const [createModal, setCreateModal] = React.useState(false);
  const [showClockComponent, setShowClockComponent] = useState(false);
  const [item, setItem] = React.useState<any>({});
  const [updateModal, setUpdateModal] = React.useState(false);
  const [archiveModal, setArchiveModal] = React.useState(false);
  const [importModal, setImportModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { auth } = useSelector((state: RootState) => state.auth);

  const [request, setRequest] = useState<any>({
    isActive: undefined,
    businessName: undefined,
    pageSize: 10,
    pageCount: 1,
  });
  const {
    filterBusLoction,
    businessLocations,
    businessLocationLoading,
    createdBusinessLocation,
    archivedBusinessLocation,
    updatedBusinessLocation,
  } = useSelector((state: RootState) => state.businessLocation);

  useMemo(() => {
    if (
      createdBusinessLocation ||
      archivedBusinessLocation ||
      updatedBusinessLocation
    ) {
      setCreateModal(false);
      setUpdateModal(false);
      setArchiveModal(false);
      dispatch(loadFiltereBusLoctionRequested(request));

      
    }
  }, [
    createdBusinessLocation,
    updatedBusinessLocation,
    archivedBusinessLocation,
  ]);

  useEffect(() => {
    dispatch(loadFiltereBusLoctionRequested(request));
  }, [dispatch]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

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
      dispatch(uploadExcelShopRequestedFile({ file,updaterId:auth?.auth?.userId}));
      setFile(null);
      setImportModal(false);
    }
  };

  const handleFilter = (
    filters: Filters,
    pageNumber: number,
    pageSize: number
  ) => {
    const updatedRequest = {
      ...request,
      businessName: filters?.businessName ?? request.businessName,
      isActive: filters?.isActive ?? request.isActive,
      pageCount: pageNumber,
      pageSize: pageSize,
    };
    setRequest(updatedRequest);
    dispatch(loadFiltereBusLoctionRequested(updatedRequest));
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
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
      <div className="font-bold text-xl">Branches</div>
      <DataTable
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
          timeUpdate: {},
        }}
        import_csv={() => setImportModal(true)}
        columns={Columns}
        data={filterBusLoction}
        createModal={setCreateModal}
        edittimeModal={setShowClockComponent}
        loading={businessLocationLoading}
        modalData={setItem}
        editModal={setUpdateModal}
        archiveModal={setArchiveModal}
        handleFilter={(filters, pageNumber: any, pageSize: any) => {
          console.log('Filters from DataTable:', filters);
          handleFilter(filters, pageNumber, pageSize);
        }}
        // dataItem={"City"}
      />
      <Modal
        isOpen={createModal}
        setISOpen={setCreateModal}
        title="Create Branch"
        content={
          <BusinessLocationForm onSubmit={onStore} setModal={setCreateModal} />
        }
      />
      <Modal
        isOpen={updateModal}
        setISOpen={setUpdateModal}
        title="Edit Branch"
        content={
          <BusinessLocationForm
            onSubmit={onUpdate}
            setModal={setUpdateModal}
            item={item}
          />
        }
      />

      <Modal
        isOpen={showClockComponent}
        setISOpen={setShowClockComponent}
        title="Day Allocation"
        content={
          <TimeUpdate
            onSubmit={onUpdateTime}
            setModal={setShowClockComponent}
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
            <div>Do you really want to change the status of this Branche?</div>
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
