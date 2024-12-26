import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, FileDown, Upload, X } from 'lucide-react';
import { Button, DataTable, Modal } from 'components';
import {
  loadProductFilterRequested,
  loadProductRequestedExcel,
  loadProductRequestedPdf,
  loadProductSearchRequested,
  loadProductsRequested,
  loadUnitsRequested,
  uploadExcelProRequestedFile,
} from 'features';
import Columns from 'hooks/Products/Columns';
import { RootState } from 'store/reducer';
import { PRODUCT_CREATE, PRODUCT_EDIT } from 'constants/routes';
import { useArchiveSupplier } from 'hooks/Products';
import ProductDetailsFrom from './ProductDetailsFrom';

interface Filters {
  unitId?: { unitId: string };
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
  const [archiveModal, setArchiveModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [importModal, setImportModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { auth } = useSelector((state: RootState) => state.auth);

  const [request, setRequest] = useState<any>({
    unitId: undefined,
    pageSize: 10,
    pageCount: 1,
  });
  const [searchRequest, setSearchRequest] = useState({
    searchTerm: undefined as string | undefined,
    pageSize: undefined as unknown as number | 10,
    pageCount: undefined as unknown as number | 1,
  });

  useEffect(() => {
    dispatch(loadProductFilterRequested(request));
  }, [dispatch, request]);

  useEffect(() => {
    dispatch(loadUnitsRequested());
  }, [dispatch]);

  const [item, setItem] = useState<any>({});
  const {
    filterProduct,
    products,
    productLoading,
    createdProduct,
    updatedProduct,
    archivedProduct,
  } = useSelector((state: RootState) => state.product);

  const { units } = useSelector((state: RootState) => state.unit);
  const { onArchive } = useArchiveSupplier();

  useMemo(() => {
    if (createdProduct || updatedProduct || archivedProduct) {
      setCreateModal(false);
      setUpdateModal(false);
      setArchiveModal(false);
      dispatch(loadProductsRequested());
    }
  }, [createdProduct, updatedProduct, archivedProduct]);

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
      dispatch(
        uploadExcelProRequestedFile({ file, updaterId: auth?.auth?.userId })
      );
      setFile(null);
      setImportModal(false);
    }
  };

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
      unitId: filters?.unitId ?? request.unitId,
      pageCount: pageNumber,
      pageSize: pageSize,
    };

    setRequest(updatedRequest);
    dispatch(loadProductFilterRequested(updatedRequest));
  };

  const handleSearch = (searchTerm: string) => {
    const updatedSearchRequest = {
      ...searchRequest,
      pageCount: 1,
      pageSize: request.pageSize,
      searchTerm: searchTerm,
    };

    const updatedRequest = {
      ...request,
      pageCount: 1,
      pageSize: 10,
    };
    setSearchRequest(updatedSearchRequest);

    searchTerm
      ? dispatch(loadProductSearchRequested(updatedSearchRequest))
      : dispatch(loadProductFilterRequested(updatedRequest));
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
      <div className="font-bold text-xl">Products</div>

      <DataTable
        export_pdf={() => dispatch(loadProductRequestedPdf())}
        export_csv={() => dispatch(loadProductRequestedExcel())}
        columns={Columns}
        import_csv={() => setImportModal(true)}
        data={filterProduct}
        actionMenu={{
          view: {},
          edit: {},
          delete: {},
        }}
        modalData={setItem}
        loading={productLoading}
        create_route={PRODUCT_CREATE}
        edit_route={PRODUCT_EDIT}
        archiveModal={setArchiveModal}
        rowViewModal={setViewModal}
        handleFilter={(unitId: any, pageNumber: any, pageSize: any) =>
          handleFilter(unitId, pageNumber, pageSize)
        }
        handleSearch={(searchTerm) => handleSearch(searchTerm)}
        filters={{ unit: units }}
      />

      <Modal
        isOpen={viewModal}
        setISOpen={setViewModal}
        title={item?.name}
        content={<ProductDetailsFrom item={item} setModal={setViewModal} />}
      />

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
