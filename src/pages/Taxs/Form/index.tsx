import { Button, Input } from "components";
import { withFormik, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import { string, object, number } from "yup";

export interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
  setModal?: any;
}

interface FormikValues {
  uniCode: string;
  taxName: string;
  tax: number;
}

function Form(props: FormikProps<FormikValues> & IFormProps) {
  const navigation = useNavigate();

  async function cancelForm() {
    props?.setModal(false);
    props?.resetForm();
  }

  if (props?.isSubmitting) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div className="flex flex-col gap-3">
          <div className="py-1 rounded-md text-xs">
            <Input
              name="taxName"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              defaultValue={props?.item?.taxName ?? undefined}
              placeholder="Enter tax name..."
              label="Tax Name :"
              className={`flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] ${
                props.touched.taxName && props.errors.taxName
                  ? "border-red-500"
                  : "border-[#b0afb3]"
              }`}
            />
          </div>
          <div className="py-1 rounded-md text-xs">
            <Input
              name="tax"
              type="number"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              defaultValue={props?.item?.tax ?? undefined}
              placeholder="Enter tax percentage..."
              label="Tax (%) :"
              className={`flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] ${
                props.touched.tax && props.errors.tax
                  ? "border-red-500"
                  : "border-[#b0afb3]"
              }`}
            />
          </div>
          <div className="rounded-md text-xs">
            <Input
              name="uniCode"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              defaultValue={props?.item?.uniCode ?? undefined}
              placeholder="Enter the uni code..."
              label="Uni code :"
              className={`flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] ${
                props.touched.uniCode && props.errors.uniCode
                  ? "border-red-500"
                  : "border-[#b0afb3]"
              }`}
            />
          </div>
        </div>
        <div className="py-4 flex justify-end gap-4">
          <Button
            onClick={cancelForm}
            name={"Cancel"}
            className={
              "text-sm text-black bg-white text-center font-[500] p-2 w-[100px] rounded-md border-[1px] border-black cursor-pointer"
            }
          />
          <Button
            type={"submit"}
            name={"Save"}
            className={
              "text-sm text-white w-fit bg-primary text-center font-[500] py-2 px-4 rounded-md cursor-pointer"
            }
            loading={props.isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}

export default withFormik<IFormProps, FormikValues>({
  validationSchema: object().shape({
    uniCode: string().required("Uni code is required"),
    taxName: string().required("Tax name is required"),
    tax: number()
      .required("Tax is required")
      .positive("Tax must be positive")
      .max(100, "Tax must be less than or equal to 100"),
  }),
  mapPropsToValues: ({ item }: any) => ({
    id: item?.id ?? undefined,
    uniCode: item?.uniCode ?? "",
    taxName: item?.taxName ?? "",
    tax: item?.tax ?? 0,
  }),
  handleSubmit: (values, { props, ...actions }) => {
    props.onSubmit(values, actions);
  }, 
  enableReinitialize: true, 
  validateOnBlur: false, 
})(Form);