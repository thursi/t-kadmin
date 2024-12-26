import { put, call, takeLatest } from "redux-saga/effects";
import axios from "lib/axios";
import { apiURL } from "config";
import {
  archiveVariationFailed,
  archiveVariationRequested,
  archiveVariationSucceeded,
  createVariationFailed,
  createVariationRequested,
  createVariationSucceeded,
  loadFiltereVariationFailed,
  loadFiltereVariationRequested,
  loadFiltereVariationSucceeded,
  loadVariationsFailed,
  loadVariationsRequested,
  loadVariationsSucceeded,
  loadVariationValuesFailed,
  loadVariationValuesRequested,
  loadVariationValuesSucceeded,
  updateVariationFailed,
  updateVariationRequested,
  updateVariationSucceeded,
} from "./variationSlice";
import toast from "react-hot-toast";
import { loadFiltereWarrantyFailed, loadFiltereWarrantySucceeded } from "features/warranty/warrantySlice";

function* getVariationsEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}variations`);
    yield put(loadVariationsSucceeded(response.data));
  } catch (error: any) {
    yield put(loadVariationsFailed(error));
  }
}

function* storeVariationEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.post,
      `${apiURL}variation`,
      action.payload
    );
    if (response.data?.success) {
      yield put(createVariationSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(createVariationFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(createVariationFailed(error));
  }
}

function* updateVariationEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    console.log("action.payloadupdateVariationEffect",action.payload);
    const response = yield call(
      axios.put,
      `${apiURL}variation/${action?.payload?.id}`,
      action?.payload?.values
    );

    if (response.data?.success) {
      yield put(updateVariationSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(updateVariationFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(updateVariationFailed(error));
  }
}

function* archiveVariationEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}variation/active?id=${action.payload.id}`
    );
    if (response.data?.success) {
      yield put(archiveVariationSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(archiveVariationFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(archiveVariationFailed(error));
  }
}

function* getVariationValuesEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${apiURL}variation/value/${action.payload.id}`
    );
    yield put(loadVariationValuesSucceeded(response.data));
  } catch (error: any) {
    yield put(loadVariationValuesFailed(error));
  }
}

function* loadFilterVariationEffect(action: {
  type: string;
  payload: {
    // isActive?: boolean; warrantyName?: string 
    pageSize?: number;
    pageCount?: number;
  };
}): Generator<any, void, any> {
  try {
    const {  pageSize = 10, pageCount = 1 } = action.payload;

    const queryParams = new URLSearchParams();

    // if (isActive !== undefined) {
    //   queryParams.append('isActive', isActive.toString());
    // }
 
    // if (warrantyName) {
    //   queryParams.append('warrantyName', warrantyName);
    // }
    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}variation/filter?${queryParams.toString()}`
    );
    yield put(loadFiltereVariationSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadFiltereVariationFailed(error));
  }
}

export function* variationSaga(): Generator<any, void, any> {
  yield takeLatest(loadVariationsRequested, getVariationsEffect);
  yield takeLatest(createVariationRequested, storeVariationEffect);
  yield takeLatest(updateVariationRequested, updateVariationEffect);
  yield takeLatest(archiveVariationRequested, archiveVariationEffect);
  yield takeLatest(loadVariationValuesRequested, getVariationValuesEffect);
  yield takeLatest(loadFiltereVariationRequested, loadFilterVariationEffect);

}
