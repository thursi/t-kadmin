import { call, put, takeLatest } from 'redux-saga/effects';
import { apiURL } from 'config';
import axios from 'lib/axios';
import {

  loadRoleFailed,
  loadRoleSucceeded,
  loadRoleRequested,

} from './roleSlice';
import toast from 'react-hot-toast';

function* loadRoleEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}role`);
    yield put(loadRoleSucceeded(response.data.role_response));
  } catch (error: any) {
    yield put(loadRoleFailed(error));
  }
}
// function* oneDiscountEffect(action: {
//   type: string;
//   payload: any;
// }): Generator<any, void, any> {
//   try {
//     const response = yield call(
//       axios.get,
//       `${apiURL}discount/${action.payload}`
//     );

//     yield put(loadOneDiscountsSucceeded(response.data));
//   } catch (error: any) {
//     yield put(loadOneDiscountsFailed(error));
//   }
// }

// function* storeDiscountEffect(action: {
//   type: string;
//   payload: any;
// }): Generator<any, void, any> {
//   try {
//     console.log(action.payload, 'actionpayload');

//     const response = yield call(
//       axios.post,
//       `${apiURL}discount?updaterId=${49}`,
//       action.payload
//     );

//     if (response.data?.success) {
//       yield put(createDiscountSucceeded(response.data));
//       toast.success(response.data.message);
//       window.history.back();
//     } else {
//       yield put(createDiscountFailed(response.data));
//       toast.error(response.data.message);
//     }
//   } catch (error) {
//     yield put(createDiscountFailed(error));
//     toast.error('Something went wrong');
//   }
// }

// function* getShopProductSearchEffect(action: {
//   type: string;
//   payload: {
//     value: string;
//     pageSize: number;
//     pageCount: number;
//     businessLocationIds: number[];
//   };
// }): Generator<any, void, any> {
//   try {
//     console.log('action.payload', action.payload);

//     const {
//       value: searchTerm,
//       pageSize = 10,
//       pageCount = 1,
//       businessLocationIds = [],
//     } = action.payload;

//     const queryParams = new URLSearchParams();

//     businessLocationIds.forEach((id) => {
//       queryParams.append('businessLocationIds', id.toString());
//     });

//     if (searchTerm) {
//       queryParams.append('searchTerm', searchTerm);
//     }
//     queryParams.append('pageSize', pageSize.toString());
//     queryParams.append('pageCount', pageCount.toString());

//     const response = yield call(
//       axios.get,
//       `${apiURL}product/shops/search?${queryParams.toString()}`
//     );

//     yield put(loadShopProductSearchFilterSucceeded(response?.data));
//   } catch (error: any) {
//     yield put(loadShopProductSearchFilterFailed(error));
//   }
// }

// function* loadFilterDiscountsEffect(action: {
//   type: string;
//   payload: {
//     isActive?: boolean;
//     pageSize?: number;
//     pageCount?: number;
//   };
// }): Generator<any, void, any> {
//   try {
//     const { isActive, pageSize = 10, pageCount = 1 } = action.payload;

//     const queryParams = new URLSearchParams();

//     if (isActive !== undefined) {
//       queryParams.append('isActive', isActive.toString());
//     }

//     queryParams.append('pageSize', pageSize.toString());
//     queryParams.append('pageCount', pageCount.toString());

//     const response = yield call(
//       axios.get,
//       `${apiURL}discount/filter?${queryParams.toString()}`
//     );
//     yield put(loadFilterDiscountsSucceeded(response?.data));
//   } catch (error: any) {
//     yield put(loadFilterDiscountsFailed(error));
//   }
// }

// function* updateDiscountEffect(action: {
//   type: string;
//   payload: any;
// }): Generator<any, void, any> {
//   try {
//     console.log('action.payload.id', action.payload.id);
//     const URL = `${apiURL}discount/${action.payload.id}?updaterId=${49}`;

//     const response = yield call(axios.put, URL, action.payload.values);
//     if (response.data?.success) {
//       yield put(updateDiscountSucceeded(response?.data));
//       toast.success(response.data.message);
//       window.history.back();
//     } else {
//       yield put(updateDiscountFailed(response.data));
//       toast.error(response.data.message);
//     }
//   } catch (error: any) {
//     yield put(updateDiscountFailed(error));
//     toast.error('Something went wrong');
//   }
// }



// function* handleFileUploadEffect(action: {
//   type: string;
//   payload: {
//     file: File;
//     updaterId: number;
//   };
// }): Generator {
//   const { file, updaterId } = action.payload;
//   try {
//     const formData = new FormData();
//     formData.append('file', file);
//     const { data: response }: any = yield call(
//       axios.post,
//       `${apiURL}discount/csv/upload?updaterId=${updaterId}`,
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Accept: '*/*',
//         },
//       }
//     );

//     console.log('Server Response:', response);

//     if (response?.successCount > 0) {
//       yield put(uploadExcelDiscountFileSucceeded(response.successCount));
//       toast.success(
//         `Successfully imported ${response.successCount} records. that is ${response.successRecords}`
//       );
//     }

//     if (response?.invalidRecords?.length > 0) {
//       response.invalidRecords.map((record: any) => {
//         toast.error(record.error);
//       });
//     }

//     if (response?.successRecords?.length > 0) {
//       console.log('Successfully processed records:', response.successRecords);
//     } else if (
//       response?.successCount === 0 &&
//       (!response.invalidRecords || response.invalidRecords.length === 0)
//     ) {
//       toast.error('No records processed. Please check the file.');
//     }
//   } catch (error: any) {
//     console.error('Upload error:', error);
//     yield put(
//       uploadExcelDiscountFileFailed(error.message || 'Failed to import file')
//     );
//     toast.error(`Failed to import file: ${error.message}`);
//   }
// }

export function* roleSaga() {
  yield takeLatest(loadRoleRequested, loadRoleEffect);
}
