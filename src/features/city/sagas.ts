import { call, put, takeLatest } from 'redux-saga/effects';
import { apiURL } from 'config';
import axios from 'lib/axios';
import {
  archiveCityFailed,
  archiveCityRequested,
  archiveCitySucceeded,
  createCityFailed,
  createCityRequested,
  createCitySucceeded,
  loadCitiesFailed,
  loadCitiesRequested,
  loadCitiesSucceeded,
  loadFilterCitiesFailed,
  loadFilterCitiesRequested,
  loadFilterCitiesSucceeded,
  updateCityFailed,
  updateCityRequested,
  updateCitySucceeded,
} from './citySlice';
import toast from 'react-hot-toast';

function* loadCitiesEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}cities`);
    yield put(loadCitiesSucceeded(response.data));
  } catch (error: any) {
    yield put(loadCitiesFailed(error));
  }
}

function* createCityEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    console.log(action.payload);
    const response = yield call(axios.post, `${apiURL}city`, action.payload);
    console.log("response",response)
    if (response.data?.success) {
      yield put(createCitySucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(createCityFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(loadCitiesFailed(error));
  }
}

function* updateCityEffect(action: {
  type: string;
  payload: { name: string; id: number };
}): Generator<any, void, any> {
  try {
    console.log(action.payload);
    const response = yield call(
      axios.put,
      `${apiURL}city/${action.payload.id}`,
      action.payload
    );
    if (response.data?.success) {
      yield put(updateCitySucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(updateCityFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(updateCityFailed(error));
  }
}

function* archiveCityEffect(action: {
  type: string;
  payload: { id: number };
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}city/active?id=${action.payload.id}`
    );
    if (response.data?.success) {
      yield put(archiveCitySucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(archiveCityFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(archiveCityFailed(error));
  }
}

// function* loadFilterCitiesEffect(action: {
//   type: string;
//   payload: { isActive?: boolean };
// }): Generator<any, void, any> {
//   try {
//     const response = yield call(
//       axios.get,
//       `${apiURL}city/filter?isActive=${action.payload.isActive}&pageSize=10&pageCount=1`
//     );
//     yield put(loadFilterCitiesSucceeded(response?.data?.records));
//   } catch (error: any) {
//     yield put(loadFilterCitiesFailed(error));
//   }
// }



// function* loadFilterCitiesEffect(action: {
//   type: string;
//   payload: {
//     isActive?: boolean;
//     pageSize?: number;
//     pageCount?: number;
//   };
// }): Generator {
//   try {
//     // Log the isActive status
//     console.log("isActiveserial", action.payload.isActive)

//     // Destructure payload with default values
//     const { isActive, pageSize = 10, pageCount = 1 } = action.payload;

//     // Create query parameters for the API request
//     const params: Record<string, string> = {
//       pageSize: String(pageSize),
//       pageCount: String(pageCount),
//     };

//     if (isActive !== undefined) {
//       params.isActive = isActive.toString();
//     }

//     const queryParams = new URLSearchParams(params).toString();
//     const response = yield call(
//       axios.get, `${apiURL}city/filter?${queryParams}`);

//     // Log the response data
//     console.log("response?.datacities", response?.data)

//     // Dispatch a success action with the retrieved data
//     yield put(loadFilterCitiesSucceeded(response?.data));
//   } catch (error: any) {
//     // If an error occurs, dispatch a failure action
//     yield put(loadFilterCitiesFailed(error));
//   }
// }


function* loadFilterCitiesEffect(action: {
  type: string;
  payload: {
    isActive?: boolean;
    pageSize?: number;
    pageCount?: number;
  };
}): Generator<any, void, any> {
  try {
    const {
      isActive,
      pageSize = 10,
      pageCount = 1,
    } = action.payload;

    const queryParams = new URLSearchParams();

    if (isActive !== undefined) {
      queryParams.append('isActive', isActive.toString());
    }
 
    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}city/filter?${queryParams.toString()}`
    );
    yield put(loadFilterCitiesSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadFilterCitiesFailed(error));
  }
}
export function* citySaga() {
  yield takeLatest(loadCitiesRequested, loadCitiesEffect);
  yield takeLatest(createCityRequested, createCityEffect);
  yield takeLatest(updateCityRequested, updateCityEffect);
  yield takeLatest(archiveCityRequested, archiveCityEffect);
  yield takeLatest(loadFilterCitiesRequested, loadFilterCitiesEffect);
}
