import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  // DatePicker,
  // DropDown,
  // Input,
  // SearchDropDown,
  // Slider,
  // TextArea,
  // Uploader,
} from 'components';
import Input from './components/input';
import DatePicker from './components/DatePicker';
import SearchDropDown from './components/SearchDropDown';
import DropDown from './components/DropDown';
import TextArea from './components/TextArea';
import Uploader from './components/Uploader';
import Slider from './components/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import {
  loadBrandRequested,
  loadCategoriesRequested,
  loadOneCategoryRequested,
  loadOneParentSubCategoryRequested,
  loadSubCategoriesRequested,
  loadTaxsRequested,
  loadUnitsRequested,
  loadVariationsRequested,
  loadVariationValuesRequested,
  loadWarrantiesRequested,
} from 'features';
import { MdDeleteForever } from 'react-icons/md';
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import draftToHtml from 'draftjs-to-html';
import { useNavigate } from 'react-router-dom';
import { stateFromHTML } from 'draft-js-import-html';
export interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
}

export interface Formdata {
  name: string;
  description: string;
  imageUrls: any[];
  images: any[];
  unitId: any;
  categoryId: any;
  subCategoryId: any;
  productType: string;
  warrantyId: any;
  brandId: any;
  productVariableRequests: any[];
}

