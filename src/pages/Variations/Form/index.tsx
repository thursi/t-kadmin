import { Button, Input } from "components";
import { withFormik, FormikProps, FieldArray } from "formik";
import { useNavigate } from "react-router-dom";
import { string, object, array } from "yup";
import { Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/reducer";
import { loadCategoriesRequested } from "features";
import { useEffect } from "react";

export interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
  setModal?: any;
}

interface FormikValues {
  uniCode:string;
  variationName: string;
  variationValues: string[];
  categoryId: number;

}

interface Category {
  id: number;
  name: string;
}

function Form(props: FormikProps<FormikValues> & IFormProps) {
  const navigation = useNavigate();
  const dispatch =useDispatch();
  const { categories } = useSelector(
    (state: RootState) =>
      state.category as { categories: Category[]; catLoading: boolean }
  );
  async function cancelForm() {
    props?.setModal(false);
    props?.resetForm();
  }

  
  useEffect(() => {
    dispatch(loadCategoriesRequested());
  }, [dispatch]);

  if (props?.isSubmitting) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div className="flex flex-col gap-3">
          <div className="py-1 rounded-md text-xs">
            <Input
              name="variationName"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              defaultValue={props?.item?.variationName ?? ""}
              placeholder="Enter variation name..."
              label="Variation Name :"
              className={`flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]${
                props.touched.variationName && props.errors.variationName
                  ? "border-red-500"
                  : "border-[#b0afb3]"
              }`}            />
          </div>

          <div className="py-1 rounded-md text-xs">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add variation values:*
            </label>
            <FieldArray
              name="variationValues"
              render={(arrayHelpers) => (
                <div>
                  {props.values.variationValues.map((value, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <Input
                        name={`variationValues.${index}`}
                        values={props.values}
                        errors={props.errors}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        touches={props.touched}
                        defaultValue={value}
                        placeholder="Enter variation value..."
                        className="flex-grow px-3 py-2 border text-sm shadow-sm border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                      />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                        className="ml-2 inline-flex items-center p-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <Minus size={16} />
                      </button>
                      {index === props.values.variationValues.length - 1 &&
                        props.values.variationValues.length > 0 && (
                          <button
                            type="button"
                            onClick={() => arrayHelpers.push("")}
                            className="ml-2 inline-flex items-center p-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <Plus size={16} />
                          </button>
                        )}
                    </div>
                  ))}
                  {props.values.variationValues.length === 0 && (
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push("")}
                      className="ml-2 inline-flex items-center p-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Plus size={16} />
                    </button>
                  )}
                </div>
              )}
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
              defaultValue={props?.item?.uniCode ?? ""}
              placeholder="Enter uni code..."
              label="Uni Code :"
              className={`flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]${
                props.touched.uniCode && props.errors.uniCode
                  ? "border-red-500"
                  : "border-[#b0afb3]"
              }`}            
              />
          </div>
          <div className=" rounded-md w-full text-xs">
            <div className=" py-3">
              <label className="  text-xs text-[11px] font-bold  text-black ">
                Category Name :
              </label>
              <select
                name="categoryId"
                value={props.values.categoryId || ''}
                // onChange={props.handleChange}
                onChange={(e) =>
                  props.setFieldValue("categoryId", parseInt(e.target.value, 10) || "")
                }
                onBlur={props.handleBlur}
                className="block w-full px-2 mt-2 py-2 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
              >
                <option value="">Select Category</option>
                {categories?.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {props.touched.categoryId && props.errors.categoryId ? (
                <div className="text-red-600 text-xs mt-1">
                  {props.errors.categoryId}
                </div>
              ) : null}

              {/* Display the selected Category Name after selection */}
              {props.values.categoryId && (
                <div className="text-sm font-medium text-gray-700 mt-2">
                  {
                    categories.find(
                      (catego: any) => catego.id === props.values.categoryId
                    )?.name
                  }
                </div>
              )}
            </div>
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
    variationName: string().required("Variation name is required"),
    variationValues: array()
      .of(string().required("Variation value is required"))
      .min(1, "At least one variation value is required"),
  }),
  mapPropsToValues: ({ item }: any) => ({
    id: item?.id ?? undefined,
    uniCode: item?.uniCode ?? "",
    categoryId: item?.categoryId ?? "",
    variationName: item?.variationName ?? "",
    variationValues: item?.variationValues ?? [""],
  }),

  handleSubmit: (values, { props, ...actions }) => {
    console.log("handleSubmit",values);
    props.onSubmit(values, actions);
  },
  enableReinitialize: true,
  validateOnBlur: false,
})(Form);