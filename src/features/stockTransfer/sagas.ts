import { call, put, takeLatest } from 'redux-saga/effects';
import { apiURL } from 'config';
import axios from 'lib/axios';
import {
  loadStockTransferFailed,
  loadStockTransferRequested,
  loadStockTransferSucceeded,
  loadFilterStockTransferFailed,
  loadFilterStockTransferRequested,
  loadFilterStockTransferSucceeded,
  createStockTransferSucceeded,
  createStockTransfereFailed,
  createStockTransferRequested,
  loadOneStockTransferRequested,
  loadOneStockTransferFailed,
  updateStockTransfereRequested,
  updateStockTransfereSucceeded,
  updateStockTransfereFailed,
  loadOneStockTransferSucceeded,
  StatusStockTransferRequested,
  StatusStockTransferSucceeded,
  StatusStockTransferFailed,
  loadStockTransferReportRequested,
  loadStockTransferReportSucceeded,
  loadStockTransferReportFailed,
} from './stockTransferSlice';
import toast from 'react-hot-toast';

function* getStockTransferEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}StockTransfers`);
    yield put(loadStockTransferSucceeded(response.data));
  } catch (error: any) {
    yield put(loadStockTransferFailed(error));
  }
}

// function* getFilterStockTransferEffect(action: {
//   type: string;
//   payload: {
//     referenceNumber?: string;
//     date?: string;
//     stockTransferStatus?: string;
//     locationTo?: string;
//   };
// }): Generator<any, void, any> {
//   try {
//     const { referenceNumber, date, stockTransferStatus, locationTo } =
//       action.payload;

//     const queryParams = new URLSearchParams();

//     if (referenceNumber) {
//       queryParams.append('referenceNumber', referenceNumber);
//     }
//     if (date) {
//       queryParams.append('date', date);
//     }
//     if (stockTransferStatus) {
//       queryParams.append('stockTransferStatus', stockTransferStatus);
//     }
//     if (locationTo) {
//       queryParams.append('locationTo', locationTo);
//     }

//     const response = yield call(
//       axios.get,
//       `${apiURL}StockTransfer/filter?${queryParams.toString()}&pageSize=10&pageCount=1`
//     );

//     yield put(loadStockTransferSucceeded(response?.data?.records));
//   } catch (error: any) {
//     yield put(loadStockTransferFailed(error));
//   }
// }

function* getFilterStockTransferEffect(action: {
  type: string;
  payload: {
    referenceNumber?: string;
    date?: string;
    stockTransferStatus?: string;
    locationTo?: string;
    pageSize?: number;
    pageCount?: number;
  };
}): Generator<any, void, any> {
  try {
    const {
      referenceNumber,
      date,
      stockTransferStatus,
      locationTo,
      pageSize = 10,
      pageCount = 1,
    } = action.payload;

    const queryParams = new URLSearchParams();
    if (referenceNumber) {
      queryParams.append('referenceNumber', referenceNumber);
    }
    if (date) {
      queryParams.append('date', date);
    }
    if (stockTransferStatus) {
      queryParams.append('stockTransferStatus', stockTransferStatus);
    }
    if (locationTo) {
      queryParams.append('locationTo', locationTo);
    }
    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}StockTransfer/filter?${queryParams.toString()}`
    );
    yield put(loadFilterStockTransferSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadFilterStockTransferFailed(error));
  }
}

// function* getFilterStockTransferEffect(action: {
//   type: string;
//   payload: {
//     pageSize?: number;
//     pageCount?: number;
//     referenceNumber?: string;
//     date?: string;
//     stockTransferStatus?: string;
//     locationTo?: string;
//   };
// }): Generator {
//   try {
//     const {
//       referenceNumber,
//       date,
//       stockTransferStatus,
//       locationTo,
//  pageSize = 10, pageCount = 1 } = action.payload;

//     const queryParams = new URLSearchParams({
//       ...(date ? { date: String(date) } : []),
//       ...(stockTransferStatus ? { stockTransferStatus: String(stockTransferStatus) } : []),
//       pageSize: String(pageSize),
//       pageCount: String(pageCount),
//     }).toString();

//     const response = yield call(
//       axios.get,`${apiURL}StockTransfer/filter?${queryParams.toString()}`);

//     yield put(loadFilterStockTransferSucceeded(response?.data));
//   } catch (error: any) {
//     yield put(loadFilterStockTransferFailed(error));
//   }
// }

function* getStockTransferReportEffect(action: {
  type: string;
  payload: {
    startDate?: string;
    endDate?: string;
    businessLocationId?: string;
  };
}): Generator<any, void, any> {
  try {
    const { startDate, endDate, businessLocationId } = action.payload;

    const queryParams = new URLSearchParams();

    if (startDate) {
      queryParams.append('startDate', startDate);
    }
    if (endDate) {
      queryParams.append('endDate', endDate);
    }
    if (businessLocationId) {
      queryParams.append('businessLocationId', businessLocationId);
    }

    const response = yield call(
      axios.get,
      `${apiURL}StockTransfers/report?${queryParams.toString()}`
    );

    yield put(loadStockTransferReportSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadStockTransferReportFailed(error));
  }
}

function* storeStockTransferEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    console.log(action.payload, 'actionpayload');

    const response = yield call(
      axios.post,
      `${apiURL}StockTransfer`,
      action.payload
    );

    if (response.data?.success) {
      yield put(createStockTransferSucceeded(response.data));
      toast.success(response.data.message);
      window.history.back();
    } else {
      yield put(createStockTransfereFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error) {
    yield put(createStockTransfereFailed(error));
    toast.error('Something went wrong');
  }
}

function* getByStockTransferEffect(action: {
  type: string;
  payload: {
    id?: string;
  };
}): Generator<any, void, any> {
  try {
    const { id } = action.payload;
    const response = yield call(axios.get, `${apiURL}StockTransfer/${id}`);
    yield put(loadOneStockTransferSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadOneStockTransferFailed(error));
  }
}

function* updateStockTransferEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}StockTransfer/${action.payload.id}`,
      action.payload.values
    );
    if (response.data?.success) {
      yield put(updateStockTransfereSucceeded(response.data));
      toast.success(response.data.message);
      window.history.back();
    } else {
      yield put(updateStockTransfereFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(updateStockTransfereFailed(error));
  }
}

function* statusStockTransferEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}StockTransfer/${action.payload.id}status?status=${action.payload.status}`
    );
    if (response.data?.success) {
      yield put(StatusStockTransferSucceeded(response.data));
      toast.success(response.data.message);
      window.location.reload();
    } else {
      yield put(StatusStockTransferFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(StatusStockTransferFailed(error));
  }
}

export function* stockTransferSaga() {
  yield takeLatest(loadStockTransferRequested, getStockTransferEffect);
  yield takeLatest(loadOneStockTransferRequested, getByStockTransferEffect);
  yield takeLatest(
    loadFilterStockTransferRequested,
    getFilterStockTransferEffect
  );
  yield takeLatest(createStockTransferRequested, storeStockTransferEffect);
  yield takeLatest(updateStockTransfereRequested, updateStockTransferEffect);
  yield takeLatest(StatusStockTransferRequested, statusStockTransferEffect);
  yield takeLatest(
    loadStockTransferReportRequested,
    getStockTransferReportEffect
  );
}
