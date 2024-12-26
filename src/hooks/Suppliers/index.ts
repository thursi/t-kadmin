import { SUPPLIERS } from 'constants/routes';
import {
  archiveRequested,
  createSupplierRequested,
  loadFilterSuppilerRequested,
  updateRequested,
} from 'features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function useStoreSuppliers() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const onStore = useCallback(
    async (values: any, action: any) => {
      await dispatch(createSupplierRequested(values));
      navigation(SUPPLIERS);
      action.setSubmitting(false);
    },
    [dispatch]
  );

  return { onStore };
}

export function useUpdateSupplier() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const onUpdate = useCallback(
    async (values: any, action: any) => {   
      await dispatch(
        updateRequested({
          id: values?.id,
          values: {
            contactType: values?.contactType,
            businessType: values?.businessType,
            // customerGroupId: values?.customerGroupId,
            // contactPersons: values?.contactPersons?.map((contact: any) => ({
            //   prefix: contact?.prefix,
            //   firstName: contact?.firstName,
            //   lastName: contact?.lastName,
            //   email: contact?.email,
            //   mobileNumber: contact?.mobileNumber,
            //   alternateContactNumber: contact?.alternateContactNumber,
            //   familyContactNumber: contact?.familyContactNumber,
            //   department: contact?.department,
            //   designation: contact?.designation,
            //   salesCommissionPercentage: contact?.salesCommissionPercentage,
            // })),
            mobile: values?.mobile,
            email: values?.email,
            alternateContact: values?.alternateContact,
            businessName: values?.businessName,
            landline: values?.landline,
            addressLine1: values?.addressLine1,
            addressLine2: values?.addressLine2,
            city: values?.city,
            state: values?.state,
            country: values?.country,
            zipCode: values?.zipCode,
          },
        })
      );
      action.setSubmitting(false);
      navigation(SUPPLIERS);
    },
    [dispatch]
  );

  return { onUpdate };
}

export function useArchiveSupplier() {
  const dispatch = useDispatch();

  const onArchive = useCallback(
    async (id: any) => {
      await dispatch(
        archiveRequested({
          id: id,
        })
      );
    },
    [dispatch]
  );

  return { onArchive };
}


export function useFilterSuppliers() {
  const dispatch = useDispatch();
  const onSuppliersTax = useCallback(
    async (values: any, action: any) => {
      await dispatch(loadFilterSuppilerRequested(values));
      action.setSubmitting(false);
    },
    [dispatch]
  );
  return { onSuppliersTax };
}

