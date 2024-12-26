import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Button, Modal } from 'components';
import ProductImagesForm from 'pages/Products/ProductImagesForm';
import { loadProductImagesRequested } from 'features';

export interface IUploadProps {
  name: string;
  label?: string;
  onChange?: (value: {
    type: 'file' | 'url';
    data: FileList | File[] | string[];
  }) => void;
  value?: any;
  className?: string;
  placeholder?: string;
  alt?: string;
  required?: boolean;
  tooltip?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  onBlur?: () => void;
}

export default function Uploader(props: IUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [viewModal, setViewModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploadType, setUploadType] = useState<'file' | 'url'>('file');
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const previewUrl = URL.createObjectURL(fileArray[0]);
      setImagePreview(previewUrl);
      setUploadType('file');

      if (props.onChange) {
        props.onChange({ type: 'file', data: fileArray });
      }
    } else {
      setImagePreview(null);
      if (props.onChange) {
        props.onChange({ type: 'file', data: [] });
      }
    }
  };

  const handleSelectedImages = (selectedUrls: string[]) => {
    setSelectedImages(selectedUrls);
    setUploadType('url');

    if (selectedUrls && selectedUrls.length > 0) {
      setImagePreview(selectedUrls[0]);
      if (props.onChange) {
        props.onChange({ type: 'url', data: selectedUrls });
      }
    }
  };

  const handleSearchClick = () => {
    dispatch(loadProductImagesRequested({ name: props.name }));
    setViewModal(true);
  };

  const clearImage = () => {
    setImagePreview(null);
    setSelectedImages([]);

  
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (props.onChange) {
      props.onChange({
        type: uploadType,
        data: uploadType === 'file' ? [] : [],
      });
    }
  };

  return (
    <div className="flex flex-col justify-start items-start gap-2 relative">
      <label htmlFor={props.name} className="text-[13px] font-bold text-black">
        {props.label}
        {props.required && <span className="text-red-500 text-sm">*</span>}
        {props.tooltip && (
          <a
            className="text-primary dark:text-primary-400 self-center ml-1"
            title={props.tooltip}
          >
            <RiErrorWarningFill size={15} />
          </a>
        )}
      </label>

      <div className="h-40 w-full rounded-xl overflow-hidden border border-[#b0afb3] relative flex flex-col justify-center items-center gap-1">
        {imagePreview ? (
          <>
            <img
              src={imagePreview}
              alt={props?.alt ?? 'preview'}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <button
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-md"
              onClick={clearImage}
            >
              X
            </button>
          </>
        ) : (
          <div className="h-16 w-16 rounded-full object-center bg-[#E1E5E9] flex justify-center items-center">
            <img
              src="/default-image.png"
              alt="default_image"
              className="w-6 h-6 object-cover object-center"
            />
          </div>
        )}

        <input
          ref={fileInputRef} 
          disabled={props.disabled}
          className="hidden"
          id={props.name || 'product_image'}
          placeholder={props.placeholder}
          name={props.name || 'product_image'}
          onChange={handleFileChange}
          autoFocus={props.autoFocus}
          onBlur={props.onBlur}
          type="file"
          accept="image/*"
          multiple
        />
      </div>

      <div className="flex justify-between items-center w-full mt-2">
        <div className="text-[12px] font-bold text-white bg-gray-800 text-center p-2 w-[100px] rounded-md cursor-pointer h-8 flex justify-center items-center">
          <label
            htmlFor={props.name || 'product_image'}
            className="cursor-pointer"
          >
            Select file
          </label>
        </div>
        <Button onClick={handleSearchClick} name="Search Images" />
      </div>

      {viewModal && (
        <Modal
          isOpen={viewModal}
          title="Select product images"
          content={
            <ProductImagesForm
              setModal={setViewModal}
              onImageSelect={handleSelectedImages}
              selectedImageUrls={selectedImages}
            />
          }
          setISOpen={setViewModal}
        />
      )}
    </div>
  );
}
