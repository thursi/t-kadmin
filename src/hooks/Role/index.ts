import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
// import { assignRolePermissionRequested, createRoleRequested, updateRoleRequested } from 'features';

// export function useUpdateRole() {
//   const dispatch = useDispatch();

//   const onUpdateRole = useCallback(
//     async (values: any, actions: any) => {
//       actions.setSubmitting(true);
//       await dispatch(updateRoleRequested({ values }));
//     },
//     [dispatch]
//   );

//   return { onUpdateRole };
// }

// export function useAssignRole() {
//   const dispatch = useDispatch();

//   const onAssignRole = useCallback(
//     async (values: any, actions: any) => {
//       // console.log(values);
//       actions.setSubmitting(true);
//       await dispatch(assignRolePermissionRequested({ roleId: values.id, permissions: values.permissions }));
//     },
//     [dispatch]
//   );

//   return { onAssignRole };
// }

// export function useStoreRole() {
//   const dispatch = useDispatch();

//   const onStoreRole = useCallback(
//     async (values: any, actions: any) => {
//       actions.setSubmitting(true);
//       await dispatch(createRoleRequested({ values }));
//     },
//     [dispatch]
//   );

//   return { onStoreRole };
// }
