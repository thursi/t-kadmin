import { call, put, takeLatest } from 'redux-saga/effects';
import { apiURL } from 'config';
import axios from 'lib/axios';
import {
  loadPromotionsFailed,
  loadPromotionsRequested,
  loadPromotionsSucceeded,
  createPromotionRequested,
  createPromotionSucceeded,
  createPromotionFailed,
  loadFilterPromotionRequested,
  loadFilterePromotionSucceeded,
  loadFilterePromotionFailed,
  loadOnePromotionRequested,
  loadOnePromotionSucceeded,
  loadOnePromotionFailed,
  updatePromotionSucceeded,
  updatePromotionFailed,
  updatePromotionRequested,
  archivePromotionRequested,
  archivePromotionSucceeded,
  archivePromotionFailed,
} from './promotionSlice';
import toast from 'react-hot-toast';

function* getPromotionsEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}ProductPromotions`);
    yield put(loadPromotionsSucceeded(response.data));
  } catch (error: any) {
    yield put(loadPromotionsFailed(error));
  }
}

function* onePromotionEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${apiURL}ProductPromotion/${action.payload}`
    );

    yield put(loadOnePromotionSucceeded(response.data));
  } catch (error: any) {
    yield put(loadOnePromotionFailed(error));
  }
}


function* storePromotionEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const { image, ...updatedProductData } = action.payload;

    const formData = new FormData();
    formData.append(
      'productPromotionRequest',
      JSON.stringify(updatedProductData)
    );
    Array.from(image).forEach((file: any) => {
      formData.append(`image`, file);
    });
    formData.append('image', image);
    const response = yield call(
      axios.post,
      `${apiURL}ProductPromotion`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: '*/*',
        },
      }
    );

    if (response.data?.success) {
      yield put(createPromotionSucceeded(response.data));
      toast.success(response.data.message);
      window.history.back();
    } else {
      yield put(createPromotionFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error) {
    yield put(createPromotionFailed(error));
    toast.error('Something went wrong');
  }
}

function* loadFilterPromotionEffect(action: {
  type: string;
  payload: {
    isActive?: boolean;
    warrantyName?: string;
    pageSize?: number;
    pageCount?: number;
  };
}): Generator<any, void, any> {
  try {
    const {
      warrantyName,
      isActive,
      pageSize = 10,
      pageCount = 1,
    } = action.payload;

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
      `${apiURL}promotion/filter?${queryParams.toString()}`
    );
    yield put(loadFilterePromotionSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadFilterePromotionFailed(error));
  }
}

function* updateProductPromotionEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const URL = `${apiURL}ProductPromotion/${action.payload.id}`;
    console.log(action.payload, 'thusi..............');
    const { image, ...updatedPurchaseData } = action.payload.values;

    const formData = new FormData();
    formData.append(
      'productPromotionRequest',
      JSON.stringify(updatedPurchaseData)
    );
    formData.append('Image', image);
    const queryParam = encodeURIComponent(
      JSON.stringify({
        name: updatedPurchaseData.name,
        promotionIds: updatedPurchaseData.promotionIds,
      })
    );
    // const queryParam = encodeURIComponent(JSON.stringify(updatedPurchaseData));

    // const response = yield call(axios.put, URL, formData);
    const response = yield call(
      axios.put,
      `${apiURL}ProductPromotion/${action.payload.id}?productPromotionRequest=${queryParam}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: '*/*',
        },
      }
    );

    if (response.data?.success) {
      yield put(updatePromotionSucceeded(response?.data));
      toast.success(response.data.message);
      window.history.back();
    } else {
      yield put(updatePromotionFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(updatePromotionFailed(error));
    toast.error('Something went wrong');
  }
}

function* archivepromotionEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}ProductPromotion/active?id=${action.payload.id}`
    );
    if (response.data?.success) {
      yield put(archivePromotionSucceeded(response.data));
      toast.success(response.data.message);
      window.location.reload();


    } else {
      yield put(archivePromotionFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(archivePromotionFailed(error));
  }
}
export function* promotionSaga() {
  yield takeLatest(loadPromotionsRequested, getPromotionsEffect);
  yield takeLatest(loadOnePromotionRequested, onePromotionEffect);
  yield takeLatest(updatePromotionRequested, updateProductPromotionEffect);
  yield takeLatest(createPromotionRequested, storePromotionEffect);
  yield takeLatest(archivePromotionRequested, archivepromotionEffect);
  yield takeLatest(loadFilterPromotionRequested, loadFilterPromotionEffect);
}
