import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'lib/axios';
import { apiURL } from 'config';
import {
  archiveWarrantyFailed,
  archiveWarrantyRequested,
  archiveWarrantySucceeded,
  createWarrantyFailed,
  createWarrantyRequested,
  createWarrantySucceeded,
  loadFiltereWarrantyFailed,
  loadFiltereWarrantyRequested,
  loadFiltereWarrantySucceeded,
  loadWarrantiesFailed,
  loadWarrantiesNameRequested,
  loadWarrantiesNameSucceeded,
  loadWarrantiesRequested,
  loadWarrantiesSucceeded,
  loadWarrantyNameFailed,
  updateWarrantyFailed,
  updateWarrantyRequested,
  updateWarrantySucceeded,
} from './warrantySlice';
import toast from 'react-hot-toast';

function* getWarrantiesEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}warranties`);
    yield put(loadWarrantiesSucceeded(response.data));
  } catch (error: any) {
    yield put(loadWarrantiesFailed(error));
  }
}
function* getWarrantiesNameEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}warranties`);
    yield put(loadWarrantiesNameSucceeded(response.data));
  } catch (error: any) {
    yield put(loadWarrantyNameFailed(error));
  }
}

function* storeWarrantyEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.post,
      `${apiURL}warranty`,
      action.payload
    );
    if (response.data?.success) {
      yield put(createWarrantySucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(createWarrantyFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(createWarrantyFailed(error));
  }
}

function* updateWarrantyEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}warranty/${action.payload.id}`,
      action.payload.values
    );
    if (response.data?.success) {
      yield put(updateWarrantySucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(updateWarrantyFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(updateWarrantyFailed(error));
  }
}

function* archiveWarrantyEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}warranty/archive?id=${action.payload.id}`
    );
    if (response.data?.success) {
      yield put(archiveWarrantySucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(archiveWarrantyFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(archiveWarrantyFailed(error));
  }
}

// function* loadFilterCitiesEffect(action: {
//   type: string;
//   payload: { isActive?: boolean; warrantyName?: string };
// }): Generator<any, void, any> {
//   try {
//     const { warrantyName, isActive } = action.payload;

    
//     const queryParams = [];

    
//     if (warrantyName!== undefined) {
//       queryParams.push(`warrantyName=${encodeURIComponent(warrantyName)}`);
//     }
//     if (isActive !== undefined) {
//       queryParams.push(`isActive=${isActive}`);
//     }

//     const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

//     const apiUrl = `${apiURL}warranty/filter${queryString}&pageSize=10&pageCount=1`;

//     console.log('API URL:', apiUrl);

//     const response = yield call(axios.get, apiUrl);
//     yield put(loadWarrantiesSucceeded(response?.data?.records));
//   } catch (error: any) {
//     yield put(loadWarrantiesFailed(error));
//   }
// }


function* loadFilterWarrantyEffect(action: {
  type: string;
  payload: {
    isActive?: boolean; warrantyName?: string 
    pageSize?: number;
    pageCount?: number;
  };
}): Generator<any, void, any> {
  try {
    const { warrantyName, isActive , pageSize = 10, pageCount = 1 } = action.payload;

    const queryParams = new URLSearchParams();

    if (isActive !== undefined) {
      queryParams.append('isActive', isActive.toString());
    }
 
    if (warrantyName) {
      queryParams.append('warrantyName', warrantyName);
    }
    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}warranty/filter?${queryParams.toString()}`
    );
    yield put(loadFiltereWarrantySucceeded(response?.data));
  } catch (error: any) {
    yield put(loadFiltereWarrantyFailed(error));
  }
}


export function* warrantySaga(): Generator<any, void, any> {
  yield takeLatest(loadWarrantiesRequested, getWarrantiesEffect);
  yield takeLatest(loadWarrantiesNameRequested, getWarrantiesNameEffect);

  yield takeLatest(createWarrantyRequested, storeWarrantyEffect);
  yield takeLatest(updateWarrantyRequested, updateWarrantyEffect);
  yield takeLatest(archiveWarrantyRequested, archiveWarrantyEffect);
  yield takeLatest(loadFiltereWarrantyRequested, loadFilterWarrantyEffect);

}
