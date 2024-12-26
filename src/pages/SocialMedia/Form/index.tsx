import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/reducer";
import { loadSocialMediasRequested } from "features";
import { Button, Input } from "components";
import { withFormik, FormikProps } from "formik";
import { string, object } from "yup";

interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
  setModal?: (open: boolean) => void;
}

interface FormikValues {
  // businessName: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  websiteUrl: string;
  businessLocationId: number;
}

interface businessLocation {
  id: string;
  businessName: string;
}
function Form(props: FormikProps<FormikValues> & IFormProps) {
  const dispatch = useDispatch();
  const { medias, mediaLoading } = useSelector(
    (state: RootState) => state.socialMedia
  );
  console.log("🚀 ~ Form ~ props.item:", props.item);

  const cancelForm = () => {
    console.log("dddddddddddddddddddddddd")
    props?.setModal?.(false);
    props?.resetForm();
  };

  useEffect(() => {
    dispatch(loadSocialMediasRequested());
  }, [dispatch]);
  if (props?.isSubmitting) {
    <div>Loading...</div>;
  }
console.log(props.item )
  return (
    <div className="max-w-xl h-auto mx-auto mt-6 p-4 rounded-lg shadow-md">
      <form onSubmit={props.handleSubmit}  className="space-y-4">
        <div className="flex flex-col gap-4">
          {/* Business Name */}
          <div className="py-2 rounded-md text-md">
            <label className="text-xs font-semibold text-gray-600 mb-1">
              Business Name:
            </label>
            <input
              type="text"
              name="businessName"
              value={props?.item?.businessLocation?.businessName || ""} // Make sure the value is coming from props or state
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              className="block w-full px-3 py-2 text-xs border border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
            />
            {props.touched.businessLocationId &&
              props.errors.businessLocationId && (
                <div className="text-red-500 text-xs mt-1">
                  {props.errors.businessLocationId}
                </div>
              )}
          </div>

          {/* Facebook URL */}
          <div className="py-2 rounded-md text-md">
            <label className="text-xs font-semibold text-gray-600 mb-1">
              Facebook URL:
            </label>
            <Input
              name="facebookUrl"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              defaultValue={props?.item?.facebookUrl ?? undefined}
              placeholder="Facebook URL"
              //label="Facebook URL:"
              className={`block w-full px-3 py-2 text-xs border border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] ${
                props.touched.facebookUrl && props.errors.facebookUrl
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {props.touched.facebookUrl && props.errors.facebookUrl && (
              <div className="text-red-500 text-xs mt-1">
                {props.errors.facebookUrl}
              </div>
            )}
          </div>

          <div className="py-2 rounded-md text-md">
            <label className="text-xs font-semibold text-gray-600 mb-1">
              Instagram URL:
            </label>
            <Input
              name="instagramUrl"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              defaultValue={props?.item?.instagramUrl ?? undefined}
              placeholder="Instagram URL"
              //label="Instagram URL:"
              className={`block w-full px-3 py-2 text-xs border border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] ${
                props.touched.instagramUrl && props.errors.instagramUrl
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {props.touched.instagramUrl && props.errors.instagramUrl && (
              <div className="text-red-500 text-xs mt-1">
                {props.errors.instagramUrl}
              </div>
            )}
          </div>

          <div className="py-2 rounded-md text-md">
            <label className="text-xs font-semibold text-gray-600 mb-1">
              Twitter URL:
            </label>
            <Input
              name="twitterUrl"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              defaultValue={props?.item?.twitterUrl ?? undefined}
              placeholder="Twitter URL"
              //label="Twitter URL:"
              className={`block w-full px-3 py-2 text-xs border border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] ${
                props.touched.twitterUrl && props.errors.twitterUrl
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {props.touched.twitterUrl && props.errors.twitterUrl && (
              <div className="text-red-500 text-xs mt-1">
                {props.errors.twitterUrl}
              </div>
            )}
          </div>

          <div className="py-2 rounded-md text-md">
            <label className="text-xs font-semibold text-gray-600 mb-1">
              LinkedIn URL:
            </label>
            <Input
              name="linkedinUrl"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              defaultValue={props?.item?.linkedinUrl ?? undefined}
              placeholder="LinkedIn URL"
              //label="LinkedIn URL:"
              className={`block w-full px-3 py-2 text-xs border border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] ${
                props.touched.linkedinUrl && props.errors.linkedinUrl
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {props.touched.linkedinUrl && props.errors.linkedinUrl && (
              <div className="text-red-500 text-xs mt-1">
                {props.errors.linkedinUrl}
              </div>
            )}
          </div>

          <div className="py-2 rounded-md text-md">
            <label className="text-xs font-semibold text-gray-600 mb-1">
              YouTube URL:
            </label>
            <Input
              name="youtubeUrl"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              defaultValue={props?.item?.youtubeUrl ?? undefined}
              placeholder="YouTube URL"
              //label="YouTube URL:"
              className={`block w-full px-3 py-2 text-xs border border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] ${
                props.touched.youtubeUrl && props.errors.youtubeUrl
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {props.touched.youtubeUrl && props.errors.youtubeUrl && (
              <div className="text-red-500 text-xs mt-1">
                {props.errors.youtubeUrl}
              </div>
            )}
          </div>

          <div className="py-2 rounded-md text-md">
            <label className="text-xs font-semibold text-gray-600 mb-1">
              Website URL:
            </label>
            <Input
              name="websiteUrl"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              defaultValue={props?.item?.websiteUrl ?? undefined}
              placeholder="Website URL"
              // label="Website URL:"
              className={`block w-full px-3 py-2 text-xs border border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] ${
                props.touched.websiteUrl && props.errors.websiteUrl
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {props.touched.websiteUrl && props.errors.websiteUrl && (
              <div className="text-red-500 text-xs mt-1">
                {props.errors.websiteUrl}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="py-4 flex justify-end gap-4 sticky bottom-0 bg-white">
            <div>
              <Button
                onClick={cancelForm}
                name={"Cancel"}
                className="text-xs text-gray-600 bg-white py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 transition-all duration-200"
              />
            </div>
            <div>
              <Button
                type="submit"
                name={"Save"}
                className="text-xs text-white bg-gradient-to-r from-blue-500 to-indigo-500 py-2 px-4 rounded-md hover:opacity-90 transition-all duration-200"
                loading={props.isSubmitting}
              />
            </div>
          </div>
        </div>
      </form>
    </div>

  );
}

export default withFormik<IFormProps, FormikValues>({
  validationSchema: object().shape({
    businessName: string(),
    facebookUrl: string(),
    instagramUrl: string(),
    twitterUrl: string(),
    linkedinUrl: string(),
    youtubeUrl: string(),
    websiteUrl: string(),
  }),

  mapPropsToValues: ({ item }) => ({
    id: item?.id ?? undefined,
    businessLocationId: item?.businessLocation?.id ?? undefined,
    // businessName: item?.businessName?.businessLocation ?? undefined,
    facebookUrl: item?.facebookUrl ?? undefined,
    instagramUrl: item?.instagramUrl ?? undefined,
    twitterUrl: item?.twitterUrl ?? undefined,
    linkedinUrl: item?.linkedinUrl ?? undefined,
    youtubeUrl: item?.youtubeUrl ?? undefined,
    websiteUrl: item?.websiteUrl ?? undefined,
  }),

  handleSubmit: (values, { props, ...actions }) => {
    console.log("🚀 ~ values:", values);

    props.onSubmit(values, actions);
  },
  enableReinitialize: true,
  validateOnBlur: false,
})(Form);
