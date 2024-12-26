import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'lib/axios';
import { apiURL } from 'config';
import {
  loadPaymentFilterFailed,
  loadPaymentFilterRequested,
  loadPaymentFilterSucceeded,
  loadPaymentsFailed,
  loadPaymentsRequested,
  loadPaymentsSucceeded,
} from './paymentsSlice';
import toast from 'react-hot-toast';

function* getPaymentsEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}payments`);
    yield put(loadPaymentsSucceeded(response.data));
  } catch (error: any) {
    yield put(loadPaymentsFailed(error));
  }
}

function* getFilterStockTransferEffect(action: {
  type: string;
  payload: {
    paymentGatewayStatus?: string;
  };
}): Generator<any, void, any> {
  try {
    const { paymentGatewayStatus } = action.payload;
    const queryParams = new URLSearchParams();
    if (paymentGatewayStatus) {
      queryParams.append('paymentGatewayStatus', paymentGatewayStatus);
    }

    const response = yield call(
      axios.get,
      `${apiURL}payments/filter?${queryParams.toString()}&pageSize=10&pageCount=1`
    );

    yield put(loadPaymentsSucceeded(response?.data?.records));
  } catch (error: any) {
    yield put(loadPaymentsFailed(error));
  }
}

export function* paymentsaga(): Generator<any, void, any> {
  yield takeLatest(loadPaymentsRequested, getPaymentsEffect);
  yield takeLatest(loadPaymentFilterRequested, getFilterStockTransferEffect);
}
