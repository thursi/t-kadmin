import { Button, Input } from "components";
import { withFormik, FormikProps } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { string, object } from "yup";

export interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
  setModal?: any;
}

interface FormikValues {
  uniCode: string;
  name: string;
}

function Form(props: FormikProps<FormikValues> & IFormProps) {
  const navigation = useNavigate();
  const dispatch = useDispatch();

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
              name="name"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              defaultValue={props?.item?.name ?? undefined}
              placeholder="Enter City Name"
              label="City Name :"
              className={`flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] ${
                props.touched.name && props.errors.name
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
              placeholder="Enter Uni Code"
              label="Uni Code :"
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
            // onClick={props.handleSubmit}
            loading={props.isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}

export default withFormik<IFormProps, FormikValues>({
  validationSchema: object().shape({
    uniCode: string().required(" Uni Code is required"),
    name: string().required("Name is required"),
  }),
  mapPropsToValues: ({ item }: any) => ({
    id: item?.id ?? undefined,
    uniCode: item?.uniCode ?? undefined,
    name: item?.name ?? undefined,
  }),
  handleSubmit: (values, { props, ...actions }) => {
    props.onSubmit(values, actions);
  },
  enableReinitialize: true, 
  validateOnBlur: false,   
})(Form);
