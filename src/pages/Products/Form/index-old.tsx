import {
  Button,
  DatePicker,
  DropDown,
  Input,
  SearchDropDown,
  TextArea,
  Uploader,
} from "components";
import {
  loadBrandRequested,
  loadCategoriesRequested,
  loadUnitsRequested,
  loadWarrantiesRequested,
} from "features";
import { withFormik, FormikProps } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/reducer";
import { array, number, object, string } from "yup";
import ProductVariableForm from "../ProductVariableForm";
import { IoMdClose } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";

export interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
}

interface FormikValues {
  name: string;
  description: string;
  image: string;
  unitId: number;
  categoryId: number;
  productType: string;
  warrantyId: number;
  brandId: number;
  productVariableRequests: any[];
  manufacturedDate: any;
  expiredDate: any;
}

function Form(props: FormikProps<FormikValues> & IFormProps) {
  const dispatch = useDispatch();
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const [productVariable, setProductVariable] = React.useState<any>();
  const [editForm, setEditForm] = React.useState(false);

  const { units, unitLoading } = useSelector((state: RootState) => state.unit);

  const { categories, catLoading } = useSelector(
    (state: RootState) => state.category
  );
  const { brands, brandLoading } = useSelector(
    (state: RootState) => state.brand
  );
  const { warranties, warrantyLoading } = useSelector(
    (state: RootState) => state.warranty
  );

  function addVariation(values: any) {
    props?.setFieldValue("productVariableRequests", [
      ...props?.values?.productVariableRequests,
      values,
    ]);
  }

  console.log(props?.errors);

  async function cancelForm() {
    props?.resetForm();
  }

  useEffect(() => {
    dispatch(loadUnitsRequested());
    dispatch(loadCategoriesRequested());
    dispatch(loadBrandRequested());
    dispatch(loadWarrantiesRequested());
  }, [dispatch]);

  const onEditorStateChange = (newEditorState: any) => {
    setEditorState(newEditorState);

    // Note - this will convert into HTML Format (use this for sending data to backend)

    // console.log(draftToHtml(convertToRaw(newEditorState?.getCurrentContent())));
  };

  if (unitLoading || catLoading || brandLoading || warrantyLoading) {
    return <div></div>;
  }

  return (
    <div className="w-full">
      <form
        onSubmit={props.handleSubmit}
        className="w-full flex flex-col gap-5"
      >
        <div className=" bg-white px-8 pt-8 pb-12">
          <div className="text-primary text-lg font-semibold">
            General Information
          </div>
          <div className="w-full grid grid-cols-3 gap-3 ">
            <div className="py-3 rounded-md w-full text-xs">
              <Input
                name="name"
                values={props.values}
                errors={props.errors}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                touches={props.touched}
                defaultValue={props?.item?.name ?? undefined}
                placeholder="Enter Product Name"
                label="Product Name :"
                className={
                  "flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] "
                }
              />
            </div>
            <div className="py-3 rounded-md w-full text-xs">
              <SearchDropDown
                name="unitId"
                values={props.values}
                options={
                  units
                    ? units?.map((unit: any) => ({
                        name: unit?.unitName,
                        value: unit?.id,
                      }))
                    : []
                }
                onChange={props.handleChange}
                errors={props.errors}
                touches={props.touched}
                onBlur={props.handleBlur}
                placeholder="Select a unit"
                label="Unit :"
              />
            </div>
            <div className="py-3 rounded-md w-full text-xs">
              <SearchDropDown
                name="categoryId"
                values={props.values}
                options={
                  categories
                    ? categories?.map((cat: any) => ({
                        name: cat?.name,
                        value: cat?.id,
                      }))
                    : []
                }
                onChange={props.handleChange}
                errors={props.errors}
                touches={props.touched}
                onBlur={props.handleBlur}
                placeholder="Select a category"
                label="Category :"
              />
            </div>
            <div className="py-3 rounded-md w-full text-xs">
              <SearchDropDown
                name="brandId"
                values={props.values}
                options={
                  brands
                    ? brands?.map((cat: any) => ({
                        name: cat?.brandName,
                        value: cat?.id,
                      }))
                    : []
                }
                onChange={props.handleChange}
                errors={props.errors}
                touches={props.touched}
                onBlur={props.handleBlur}
                placeholder="Select a Brand"
                label="Brand :"
              />
            </div>
            <div className="py-3 rounded-md w-full text-xs">
              <SearchDropDown
                name="warrantyId"
                values={props.values}
                options={
                  warranties
                    ? warranties?.map((warranty: any) => ({
                        name: warranty?.warrantyName,
                        value: warranty?.id,
                      }))
                    : []
                }
                onChange={props.handleChange}
                errors={props.errors}
                touches={props.touched}
                onBlur={props.handleBlur}
                placeholder="Select a Warranty type"
                label="Warranty :"
              />
            </div>
            <div className="py-3 rounded-md w-full text-xs">
              <DropDown
                name="productType"
                values={props.values}
                options={[
                  {
                    name: "Single",
                    value: "SINGLE",
                  },
                  {
                    name: "Variable",
                    value: "VARIABLE",
                  },
                ]}
                onChange={props.handleChange}
                errors={props.errors}
                touches={props.touched}
                onBlur={props.handleBlur}
                placeholder="Select a Product type"
                label="Product Type :"
              />
            </div>
            <div className="py-3 rounded-md w-full text-xs">
              <DatePicker
                name="manufacturedDate"
                values={props.values}
                errors={props.errors}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                placeholder="Select a manufactured date"
                label="Manufactured Date : "
                className={
                  "flex items-center appearance-none w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] "
                }
              />
            </div>
            {props?.values?.manufacturedDate && (
              <div className="py-3 rounded-md w-full text-xs">
                <DatePicker
                  name="expiredDate"
                  values={props.values}
                  errors={props.errors}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  placeholder="Select a Expiry date"
                  label="Expiry Date : "
                  className={
                    "flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] "
                  }
                  min={props?.values?.manufacturedDate}
                />
              </div>
            )}
          </div>
          <div className="w-full bg-white pt-8 grid grid-cols-3 gap-3 ">
            <div className="col-span-2">
              {/* <TextArea
                name="description"
                values={props.values}
                errors={props.errors}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                touches={props.touched}
                defaultValue={props?.item?.name ?? undefined}
                placeholder="Enter Product Description"
                label="Product Description :"
                className={
                  "flex items-center w-full px-2 h-40 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] no-scrollbar"
                }
              /> */}
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                toolbarClassName="toolbar-class"
                onEditorStateChange={onEditorStateChange}
              />
            </div>
            <div className="col-span-1">
              <Uploader
                name="image"
                values={props?.values}
                className={""}
                errors={props?.errors}
                alt={"Product Image"}
                label="Product Image :"
                onChange={(event) => {
                  console.log(event);
                  const image = event;
                  props.setFieldValue("image", image);
                }}
                onBlur={props.handleBlur}
                touches={props?.touched}
              />
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="w-full px-8 py-8">
            <div className="text-primary text-lg font-semibold">
              Product Variation information
            </div>
            <div className="w-full py-4 flex flex-col gap-3">
              {props?.values?.productVariableRequests?.length > 0 && (
                <div className="w-full">
                  {props?.values?.productVariableRequests?.map((item: any) => (
                    <div className="w-full py-3 flex relative h-40">
                      <div className="absolute flex gap-2 right-2 top-4 bg-red-50">
                        <MdEdit
                          className="h-6 w-6 cursor-pointer"
                          onClick={() => {
                            setEditForm(true);
                            setProductVariable(item);
                          }}
                        />
                        <IoMdClose
                          className="h-6 w-6 cursor-pointer"
                          onClick={() =>
                            props.setFieldValue(
                              "productVariableRequests",
                              props?.values?.productVariableRequests?.filter(
                                (i: any) => i?.id !== item?.id
                              )
                            )
                          }
                        />
                      </div>
                      <ProductVariableForm
                        item={item}
                        onSubmit={addVariation}
                        currentValues={props?.values?.productVariableRequests}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={`w-full`}>
              <ProductVariableForm
                currentValues={props?.values?.productVariableRequests}
                onSubmit={addVariation}
              />
            </div>
          </div>
        </div>
        <div className="py-8 w-full flex justify-center gap-4">
          <div>
            <Button
              onClick={cancelForm}
              name={"Cancel"}
              className={
                "text-sm text-black bg-white text-center font-[500] p-2 w-[100px] rounded-md border-[1px] border-black cursor-pointer"
              }
            />
          </div>
          <div>
            <Button
              type={"submit"}
              name={"Save"}
              className={
                "text-sm text-white w-fit bg-primary text-center font-[500] py-2 px-4 rounded-md cursor-pointer"
              }
              loading={props.isSubmitting}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default withFormik<IFormProps, FormikValues>({
  validationSchema: object().shape({
    name: string().required("Product name is required!"),
    description: string().required("Product description is required!"),
    image: string(),
    unitId: number().required("Unit is required!"),
    categoryId: number().required("Category is required!"),
    productType: string().required("Product type is required!"),
    warrantyId: number().required("Warranty is required!"),
    brandId: number().required("Brand is required!"),
    productVariableRequests: array()
      .when("productType", {
        is: "SINGLE",
        then: (schema) =>
          schema.max(1, "Only one variation is required for single product!"),
      })
      .min(1, "At least one variation is required!"),
    expiredDate: string().required("Please select the expiry date!"),
    manufacturedDate: string().required("Please select the manufacture date!"),
  }),
  mapPropsToValues: ({ item }: any) => ({
    name: item?.name ?? undefined,
    description: item?.description ?? undefined,
    image: item?.image ?? undefined,
    unitId: item?.unitResponse?.id ?? undefined,
    categoryId: item?.categoryResponse?.id ?? undefined,
    productType: item?.productType ?? "SINGLE",
    warrantyId: item?.warrantyResponse?.id ?? undefined,
    brandId: item?.brandResponse?.id ?? undefined,
    productVariableRequests: item?.productVariableResponses ?? [],
    expiredDate: item?.expiredDate ?? undefined,
    manufacturedDate: item?.manufacturedDate ?? undefined,
  }),
  handleSubmit: (values, { props, ...actions }) => {
    props.onSubmit(values, actions);
    console.log(values);
  },
})(Form);
