import { Button, Modal } from 'components';
import default_image from '../../../assets/images/png/defaultImage.png';
import { Camera, Edit } from 'lucide-react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateImageProductRequested } from 'features';

const Index = (props: { onSubmit?: any; item?: any; setModal?: any }) => {
  console.log('item.name', props?.item);
  const dispatch = useDispatch();
  const [viewModal, setViewModal] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      try {
        await dispatch(
          updateImageProductRequested({
            id: props.item.id,
            images: file,
          })
        );
        setViewModal(false);
      } catch (error) {
        console.error('Failed to update the image:', error);
        alert('Something went wrong. Please try again.');
      }
    } else {
      alert('No image selected. Please choose or drag an image.');
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full flex-col py-2">
      <div className="flex flex-col md:flex-row justify-between mb-4 items-start">
        <div className="relative flex-shrink-0 px-4 mb-4 md:mb-0">
          <img
            src={
              props.item?.images && props.item.images.length > 0
                ? props.item.images[0]
                : default_image
            }
            alt={props.item?.productName || 'Product'}
            className="w-full md:w-40 h-32 object-cover rounded-md"
            style={{ borderRadius: '16px' }}
          />

          <div
            className="absolute top-1 right-3 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100 cursor-pointer"
            onClick={() => setViewModal(true)}
          >
            <Edit size={16} />
          </div>

          <Modal
            isOpen={viewModal}
            setISOpen={setViewModal}
            title={props.item?.name || 'Edit Product Image'}
            content={
              <div>
                {/* Drag and Drop or File Upload */}
                <div
                  className={`relative w-full rounded-lg border-2 border-dashed 
          ${
            dragActive
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 bg-gray-50'
          } 
          transition-colors duration-200 ease-in-out`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  <div className="p-6 text-center">
                    {!preview && (
                      <>
                        <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <button
                          type="button"
                          onClick={handleButtonClick}
                          className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 
                  bg-white rounded-md border border-blue-600 hover:border-blue-500 
                  transition-colors duration-200 ease-in-out"
                        >
                          {props?.item ? 'Update Image' : 'Choose Image'}
                        </button>
                        <p className="mt-2 text-sm text-gray-500">
                          or drag and drop your image here
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Preview Section */}
                {preview && (
                  <div className="mt-4 relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-auto rounded shadow-md"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 
              text-white rounded-full p-2 text-sm transition-colors duration-200 ease-in-out"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
            rounded-md hover:bg-blue-500 transition-colors duration-200 ease-in-out"
                  >
                    Submit
                  </button>
                </div>
              </div>
            }
          />
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <strong className="text-sm">SKU:</strong> {props.item?.sku || '--'}
          </div>
          <div>
            <strong className="text-sm">Category:</strong>{' '}
            {props.item?.categoryResponse?.name || '--'}
          </div>
          <div>
            <strong className="text-sm">Unit:</strong>{' '}
            {props.item?.unitResponse?.unitName || '--'}
          </div>
          <div>
            <strong className="text-sm">Sub Category:</strong>{' '}
            {props.item?.subCategoryResponse?.name || '--'}
          </div>
          <div>
            <strong className="text-sm">Brand:</strong>{' '}
            {props.item?.brandResponse?.brandName || '--'}
          </div>
          <div>
            <strong className="text-sm">Warranty:</strong>{' '}
            {props.item?.warrantyResponse?.warrantyName || '--'}
          </div>
          <div>
            <strong className="text-sm">Product Type:</strong>{' '}
            {props.item?.productType || '--'}
          </div>
          <div>
            <strong className="text-sm">Manufactured Date:</strong>{' '}
            {props.item?.manufacturedDate || '--'}
          </div>
          <div>
            <strong className="text-sm">Expired Date:</strong>{' '}
            {props.item?.expiredDate || '--'}
          </div>
        </div>
      </div>
      <div className="w-full mt-4 border p-4 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-2">
          {props?.item?.productVariableResponses?.[0]?.productVariationResponse
            ?.categoryTax ?? '--'}
        </h3>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1 text-sm font-semibold">Name</th>
              <th className="border px-2 py-1 text-sm font-semibold">SKU</th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Quantity
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Purchase Price
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Margin Percentage
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Margin Type
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Selling Price
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Selling Price (Inc. tax)
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Tax Type
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Product Tax
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Category Tax
              </th>
              <th className="border px-2 py-1 text-sm font-semibold">
                Tax Details
              </th>
            </tr>
          </thead>
          <tbody>
            {props?.item?.productVariableResponses?.map(
              (variable: any, index: any) => (
                <tr key={index}>
                  <td className="border px-2 py-1 text-xs font-normal">
                    {variable?.name ?? '--'}
                  </td>
                  <td className="border px-2 py-1 text-xs font-normal">
                    {variable?.sku ?? '--'}
                  </td>
                  <td className="border px-2 py-1 text-xs font-normal">
                    {variable?.quantity ?? '--'}
                  </td>
                  <td className="border px-2 py-1 text-xs font-normal">
                    {variable?.purchasePrice?.toFixed(2) ?? '0.00'}
                  </td>
                  <td className="border px-2 py-1 text-xs font-normal">
                    {variable?.marginPercentage ?? '--'}
                  </td>
                  <td className="border px-2 py-1 text-xs font-normal">
                    {variable?.marginType ?? '--'}
                  </td>
                  <td className="border px-2 py-1 text-xs font-normal">
                    {variable?.sellingPrice?.toFixed(2) ?? '0.00'}
                  </td>
                  <td className="border px-2 py-1 text-xs font-normal">
                    {variable?.sellingPriceWithTax?.toFixed(2) ?? '0.00'}
                  </td>
                  <td className="border px-2 py-1 text-xs font-normal">
                    {variable?.taxType ?? '--'}
                  </td>
                  <td className="border px-2 py-1 text-xs font-normal">
                    {variable?.productTax ?? '--'}
                  </td>
                  <td className="border px-2 py-1 text-xs font-normal">
                    {variable?.categoryTax ?? '--'}
                  </td>
                  <td className="border px-2 py-1 text-xs font-normal">
                    {variable?.productTaxResponses?.length
                      ? variable.productTaxResponses.map(
                          (tax: any, taxIndex: any) => (
                            <div key={taxIndex} className="p-2">
                              <strong>Tax Name:</strong> {tax?.taxName ?? '--'},
                              <strong> Amount:</strong> {tax?.tax ?? '0.00'}
                            </div>
                          )
                        )
                      : '--'}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex justify-end space-x-4">
        <Button
          onClick={() => props?.setModal(false)}
          name="Close"
          className="bg-primary text-white font-bold py-2 px-4 rounded"
        />
        <Button
          onClick={() => {}}
          name="print"
          className="bg-primary text-white font-bold py-2 px-4 rounded"
        />
      </div>
    </div>
  );
};

export default Index;
