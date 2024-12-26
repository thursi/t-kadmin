import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'lib/axios';
import { apiURL } from 'config';
import {
  archiveUnitFailed,
  archiveUnitRequested,
  archiveUnitSucceeded,
  createUnitFailed,
  createUnitRequested,
  createUnitSucceeded,
  loadUnitFilterFailed,
  loadUnitFilterRequested,
  loadUnitFilterSucceeded,
  loadUnitsFailed,
  loadUnitsRequested,
  loadUnitsSucceeded,
  updateUnitFailed,
  updateUnitRequested,
  updateUnitSucceeded,
} from './unitSlice';
import toast from 'react-hot-toast';
import { loadTaxFilterFailed, loadTaxFilterRequested, loadTaxFilterSucceeded } from 'features/tax/taxSlice';

function* getUnitsEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}units`);
    yield put(loadUnitsSucceeded(response.data));
  } catch (error: any) {
    yield put(loadUnitsFailed(error));
  }
}

function* storeUnitEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(axios.post, `${apiURL}unit`, action.payload);
    if (response.data?.success) {
      yield put(createUnitSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(createUnitFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(createUnitFailed(error));
  }
}

function* updateUnitEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}unit/${action.payload.id}`,
      action.payload.values
    );
    if (response.data?.success) {
      yield put(updateUnitSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(updateUnitFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(updateUnitFailed(error));
  }
}

function* archiveUnitEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}unit/active?id=${action.payload.id}`
    );
    if (response.data?.success) {
      yield put(archiveUnitSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(archiveUnitFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(archiveUnitFailed(error));
  }
}


// function* getUnitFilterEffect(action: {
//   type: string;
//   payload: {
//     // unitId?: any;
//     pageSize: number;
//     pageCount: number
//   };
// }): Generator<any, void, any> {
//   try {
//     const { pageSize = 10, pageCount =1 } =
//       action.payload;

//     const queryParams = new URLSearchParams();

//     // if (unitId) {
//     //   queryParams.append('unitId', unitId);
//     // }

//     queryParams.append('pageSize', pageSize.toString());
//     queryParams.append('pageCount', pageCount.toString());
    
//     const response = yield call(
//       axios.get,
//       `${apiURL}unit/filter?${queryParams.toString()}`
//     );

//     yield put(loadUnitFilterSucceeded(response?.data));
//   } catch (error: any) {
//     yield put(loadUnitFilterFailed(error));
//   }
// }


function* getUnitFilterEffect(action: {
  type: string;
  payload: {
    unitName?:string;
    uniCode?: string;
    pageSize?: number;
    pageCount?: number;
  };
}): Generator<any, void, any> {
  try {
    const {
      uniCode,
      unitName,
      pageSize = 10,
      pageCount = 1,
    } = action.payload;

    const queryParams = new URLSearchParams();
    if (unitName) {
      queryParams.append('unitName', unitName);
    }
    if (uniCode) {
      queryParams.append('uniCode',uniCode);
    }
 
    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}unit/filter?${queryParams.toString()}`
    );
    yield put(loadUnitFilterSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadUnitFilterFailed(error));
  }
}



export function* unitSaga(): Generator<any, void, any> {
  yield takeLatest(loadUnitsRequested, getUnitsEffect);
  yield takeLatest(createUnitRequested, storeUnitEffect);
  yield takeLatest(updateUnitRequested, updateUnitEffect);
  yield takeLatest(archiveUnitRequested, archiveUnitEffect);
  yield takeLatest(loadUnitFilterRequested,getUnitFilterEffect)
}
