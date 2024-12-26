import React, { useEffect } from 'react';
import { withFormik, FormikProps } from 'formik';
import { object, boolean } from 'yup';
import { RootState } from 'store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategoriesRequested, loadTaxsRequested } from 'features';

export interface IFilterFormProps {
  resetForm(): any;
  onSubmit: (values: any, actions: any) => any;
  item?: any;
  setModal?: (isOpen: boolean) => void;
  filterModal: boolean;
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

function FilterForm(props: FormikProps<FormikValues> & IFilterFormProps) {
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

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    props.setFieldValue(name, value || undefined);

    const actions = {
      setSubmitting: (isSubmitting: boolean) => {},
    };

    props.onSubmit(
      {
        categoryId: name === 'categoryId' ? value : props.values.categoryId,
        taxId: name === 'taxId' ? value : props.values.taxId,
      },
      actions
    );
  };
  return (
    <div
      style={{
        right: props.filterModal ? '0' : '-300px',
      }}
    >
      <form onSubmit={props.handleSubmit} className="p-4">
        <div className="flex space-x-14">
          <div className="py-1 rounded-md text-xs flex-1">
            <label className="block mb-4 text-base font-medium text-gray-700 text-nowrap">
              Category Name:
            </label>
            <select
              name="categoryId"
              value={props.values.categoryId || ''}
              onChange={handleFilterChange}
              onBlur={props.handleBlur}
              className="block w-auto px-2 mt-2  py-2 border text-xs border-[#b0afb3] rounded-md focus:border-[#b0afb3] focus:outline-none"
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

          <div className="py-1 rounded-md text-xs flex-1">
            <label className="block mb-4 text-base font-medium text-gray-700 text-nowrap">
              Tax Name:
            </label>
            <select
              name="taxId"
              value={props.values.taxId || ''}
              onChange={handleFilterChange}
              onBlur={props.handleBlur}
              className="block w-auto px-2 mt-2 py-2 border text-xs border-[#b0afb3] rounded-md focus:border-[#b0afb3] focus:outline-none"
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
            {/* Display the selected Tax Name after selection */}
            {props.values.taxId && (
              <div className="text-sm font-medium text-gray-700 mt-2">
                {taxs.find((tax: any) => tax.id === props.values.taxId)?.tName}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default withFormik<IFilterFormProps, FormikValues>({
  validationSchema: object().shape({}),
  mapPropsToValues: ({ item }: IFilterFormProps) => ({
    categoryId: item?.categoryId ?? undefined,
    taxId: item?.taxId ?? undefined,
  }),
  handleSubmit: (values, { props, ...actions }) => {
    props.onSubmit(values, actions);
    actions.setSubmitting(false);
    props.resetForm();
  },
  enableReinitialize: true,
})(FilterForm);
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
