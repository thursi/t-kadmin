import React, { useEffect, useState } from 'react';
import { Button, Input } from 'components';
import { withFormik, FormikProps } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/reducer';
import { string, object, array, number } from 'yup';

export interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
  setModal?: any;
  navigation?: any;
  buttonName?: any;
}

interface FormikValues {
  contactType: string;
  businessType: string;
  contactPersons: any[];
  mobile: string;
  email: string;
  alternateContact: string;
  landline: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

function Form(props: FormikProps<FormikValues> & IFormProps) {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  async function cancelForm() {
    // props?.setModal(false);
    navigation(props?.navigation);

    props?.resetForm();
  }
  const [contactPersons, setContactPersons] = useState(
    props.values.contactPersons || []
  );

  useEffect(() => {
    if (props.values.contactPersons.length === 0) {
      addContactPerson();
    }
  }, []);
  const addContactPerson = () => {
    const newContact = {
      prefix: '',
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      businessName:'',
      alternateContactNumber: '',
      familyContactNumber: '',
      department: '',
      designation: '',
      salesCommissionPercentage: 0,
    };
    props.setFieldValue('contactPersons', [
      ...props.values.contactPersons,
      newContact,
    ]);
    console.log(
      'props.values.contactPersonsprops.values.contactPersons',
      props.values.contactPersons
    );
    console.log('newContactsnewContact', newContact);
  };

  const removeContactPerson = (index: number) => {
    if (props.values.contactPersons.length > 1) {
      const updatedContacts = props.values.contactPersons.filter(
        (_, i) => i !== index
      );
      props.setFieldValue('contactPersons', updatedContacts);
    } else {
      alert('At least one contact person is required.');
    }
  };

  if (props?.isSubmitting) {
    return <div>Loading...</div>;
  }
  //
  return (
    <div className="w-full">
      <div className="w-full">
        <form onSubmit={props.handleSubmit} className="w-full">
          <div className="w-full  pb-8 flex flex-col gap-3">
            <div className="w-full bg-white px-8 pt-8 grid grid-cols-3 gap-3">           
              {/* <div className=" rounded-md w-full text-xs">
                <div className=" py-3">
                  <label className="  text-xs text-[11px] font-bold  text-black ">
                    Contact Type :
                  </label>
                  <select
                    name="contactType"
                    value={props.values.contactType || ''}
                    onChange={(e) =>
                      props.setFieldValue('contactType', e.target.value)
                    }
                    onBlur={props.handleBlur}
                    className="block w-full px-2 mt-2 py-2 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] focus:border-[#b0afb3] focus:outline-none"
                  >
                    <option value="" disabled>
                      Choose an option...
                    </option>
                    <option value="SUPPLIERS">SUPPLIERS</option>
                    <option value="BOTH">BOTH</option>
                  </select>
                  {props.touched.contactType && props.errors.contactType ? (
                    <div className="text-red-600 text-xs mt-1">
                      {props.errors.contactType}
                    </div>
                  ) : null}
                </div>
              </div> */}

              <div className=" rounded-md w-full text-xs">
                <div className=" py-3">
                  <label className="  text-xs text-[11px] font-bold  text-black ">
                    Business Type :
                  </label>
                  <select
                    name="businessType"
                    value={props.values.businessType || ''}
                    onChange={(e) =>
                      props.setFieldValue('businessType', e.target.value)
                    }
                    required
                    onBlur={props.handleBlur}
                    className="block w-full px-2 mt-2 py-2 border text-xs border-[#b0afb3] rounded-md focus:ring-0 focus:border-[#b0afb3] focus:outline-none"
                  >
                    <option value="" disabled>
                      Choose an option...
                    </option>
                    <option value="INDIVIDUAL">INDIVIDUAL</option>
                    <option value="BUSINESS">BUSINESS</option>
                  </select>
                  {props.touched.businessType && props.errors.businessType ? (
                    <div className="text-red-600 text-xs mt-1">
                      {props.errors.businessType}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="py-3 rounded-md w-full text-xs">
                <Input
                  name="businessName"
                  values={props?.values}
                  errors={props.errors}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  touches={props.touched}
                  defaultValue={props.item?.businessName ?? ''}
                  placeholder="Enter Business Name"
                  label="Business Name :"               
                  className={
                    'flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] '
                  }
                />
              </div>            

              <div className="py-3 rounded-md w-full text-xs">
                <Input
                  name="mobile"
                  values={props?.values}
                  errors={props.errors}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  touches={props.touched}
                  defaultValue={props?.item?.mobile ?? undefined}
                  placeholder="Enter Mobile"
                  label="Mobile :"
                  className={
                    'flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] '
                  }
                />
              </div>
              <div className="py-3 rounded-md w-full text-xs">
                <Input
                  name="email"
                  values={props.values}
                  errors={props.errors}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  touches={props.touched}
                  defaultValue={props?.item?.email ?? undefined}
                  placeholder="Enter Email"
                  label="Email :"
                  className={
                    'flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] '
                  }
                />
              </div>
              <div className="py-3 rounded-md w-full text-xs">
                <Input
                  name="alternateContact"
                  values={props?.values}
                  errors={props.errors}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  touches={props.touched}
                  defaultValue={props.item?.alternateContact ?? ''}
                  placeholder="Enter Alternate Contact"
                  label="Alternate Contact :"
                  className={
                    'flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] '
                  }
                />
              </div>
              <div className="py-3 rounded-md w-full text-xs">
                <Input
                  name="landline"
                  values={props.values}
                  errors={props.errors}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  touches={props.touched}
                  defaultValue={props?.item?.landline ?? undefined}
                  placeholder="Enter Landline"
                  label="Landline :"
                  className={
                    'flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] '
                  }
                />
              </div>
            </div>
            <div className="font-bold text-xl">More Information</div>
            <div className="w-full bg-white px-8 pt-5 grid grid-cols-3 gap-3">
              <div className="py-3 rounded-md w-full text-xs">
                <Input
                  name="addressLine1"
                  values={props.values}
                  errors={props.errors}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  touches={props.touched}
                  defaultValue={props?.item?.addressLine1 ?? undefined}
                  placeholder="Enter AddressLine 1"
                  label="AddressLine 1 :"
                  className={
                    'flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]'
                  }
                />
              </div>

              <div className="py-3 rounded-md w-full text-xs">
                <Input
                  name="addressLine2"
                  values={props.values}
                  errors={props.errors}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  touches={props.touched}
                  defaultValue={props?.item?.addressLine2 ?? undefined}
                  placeholder="Enter AddressLine 2"
                  label="AddressLine 2 :"
                  className={
                    'flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]'
                  }
                />
              </div>

              <div className="py-3 rounded-md w-full text-xs">
                <Input
                  name="city"
                  values={props.values}
                  errors={props.errors}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  touches={props.touched}
                  defaultValue={props?.item?.city ?? undefined}
                  placeholder="Enter city"
                  label="City :"
                  className={
                    'flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]'
                  }
                />
              </div>
              <div className="py-3 rounded-md w-full text-xs">
                <Input
                  name="state"
                  values={props.values}
                  errors={props.errors}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  touches={props.touched}
                  defaultValue={props?.item?.state ?? undefined}
                  placeholder="Enter state"
                  label="State :"
                  className={
                    'flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]'
                  }
                />
              </div>
              <div className="py-3 rounded-md w-full text-xs">
                <Input
                  name="country"
                  values={props.values}
                  errors={props.errors}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  touches={props.touched}
                  defaultValue={props?.item?.country ?? undefined}
                  placeholder="Enter country"
                  label="Country :"
                  className={
                    'flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]'
                  }
                />
              </div>

              <div className="py-3 rounded-md w-full text-xs">
                <Input
                  name="zipCode"
                  values={props.values}
                  errors={props.errors}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  touches={props.touched}
                  defaultValue={props?.item?.zipCode ?? undefined}
                  placeholder="Enter ZipCode"
                  label="ZipCode :"
                  className={
                    'flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]'
                  }
                />
              </div>
            </div>


            {props.values.businessType === 'INDIVIDUAL' &&
              props.values.contactPersons.map((contactPerson, index) => (
                <>
                  <div className="flex justify-between items-center font-bold text-xl p-5">
                    {`Add Contact ${index + 1}`}

                    <div className="flex space-x-2">
                      {index !== 0 && (
                        <Button
                          type="button"
                          onClick={() => removeContactPerson(index)}
                          name="Remove"
                          className="bg-red-500 text-xs text-white px-2 py-1 rounded-md"
                        />
                      )}

                      {/* Add Contact Button */}
                      <Button
                        type="button"
                        onClick={addContactPerson}
                        name="Add Contact"
                        className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md"
                      />
                    </div>
                  </div>

                  <div
                    key={index}
                    className="w-full bg-white px-8 pt-5 grid grid-cols-3 gap-3"
                  >
                    <div className="py-3 rounded-md w-full text-xs">
                      <Input
                        name={`contactPersons[${index}].prefix`}
                        values={props.values.contactPersons}
                        errors={props.errors}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        touches={props.touched}
                        defaultValue={contactPerson.prefix}
                        placeholder="Enter Prefix"
                        label="Prefix :"
                        className="flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                      />
                    </div>

                    <div className="py-3 rounded-md w-full text-xs">
                      <Input
                        name={`contactPersons[${index}].firstName`}
                        values={props.values}
                        errors={props.errors}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        touches={props.touched}
                        defaultValue={contactPerson.firstName ?? ''}
                        placeholder="Enter First Name"
                        label="First Name :"
                        className="flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                      />
                    </div>
                    <div className="py-3 rounded-md w-full text-xs">
                      <Input
                        name={`contactPersons[${index}].lastName`}
                        values={props.values}
                        errors={props.errors}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        touches={props.touched}
                        defaultValue={contactPerson.lastName ?? ''}
                        placeholder="Enter Last Name"
                        label="Last Name :"
                        className="flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                      />
                    </div>

                    <div className="py-3 rounded-md w-full text-xs">
                      <Input
                        name={`contactPersons[${index}].email`}
                        values={props.values}
                        errors={props.errors}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        touches={props.touched}
                        defaultValue={contactPerson.email ?? ''}
                        placeholder="Enter Email"
                        label="Email :"
                        className="flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                      />
                    </div>
                    <div className="py-3 rounded-md w-full text-xs">
                      <Input
                        name={`contactPersons[${index}].mobileNumber`}
                        values={props.values}
                        errors={props.errors}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        touches={props.touched}
                        defaultValue={contactPerson.mobileNumber ?? ''}
                        placeholder="Enter Mobile Number"
                        label="Mobile Number :"
                        className="flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                      />
                    </div>
                    <div className="py-3 rounded-md w-full text-xs">
                      <Input
                        name={`contactPersons[${index}].alternateContactNumber`}
                        values={props.values}
                        errors={props.errors}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        touches={props.touched}
                        defaultValue={
                          contactPerson.alternateContactNumber ?? ''
                        }
                        placeholder="Enter Alternate Contact Number"
                        label="Alternate Contact Number :"
                        className="flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                      />
                    </div>
                    <div className="py-3 rounded-md w-full text-xs">
                      <Input
                        name={`contactPersons[${index}].department`}
                        values={props.values}
                        errors={props.errors}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        touches={props.touched}
                        defaultValue={contactPerson.department ?? ''}
                        placeholder="Enter Department"
                        label="Department :"
                        className="flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                      />
                    </div>
                    <div className="py-3 rounded-md w-full text-xs">
                      <Input
                        name={`contactPersons[${index}].designation`}
                        values={props.values}
                        errors={props.errors}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        touches={props.touched}
                        defaultValue={contactPerson.designation ?? ''}
                        placeholder="Enter Designation"
                        label="Designation :"
                        className="flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
                      />
                    </div>
                    <div className="py-3 rounded-md w-full text-xs"></div>
                    <div className="py-3 rounded-md w-full text-xs flex justify-end"></div>
                  </div>
                </>
              ))}

            <div className="py-8 w-full flex justify-end p-5 gap-4">
              <Button
                onClick={cancelForm}
                name="Cancel"
                className="text-black bg-white border-black p-2 w-[100px] rounded-md"
              />
              <Button
                type="submit"
                // name="Submit"
                name={props.buttonName ? props.buttonName : 'Submit'}
                onClick={console.log('propspropspropsprops', props)}
                className="text-white bg-primary py-2 px-4 w-[100px]  rounded-md"
                loading={props.isSubmitting}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withFormik<IFormProps, FormikValues>({
  validationSchema: object().shape({
    // contactType:string().required('Contact Type is required'),
    businessType: string().required('Business Type is required'),
    // alternateContact:string().required('Alternate Contact is required'),
    email: string().required('Email is required'),
    // landline:string().required('Landline is required'),
    addressLine1: string().required('AddressLine 1 is required'),
    // addressLine2: string().required('AddressLine 2 is required'),
    mobile: string().required('Mobile is required'),
    city: string().required('City is required'),
    state: string().required('State is required'),
    country: string().required('Country is required'),
    zipCode: string().required('ZipCode is required'),
  }),

  mapPropsToValues: ({ item }: any) => ({
    id: item?.id ?? undefined,
    contactType: item?.contactType ?? 'SUPPLIERS',
    businessType: item?.businessType ?? undefined,
    contactPersons: item?.contactPersons ?? [],
    mobile: item?.mobile ?? undefined,
    email: item?.email ?? undefined,
    alternateContact: item?.alternateContact ?? undefined,
    businessName: item?.businessName ?? undefined,
    landline: item?.landline ?? undefined,
    addressLine1: item?.addressLine1 ?? undefined,
    addressLine2: item?.addressLine2 ?? undefined,
    city: item?.city ?? undefined,
    state: item?.state ?? undefined,
    country: item?.country ?? undefined,
    zipCode: item?.zipCode ?? undefined,
  }),

  // handleSubmit: (values, { props, ...actions }) => {
  //   console.log('objectthusrsika', values);
  //   props.onSubmit(values, actions);
  // },
  handleSubmit: (values, { props, ...actions }) => {
    props.onSubmit(values, actions);
  },
  enableReinitialize: true,
  validateOnBlur: false,
})(Form);
