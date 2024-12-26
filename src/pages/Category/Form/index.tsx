import { AnyAction } from '@reduxjs/toolkit';
import { Button, Input, SearchDropDown } from 'components';
import { updateImageCategoryRequested } from 'features';
import { withFormik, FormikProps } from 'formik';
import { Camera } from 'lucide-react';
import Uploader from 'pages/Products/Form/components/Uploader';
import React, { act, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/reducer';
import { string, object, array, number, boolean, mixed } from 'yup';

export interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
  setModal?: any;
}

interface FormikValues {
  name: string;
  uniCode: string;
  parentId: number;
  featuredCategory: string;
  ageRestriction: boolean;
  image: any;
}

function Form(props: FormikProps<FormikValues> & IFormProps) {
  console.log('object', props.item);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  // const [preview, setPreview] = useState<string | null>(null);

  const { categories } = useSelector((state: RootState) => state.category);
  const [parentChecked, setParentChecked] = React.useState(
    props?.values?.parentId ? true : false
  );

  async function cancelForm() {
    props?.setModal(false);
    props?.resetForm();
  }

  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setPreview(reader.result as string);
        if (props?.item?.id) {
          await dispatch(
            updateImageCategoryRequested({
              id: props.item.id,
              image: file,
            })
          );
        } else {
          props?.setFieldValue('image', file);
        }
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
      reader.onloadend = async () => {
        setPreview(reader.result as string);
        if (props?.item?.id) {
          await dispatch(
            updateImageCategoryRequested({
              id: props.item.id,
              image: file,
            })
          );
        } else {
          props?.setFieldValue('image', file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  if (props?.isSubmitting) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={props.handleSubmit} className="w-full">
        <div className="flex flex-col gap-3">
          <div className="rounded-md text-xs">
            <Input
              name="name"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              defaultValue={props?.item?.name ?? undefined}
              placeholder="Enter Category Name"
              label="Name :"
              className={
                'flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]'
              }
            />
          </div>
          <div className="py-1 rounded-md text-xs">
            <Input
              name="uniCode"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              defaultValue={props?.item?.uniCode ?? undefined}
              placeholder="Enter Unique Category code..."
              label="Code :"
              className={
                'flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]'
              }
            />
          </div>
          <div className="flex gap-3 items-center px-2">
            <input
              type="checkbox"
              defaultChecked={props?.values?.parentId ? true : false}
              onChange={(e) => {
                console.log(e.target.checked);
                if (e.target.checked) {
                  setParentChecked(true);
                } else {
                  setParentChecked(false);
                  props.setFieldValue('parentId', undefined);
                }
              }}
              // checked={props?.values?.parentId  ? true : false}
            />{' '}
            <div className="text-xs">is a child category</div>
          </div>
          {(props?.values?.parentId || parentChecked) && (
            <div className="py-3 rounded-md w-full text-xs">
              <SearchDropDown
                name="parentId"
                values={props.values}
                options={
                  categories
                    ? categories?.map((category: any) => ({
                        name: category?.name,
                        value: category?.id,
                      }))
                    : []
                }
                onChange={props.handleChange}
                errors={props.errors}
                touches={props.touched}
                placeholder="Select Parent Category"
                label="Parent Category :"
              />
            </div>
          )}

          <div className="py-3">
            <label className="text-xs text-[11px] font-bold text-black">
              Featured Category:
            </label>
            <select
              name="featuredCategory"
              value={props.values.featuredCategory || ''}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              className="block w-full px-2 mt-2 py-2 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
            >
              <option value="">Select Featured Category</option>
              <option value="HERO">Hero</option>
              <option value="THUMBNAIL">Thumbnail</option>
              <option value="NONE">None</option>
            </select>
            {props.touched.featuredCategory && props.errors.featuredCategory ? (
              <div className="text-red-600 text-xs mt-1">
                {props.errors.featuredCategory}
              </div>
            ) : null}
          </div>
          <div className="py-3 rounded-md w-full text-xs">
            <label className="text-sm font-medium">
              Age Restriction:
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  name="ageRestriction"
                  checked={props.values.ageRestriction || false}
                  onChange={props.handleChange}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="text-sm">Restrict Content by Age</span>
              </div>
            </label>
            {props.errors.ageRestriction && props.touched.ageRestriction && (
              <p className="text-red-500 text-xs mt-1">
                {props.errors.ageRestriction}
              </p>
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
        <div className="py-4 flex justify-end gap-4">
          <Button
            onClick={cancelForm}
            name="Cancel"
            className="text-sm text-black bg-white text-center font-[500] p-2 w-[100px] rounded-md border-[1px] border-black cursor-pointer"
          />
          <Button
            type="submit"
            name="Save"
            className="text-sm text-white w-fit bg-primary text-center font-[500] py-2 px-4 rounded-md cursor-pointer"
            loading={props.isSubmitting}
            onClick={props.handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}

export default withFormik<IFormProps, FormikValues>({
  validationSchema: object().shape({
    name: string().required('Name is required'),
    uniCode: string().required('Unicode is required'),
    featuredCategory: string()
      .oneOf(['HERO', 'THUMBNAIL', 'NONE'], 'Invalid selection')
      .required('Featured Category is required'),
    ageRestriction: boolean().required('Age Restriction is required'),
    parentId: number().nullable(),
    image: mixed().nullable(),
  }),
  mapPropsToValues: ({ item }: any) => ({
    id: item?.id ?? undefined,
    name: item?.name ?? '',
    uniCode: item?.uniCode ?? '',
    featuredCategory: item?.featuredCategory ?? 'NONE',
    ageRestriction: item?.ageRestriction ?? false,
    parentId: item?.parentResponse ? item?.parentResponse?.id : null,
    image: item?.image ?? null,
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values, { setSubmitting });
  },
  enableReinitialize: true,
  validateOnBlur: false,
})(Form);
