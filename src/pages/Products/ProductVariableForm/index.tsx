import {
  Button,
  DropDown,
  Input,
  SearchDropDown,
  Slider,
  TextArea,
} from "components";
import {
  loadBusinessLocationsRequested,
  loadTaxsRequested,
  loadVariationsRequested,
  loadVariationValuesRequested,
} from "features";
import { FormikErrors, FormikProps, withFormik } from "formik";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/reducer";
import { array, number, object, string } from "yup";
import VariationForm from "../VariationForm";

interface FormikValues {
  variationId: number;
  variationValueId: number[];
  productVariableValueRequests: any[];
}

export interface IFormProps {
  onSubmit: (values: any) => void;
  currentValues: any;
  item?: any;
}

function Form(props: FormikProps<FormikValues> & IFormProps) {
  const dispatch = useDispatch();
  const { variations, variationValues, variationLoading } = useSelector(
    (state: RootState) => state.variation
  );

  // console.log(props?.values);

  function addVariation(values: any) {
    if (
      props?.values?.productVariableValueRequests?.some(
        (item) => item?.id === values?.id
      )
    ) {
      props?.setFieldValue("productVariableValueRequests", [
        ...props?.values?.productVariableValueRequests?.filter(
          (item) => item?.id !== values?.id
        ),
        values,
      ]);
      return;
    }
    props?.setFieldValue("productVariableValueRequests", [
      ...props?.values?.productVariableValueRequests,
      values,
    ]);
  }

  function removeVariation(id: number) {
    // console.log(id);
    props?.setFieldValue(
      "productVariableValueRequests",
      props?.values?.productVariableValueRequests?.filter(
        (item) => item?.id !== id
      )
    );
    props?.setFieldValue(
      "variationValueId",
      props?.values?.variationValueId?.filter((item) => item !== id)
    );
  }
  function removeVariationIds(id: number) {
    props?.setFieldValue(
      "variationValueId",
      props?.values?.variationValueId?.filter((item) => item !== id)
    );
    props?.setFieldValue(
      "productVariableValueRequests",
      props?.values?.productVariableValueRequests?.filter(
        (item) => item.id !== id
      )
    );
  }

  useMemo(() => {
    dispatch(
      loadVariationValuesRequested({
        id: props?.item?.variationId
          ? props?.item?.variationId
          : props?.values?.variationId,
      })
    );
  }, [props?.values?.variationId]);

  useEffect(() => {
    // console.log("ausdauhsdojinnsdoasdadaD");
    dispatch(loadVariationsRequested());
  }, [dispatch]);
  return (
    <div className="w-full flex-col py-4">
      <form
       
        className="w-full flex flex-col gap-5"
      >
        <div className="w-full flex gap-2 items-center">
          <div className="py-3 rounded-md basis-[20%] grow-0 text-xs">
            <SearchDropDown
              name="variationId"
              values={props.values}
              options={
                variations
                  ? variations?.map((location: any) => ({
                      name: location?.variationName,
                      value: location?.id,
                    }))
                  : []
              }
              onChange={props.handleChange}
              errors={props.errors}
              touches={props.touched}
              onBlur={props.handleBlur}
              placeholder="Select a Variation Type"
              label="Variation Type :"
            />
          </div>
          <div className="py-3 rounded-md basis-[20%] w-full text-xs">
            {variationLoading ? null : (
              <SearchDropDown
                name="variationValueId"
                values={props.values}
                options={
                  variationValues
                    ? variationValues?.map((val: any) => ({
                        name: val?.value,
                        value: val?.id,
                      }))
                    : []
                }
                onChange={props.handleChange}
                errors={props.errors}
                touches={props.touched}
                onBlur={props.handleBlur}
                placeholder="Select a Variation value"
                label="Variation value :"
                multiSelect={true}
                remove={removeVariationIds}
              />
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full">
            {props?.values?.variationValueId?.map(
              (item: any, index: number) => (
                <VariationForm
                  onSubmit={addVariation}
                  currentValues={props.values?.productVariableValueRequests}
                  id={item}
                  removeItem={removeVariation}
                  item={props?.values?.productVariableValueRequests?.find(
                    (item: any) => item?.id === item
                  )}
                />
              )
            )}
          </div>

          <div className="py-8 basis-[8%] flex flex-col items-center justify-center gap-4">
            <Button
              // type={"submit"}
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
              name={"+"}
              className={
                "text-sm text-white w-fit bg-primary text-center font-[500] py-2 px-3.5 rounded-full cursor-pointer"
              }
              loading={props.isSubmitting}
            />
          </div>
        </div>
        <div className="border rounded-lg border-separate border-tools-table-outline">
          <table className="min-w-full  leading-normal rounded-lg">
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
              <tr>
                <td className="px-5 border-r py-5 border-b border-gray-200 bg-white text-sm"></td>
                <td className="px-5 border-r py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex flex-col gap-2">
                    <div className="py-3 rounded-md basis-[20%] grow-0 text-xs">
                      <SearchDropDown
                        name="variationId"
                        values={props.values}
                        options={
                          variations
                            ? variations?.map((location: any) => ({
                                name: location?.variationName,
                                value: location?.id,
                              }))
                            : []
                        }
                        onChange={props.handleChange}
                        errors={props.errors}
                        touches={props.touched}
                        onBlur={props.handleBlur}
                        placeholder="Select a Variation Type"
                        label="Variation Type :"
                      />
                    </div>
                    <div className="py-3 rounded-md basis-[20%] w-full text-xs">
                      {variationLoading ? null : (
                        <SearchDropDown
                          name="variationValueId"
                          values={props.values}
                          options={
                            variationValues
                              ? variationValues?.map((val: any) => ({
                                  name: val?.value,
                                  value: val?.id,
                                }))
                              : []
                          }
                          onChange={props.handleChange}
                          errors={props.errors}
                          touches={props.touched}
                          onBlur={props.handleBlur}
                          placeholder="Select a Variation value"
                          label="Variation value :"
                          multiSelect={true}
                          remove={removeVariationIds}
                        />
                      )}
                    </div>
                  </div>
                </td>
                <td className="border-b border-gray-200 bg-white text-sm">
                  <div className="w-full">
                    {props?.values?.variationValueId?.map(
                      (item: any, index: number) => (
                        <div className="border-b last:border-b-0 p-5">
                          <VariationForm
                            onSubmit={addVariation}
                            currentValues={
                              props.values?.productVariableValueRequests
                            }
                            id={item}
                            removeItem={removeVariation}
                            item={props?.values?.productVariableValueRequests?.find(
                              (item: any) => item?.id === item
                            )}
                          />
                        </div>
                      )
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}

export default withFormik<IFormProps, FormikValues>({
  validationSchema: object().shape({
    variationId: number().required("Variation is required!"),
    variationValueId: array()
      .of(number())
      .required("Variation value is required!"),
    productVariableValueRequests: array().min(
      1,
      "At least one variation is required"
    ),
  }),
  mapPropsToValues: ({ item }: any) => {
    return {
      variationId: item?.variationId ?? undefined,
      variationValueId: item?.variationValueId ?? [],
      productVariableValueRequests: item?.productVariableValueRequests ?? [],
    };
  },
  handleSubmit: (values, { props, ...actions }) => {
    console.log(values);
    props.onSubmit(values);
  },
})(Form);
