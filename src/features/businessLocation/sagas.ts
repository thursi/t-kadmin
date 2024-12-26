import { call, put, takeLatest } from 'redux-saga/effects';
import { apiURL } from 'config';
import axios from 'lib/axios';
import {
  archiveBusinessLocationFailed,
  archiveBusinessLocationRequested,
  archiveBusinessLocationSucceeded,
  createBusinessLocationFailed,
  createBusinessLocationRequested,
  createBusinessLocationSucceeded,
  loadBusinessLocationsFailed,
  loadBusinessLocationsRequested,
  loadBusinessLocationsSucceeded,
  loadFiltereBusLoctionFailed,
  loadFiltereBusLoctionRequested,
  loadFiltereBusLoctionSucceeded,
  updateBusinessLocationdayAllocationFailed,
  updateBusinessLocationdayAllocationRequested,
  updateBusinessLocationdayAllocationSucceeded,
  updateBusinessLocationFailed,
  updateBusinessLocationRequested,
  updateBusinessLocationSucceeded,
  uploadExcelShopFileFailed,
  uploadExcelShopFileSucceeded,
  uploadExcelShopRequestedFile,
} from './businessLocationSlice';
import toast from 'react-hot-toast';

function* loadBusinessLocationsEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}business_locations`);
    yield put(loadBusinessLocationsSucceeded(response.data));
  } catch (error: any) {
    yield put(loadBusinessLocationsFailed(error));
  }
}

function* createBusinessLocationEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.post,
      `${apiURL}business_location`,
      action.payload
    );
    if (response.data?.success) {
      yield put(createBusinessLocationSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(createBusinessLocationFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(loadBusinessLocationsFailed(error));
  }
}

function* updateBusinessLocationEffect(action: {
  type: string;
  payload: { name: string; id: number };
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}business_location/${action.payload.id}`,
      action.payload
    );
    if (response.data?.success) {
      yield put(updateBusinessLocationSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(updateBusinessLocationFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(updateBusinessLocationFailed(error));
  }
}



function* updateBusinessLocationDayAllocationEffect(action: {
  type: string;
  payload: {
    businessLocationId: number;
    dayAllocationRequestList: {
      day: string;
      timeSlots: {
        startTime: string;
        endTime: string;
        deliveryCount: number;
      }[];
    }[];
  };
}): Generator<any, void, any> {
  try {
    const payload = {
      businessLocationId: action.payload.businessLocationId,
      dayAllocationRequestList: action.payload.dayAllocationRequestList,
    };
    const response = yield call(
      axios.put,
      `${apiURL}business_location/${action.payload.businessLocationId}/dayAllocation`,
      payload
    );

    if (response.data?.success) {
      yield put(updateBusinessLocationdayAllocationSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(updateBusinessLocationdayAllocationFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(updateBusinessLocationdayAllocationFailed(error));
    toast.error('An error occurred while updating day allocation.');
  }
}

function* archiveBusinessLocationEffect(action: {
  type: string;
  payload: { id: number };
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}business_location/active?id=${action.payload.id}`
    );
    if (response.data?.success) {
      yield put(archiveBusinessLocationSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(archiveBusinessLocationFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(archiveBusinessLocationFailed(error));
  }
}

function* loadFilterBusLoctionEffect(action: {
  type: string;
  payload: {
    isActive?: boolean;
    businessName?: string;
    pageSize?: number;
    pageCount?: number;
  };
}): Generator<any, void, any> {
  try {
    const {
      businessName,
      isActive,
      pageSize = 10,
      pageCount = 1,
    } = action.payload;
    console.log('businessName, isActive ', businessName, isActive);
    const queryParams = new URLSearchParams();

    if (isActive !== undefined) {
      queryParams.append('isActive', isActive.toString());
    }

    if (businessName) {
      queryParams.append('businessName', businessName);
    }
    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}business_location/filter?${queryParams.toString()}`
    );
    yield put(loadFiltereBusLoctionSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadFiltereBusLoctionFailed(error));
  }
}


// function* handleFileUploadEffect(action: {
//   type: string;
//   payload: {
//     file: File;
//   };
// }): Generator {
//   const { file } = action.payload;
//   try {
//     const formData = new FormData();
//     formData.append('file', file);
//     const {response}:any = yield call(
//       axios.post,
//       `${apiURL}product/shop/csv/upload`,
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Accept: '*/*',
//         },
//       }
//     );
  
//     if (response?.data?.successCount > 0) {
//       yield put(uploadExcelShopFileSucceeded(response?.data?.successCount));
//       toast.success(`Imported successfully: ${response?.data?.successCount}`);

//     } else {
//       // Handle invalid records and show individual errors
//       const invalidRecords = response?.data?.invalidRecords;
//       if (invalidRecords) {
//         invalidRecords.map((record: { error: string }) => {
//           toast.error(record.error);
//         });
//       }
//       // toast.error(response.data);
//     }
//   } catch (error: any) {
//     yield put(
//       uploadExcelShopFileFailed(error.message || 'Failed to import file')
//     );
//     toast.error(`Failed to import`);
//   }
// }


function* handleFileUploadEffect(action: {
  type: string;
  payload: {
    file: File;
    updaterId: number;
  };
}): Generator {
  const { file, updaterId } = action.payload;
  try {
    const formData = new FormData();
    formData.append('file', file);
    const { data: response }: any = yield call(
      axios.post,
      `${apiURL}product/shop/csv/upload?updaterId=${updaterId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: '*/*',
        },
      }
    );

    console.log('Server Response:', response);

    if (response?.successCount > 0) {
      yield put(uploadExcelShopFileSucceeded(response.successCount));
      toast.success(
        `Successfully imported ${response.successCount} records. that is ${response.successRecords}`
      );
    }

    if (response?.invalidRecords?.length > 0) {
      response.invalidRecords.map((record: any) => {
        toast.error(record.error);
      });
    }

    if (response?.successRecords?.length > 0) {
      console.log('Successfully processed records:', response.successRecords);
    } else if (
      response?.successCount === 0 &&
      (!response.invalidRecords || response.invalidRecords.length === 0)
    ) {
      toast.error('No records processed. Please check the file.');
    }
  } catch (error: any) {
    console.error('Upload error:', error);
    yield put(
      uploadExcelShopFileSucceeded(error.message || 'Failed to import file')
    );
    toast.error(`Failed to import file: ${error.message}`);
  }
}

export function* businessLocationSaga() {
  yield takeLatest(loadBusinessLocationsRequested, loadBusinessLocationsEffect);
  yield takeLatest(
    createBusinessLocationRequested,
    createBusinessLocationEffect
  );
  yield takeLatest(
    updateBusinessLocationRequested,
    updateBusinessLocationEffect
  );
  yield takeLatest(
    updateBusinessLocationdayAllocationRequested,
    updateBusinessLocationDayAllocationEffect
  );
  yield takeLatest(
    uploadExcelShopRequestedFile,
    handleFileUploadEffect
  );
  yield takeLatest(
    archiveBusinessLocationRequested,
    archiveBusinessLocationEffect
  );
  yield takeLatest(loadFiltereBusLoctionRequested, loadFilterBusLoctionEffect);
}
