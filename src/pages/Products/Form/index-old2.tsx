import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Button,
  DatePicker,
  DropDown,
  Input,
  SearchDropDown,
  Slider,
  TextArea,
  Uploader,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/reducer";
import {
  loadBrandRequested,
  loadCategoriesRequested,
  loadTaxsRequested,
  loadUnitsRequested,
  loadVariationsRequested,
  loadVariationValuesRequested,
  loadWarrantiesRequested,
} from "features";
import { MdDeleteForever } from "react-icons/md";

export interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
}
const initialValues = {
  name: "",
  description: "",
  unitId: null,
  brandId: null,
  categoryId: null,
  subCategoryId: null,
  productType: "SINGLE",
  warrantyId: null,
  manufacturedDate: "",
  expiredDate: "",
  productVariableRequests: [
    {
      variationId: null,
      productVariableValueRequests: [
        {
          variationValueId: null,
          sku: "",
          quantity: null,
          purchasePrice: null,
          marginType: "",
          marginPercentage: null,
          sellingPrice: null,
          taxIds: [null],
          taxType: "",
          categoryTax: true,
          productTax: true,
        },
      ],
    },
  ],
};

const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required!"),
  description: Yup.string().required("Product description is required!"),
  image: Yup.string(),
  unitId: Yup.number().required("Unit is required!"),
  categoryId: Yup.number().required("Category is required!"),
  productType: Yup.string().required("Product type is required!"),
  warrantyId: Yup.number().required("Warranty is required!"),
  brandId: Yup.number().required("Brand is required!"),
  productVariableRequests: Yup.array().of(
    Yup.object().shape({
      variationId: Yup.number().required("Variation ID is required!"),
      productVariableValueRequests: Yup.array().of(
        Yup.object().shape({
          variationValueId: Yup.number().required(
            "Variation value ID is required!"
          ),
          sku: Yup.string().required("SKU is required!"),
          quantity: Yup.number().required("Quantity is required!"),
          purchasePrice: Yup.number().required("Purchase price is required!"),
          marginType: Yup.string().required("Margin type is required!"),
          marginPercentage: Yup.number().required(
            "Margin percentage is required!"
          ),
          sellingPrice: Yup.number().required("Selling price is required!"),
          taxIds: Yup.array()
            .of(Yup.number())
            .min(1, "At least one tax is required!"),
          taxType: Yup.string().required("Tax type is required!"),
          categoryTax: Yup.boolean(),
          productTax: Yup.boolean(),
        })
      ),
    })
  ),
  expiredDate: Yup.string().required("Please select the expiry date!"),
  manufacturedDate: Yup.string().required(
    "Please select the manufacture date!"
  ),
});

