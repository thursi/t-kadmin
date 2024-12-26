import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FormikProps, withFormik } from 'formik';
import { Button, Input, SearchDropDown, TextArea } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import { number, object, string } from 'yup';
import { loadCitiesRequested } from 'features';

export interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
  setModal?: any;
}

interface FormikValues {
  businessName: string;
  description: string;
  cityId: number;
  uniCode: string;
  deliveryDistance: number;
  distancePerPrice: number;
  latitude: number;
  longitude: number;
}

function Form(props: FormikProps<FormikValues> & IFormProps) {
  console.log('.itemsprops', props.item);
  const [address, setAddress] = useState('');
  const [geocodeError, setGeocodeError] = useState('');
  const [branchLatitude, setBranchLatitude] = useState<number>(9.6615);
  const [branchLongitude, setBranchLongitude] = useState<number>(80.0156);
  const center = { lat: 9.6615, lng: 80.0156 };
  const [deliveryDistances, setDeliveryDistance] = useState<string>('0');
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const ratePerKm = 100;
  const { cities, cityLoading } = useSelector((state: RootState) => state.city);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCitiesRequested());
  }, [dispatch]);

  const handleSearchClick = () => {
    if (!address.trim()) {
      setGeocodeError('Please enter a valid address.');
      return;
    }

    if (isApiLoaded && typeof google !== 'undefined') {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results: any, status) => {
        if (status === 'OK' && results[0]?.geometry?.location) {
          const location = results[0].geometry.location;
          const lat = location.lat();
          const lng = location.lng();

          // Calculate delivery distance (example calculation based on the coordinates)
          const distance = Math.sqrt(
            Math.pow(lat - branchLatitude, 2) +
              Math.pow(lng - branchLongitude, 2)
          );
          // setDeliveryDistance((distance * ratePerKm).toFixed(2));

          // setDeliveryDistance(distance.toFixed(2));
          props.setFieldValue('deliveryDistance', distance.toFixed(2));
          setBranchLatitude(lat);
          setBranchLongitude(lng);
          props.setFieldValue('latitude', lat);
          props.setFieldValue('longitude', lng);

          // Calculate delivery charge (example formula)
          const deliveryCharge = parseFloat(distance.toFixed(2)) * 10;
          props.setFieldValue('distancePerPrice', deliveryCharge);

          setGeocodeError('');
        } else {
          const errorMessage =
            status === 'ZERO_RESULTS'
              ? 'Could not find location. Please refine your search.'
              : 'An error occurred while geocoding. Please try again.';
          setGeocodeError(errorMessage);
        }
      });
    } else {
      setGeocodeError('Google Maps API is not loaded. Please try again later.');
    }
  };

  const cancelForm = () => {
    props.setModal(false);
    props.resetForm();
  };
  console.log(cities);

  return (
    <form onSubmit={props.handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            {/* Business Name */}
            <Input
              name="businessName"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              placeholder="Enter Business Location Name"
              label="Name :"
            />

            <div className=" rounded-md w-full text-xs">
              <div className=" py-3">
                <label className="  text-xs text-[11px] font-bold  text-black ">
                  Category Name :
                </label>
                <select
                  name="cityId"
                  value={props.values.cityId || ''}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  className="block w-full px-2 mt-2 py-2 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                >
                  <option value="">Select City</option>
                  {cities?.map((city: any) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>

                {props.touched.cityId && props.errors.cityId ? (
                  <div className="text-red-600 text-xs mt-1">
                    {props.errors.cityId}
                  </div>
                ) : null}

                {/* Display the selected Category Name after selection */}
              </div>
            </div>
            {/* <SearchDropDown
              name="cityId"
              values={props.values}
              options={
                cities
                  ? cities?.map((city: any) => ({
                      name: city?.name,
                      value: city?.id,
                    }))
                  : []
              }
              onChange={props.handleChange}
              errors={props.errors}
              touches={props.touched}
              placeholder="Select a city"
              label="City :"
            /> */}

            {/* Description */}
            <TextArea
              name="description"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              defaultValue={props?.item?.description ?? undefined}
              placeholder="Enter Business Location Description"
              label="Description :"
              className={`flex items-center w-full px-2 h-23 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] no-scrollbar ${
                props.touched.description && props.errors.description
                  ? 'border-red-500'
                  : 'border-[#b0afb3]'
              }`}
            />

            {/* Uni Code */}
            <Input
              name="uniCode"
              values={props.values}
              errors={props.errors}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touches={props.touched}
              placeholder="Enter Uni Code"
              label="Uni Code :"
            />
          </div>

          {/* Address Input */}
          <div className="py-2 rounded-md w-full text-xs">
            <label className="block text-sm font-medium text-gray-700">
              Address:
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter an address"
                className="flex-grow px-2 h-10 py-2 border text-xs border-[#b0afb3] rounded-md focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-3 text-gray-500 hover:text-gray-700"
                onClick={handleSearchClick}
              >
                <FaSearch size={16} />
              </button>
            </div>
            {geocodeError && (
              <p className="text-red-500 text-sm mt-2">{geocodeError}</p>
            )}

            <LoadScript
              googleMapsApiKey="AIzaSyBfcgD4dOQluqAZYeS1mEJZksr3jYmoNWE"
              onLoad={() => setIsApiLoaded(true)}
            >
              <div className="mt-4 h-64 w-full border border-gray-300 rounded-md">
                <GoogleMap
                  center={{ lat: branchLatitude, lng: branchLongitude }}
                  zoom={15}
                  mapContainerStyle={{ height: '100%', width: '100%' }}
                >
                  <Marker
                    position={{ lat: branchLatitude, lng: branchLongitude }}
                  />
                </GoogleMap>
              </div>
            </LoadScript>
          </div>
        </div>

        {/* Calculated Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="deliveryDistance"
              className="block font-medium mb-2"
            >
              Delivery Distance (km)
            </label>
            <input
              type="text"
              id="deliveryDistance"
              className="w-full border-gray-300 rounded-md"
              value={`${props.values.deliveryDistance} km`}
              readOnly
            />
          </div>
          <div>
            <label
              htmlFor="distancePerPrice"
              className="block font-medium mb-2"
            >
              Delivery Charge
            </label>
            <input
              type="text"
              id="distancePerPrice"
              className="w-full border-gray-300 rounded-md"
              value={`Rs. ${props.values.distancePerPrice}`}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="latitude" className="block font-medium mb-2">
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              className="w-full border-gray-300 rounded-md"
              value={props.values.latitude}
              onChange={(e) => {
                const lat = parseFloat(e.target.value);
                setBranchLatitude(lat);
                props.setFieldValue('latitude', lat);
              }}
            />
          </div>
          <div>
            <label htmlFor="longitude" className="block font-medium mb-2">
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              className="w-full border-gray-300 rounded-md"
              value={props.values.longitude}
              onChange={(e) => {
                const lng = parseFloat(e.target.value);
                setBranchLongitude(lng);
                props.setFieldValue('longitude', lng);
              }}
            />
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-end py-8 w-full items-center gap-4">
          <Button
            onClick={cancelForm}
            name={'Cancel'}
            className="text-sm text-black bg-white border-black border-[1px] p-2 rounded-md"
          />
          <Button
            type="submit"
            name="Save"
            className="text-sm text-white bg-primary py-2 px-4 rounded-md"
            onClick={props.handleSubmit}
            loading={props.isSubmitting}
          />
        </div>
      </div>
    </form>
  );
}

export default withFormik<IFormProps, FormikValues>({
  validationSchema: object().shape({
    businessName: string().required('Business Location name is required'),
    description: string().required('Description is required'),
    cityId: number().required('Please select a city!'),
    uniCode: string().required('Unique business location code is required'),
    latitude: number().required('Latitude is required'),
    longitude: number().required('Longitude is required'),
  }),
  mapPropsToValues: ({ item }: IFormProps) => ({
    businessName: item?.businessName || '',
    description: item?.description || '',
    cityId: item?.cityId || 0,
    uniCode: item?.uniCode || '',
    deliveryDistance: item?.deliveryDistance || 0,
    distancePerPrice: item?.distancePerPrice || 0,
    latitude: item?.latitude || 9.6615,
    longitude: item?.longitude || 80.0156,
  }),
  handleSubmit: (values, { props, ...actions }) => {
    props.onSubmit(values, actions);
  },
  enableReinitialize: true,
  validateOnBlur: false,
})(Form);