const MyForm = (props: IFormProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [selectedVariationId, setSelectedVariationId] = React.useState<any>([]);
  const [editorState, setEditorState] = React.useState<any>(
    EditorState.createEmpty()
  );

  const [IsExpiredDateEnabled, setIsExpiredDateEnabled] =
    React.useState<any>(false);
  const [IsWarantyDateEnabled, setIsWarantyDateEnabled] =
    React.useState<any>(false);
  const [IsUnitDateEnabled, setIsUnitDateEnabled] = React.useState<any>(false);

  const [IsBrandDateEnabled, setIsBrandDateEnabled] =
    React.useState<any>(false);
  const [parentcategoryId, setCategoryId] = useState<number>();

  const [formData, setFormData] = React.useState<Formdata>({
    name: '',
    description: '',
    unitId: null,
    brandId: null,
    imageUrls: [],
    images: [],
    categoryId: null,
    subCategoryId: null,
    productType: 'SINGLE',
    warrantyId: null,
    // manufacturedDate: '',
    // expiredDate: '',
    productVariableRequests: [
      {
        variationId: 'SINGLE' === 'SINGLE' ? 1 : null,
        productVariableValueRequests: [],
      },
    ],
  });
  console.log(
    'formDataformData...........................productimage',
    formData
  );
  // const [formData, setFormData] = React.useState<Formdata>({
  //   name: props?.item?.name ? props?.item?.name:'',
  //   description: props?.item?.description || '',
  //   unitId: props?.item?.unitResponse?.id || null,
  //   brandId: props?.item?.brandResponse?.id || null,
  //   image: props?.item?.images || [],
  //   categoryId: props?.item?.categoryResponse?.id || null,
  //   subCategoryId: props?.item?.subCategoryResponse?.id || null,
  //   productType: props?.item?.productType || 'SINGLE',
  //   warrantyId: props?.item?.warrantyResponse?.id || null,
  //   manufacturedDate: props?.item?.manufacturedDate || '',
  //   expiredDate: props?.item?.expiredDate || '',
  //   productVariableRequests: props?.item?.productVariableResponses?.map(
  //     (productVariable: any) => ({
  //       variationId:
  //         productVariable?.variationValueResponse?.id ||
  //         (props?.item?.productType === 'SINGLE' ? 1 : null),
  //       productVariableValueRequests: [
  //         {
  //           marginType: productVariable?.marginType || null,
  //           purchasePrice: productVariable?.purchasePrice || null,
  //           marginPercentage: productVariable?.marginPercentage || null,
  //           sellingPrice: productVariable?.sellingPrice || null,
  //           taxId: productVariable?.productTaxResponse?.id || null,
  //           categoryTax: productVariable?.categoryTax || false,
  //           productTax: productVariable?.productTax || false,
  //           sku: productVariable?.sku || '',
  //           quantity: productVariable?.quantity || null,
  //         },
  //       ],
  //     })
  //   ) || [
  //     {
  //       variationId: 'SINGLE' === 'SINGLE' ? 1 : null,
  //       productVariableValueRequests: [],
  //     },
  //   ],
  // });

  // console.log("thusi",formData);

  const { units, unitLoading }: any = useSelector(
    (state: RootState) => state.unit
  );
  const { categories, parentsubcategory, catLoading }: any = useSelector(
    (state: RootState) => state.category
  );
  const { brands, brandLoading }: any = useSelector(
    (state: RootState) => state.brand
  );
  const { warranties, warrantyLoading }: any = useSelector(
    (state: RootState) => state.warranty
  );
  const { variations, variationValues, variationLoading }: any = useSelector(
    (state: RootState) => state.variation
  );
  const { taxs, taxLoading }: any = useSelector(
    (state: RootState) => state.tax
  );

  const [nameerror, setNameError] = useState<string>(' ');
  const [categoryerror, setCategoryError] = useState<string>(' ');

  useEffect(() => {
    if (props.item?.description) {
      const blocksFromHTML = convertFromHTML(props.item.description);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );

      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [props.item?.description]);


console.log(props.item.purchasePrice
  ,"...........................................props.item");
  React.useEffect(() => {
    if (props?.item) {
      const updatedEditBody = {
        name: props.item?.name,
        description: props.item?.description,
        unitId: props.item?.unitResponse?.id,
        brandId: props.item?.brandResponse?.id,
        imageUrls: props.item?.images,
        images: props.item?.images,
        categoryId: props.item?.categoryResponse?.id,
        subCategoryId: props.item?.subCategoryResponse?.id,
        productType: props.item?.productType,
        warrantyId: props?.item?.warrantyResponse?.id,
        productVariableRequests: props.item?.productVariableResponses?.map(
          (productVariable: any) => ({
            variationId: productVariable?.variationValueResponse?.id,
            productVariableValueRequests: [],
            // variationValueId: selectedId,
            // sku: "",
            // quantity: null,
            // purchasePrice: null,
            // marginType: "FIXED",
            // marginPercentage: null,
            // sellingPrice: null,
            // taxId: null,
            // // taxType: "INCLUSIVE",
            // categoryTax: false,
            // productTax: false,
            // image: "",
          })
        ),

        // productVariableRequests: props.item?.productVariableResponses

        // productVariableRequests: props.item?.productVariableResponses?.map(
        //   (productVariable: any) => ({
        //     variationId: productVariable?.variationValueResponse?.id,
        //     productVariableValueRequests: [
        //       {
        //         marginType: productVariable?.marginType,
        //         purchasePrice: productVariable?.purchasePrice,
        //         marginPercentage: productVariable?.marginPercentage,
        //         sellingPrice: productVariable?.sellingPrice,
        //         taxId: productVariable?.productTaxResponse?.id,
        //         categoryTax: productVariable?.categoryTax,
        //         productTax: productVariable?.productTax,
        //         sku: productVariable?.sku,
        //         quantity: productVariable?.quantity,
        //       },
        //     ],
        //   })
        // ),
      };

      setFormData({ ...updatedEditBody });

      console.log(
        { ...updatedEditBody, id: props?.item?.id },
        'updatedEditBody122'
      );
    }
  }, [props?.item]);

  React.useEffect(() => {
    dispatch(loadUnitsRequested());
    dispatch(loadCategoriesRequested());
    dispatch(loadBrandRequested());
    dispatch(loadWarrantiesRequested());
    dispatch(loadTaxsRequested());
    dispatch(loadVariationsRequested());
    // if (formData.categoryId) {
    //   dispatch(loadOneParentSubCategoryRequested({ id: formData.categoryId }));
    // }
  }, [dispatch]);
  React.useEffect(() => {
    if (formData.categoryId) {
      dispatch(loadOneParentSubCategoryRequested({ id: formData.categoryId }));
    }
  }, [formData.categoryId]);

  React.useEffect(() => {
    if (formData?.name) {
      setNameError('');
    }
    if (formData?.categoryId) {
      setCategoryError('');
    }
  }, [formData.name, formData.categoryId]);

  const handleInputChange = async (
    // e: any
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;


    setFormData((prevBody: any) => ({
      ...prevBody,
      [name]: value,
    }));

  };
  const handleVariationIdChange = (e: any, index: number) => {
    const { value } = e.target;
    // setSelectedVariationId(value);
    dispatch(
      loadVariationValuesRequested({
        id: value,
      })
    );

    setFormData((prevState) => {
      const updatedProductVariableRequests =
        prevState.productVariableRequests.map((item, idx) => {
          if (idx === index) {
            // Update only the variationId for the correct index
            return { ...item, variationId: value };
          }
          return item;
        });

      return {
        ...prevState,
        productVariableRequests: updatedProductVariableRequests,
      };
    });
  };



  const handleSkuChangeSingle = async (
    variationId: number,
    variationValueId: number,
    e: any
  ) => {
    const { name, value } = e.target;

    console.log('objectneshananna', name, value);

    // Create a deep copy of formData to avoid direct state mutation
    const updatedFormData = { ...formData };

    // Find or initialize the variation request by variationId
    let variableRequest = updatedFormData.productVariableRequests.find(
      (vr) => vr.variationId === variationId
    );

    if (!variableRequest) {
      variableRequest = {
        variationId,
        productVariableValueRequests: [],
      };
      updatedFormData.productVariableRequests.push(variableRequest);
    }

    let valueRequest = variableRequest.productVariableValueRequests.find(
      (vr: any) => vr.variationValueId === variationValueId
    );

    if (!valueRequest) {
      valueRequest = {
        variationValueId,
        sku: '',
        quantity: 0,
        purchasePrice: 0,
        marginType: 'FIXED',
        marginPercentage: 0,
        sellingPrice: 0,
        taxId: null,
        categoryTax: false,
        productTax: false,
      };
      variableRequest.productVariableValueRequests.push(valueRequest);
    }

    // Update the value request based on the input type
    if (e.target.files) {
      // Handle file input
      const file = e.target.files[0];
      const getBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      };

      const base64Image = await getBase64(file);
      valueRequest.image = base64Image;
    } else {
      valueRequest[name] = value;
    }

    // Set updated formData in state
    setFormData(updatedFormData);
  };

  const handleSkuChange = async (
    variationId: any,
    variationValueId: any,
    e: any
  ) => {
    const { name, value } = e.target;

    const getBase64 = (file: File) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

    const updatedFormData = { ...formData };

    for (let variableRequest of updatedFormData.productVariableRequests) {
      if (variableRequest.variationId === variationId) {
        for (let valueRequest of variableRequest.productVariableValueRequests) {
          if (valueRequest.variationValueId === variationValueId) {
            if (e.target.files) {
              const file = e.target.files[0];
              const base64Image = await getBase64(file);
              valueRequest.image = base64Image;
            } else {
              valueRequest[name] = value;
            }
            break;
          }
        }
        break;
      }
    }

    setFormData(updatedFormData);
  };

  const handleVariationValueChange = (selectedValues: any, index: number) => {
    const updatedProductVariableRequests = [
      ...formData.productVariableRequests,
    ];

    // Create new productVariableValueRequests based on selectedValues
    const newVariableValueRequests = selectedValues?.target?.value
      ?.map((selectedId: number) => {
        // Check if this variationValueId already exists
        const exists = updatedProductVariableRequests[
          index
        ].productVariableValueRequests.some(
          (item: any) => item.variationValueId === selectedId
        );

        if (!exists) {
          return {
            variationValueId: selectedId,
            sku: '',
            quantity: null,
            purchasePrice: null,
            marginType: 'FIXED',
            marginPercentage: null,
            sellingPrice: null,
            taxId: null,
            // taxType: "INCLUSIVE",
            categoryTax: false,
            productTax: false,
            image: '',
          };
        }

        return null;
      })
      .filter(Boolean);

    updatedProductVariableRequests[index].productVariableValueRequests = [
      ...updatedProductVariableRequests[index].productVariableValueRequests,
      ...newVariableValueRequests,
    ];

    setFormData({
      ...formData,
      productVariableRequests: updatedProductVariableRequests,
    });
  };

  const addNewProductVariable = () => {
    const newProductVariable = {
      variationId: null,
      productVariableValueRequests: [],
    };

    setFormData((prevFormData) => ({
      ...prevFormData,
      productVariableRequests: [
        ...prevFormData.productVariableRequests,
        newProductVariable,
      ],
    }));
  };

  const removeProductVariable = (index: number) => {
    setFormData((prevFormData) => {
      const updatedProductVariableRequests = [
        ...prevFormData.productVariableRequests,
      ];

      updatedProductVariableRequests.splice(index, 1);

      return {
        ...prevFormData,
        productVariableRequests: updatedProductVariableRequests,
      };
    });
  };

  const removeProductVariableValue = (
    productIndex: number,
    variationValueId: number
  ) => {
    setFormData((prevFormData) => {
      const updatedProductVariableRequests = [
        ...prevFormData.productVariableRequests,
      ];

      const updatedProductVariableValueRequests =
        updatedProductVariableRequests[
          productIndex
        ].productVariableValueRequests.filter(
          (item: any) => item.variationValueId !== variationValueId
        );

      updatedProductVariableRequests[productIndex] = {
        ...updatedProductVariableRequests[productIndex],
        productVariableValueRequests: updatedProductVariableValueRequests,
      };

      return {
        ...prevFormData,
        productVariableRequests: updatedProductVariableRequests,
      };
    });
  };

  const removeTaxId = (productIndex: number, taxIdToRemove: number) => {
    setFormData((prevFormData) => {
      const updatedProductVariableRequests = [
        ...prevFormData.productVariableRequests,
      ];

      // Filter out the taxId from the taxIds array
      const updatedTaxId = updatedProductVariableRequests[
        productIndex
      ].productVariableValueRequests.map((valueRequest: any) => ({
        ...valueRequest,
        taxId: valueRequest.taxId.filter(
          (taxId: number) => taxId !== taxIdToRemove
        ),
      }));

      // Update the specific productVariableRequests array
      updatedProductVariableRequests[productIndex] = {
        ...updatedProductVariableRequests[productIndex],
        productVariableValueRequests: updatedTaxId,
      };

      // Return the updated formData
      return {
        ...prevFormData,
        productVariableRequests: updatedProductVariableRequests,
      };
    });
  };


  const [errors, setErrors] = React.useState<{
    name?: string;
    categoryId?: number;
  }>({});


  const handleSubmit = (e: any) => {
    if (!formData.name || formData.name === '') {
      setNameError('Product Name is required');
    }
    if (!formData.categoryId || formData.categoryId === '') {
      setCategoryError('Category is required');
    }
    e.preventDefault();
    console.log('Form submitted with values:', props.item?.id);
    props.onSubmit(formData, props.item?.id || null);
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


  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
      <div className="rounded-md bg-white px-8 pt-8">
        <div className="text-primary text-lg font-semibold">
          General Information
        </div>

        <div className="w-full grid grid-cols-4 gap-4 mt-6">
          <div className="w-full">
            <Input
              name="name"
              value={formData?.name}
              onChange={handleInputChange}
              defaultValue={formData?.name}
              placeholder="Enter Product Name"
              label="Product Name :"
              className="w-full text-sm h-9 border px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
              required
            />
            {nameerror && (
              <div className="text-red-500 text-xs mt-1">{nameerror}</div>
            )}
          </div>
          <div className="w-full">
            <SearchDropDown
              name="categoryId"
              value={formData?.categoryId}
              defaultValue={categories
                ?.filter((cat: any) => cat.id === formData?.categoryId)
                .map((category: any) => ({
                  name: category?.name,
                  value: category?.id,
                }))}
              options={
                categories
                  ? categories.map((cat: any) => ({
                      name: cat?.name,
                      value: cat?.id,
                    }))
                  : []
              }
              required
              onChange={(e) => handleInputChange(e)}
              placeholder="Select a category"
              label="Category :"
            />
          </div>

          <div className="w-full">
            <SearchDropDown
              name="subCategoryId"
              value={formData?.subCategoryId}
              defaultValue={parentsubcategory
                ?.filter(
                  (parentcat: any) => parentcat.id === formData?.subCategoryId
                )
                .map((pcategory: any) => ({
                  name: pcategory?.name,
                  value: pcategory?.id,
                }))}
              options={
                parentsubcategory
                  ? parentsubcategory.map((pcat: any) => ({
                      name: pcat?.name,
                      value: pcat?.id,
                    }))
                  : []
              }
              required
              onChange={(e) => handleInputChange(e)}
              placeholder="Select subcategory"
              label="Sub Category :"
            />
          </div>

          <div className="w-full">
            <SearchDropDown
              name="productType"
              value={formData?.productType}
              defaultValue={[
                {
                  name: 'Single',
                  value: 'SINGLE',
                },
                {
                  name: 'Variable',
                  value: 'VARIABLE',
                },
              ].filter((type) => type.value === formData?.productType)} // Ensure defaultValue is an array
              options={[
                {
                  name: 'Single',
                  value: 'SINGLE',
                },
                {
                  name: 'Variable',
                  value: 'VARIABLE',
                },
              ]}
              required
              onChange={(e) => handleInputChange(e)}
              placeholder="Select a Product Type"
              label="Product Type :"
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-4 gap-4 mt-6">
          <div className="w-full">
            <div className="flex items-center space-x-2 mb-2">
              <input
                id="unit-checkbox"
                onChange={() => setIsUnitDateEnabled(!IsUnitDateEnabled)}
                type="checkbox"
                checked={IsUnitDateEnabled}
                className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
              />
              <label
                htmlFor="unit-checkbox"
                className="text-xs font-semibold text-black"
              >
                Unit :
              </label>
            </div>
            <SearchDropDown
              name="unitId"
              value={
                // units?.find((unit: any) => unit.id === formData?.unitId)
                //   ?.unitName || ''
                formData?.unitId
              }
              options={
                units
                  ? units.map((unit: any) => ({
                      name: unit?.unitName,
                      value: unit?.id,
                    }))
                  : []
              }
              onChange={handleInputChange}
              placeholder="Select a unit"
              className={`transition-opacity duration-300 ${
                !IsUnitDateEnabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!IsUnitDateEnabled}
            />
          </div>



          <div className="w-full">
            <div className="flex items-center space-x-2 mb-2">
              <input
                id="brand-checkbox"
                onChange={() => setIsBrandDateEnabled(!IsBrandDateEnabled)}
                type="checkbox"
                checked={IsBrandDateEnabled}
                className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
              />
              <label
                htmlFor="brand-checkbox"
                className="text-xs font-semibold text-black"
              >
                Brand :
              </label>
            </div>
            <SearchDropDown
              name="brandId"
              value={
                // units?.find((unit: any) => unit.id === formData?.unitId)
                //   ?.unitName || ''
                formData?.brandId
              }
              options={
                brands
                  ? brands.map((brand: any) => ({
                      name: brand?.brandName,
                      value: brand?.id,
                    }))
                  : []
              }
              onChange={handleInputChange}
              placeholder="Select a Brand"
              className={`transition-opacity duration-300 ${
                !IsBrandDateEnabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!IsBrandDateEnabled}
            />
          </div>

          <div className="w-full">
            <div className="flex items-center space-x-2 mb-2">
              <input
                id="warranty-checkbox"
                onChange={() => setIsWarantyDateEnabled(!IsWarantyDateEnabled)}
                type="checkbox"
                checked={IsWarantyDateEnabled}
                className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
              />
              <label
                htmlFor="warranty-checkbox"
                className="text-xs font-semibold text-black"
              >
                Warranty :
              </label>
            </div>
            <SearchDropDown
              name="warrantyId"
              value={
                formData?.warrantyId
                // warranties?.find(
                //   (warranty: any) => warranty.id === formData?.warrantyId
                // )?.warrantyName || ''
              }
              options={
                warranties
                  ? warranties.map((warranty: any) => ({
                      name: warranty?.warrantyName,
                      value: warranty?.id,
                    }))
                  : []
              }
              onChange={IsWarantyDateEnabled ? handleInputChange : undefined}
              disabled={!IsWarantyDateEnabled}
              placeholder="Select a Warranty type"
              className={`transition-opacity duration-300 ${
                !IsWarantyDateEnabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />
          </div>

        </div>

        <div className="w-full bg-white pt-8 grid grid-cols-3 gap-3 ">
          <div className="col-span-2">
            <Editor
              placeholder="Enter Product Description"
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              toolbarClassName="toolbar-class"
              onEditorStateChange={onEditorStateChange}
            />
          </div>

          <div className="col-span-1">
            {!props.item && (
              <Uploader
                name="images"
                className="border border-[#b0afb3] rounded-md p-3"
                alt="Upload Image"
                label="Image:"
                onChange={(result: any) => {
                  if (result.type === 'file') {
                    setFormData({
                      ...formData,
                      images: result.data,
                    });
                  } else if (result.type === 'url') {
                    setFormData({
                      ...formData,
                      imageUrls: result.data,
                    });
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="rounded-md bg-white px-8  pb-12">
        <div className="w-full py-8 flex flex-row gap-2">
          <div className="text-primary text-lg font-semibold">
            Product Variation information
          </div>
        </div>
        {formData?.productType === 'SINGLE' ? (
          <td className="border-b border-gray-200 bg-white text-sm flex flex-col p-2">
            <div className="w-full flex flex-row gap-2 items-start flex-wrap">
              <div className="relative">
                <label className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-200 cursor-pointer overflow-hidden group">
                  {formData?.productVariableRequests[0]
                    ?.productVariableValueRequests[0]?.image ? (
                    <img
                      src={
                        formData?.productVariableRequests[0]
                          ?.productVariableValueRequests[0]?.image
                      }
                      alt="Selected"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-500">+</div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white">Choose</span>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e: any) => handleSkuChangeSingle(1, 1, e)}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex-1 min-w-[120px]">
                {/* <Input
                  name="quantity"
                  value={
                    formData?.productVariableRequests[0]
                      ?.productVariableValueRequests[0]?.quantity
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSkuChangeSingle(1, 1, e)
                  }
                  required
                  placeholder="Quantity"
                  label="Quantity :"
                  type="number"
                  className="w-full text-sm h-10 border border-solid px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                /> */}


<Input
  name="quantity"
  value={
    formData?.productVariableRequests?.[0]?.productVariableValueRequests?.[0]?.quantity ??
    '' 
  }
  defaultValue={
    formData?.productVariableRequests?.[0]?.productVariableValueRequests?.[0]?.quantity ??
    1 
  }
  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    handleSkuChangeSingle(1, 1, e)
  }
  required
  placeholder="Quantity"
  label="Quantity :"
  type="number"
  className="w-full text-sm h-10 border border-solid px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
/>

              </div>

              <div className="flex-1 min-w-[120px] mb-2">
                <Input
                  name="purchasePrice"
                  value={
                    formData?.productVariableRequests[0]
                      ?.productVariableValueRequests[0]?.purchasePrice
                  }
                  defaultValue={props.item.purchasePrice}
                  onChange={(e: any) => handleSkuChangeSingle(1, 1, e)}
                  required
                  placeholder="Purchase Price"
                  label="Purchase Price :"
                  type="number"
                  className="w-full text-sm h-10 border border-solid px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                />
              </div>

              <div className="flex-1 min-w-[120px]">
                <DropDown
                  name="marginType"
                  options={[
                    { name: 'Fixed', value: 'FIXED' },
                    { name: 'Percentage', value: 'PERCENTAGE' },
                  ]}
                  required
                  value={
                    formData?.productVariableRequests[0]
                      ?.productVariableValueRequests[0]?.marginType
                  }
                  onChange={(e: any) => handleSkuChangeSingle(1, 1, e)}
                  placeholder="Margin Type"
                  label="Margin Type :"
                  className="w-full text-sm h-9"
                />
              </div>

              {formData?.productVariableRequests[0]
                ?.productVariableValueRequests[0]?.marginType ===
              'PERCENTAGE' ? (
                <div className="flex-1 min-w-[120px]">
                  <Input
                    name="marginPercentage"
                    value={
                      formData?.productVariableRequests[0]
                        ?.productVariableValueRequests[0]?.marginPercentage
                    }
                    required
                    onChange={(e: any) => handleSkuChangeSingle(1, 1, e)}
                    placeholder="Margin %"
                    label="Margin % :"
                    type="number"
                    className="w-full text-sm h-10 border border-solid px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                  />
                </div>
              ) : (
                <div className="flex-1 min-w-[120px]">
                  <Input
                    name="sellingPrice"
                    value={
                      formData?.productVariableRequests[0]
                        ?.productVariableValueRequests[0]?.sellingPrice
                    }
                    required
                    onChange={(e: any) => handleSkuChangeSingle(1, 1, e)}
                    placeholder="Selling Price"
                    label="Selling Price :"
                    type="number"
                    className="w-full text-sm h-10 border border-solid px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                  />
                </div>
              )}

              <div className="flex-1 min-w-[120px]">
                <SearchDropDown
                  name="taxId"
                  value={
                    formData?.productVariableRequests[0]
                      ?.productVariableValueRequests[0]?.taxId
                  }
                  options={
                    taxs
                      ? taxs.map((tax: any) => ({
                          name: tax?.taxName,
                          value: tax?.id,
                        }))
                      : []
                  }
                  onChange={(e: any) => handleSkuChangeSingle(1, 1, e)}
                  required
                  placeholder="Tax"
                  label="Tax :"
                  remove={(e: any) => {
                    console.log(e, 'removetax');
                  }}
                />
              </div>

              <div className="px-1 flex gap-3 min-w-[120px]">
                <Slider
                  name="categoryTax"
                  label="Category Tax"
                  value={
                    formData?.productVariableRequests[0]
                      ?.productVariableValueRequests[0]?.categoryTax
                  }
                  onChange={(e: any) => handleSkuChangeSingle(1, 1, e)}
                />
                <Slider
                  name="productTax"
                  label="Product Tax"
                  value={
                    formData?.productVariableRequests[0]
                      ?.productVariableValueRequests[0]?.productTax
                  }
                  onChange={(e: any) => handleSkuChangeSingle(1, 1, e)}
                />
              </div>
            </div>
          </td>
        ) : (
          <div className="border rounded-lg border-separate border-tools-table-outline">
            <table className="min-w-full leading-normal rounded-lg">
              <thead className="rounded-lg">
                <tr>
                  <th className="w-10 border-r p-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <Button
                      onClick={addNewProductVariable}
                      name={'+'}
                      className={
                        'text-sm text-white w-fit bg-primary text-center font-[500] py-1 px-2 rounded-md cursor-pointer'
                      }
                    />
                  </th>
                  <th className="w-52 border-r px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Variation
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Variation Values
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData?.productVariableRequests?.map(
                  (item: any, index: number) => (
                    <tr key={index}>
                      <td className="p-3 border-r border-b border-gray-200 bg-white text-sm  justify-center flex-1 h-full">
                        <button
                          onClick={() => removeProductVariable(index)}
                          className="self-center border-red-600 rounded-lg p-1 bg-red-100 justify-center"
                        >
                          <MdDeleteForever size={20} color="red" />
                        </button>
                      </td>

                      <td className="px-5 border-r py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="py-3 rounded-md basis-[20%] grow-0 text-xs">
                          <SearchDropDown
                            name="variationId"
                            value={
                              variations?.find(
                                (vr: any) =>
                                  vr.id ===
                                  formData?.productVariableRequests[index]
                                    ?.variationId
                              )?.variationName || ''

                              // formData?.productVariableRequests[index]
                              //   ?.variationId
                            }
                            options={
                              variations
                                ? variations?.map((location: any) => ({
                                    name: location?.variationName,
                                    value: location?.id,
                                  }))
                                : []
                            }
                            required
                            onChange={(e) => {
                              handleVariationIdChange(e, index);
                            }}
                            placeholder="Select"
                            label="Variation Type :"
                            className="text-sm"
                          />
                        </div>
                        <div className="py-3 rounded-md basis-[20%] w-full text-xs">
                          {variationLoading ? null : (
                            <SearchDropDown
                              name="variationValueId"
                              value={formData?.productVariableRequests[
                                index
                              ]?.productVariableValueRequests.map(
                                (val: any) => val.variationValueId
                              )}
                              options={
                                variationValues
                                  ? variationValues?.map((val: any) => ({
                                      name: val?.value,
                                      value: val?.id,
                                    }))
                                  : []
                              }
                              required
                              onChange={(selectedValues: any) => {
                                handleVariationValueChange(
                                  selectedValues,
                                  index
                                );
                              }}
                              placeholder="Select"
                              label="Variation value :"
                              multiSelect={true}
                              remove={(e: any) =>
                                removeProductVariableValue(index, e)
                              }
                            />
                          )}
                        </div>
                      </td>
                      {item?.productVariableValueRequests?.map(
                        (item: any, key: number) => (
                          <td
                            key={key}
                            className="border-b border-gray-200 bg-white text-sm flex flex-col p-2"
                          >
                            <div className="w-full flex flex-row gap-2 items-start flex-wrap">
                              <div className="relative ">
                                <label className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-200 cursor-pointer overflow-hidden group">
                                  {formData?.productVariableRequests[index]
                                    ?.productVariableValueRequests[key]
                                    ?.image ? (
                                    <img
                                      src={
                                        formData?.productVariableRequests[index]
                                          ?.productVariableValueRequests[key]
                                          ?.image
                                      }
                                      alt="Selected"
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="text-gray-500">+</div>
                                  )}

                                  {/* Hover effect */}
                                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white">Choose</span>
                                  </div>

                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e: any) =>
                                      handleSkuChange(
                                        formData?.productVariableRequests[index]
                                          ?.variationId,
                                        formData?.productVariableRequests[index]
                                          ?.productVariableValueRequests[key]
                                          ?.variationValueId,
                                        e
                                      )
                                    }
                                    className="hidden"
                                  />
                                </label>
                              </div>

                              <div className="flex-1 min-w-[120px]">
                                <Input
                                  name="quantity"
                                  value={
                                    formData?.productVariableRequests[index]
                                      ?.productVariableValueRequests[key]
                                      ?.quantity
                                  }
                                  onChange={(e: any) =>
                                    handleSkuChange(
                                      formData?.productVariableRequests[index]
                                        ?.variationId,
                                      formData?.productVariableRequests[index]
                                        ?.productVariableValueRequests[key]
                                        ?.variationValueId,
                                      e
                                    )
                                  }
                                  required
                                  placeholder="Quantity"
                                  label="Quantity :"
                                  type="number"
                                  className="w-full text-sm h-10 border border-solid  px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                                />
                              </div>

                              {/* Purchase Price Field */}
                              <div className="flex-1 min-w-[120px]">
                                <Input
                                  name="purchasePrice"
                                  value={
                                    formData?.productVariableRequests[index]
                                      ?.productVariableValueRequests[key]
                                      ?.purchasePrice
                                  }
                                  onChange={(e: any) =>
                                    handleSkuChange(
                                      formData?.productVariableRequests[index]
                                        ?.variationId,
                                      formData?.productVariableRequests[index]
                                        ?.productVariableValueRequests[key]
                                        ?.variationValueId,
                                      e
                                    )
                                  }
                                  required
                                  placeholder="Purchase Price"
                                  label="Purchase Price :"
                                  type="number"
                                  className="w-full text-sm h-10 border border-solid  px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                                />
                              </div>

                              <div className="flex-1 min-w-[120px]">
                                <DropDown
                                  name="marginType"
                                  options={[
                                    {
                                      name: 'Fixed',
                                      value: 'FIXED',
                                    },
                                    {
                                      name: 'Percentage',
                                      value: 'PERCENTAGE',
                                    },
                                  ]}
                                  required
                                  value={
                                    formData?.productVariableRequests[index]
                                      ?.productVariableValueRequests[key]
                                      ?.marginType
                                  }
                                  onChange={(e: any) =>
                                    handleSkuChange(
                                      formData?.productVariableRequests[index]
                                        ?.variationId,
                                      formData?.productVariableRequests[index]
                                        ?.productVariableValueRequests[key]
                                        ?.variationValueId,
                                      e
                                    )
                                  }
                                  placeholder="Margin Type"
                                  label="Margin Type :"
                                  className="w-full text-sm h-10"
                                />
                              </div>

                              {formData?.productVariableRequests[index]
                                ?.productVariableValueRequests[key]
                                ?.marginType === 'PERCENTAGE' ? (
                                <div className="flex-1 min-w-[120px]">
                                  <Input
                                    name="marginPercentage"
                                    value={
                                      formData?.productVariableRequests[index]
                                        ?.productVariableValueRequests[key]
                                        ?.marginPercentage
                                    }
                                    required
                                    onChange={(e: any) =>
                                      handleSkuChange(
                                        formData?.productVariableRequests[index]
                                          ?.variationId,
                                        formData?.productVariableRequests[index]
                                          ?.productVariableValueRequests[key]
                                          ?.variationValueId,
                                        e
                                      )
                                    }
                                    placeholder="Margin %"
                                    label="Margin % :"
                                    type="number"
                                    className="w-full text-sm h-10 border border-solid  px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                                  />
                                </div>
                              ) : (
                                <div className="flex-1 min-w-[120px]">
                                  <Input
                                    name="sellingPrice"
                                    value={
                                      formData?.productVariableRequests[index]
                                        ?.productVariableValueRequests[key]
                                        ?.sellingPrice
                                    }
                                    required
                                    onChange={(e: any) =>
                                      handleSkuChange(
                                        formData?.productVariableRequests[index]
                                          ?.variationId,
                                        formData?.productVariableRequests[index]
                                          ?.productVariableValueRequests[key]
                                          ?.variationValueId,
                                        e
                                      )
                                    }
                                    placeholder="Selling Price"
                                    label="Selling Price :"
                                    type="number"
                                    className="w-full text-sm h-10 border border-solid  px-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                                  />
                                </div>
                              )}

                              <div className="flex-1 min-w-[120px]">
                                <DropDown
                                  name="taxId"
                                  options={
                                    taxs
                                      ? taxs.map((tax: any) => ({
                                          name: tax?.taxName,
                                          value: tax?.id,
                                        }))
                                      : []
                                  }
                                  required
                                  value={
                                    taxs?.find(
                                      (tax: any) =>
                                        tax.id ===
                                        formData?.productVariableRequests[0]
                                          ?.productVariableValueRequests[0]
                                          ?.taxId
                                    )?.taxName || ''
                                  }
                                  onChange={(e: any) =>
                                    handleSkuChange(
                                      formData?.productVariableRequests[index]
                                        ?.variationId,
                                      formData?.productVariableRequests[index]
                                        ?.productVariableValueRequests[key]
                                        ?.variationValueId,
                                      e
                                    )
                                  }
                                  placeholder="Tax"
                                  label="Tax :"
                                  className="w-full text-sm h-10"
                                />
                              </div>

                              <div className="px-1 flex gap-3 min-w-[120px]">
                                <Slider
                                  name="categoryTax"
                                  label="Category Tax"
                                  value={
                                    formData?.productVariableRequests[index]
                                      ?.productVariableValueRequests[key]
                                      ?.categoryTax
                                  }
                                  onChange={(e: any) =>
                                    handleSkuChange(
                                      formData?.productVariableRequests[index]
                                        ?.variationId,
                                      formData?.productVariableRequests[index]
                                        ?.productVariableValueRequests[key]
                                        ?.variationValueId,
                                      e
                                    )
                                  }
                                />
                                <Slider
                                  name="productTax"
                                  label="Product Tax"
                                  value={
                                    formData?.productVariableRequests[index]
                                      ?.productVariableValueRequests[key]
                                      ?.productTax
                                  }
                                  onChange={(e: any) =>
                                    handleSkuChange(
                                      formData?.productVariableRequests[index]
                                        ?.variationId,
                                      formData?.productVariableRequests[index]
                                        ?.productVariableValueRequests[key]
                                        ?.variationValueId,
                                      e
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </td>
                        )
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="py-8 w-full flex justify-end p-5 gap-4">
        <Button
          onClick={() => navigation(-1)}
          name={'Cancel'}
          className="text-black bg-white border-black p-2 w-[100px] rounded-md"
        />
        <Button
          type={'submit'}
          name={'Save'}
          className="text-white bg-primary py-2 px-4 w-[100px]  rounded-md"
        />
      </div>
    </form>
  );
};

export default MyForm;
