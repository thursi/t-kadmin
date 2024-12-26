import { Button, DropDown, Input, SearchDropDown, Slider } from "components";
import { loadTaxsRequested } from "features";
import { FormikProps, withFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/reducer";
import { array, number, object, string } from "yup";
import { MdDeleteForever } from "react-icons/md";

interface FormikValues {
  sku: string;
  purchasePrice: number;
  marginType: string;
  marginPercentage: number;
  sellingPrice: number;
  taxIds: number[];
  taxType: string;
  categoryTax: boolean;
  productTax: boolean;
  quantity: number;
  variationValueId: number;
}

export interface IFormProps {
  onSubmit: (values: any) => void;
  currentValues: any;
  removeItem?: any;
  item?: any;
  id?: any;
}

function Form(props: FormikProps<FormikValues> & IFormProps) {
  const dispatch = useDispatch();

  const { taxs, taxLoading } = useSelector((state: RootState) => state.tax);

  // console.log(props?.values);

  useEffect(() => {
    dispatch(loadTaxsRequested());
  }, [dispatch]);

  // const addItemRow = () => {
  //   props.setFieldValue("items", [
  //     ...props.values.items,
  //     {
  //       sku: "",
  //       purchasePrice: 0,
  //       marginType: "",
  //       marginPercentage: 0,
  //       sellingPrice: 0,
  //       taxIds: [],
  //       businessLocationsId: [],
  //       taxType: "",
  //       categoryTax: false,
  //       productTax: false,
  //       quantity: 0,
  //     },
  //   ]);
  // };

  if (taxLoading) {
    return <div></div>;
  }

  return (
    <div className="w-full flex-col py-4">
      <form className="w-full flex flex-col gap-4 items-start">
        <div className="w-full flex flex-row gap-2 items-start flex-wrap">
          {/* SKU Field */}
          <div className="flex-1 min-w-[120px]">
            <Input
              name={`sku`}
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              placeholder="SKU"
              label="SKU :"
              className="w-full text-sm h-10 border border-solid border-gray-400 rounded-md px-2 focus:outline-none focus:border-gray-400"
            />
          </div>

          {/* Quantity Field */}
          <div className="flex-1 min-w-[120px]">
            <Input
              name={`quantity`}
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              placeholder="Quantity"
              label="Quantity :"
              type="number"
              className="w-full text-sm h-10 border border-solid border-gray-400 rounded-md px-2 focus:outline-none focus:border-gray-400"
            />
          </div>

          {/* Purchase Price Field */}
          <div className="flex-1 min-w-[120px]">
            <Input
              name={`purchasePrice`}
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              placeholder="Purchase Price"
              label="Purchase Price :"
              type="number"
              className="w-full text-sm h-10 border border-solid border-gray-400 rounded-md px-2 focus:outline-none focus:border-gray-400"
            />
          </div>

          {/* Margin Type Dropdown */}
          <div className="flex-1 min-w-[120px]">
            <DropDown
              name={`marginType`}
              options={[
                { name: "Fixed", value: "FIXED" },
                { name: "Percentage", value: "PERCENTAGE" },
              ]}
              onChange={props.handleChange}
              values={props?.values}
              errors={props.errors}
              touches={props.touched}
              onBlur={props.handleBlur}
              placeholder="Margin Type"
              label="Margin Type :"
              className="w-full text-sm h-10"
            />
          </div>

          {/* Margin Percentage or Selling Price */}
          {props?.values?.marginType === "PERCENTAGE" ? (
            <div className="flex-1 min-w-[120px]">
              <Input
                name={`marginPercentage`}
                values={props.values}
                errors={props.errors}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                touches={props.touched}
                placeholder="Margin %"
                label="Margin % :"
                type="number"
                className="w-full text-sm h-10 border border-solid border-gray-400 rounded-md px-2 focus:outline-none focus:border-gray-400"
              />
            </div>
          ) : (
            <div className="flex-1 min-w-[120px]">
              <Input
                name={`sellingPrice`}
                values={props.values}
                errors={props.errors}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                touches={props.touched}
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
              name={`taxIds`}
              values={props.values}
              options={
                taxs
                  ? taxs.map((tax: any) => ({
                      name: tax?.taxName,
                      value: tax?.id,
                    }))
                  : []
              }
              onChange={props.handleChange}
              errors={props.errors}
              touches={props.touched}
              onBlur={props.handleBlur}
              placeholder="Tax"
              label="Tax :"
              multiSelect={true}
            />
          </div>

          {/* Tax Type Dropdown */}
          <div className="flex min-w-[120px]">
            <DropDown
              name={`taxType`}
              values={props.values}
              options={[
                { name: "Inclusive", value: "INCLUSIVE" },
                { name: "Exclusive", value: "EXCLUSIVE" },
              ]}
              onChange={props.handleChange}
              errors={props.errors}
              touches={props.touched}
              onBlur={props.handleBlur}
              placeholder="Tax Type"
              label="Tax Type :"
              className="w-full text-sm h-10"
            />
          </div>

          {/* Sliders */}
          <div className="px-1 flex gap-3 min-w-[120px]">
            <Slider
              name={`categoryTax`}
              values={props.values}
              label="Category Tax"
              onChange={props.handleChange}
              errors={props.errors}
              touches={props.touched}
              onBlur={props.handleBlur}
            />
            <Slider
              name={`productTax`}
              values={props.values}
              label="Product Tax"
              onChange={props.handleChange}
              errors={props.errors}
              touches={props.touched}
              onBlur={props.handleBlur}
            />
          </div>

          <button
            onClick={() => props?.removeItem(props?.values?.variationValueId)}
            className="self-center border-red-600 rounded-lg p-1 bg-red-100"
          >
            <MdDeleteForever size={27} color="red" />
          </button>

          {/* Remove Item Button */}
          {/* <div className="flex-1 flex items-center">
            <Button
              onClick={() => props?.removeItem(props?.values?.variationValueId)}
              name={"Remove"}
              className="text-red-500"
            />
          </div> */}
        </div>

        {/* Add Item Button */}

        {/* Submit Button */}
        <div className="flex-1 flex justify-center">
          <Button
            onClick={async (e: any) => {
              e.preventDefault();
              const errors: any = await props.validateForm(); // Formik's built-in validation method
              console.log(Object.keys(errors));
              if (Object.keys(errors).length > 0) {
                Object.keys(errors).forEach((field: any) => {
                  props.setFieldTouched(field, true, false);
                  props.setFieldError(field, errors[field]);
                });
                props.setErrors(errors); // Manually set errors to trigger validation messages
              } else {
                console.log(props.values);
                props.onSubmit(props.values); // Uncomment this to submit if needed
                props?.resetForm();
              }
            }}
            name={"Submit"}
            className="text-white w-fit bg-primary text-center py-2 px-3.5 rounded-full text-[12px] font-bold"
          />
        </div>
      </form>
    </div>
  );
}

const EnhancedForm = withFormik<IFormProps, FormikValues>({
  mapPropsToValues: ({ item, id }: IFormProps) => {
    return {
      variationValueId: id,
      sku: item?.sku ?? undefined,
      purchasePrice: 0,
      marginType: "FIXED",
      marginPercentage: 0,
      sellingPrice: 0,
      taxIds: [],
      taxType: "INCLUSIVE",
      categoryTax: false,
      productTax: false,
      quantity: 0,
    };
  },
  validationSchema: () =>
    object().shape({
      sku: string().required("SKU is required"),
      quantity: number()
        .required("Quantity is required")
        .min(1, "Quantity is required"),
      purchasePrice: number()
        .required("Purchase price is required")
        .min(1, "Purchase price is required"),
      marginType: string().required("Margin type is required!"),
      marginPercentage: number().when("marginType", {
        is: "PERCENTAGE",
        then: (schema) => schema.required("Margin percentage is required!"),
      }),
      sellingPrice: number().when("marginType", {
        is: "FIXED",
        then: (schema) =>
          schema
            .required("Selling price is required!")
            .min(1, "Selling price is required!"),
      }),
      taxIds: array()
        .of(number())
        .required("At least one tax is required")
        .min(1, "At least one tax is required"),
    }),
  handleSubmit: (values, { props }) => {
    props.onSubmit(values);
  },
})(Form);

export default EnhancedForm;
