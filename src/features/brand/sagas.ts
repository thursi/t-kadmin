import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'lib/axios';
import { apiURL } from 'config';
import {
  loadBrandRequested,
  loadBrandFailed,
  loadBrandSucceeded,
  createBrandRequested,
  createBrandFailed,
  createBrandSucceeded,
  archiveBrandFailed,
  archiveBrandRequested,
  archiveBrandSucceeded,
  updateBrandFailed,
  updateBrandRequested,
  updateBrandSucceeded,
  loadBrandFilterSucceeded,
  loadBrandFilterFailed,
  loadBrandFilterRequested,
} from './brandSlice';
import toast from 'react-hot-toast';

function* getBrandEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}brands`);
    yield put(loadBrandSucceeded(response.data));
  } catch (error: any) {
    yield put(loadBrandFailed(error));
  }
}

function* storeBrandEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(axios.post, `${apiURL}brand`, action.payload);
    if (response.data?.success) {
      yield put(createBrandSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(createBrandFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(createBrandFailed(error));
  }
}

function* updateBrandEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}brand/${action.payload.id}`,
      action.payload.values
    );
    if (response.data?.success) {
      yield put(updateBrandSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(updateBrandFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(updateBrandFailed(error));
  }
}

function* archiveBrandEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}brand/active?id=${action.payload.id}`
    );
    if (response.data?.success) {
      yield put(archiveBrandSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(archiveBrandFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(archiveBrandFailed(error));
  }
}

function* getBrandFilterEffect(action: {
  type: string;
  payload: {
    brandName?: string;
    isActive?: boolean;
    pageSize: number;
    pageCount: number;
  };
}): Generator<any, void, any> {
  try {
    const {
      brandName,
      isActive,
      pageSize = 10,
      pageCount = 1,
    } = action.payload;

    const queryParams = new URLSearchParams();

    if (brandName) {
      queryParams.append('brandName', brandName);
    }
    if (isActive !== undefined) {
      queryParams.append('isActive', isActive.toString());
    }

    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}brand/filter?${queryParams.toString()}`
    );

    yield put(loadBrandFilterSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadBrandFilterFailed(error));
  }
}

export function* brandSaga(): Generator<any, void, any> {
  yield takeLatest(loadBrandRequested, getBrandEffect);
  yield takeLatest(createBrandRequested, storeBrandEffect);
  yield takeLatest(updateBrandRequested, updateBrandEffect);
  yield takeLatest(archiveBrandRequested, archiveBrandEffect);
  yield takeLatest(loadBrandFilterRequested, getBrandFilterEffect);
}
