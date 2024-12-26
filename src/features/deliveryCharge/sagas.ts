import { call, put, takeLatest } from 'redux-saga/effects';
import { apiURL } from 'config';
import axios from 'lib/axios';
import {
  createDeliveryChargesFailed,
  createDeliveryChargesRequested,
  createDeliveryChargesSucceeded,
  loadDeliveryChargesFailed,
  loadDeliveryChargesRequested,
  loadDeliveryChargesSucceeded,
  loadFilterDeliveryChargesFailed,
  loadFilterDeliveryChargesRequested,
  loadFilterDeliveryChargesSucceeded,
  loadOneDeliveryChargesFailed,
  loadOneDeliveryChargesRequested,
  loadOneDeliveryChargesSucceeded,
  updateDeliveryChargeFailed,
  updateDeliveryChargeRequested,
  updateDeliveryChargeSucceeded,
} from './deliveryChargeSlice';
import toast from 'react-hot-toast';

function* loadDeliveryChargesEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}deliveryCharges`);
    yield put(loadDeliveryChargesSucceeded(response.data));
  } catch (error: any) {
    yield put(loadDeliveryChargesFailed(error));
  }
}

function* storeDeliveryChargeEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    console.log(action.payload, 'actionpayload');

    const response = yield call(
      axios.post,
      `${apiURL}deliveryCharge`,
      action.payload
    );

    if (response.data?.success) {
      yield put(createDeliveryChargesSucceeded(response.data));
      toast.success(response.data.message);
      window.history.back();
    } else {
      yield put(createDeliveryChargesFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error) {
    yield put(createDeliveryChargesFailed(error));
    toast.error('Something went wrong');
  }
}

function* oneDeliveryChargesEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    console.log(
      'action.payloadaction.payloadaction.payloadaction.payload',
      action.payload
    );
    const response = yield call(
      axios.get,
      `${apiURL}deliveryCharge/${action.payload}`
    );

    yield put(loadOneDeliveryChargesSucceeded(response.data));
  } catch (error: any) {
    yield put(loadOneDeliveryChargesFailed(error));
  }
}

// function* updateCityEffect(action: {
//   type: string;
//   payload: { name: string; id: number };
// }): Generator<any, void, any> {
//   try {
//     console.log(action.payload);
//     const response = yield call(
//       axios.put,
//       `${apiURL}city/${action.payload.id}`,
//       action.payload
//     );
//     if (response.data?.success) {
//       yield put(updateCitySucceeded(response.data));
//       toast.success(response.data.message);
//     } else {
//       yield put(updateCityFailed(response.data));
//       toast.error(response.data.message);
//     }
//   } catch (error: any) {
//     yield put(updateCityFailed(error));
//   }
// }

// function* archiveCityEffect(action: {
//   type: string;
//   payload: { id: number };
// }): Generator<any, void, any> {
//   try {
//     const response = yield call(
//       axios.put,
//       `${apiURL}city/active?id=${action.payload.id}`
//     );
//     if (response.data?.success) {
//       yield put(archiveCitySucceeded(response.data));
//       toast.success(response.data.message);
//     } else {
//       yield put(archiveCityFailed(response.data));
//       toast.error(response.data.message);
//     }
//   } catch (error: any) {
//     yield put(archiveCityFailed(error));
//   }
// }

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

function* loadFilterDeliveryChargesEffect(action: {
  type: string;
  payload: {
    // isActive?: boolean;
    pageSize?: number;
    pageCount?: number;
  };
}): Generator<any, void, any> {
  try {
    const { pageSize = 10, pageCount = 1 } = action.payload;
    const queryParams = new URLSearchParams();

    // if (isActive !== undefined) {
    //   queryParams.append('isActive', isActive.toString());
    // }

    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}deliveryCharge/filter?${queryParams.toString()}`
    );

    yield put(loadFilterDeliveryChargesSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadFilterDeliveryChargesFailed(error));
  }
}

function* updateDeliveryChargeEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const URL = `${apiURL}deliveryCharge/${action.payload.id}`;

    const response = yield call(axios.put, URL, action.payload.values);
    if (response.data?.success) {
      yield put(updateDeliveryChargeSucceeded(response?.data));
      toast.success(response.data.message);
      window.history.back();
    } else {
      yield put(updateDeliveryChargeFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(updateDeliveryChargeFailed(error));
    toast.error('Something went wrong');
  }
}

export function* deliveryChargeSaga() {
  yield takeLatest(loadDeliveryChargesRequested, loadDeliveryChargesEffect);
  yield takeLatest(createDeliveryChargesRequested, storeDeliveryChargeEffect);
  yield takeLatest(loadOneDeliveryChargesRequested, oneDeliveryChargesEffect);
  yield takeLatest(updateDeliveryChargeRequested, updateDeliveryChargeEffect);
  // yield takeLatest(archiveCityRequested, archiveCityEffect);
  yield takeLatest(
    loadFilterDeliveryChargesRequested,
    loadFilterDeliveryChargesEffect
  );
}