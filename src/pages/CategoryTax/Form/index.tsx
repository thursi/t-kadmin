import { Button, Input } from 'components';
import { loadCategoriesRequested, loadTaxsRequested } from 'features';
import { withFormik, FormikProps } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import { string, object } from 'yup';

export interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
  setModal?: any;
}

interface FormikValues {
  categoryId: string;
  taxId: string;
}
interface Category {
  id: string;
  name: string;
}
interface Tax {
  id: string;
  tName: string;
}

function Form(props: FormikProps<FormikValues> & IFormProps) {
  const dispatch = useDispatch();
  const { categories } = useSelector(
    (state: RootState) =>
      state.category as { categories: Category[]; catLoading: boolean }
  );

  const { taxs } = useSelector(
    (state: RootState) => state.tax as { taxs: Tax[]; taxLoading: boolean }
  );

  useEffect(() => {
    dispatch(loadCategoriesRequested());
    dispatch(loadTaxsRequested());
  }, [dispatch]);

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

              {props.values.categoryId && (
                <div className="text-sm font-medium text-white">
                  {
                    categories.find(
                      (tax: any) => tax.id === props.values.categoryId
                    )?.name
                  }
                </div>
              )}
              {/* Display the selected Category Name after selection */}
              {/* {props.values.categoryId && (
                <div className="text-sm font-medium text-gray-700 mt-2">
                  {
                    categories.find(
                      (catego: any) => catego.id === props.values.categoryId
                    )?.name
                  }
                </div>
              )} */}
            </div>
          </div>

          <div className=" rounded-md w-full text-xs">
            <div className=" py-3">
              <label className="  text-xs text-[11px] font-bold  text-black ">
                Tax Name:
              </label>
              <select
                name="taxId"
                value={props.values.taxId || ''}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className="block w-full px-2 mt-2 py-2 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
              >
                <option value="">Select Tax Name</option>
                {taxs?.map((tax: any) => (
                  <option key={tax.id} value={tax.id}>
                    {tax.taxName}
                  </option>
                ))}
              </select>

              {props.touched.taxId && props.errors.taxId ? (
                <div className="text-red-600 text-xs mt-1">
                  {props.errors.taxId}
                </div>
              ) : null}

              {props.values.taxId && (
                <div
                  className="text-sm font-medium text-
                -700 mt-2"
                >
                  {
                    taxs.find((tax: any) => tax.id === props.values.taxId)
                      ?.tName
                  }
                </div>
              )}
            </div>
          </div>

          {/* <div className="py-1 rounded-md text-xs">
            <label
              htmlFor="taxId"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Tax Name:
            </label>

            <select
              name="taxId"
              value={props.values.taxId}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              className={`flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] focus:outline-none rounded-md ${
                props.touched.taxId && props.errors.taxId
                  ? "border-red-500"
                  : "border-[#b0afb3]"
              }`}            >
              <option value="">Select Tax Name</option>
              {taxs?.map((tax: any) => (
                <option key={tax.id} value={tax.id}>
                  {tax.taxName}
                </option>
              ))}
            </select>

            {props.touched.taxId && props.errors.taxId ? (
              <div className="text-red-600 text-xs mt-1">
                {props.errors.taxId}
              </div>
            ) : null}

            {props.values.taxId && (
              <div className="text-sm font-medium text-gray-700 mt-2">
                Selected Tax Name:{' '}
                {taxs.find((tax: any) => tax.id === props.values.taxId)?.tName}
              </div>
            )}
          </div> */}
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
    categoryId: string().required('Category Name is required'),
    taxId: string().required('Tax Name is required'),
  }),
  mapPropsToValues: ({ item }: any) => ({
    id: item?.id ?? undefined,
    categoryId: item?.categoryId ?? undefined,
    taxId: item?.taxId ?? undefined,
  }),
  handleSubmit: (values, { props, ...actions }) => {
    props.onSubmit(values, actions);
  },
  enableReinitialize: true,
  validateOnBlur: false,
})(Form);
