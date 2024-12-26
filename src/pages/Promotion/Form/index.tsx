import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store/reducer';

import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';
import Input from 'pages/Products/Form/components/input';
import TextArea from 'pages/Products/Form/components/TextArea';
import { MdDeleteForever } from 'react-icons/md';
import { Button, Modal } from 'components';
import {
  loadBusinessLocationsRequested,
  loadDiscountsRequested,
  loadShopProductSearchFilterRequested,
  productSearch,
} from 'features';
import Warning from 'assets/images/svg/Warning/Warning';
import DropDown from 'pages/Products/Form/components/DropDown';
import {
  DISCOUNT,
  PROMOTION,
  STOCKADJUSTMENTS,
  STOCKTRANSFER,
} from 'constants/routes';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ErrorMessage, Field, FormikProps, withFormik } from 'formik';
import DateTimePicker from 'components/shared/DateTimePicker';
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import Uploader from 'pages/Products/Form/components/Uploader';
import { Camera } from 'lucide-react';

interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
}

interface StockTransferFormValues {
  promotionIds: [];
  name: string;
  image: any;
}

// function Form(props: IFormProps) {
function Form(props: IFormProps & FormikProps<StockTransferFormValues>) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    // handleSubmit,
    setFieldValue,
  } = props;

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [editorState, setEditorState] = React.useState<any>(
    EditorState.createEmpty()
  );
  const [formData, setFormData] = useState<any>({
    name: '',
    promotionIds: [],
    image: null,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {} = useSelector((state: RootState) => state.stocktransfer);
  const { discounts } = useSelector((state: RootState) => state.discount);
console.log("............................",discounts);
  useEffect(() => {
    dispatch(loadDiscountsRequested());
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onEditorStateChange = (newEditorState: any) => {
    setEditorState(newEditorState);
    setFormData((prevBody: any) => ({
      ...prevBody,
      description: newEditorState
        ? draftToHtml(convertToRaw(newEditorState.getCurrentContent()))
        : '',
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormSubmitted(true);

    const isnameValid = formData.name.trim() !== '';
    const isBusinessLocationValid = formData.promotionIds.length > 0;

    if (!isBusinessLocationValid || !isnameValid) {
      !isnameValid && setFieldValue('name', '');
      !isBusinessLocationValid && setFieldValue('promotionIds', []);

      return;
    }

    props.onSubmit(formData, props.item ? props.item.id : null);
  };

  useEffect(() => {
    if (props.item) {
      setFormData({
        promotionIds: props.item.promotionIds || [],
        name: props.item.name || 0,
      });
    }
  }, [props.item]);

  
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setPreview(reader.result as string);
       
          props?.setFieldValue('image', file);
        
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreview(null);
    props.setFieldValue('image', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  return (
  
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="rounded-md bg-white p-8 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-sm">
        {/* Name Field */}
        <div className="flex flex-col gap-2">
          <Input
            name="name"
            value={formData.name}
            errors={props.errors}
            onChange={handleInputChange}
            onBlur={props.handleBlur}
            touches={props.touched}
            defaultValue={props.item?.name ?? ''}
            placeholder="Enter Discount Name"
            label="Promotion Name:"
            className="w-full px-4 py-2 border border-[#b0afb3] rounded-md text-xs focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
          />
        </div>

        {/* Promotion IDs Field */}
        <div className="flex flex-col gap-2">
          <SearchDropDown
            name="promotionIds"
            value={formData?.promotionIds}
            options={
              discounts
                ? discounts?.map((dis: any) => ({
                    name: dis?.discountName,
                    value: dis?.id,
                  }))
                : []
            }
            required
            onChange={handleInputChange}
            placeholder="Select Discounts"
            label="Discounts:"
            multiSelect={true}
          />
          {formSubmitted && formData.promotionIds.length === 0 && (
            <span className="text-red-500 text-xs mt-1">
              Business Location required
            </span>
          )}
        </div>
        <div>
            <div
              className={`relative w-full rounded-lg border-2 border-dashed 
          ${
            dragActive
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 bg-gray-50'
          } 
          transition-colors duration-200 ease-in-out`}
            
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
          </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 p-4">
        <Button
          name="Cancel"
          onClick={() => {
            navigation(PROMOTION);
            window.location.reload();
          }}
          className="text-xs text-black bg-gray-200 border border-gray-300 text-center font-medium py-2 px-6 rounded-md cursor-pointer"
        />

        <Button
          name={props.item ? 'Update' : 'Save'}
          type="submit"
          className="text-xs text-white bg-primary text-center font-medium py-2 px-6 rounded-md cursor-pointer"
        />
      </div>
    </form>
  );
}

export default withFormik<IFormProps, StockTransferFormValues>({
  validationSchema: Yup.object().shape({
    // date: Yup.date().required("Date is required"),
    promotionIds: Yup.number()
      .positive('Please select a business location')
      .required('Business location is required'),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values, { setSubmitting });
  },
  enableReinitialize: true,
  validateOnBlur: true,
  validateOnChange: true,
})(Form);
