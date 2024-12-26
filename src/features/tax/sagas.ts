import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'lib/axios';
import { apiURL } from 'config';
import {
  archiveTaxFailed,
  archiveTaxRequested,
  archiveTaxSucceeded,
  createTaxFailed,
  createTaxRequested,
  createTaxSucceeded,
  loadTaxFilterFailed,
  loadTaxFilterRequested,
  loadTaxFilterSucceeded,
  loadTaxsFailed,
  loadTaxsRequested,
  loadTaxsSucceeded,
  updateTaxFailed,
  updateTaxRequested,
  updateTaxSucceeded,
} from './taxSlice';
import toast from "react-hot-toast";

function* getTaxsEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}taxes`);
    yield put(loadTaxsSucceeded(response.data));
  } catch (error: any) {
    yield put(loadTaxsFailed(error));
  }
}

function* storeTaxEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(axios.post, `${apiURL}tax`, action.payload);
    if (response.data?.success) {
      yield put(createTaxSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(createTaxFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(createTaxFailed(error));
  }
}

function* updateTaxEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}tax/${action.payload.id}`,
      action.payload.values
    );
    if (response.data?.success) {
      yield put(updateTaxSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(updateTaxFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(updateTaxFailed(error));
  }
}

function* archiveTaxEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}tax/active?id=${action.payload.id}`
    );
    if (response.data?.success) {
      yield put(archiveTaxSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(archiveTaxFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(archiveTaxFailed(error));
  }
}


// function* getTaxFilterEffect(action: {
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
//       `${apiURL}tax/filter?${queryParams.toString()}`
//     );

//     yield put(loadTaxFilterSucceeded(response?.data));
//   } catch (error: any) {
//     yield put(loadTaxFilterFailed(error));
//   }
// }


function* getTaxFilterEffect(action: {
  type: string;
  payload: {
    taxName?:string;
    tax?: number;
    pageSize?: number;
    pageCount?: number;
  };
}): Generator<any, void, any> {
  try {
    const {
      tax,
      taxName,
      pageSize = 10,
      pageCount = 1,
    } = action.payload;

    const queryParams = new URLSearchParams();
    if (taxName) {
      queryParams.append('taxName', taxName);
    }
    if (tax) {
      queryParams.append('tax',tax.toString());
    }
 
    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}tax/filter?${queryParams.toString()}`
    );
    yield put(loadTaxFilterSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadTaxFilterFailed(error));
  }
}

export function* taxSaga(): Generator<any, void, any> {
  yield takeLatest(loadTaxsRequested, getTaxsEffect);
  yield takeLatest(createTaxRequested, storeTaxEffect);
  yield takeLatest(updateTaxRequested, updateTaxEffect);
  yield takeLatest(archiveTaxRequested, archiveTaxEffect);
  yield takeLatest(loadTaxFilterRequested,getTaxFilterEffect);
}
