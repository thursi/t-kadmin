import { Button, Input } from "components";
import { loadCategoriesRequested } from "features";
import { withFormik, FormikProps } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store/reducer";
import { string, object } from "yup";

export interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
  setModal?: any;
}

interface FormikValues {
  uniCode: string;
  brandName: string;
  description: string;
  categoryId: string;

}
interface Category {
  id: string;
  name: string;
}


function Form(props: FormikProps<FormikValues> & IFormProps) {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { brands } = useSelector((state: RootState) => state.brand);
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
              name="brandName"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              defaultValue={props?.item?.brandName ?? undefined}
              placeholder="Enter Brand Name"
              label="Brand Name :"
              className={`flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] ${
                props.touched.brandName && props.errors.brandName
                  ? "border-red-500"
                  : "border-[#b0afb3]"
              }`}
            />
          </div>
          <div className="py-1 rounded-md text-xs">
            <Input
              name="description"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              defaultValue={props?.item?.description ?? undefined}
              placeholder="Enter Brand Description..."
              label="Description :"
              className={`flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] ${
                props.touched.description && props.errors.description
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

          
        <div className=" rounded-md w-full text-xs">
            <div className=" py-3">
              <label className="  text-xs text-[11px] font-bold  text-black ">
                Category Name :
              </label>
              <select
                name="categoryId"
                value={props.values.categoryId || ''}
                onChange={props.handleChange}
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
            name="Cancel"
            className="text-sm text-black bg-white text-center font-[500] p-2 w-[100px] rounded-md border-[1px] border-black cursor-pointer"
          />
          <Button
            type="submit"
            name="Save"
            className="text-sm text-white w-fit bg-primary text-center font-[500] py-2 px-4 rounded-md cursor-pointer"
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
    brandName: string().required(" Brand Name is required"),
    description: string().required("Description is required"),
  }),
  mapPropsToValues: ({ item }: any) => ({
    id: item?.id ?? undefined,
    uniCode: item?.uniCode ?? undefined,
    categoryId: item?.  categoryId
 ?? undefined,

    brandName: item?.brandName ?? undefined,
    description: item?.description ?? undefined,
  }),
  handleSubmit: (values, { props, ...actions }) => {
    props.onSubmit(values, actions);
  },
  enableReinitialize: true,
  validateOnBlur: false,
})(Form);