const MyForm = (props: IFormProps) => {
  const dispatch = useDispatch();
  const [variationId, setVariationId] = React.useState<any>([]);
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
  const { variations, variationValues, variationLoading } = useSelector(
    (state: RootState) => state.variation
  );
  const { taxs, taxLoading } = useSelector((state: RootState) => state.tax);
  console.log(variationValues, "variastions32323");

  React.useEffect(() => {
    dispatch(loadUnitsRequested());
    dispatch(loadCategoriesRequested());
    dispatch(loadBrandRequested());
    dispatch(loadWarrantiesRequested());
    dispatch(loadTaxsRequested());
    // dispatch(loadVariationsRequested());
  }, [dispatch]);

  const handleVariationIdChange = (e: any) => {
    console.log(e, "asdsa211212");

    const selectedValue = e.target.value;

    // setFieldValue("variationId", selectedValue);
    setVariationId(selectedValue);
  };

  const handleSubmit = (values: any) => {
    props.onSubmit(values, null);
    console.log(values);
  };
  // const handleVariationAdd = (add: any, index) => {

  // };

  function removeVariationIds(id: number, values: any, setFieldValue: any) {
    const productIndex = values.productVariableRequests.findIndex(
      (product: any) => product.variationId === id
    );
    console.log(id, productIndex, "2112121");

    // setFieldValue(
    //   `productVariableRequests[${productIndex}].productVariableValueRequests[${valueIndex}].variationValueId`,
    //   values.productVariableRequests[productIndex].productVariableValueRequests[
    //     valueIndex
    //   ].variationValueId.filter((item) => item !== id)
    // );
    // setFieldValue(
    //   "productVariableValueRequests",
    //   values?.productVariableValueRequests?.filter((item) => item.id !== id)
    // );
  }

  React.useMemo(() => {
    dispatch(
      loadVariationValuesRequested({
        id: variationId,
      })
    );
  }, [variationId]);

  if (unitLoading || catLoading || brandLoading || warrantyLoading) {
    return <div></div>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values); // This should log the form values
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        errors,
        validateOnChange,
        touched,
        initialValues,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        resetForm,
      }) => {
        // console.log(errors?.productVariableRequests, "dsdsdsdsdsdsdsdsd");

        return (
          <Form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            <div className="rounded-md bg-white px-8 pt-8 pb-12">
              <div className="text-primary text-lg font-semibold">
                General Information
              </div>
              <div className="w-full grid grid-cols-3 gap-3 ">
                <div className="py-3 rounded-md w-full text-xs">
                  <Input
                    name="name"
                    values={values}
                    errors={errors}
                    onChange={
                      validateOnChange?.valueOf ? handleChange : undefined
                    }
                    onBlur={handleBlur}
                    touches={touched}
                    defaultValue={initialValues?.name ?? undefined}
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
                    values={values}
                    options={
                      units
                        ? units?.map((unit: any) => ({
                            name: unit?.unitName,
                            value: unit?.id,
                          }))
                        : []
                    }
                    onChange={handleChange}
                    errors={errors}
                    touches={touched}
                    onBlur={handleBlur}
                    placeholder="Select a unit"
                    label="Unit :"
                  />
                </div>
                <div className="py-3 rounded-md w-full text-xs">
                  <SearchDropDown
                    name="categoryId"
                    values={values}
                    options={
                      categories
                        ? categories?.map((cat: any) => ({
                            name: cat?.name,
                            value: cat?.id,
                          }))
                        : []
                    }
                    onChange={handleChange}
                    errors={errors}
                    touches={touched}
                    onBlur={handleBlur}
                    placeholder="Select a category"
                    label="Category :"
                  />
                </div>
                <div className="py-3 rounded-md w-full text-xs">
                  <SearchDropDown
                    name="brandId"
                    values={values}
                    options={
                      brands
                        ? brands?.map((cat: any) => ({
                            name: cat?.brandName,
                            value: cat?.id,
                          }))
                        : []
                    }
                    onChange={handleChange}
                    errors={errors}
                    touches={touched}
                    onBlur={handleBlur}
                    placeholder="Select a Brand"
                    label="Brand :"
                  />
                </div>
                <div className="py-3 rounded-md w-full text-xs">
                  <SearchDropDown
                    name="warrantyId"
                    values={values}
                    options={
                      warranties
                        ? warranties?.map((warranty: any) => ({
                            name: warranty?.warrantyName,
                            value: warranty?.id,
                          }))
                        : []
                    }
                    onChange={handleChange}
                    errors={errors}
                    touches={touched}
                    onBlur={handleBlur}
                    placeholder="Select a Warranty type"
                    label="Warranty :"
                  />
                </div>
                <div className="py-3 rounded-md w-full text-xs">
                  <DropDown
                    name="productType"
                    values={values}
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
                    onChange={handleChange}
                    errors={errors}
                    touches={touched}
                    onBlur={handleBlur}
                    placeholder="Select a Product type"
                    label="Product Type :"
                  />
                </div>
                <div className="py-3 rounded-md w-full text-xs">
                  <DatePicker
                    name="manufacturedDate"
                    values={values}
                    errors={errors}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Select a manufactured date"
                    label="Manufactured Date : "
                    className={
                      "flex items-center appearance-none w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] "
                    }
                  />
                </div>
                {values?.manufacturedDate && (
                  <div className="py-3 rounded-md w-full text-xs">
                    <DatePicker
                      name="expiredDate"
                      values={values}
                      errors={errors}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Select a Expiry date"
                      label="Expiry Date : "
                      className={
                        "flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] "
                      }
                      min={values?.manufacturedDate}
                    />
                  </div>
                )}
              </div>
              <div className="w-full bg-white pt-8 grid grid-cols-3 gap-3 ">
                <div className="col-span-2">
                  <TextArea
                    name="description"
                    values={values}
                    errors={errors}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touches={touched}
                    // defaultValue={initialValues ?? undefined}
                    placeholder="Enter Product Description"
                    label="Product Description :"
                    className={
                      "flex items-center w-full px-2 h-40 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] no-scrollbar"
                    }
                  />
                </div>
                <div className="col-span-1">
                  <Uploader
                    name="image"
                    values={values}
                    className={""}
                    errors={errors}
                    alt={"Product Image"}
                    label="Product Image :"
                    onChange={(event) => {
                      console.log(event);
                      const image = event;
                      setFieldValue("image", image);
                    }}
                    onBlur={handleBlur}
                    touches={touched}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md">
              <div className="w-full px-8 py-8 flex flex-row gap-2">
                <div className="text-primary text-lg font-semibold">
                  Product Variation information
                </div>
                <Button
                  // onClick={() => handleVariationAdd}
                  name={"+"}
                  className={
                    "text-sm text-white w-fit bg-primary text-center font-[500] py-1 px-2 rounded-md cursor-pointer"
                  }
                />
              </div>
              <div className="border rounded-lg border-separate border-tools-table-outline">
                <table className="min-w-full leading-normal rounded-lg">
                  <thead className="rounded-lg">
                    <tr>
                      <th className="w-10 border-r px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
                      <th className="w-52 border-r px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Variation
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Variation Values
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <FieldArray name="productVariableRequests">
                      {({ push, remove }) => {
                        return (
                          <>
                            {values.productVariableRequests.map(
                              (request, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="px-5 border-r py-5 border-b border-gray-200 bg-white text-sm">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          push({
                                            variationId: null,
                                            productVariableValueRequests: [
                                              {
                                                variationValueId: null,
                                                sku: "",
                                                quantity: null,
                                                purchasePrice: null,
                                                marginType: "",
                                                marginPercentage: null,
                                                sellingPrice: null,
                                                taxIds: [null],
                                                taxType: "",
                                                categoryTax: true,
                                                productTax: true,
                                              },
                                            ],
                                          })
                                        }
                                      >
                                        Add
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                      >
                                        Remove
                                      </button>
                                    </td>
                                    <td className="px-5 border-r py-5 border-b border-gray-200 bg-white text-sm">
                                      <div className="py-3 rounded-md basis-[20%] grow-0 text-xs">
                                        <SearchDropDown
                                          name={`productVariableRequests.${index}.variationId`}
                                          values={values}
                                          options={
                                            variations
                                              ? variations?.map(
                                                  (location: any) => ({
                                                    name: location?.variationName,
                                                    value: location?.id,
                                                  })
                                                )
                                              : []
                                          }
                                          onChange={(e) => {
                                            handleVariationIdChange(e);
                                            handleChange(e);
                                          }}
                                          errors={errors}
                                          touches={touched}
                                          onBlur={handleBlur}
                                          placeholder="Select a Variation Type"
                                          label="Variation Type :"
                                        />
                                      </div>
                                      <div className="py-3 rounded-md basis-[20%] w-full text-xs">
                                        {variationLoading ? null : (
                                          <SearchDropDown
                                            name={`productVariableRequests.${index}.variationValueId`} // Updated name here
                                            values={values}
                                            options={
                                              variationValues
                                                ? variationValues?.map(
                                                    (val: any) => ({
                                                      name: val?.value,
                                                      value: val?.id,
                                                    })
                                                  )
                                                : []
                                            }
                                            onChange={handleChange}
                                            errors={errors}
                                            touches={touched}
                                            onBlur={handleBlur}
                                            placeholder="Select a Variation value"
                                            label="Variation value :"
                                            multiSelect={true}
                                            remove={removeVariationIds}
                                          />
                                        )}
                                      </div>
                                    </td>
                                    <td className="border-b border-gray-200 bg-white text-sm">
                                      <FieldArray
                                        name={`productVariableRequests.${index}.productVariableValueRequests`}
                                      >
                                        {({ push, remove }) => (
                                          <>
                                            {request.productVariableValueRequests.map(
                                              (valueRequest, valueIndex) => (
                                                <div
                                                  key={valueIndex}
                                                  className="w-full flex flex-row gap-2 items-start flex-wrap"
                                                >
                                                  {/* SKU Field */}
                                                  <div className="flex-1 min-w-[120px]">
                                                    <Input
                                                      name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.sku`} // Updated name here
                                                      values={values}
                                                      errors={errors}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      touches={touched}
                                                      placeholder="SKU"
                                                      label="SKU :"
                                                      className="w-full text-sm h-10 border border-solid border-gray-400 rounded-md px-2 focus:outline-none focus:border-gray-400"
                                                    />
                                                  </div>

                                                  {/* Quantity Field */}
                                                  <div className="flex-1 min-w-[120px]">
                                                    <Input
                                                      name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.quantity`} // Updated name here
                                                      values={values}
                                                      errors={errors}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      touches={touched}
                                                      placeholder="Quantity"
                                                      label="Quantity :"
                                                      type="number"
                                                      className="w-full text-sm h-10 border border-solid border-gray-400 rounded-md px-2 focus:outline-none focus:border-gray-400"
                                                    />
                                                  </div>

                                                  {/* Purchase Price Field */}
                                                  <div className="flex-1 min-w-[120px]">
                                                    <Input
                                                      name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.purchasePrice`} // Updated name here
                                                      values={values}
                                                      errors={errors}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      touches={touched}
                                                      placeholder="Purchase Price"
                                                      label="Purchase Price :"
                                                      type="number"
                                                      className="w-full text-sm h-10 border border-solid border-gray-400 rounded-md px-2 focus:outline-none focus:border-gray-400"
                                                    />
                                                  </div>

                                                  {/* Margin Type Dropdown */}
                                                  <div className="flex-1 min-w-[120px]">
                                                    <DropDown
                                                      name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.marginType`} // Updated name here
                                                      options={[
                                                        {
                                                          name: "Fixed",
                                                          value: "FIXED",
                                                        },
                                                        {
                                                          name: "Percentage",
                                                          value: "PERCENTAGE",
                                                        },
                                                      ]}
                                                      onChange={handleChange}
                                                      values={values}
                                                      errors={errors}
                                                      touches={touched}
                                                      onBlur={handleBlur}
                                                      placeholder="Margin Type"
                                                      label="Margin Type :"
                                                      className="w-full text-sm h-10"
                                                    />
                                                  </div>

                                                  {/* Margin Percentage Field */}
                                                  {values
                                                    .productVariableRequests[
                                                    index
                                                  ]
                                                    .productVariableValueRequests[
                                                    valueIndex
                                                  ].marginType ===
                                                  "PERCENTAGE" ? (
                                                    <div className="flex-1 min-w-[120px]">
                                                      <Input
                                                        name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.marginPercentage`} // Updated name here
                                                        values={values}
                                                        errors={errors}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        touches={touched}
                                                        placeholder="Margin %"
                                                        label="Margin % :"
                                                        type="number"
                                                        className="w-full text-sm h-10 border border-solid border-gray-400 rounded-md px-2 focus:outline-none focus:border-gray-400"
                                                      />
                                                    </div>
                                                  ) : (
                                                    <div className="flex-1 min-w-[120px]">
                                                      <Input
                                                        name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.sellingPrice`} // Updated name here
                                                        values={values}
                                                        errors={errors}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        touches={touched}
                                                        placeholder="Selling Price"
                                                        label="Selling Price :"
                                                        type="number"
                                                        className="w-full text-sm h-10 border border-solid border-gray-400 rounded-md px-2 focus:outline-none focus:border-gray-400"
                                                      />
                                                    </div>
                                                  )}

                                                  {/* Tax Dropdown */}
                                                  <div className="flex-1 min-w-[120px]">
                                                    <SearchDropDown
                                                      name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.taxIds`} // Updated name here
                                                      values={values}
                                                      options={
                                                        taxs
                                                          ? taxs.map(
                                                              (tax: any) => ({
                                                                name: tax?.taxName,
                                                                value: tax?.id,
                                                              })
                                                            )
                                                          : []
                                                      }
                                                      onChange={handleChange}
                                                      errors={errors}
                                                      touches={touched}
                                                      onBlur={handleBlur}
                                                      placeholder="Tax"
                                                      label="Tax :"
                                                      multiSelect={true}
                                                    />
                                                  </div>

                                                  {/* Tax Type Dropdown */}
                                                  <div className="flex min-w-[120px]">
                                                    <DropDown
                                                      name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.taxType`} // Updated name here
                                                      values={values}
                                                      options={[
                                                        {
                                                          name: "Inclusive",
                                                          value: "INCLUSIVE",
                                                        },
                                                        {
                                                          name: "Exclusive",
                                                          value: "EXCLUSIVE",
                                                        },
                                                      ]}
                                                      onChange={handleChange}
                                                      errors={errors}
                                                      touches={touched}
                                                      onBlur={handleBlur}
                                                      placeholder="Tax Type"
                                                      label="Tax Type :"
                                                      className="w-full text-sm h-10"
                                                    />
                                                  </div>

                                                  {/* Sliders */}
                                                  <div className="px-1 flex gap-3 min-w-[120px]">
                                                    <Slider
                                                      name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.categoryTax`} // Updated name here
                                                      values={values}
                                                      label="Category Tax"
                                                      onChange={handleChange}
                                                      errors={errors}
                                                      touches={touched}
                                                      onBlur={handleBlur}
                                                    />
                                                    <Slider
                                                      name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.productTax`} // Updated name here
                                                      values={values}
                                                      label="Product Tax"
                                                      onChange={handleChange}
                                                      errors={errors}
                                                      touches={touched}
                                                      onBlur={handleBlur}
                                                    />
                                                  </div>

                                                  <button
                                                    onClick={() =>
                                                      remove(valueIndex)
                                                    }
                                                    className="self-center border-red-600 rounded-lg p-1 bg-red-100"
                                                  >
                                                    <MdDeleteForever
                                                      size={27}
                                                      color="red"
                                                    />
                                                  </button>
                                                </div>
                                              )
                                            )}
                                          </>
                                        )}
                                      </FieldArray>
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </>
                        );
                      }}
                    </FieldArray>
                  </tbody>
                </table>
              </div>
            </div>

            <FieldArray name="productVariableRequests">
              {({ push, remove }) => (
                <div>
                  {values.productVariableRequests.map((request, index) => (
                    <div key={index}>
                      <Field
                        name={`productVariableRequests.${index}.variationId`}
                        placeholder="Variation ID"
                      />
                      <ErrorMessage
                        name={`productVariableRequests.${index}.variationId`}
                        component="div"
                      />
                      <FieldArray
                        name={`productVariableRequests.${index}.productVariableValueRequests`}
                      >
                        {({ push, remove }) => (
                          <div>
                            {request.productVariableValueRequests.map(
                              (valueRequest, valueIndex) => (
                                <div key={valueIndex}>
                                  <Field
                                    name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.variationValueId`}
                                    placeholder="Variation Value ID"
                                  />
                                  <ErrorMessage
                                    name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.variationValueId`}
                                    component="div"
                                  />
                                  <Field
                                    name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.sku`}
                                    placeholder="SKU"
                                  />
                                  <Field
                                    name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.quantity`}
                                    placeholder="Quantity"
                                    type="number"
                                  />
                                  <Field
                                    name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.purchasePrice`}
                                    placeholder="Purchase Price"
                                    type="number"
                                  />
                                  <Field
                                    name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.marginType`}
                                    placeholder="Margin Type"
                                  />
                                  <Field
                                    name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.marginPercentage`}
                                    placeholder="Margin Percentage"
                                    type="number"
                                  />
                                  <Field
                                    name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.sellingPrice`}
                                    placeholder="Selling Price"
                                    type="number"
                                  />
                                  <Field
                                    name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.taxIds`}
                                    placeholder="Tax IDs"
                                  />
                                  <Field
                                    name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.taxType`}
                                    placeholder="Tax Type"
                                  />

                                  <Field
                                    name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.categoryTax`}
                                    type="checkbox"
                                  />
                                  <label
                                    htmlFor={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.categoryTax`}
                                  >
                                    {" "}
                                    Category Tax
                                  </label>
                                  <Field
                                    name={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.productTax`}
                                    type="checkbox"
                                  />
                                  <label
                                    htmlFor={`productVariableRequests.${index}.productVariableValueRequests.${valueIndex}.productTax`}
                                  >
                                    {" "}
                                    Product Tax
                                  </label>

                                  <button
                                    type="button"
                                    onClick={() => remove(valueIndex)}
                                  >
                                    Remove Value Request
                                  </button>
                                </div>
                              )
                            )}
                            <button
                              type="button"
                              onClick={() =>
                                push({
                                  variationValueId: null,
                                  sku: "",
                                  quantity: null,
                                  purchasePrice: null,
                                  marginType: "",
                                  marginPercentage: null,
                                  sellingPrice: null,
                                  taxIds: [null],
                                  taxType: "",
                                  categoryTax: true,
                                  productTax: true,
                                })
                              }
                            >
                              Add Value Request
                            </button>
                          </div>
                        )}
                      </FieldArray>
                      <button type="button" onClick={() => remove(index)}>
                        Remove Variable Request
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        variationId: null,
                        productVariableValueRequests: [],
                      })
                    }
                  >
                    Add Variable Request
                  </button>
                </div>
              )}
            </FieldArray>

            <div className="py-8 w-full flex justify-center gap-4">
              <div>
                <Button
                  onClick={() => resetForm()}
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
                  loading={isSubmitting}
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MyForm;
