import { call, put, takeLatest } from 'redux-saga/effects';
import { apiURL } from 'config';
import axios from 'lib/axios';
import {
  loadSalesRequested,
  loadSalesFailed,
  loadSalesSuccessed,
  loadFilterSalesRequested,
  statusSalesChangeRequested,
  statusSalesChangeSucceeded,
  statusSalesChangeFailed,
  loadFilterSalesSucceeded,
  loadFilterSalesFailed,
} from './salesSlice';
import toast from 'react-hot-toast';

function* loadSales(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}orders`);
    yield put(loadSalesSuccessed(response.data));
  } catch (error) {
    yield put(loadSalesFailed(error));
  }
}

// function* loadFilterSalesEffect(action: {
//   type: string;
//   payload: {
//     customerId?: string;
//     businessLocationId?: string;
//     paymentGatewayStatus?: string;
//     orderDate?: string;
//     paymentType?: string;
//   };
// }): Generator<any, void, any> {
//   try {
//     const {
//       customerId,
//       businessLocationId,
//       paymentGatewayStatus,
//       orderDate,
//       paymentType,
//       pageSize = 10, pageCount = 1
//     } = action.payload;

//     const queryParams = new URLSearchParams();
//     if (customerId) {
//       queryParams.append("customerId", customerId);
//     }
//     if (businessLocationId) {
//       queryParams.append("businessLocationId", businessLocationId);
//     }
//     if (paymentGatewayStatus) {
//       queryParams.append("paymentGatewayStatus", paymentGatewayStatus);
//     }
//     if (orderDate) {
//       queryParams.append("orderDate", orderDate);
//     }
//     if (paymentType) {
//       queryParams.append("paymentType", paymentType);
//     }

//     const response = yield call(
//       axios.get,
//       `${apiURL}order/filter?${queryParams.toString()}`
//     );

//     console.log(response, "response2112");

//     yield put(loadSalesSuccessed(response?.data?.records));
//   } catch (error: any) {
//     yield put(loadSalesFailed(error));
//   }
// }

function* loadFilterSalesEffect(action: {
  type: string;
  payload: {
    customerId?: string;
    businessLocationId?: string;
    paymentGatewayStatus?: string;
    orderDate?: string;
    paymentType?: string;
    pageSize?: number; // Ensure these are optional but defaulted
    pageCount?: number;
  };
}): Generator<any, void, any> {
  try {
    const {
      customerId,
      businessLocationId,
      paymentGatewayStatus,
      orderDate,
      paymentType,
      pageSize = 10, 
      pageCount = 1, 
    } = action.payload;

    const queryParams = new URLSearchParams();

 
    if (customerId) {
      queryParams.append('customerId', customerId);
    }
    if (businessLocationId) {
      queryParams.append('businessLocationId', businessLocationId);
    }
    if (paymentGatewayStatus) {
      queryParams.append('paymentGatewayStatus', paymentGatewayStatus);
    }
    if (orderDate) {
      queryParams.append('orderDate', orderDate);
    }
    if (paymentType) {
      queryParams.append('paymentType', paymentType);
    }

  
    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}order/filter?${queryParams.toString()}`
    );
    yield put(loadFilterSalesSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadFilterSalesFailed(error));
  }
}

function* statusStockTransferEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}delivery/status?orderId=${action.payload.id}&deliveryStatus=${action.payload.status}`
    );
    if (response.data?.success) {
      yield put(statusSalesChangeSucceeded(response.data));
      toast.success(response.data.message);
      window.location.reload();
    } else {
      yield put(statusSalesChangeFailed(response.data));
      toast.error(response.data.message);
      window.location.reload();
    }
  } catch (error: any) {
    yield put(statusSalesChangeFailed(error));
  }
}

export function* salesSaga(): Generator<any, void, any> {
  yield takeLatest(loadSalesRequested, loadSales);
  yield takeLatest(loadFilterSalesRequested, loadFilterSalesEffect);
  yield takeLatest(statusSalesChangeRequested, statusStockTransferEffect);
}
