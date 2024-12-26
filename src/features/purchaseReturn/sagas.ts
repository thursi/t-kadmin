import { call, put, takeLatest } from 'redux-saga/effects';
import { apiURL } from 'config';
import axios from 'lib/axios';
import {
  loadPurchaseReturnRequested,
  loadPurchaseReturnSucceeded,
  loadPurchaseReturnFailed,
  createPurchaseReturnRequested,
  createPurchaseReturnSucceeded,
  createPurchaseReturnFailed,
  upadatePurchasesReturnRequested,
  upadatePurchasesReturnSucceeded,
  upadatePurchasesReturnFailed,
  loadOnePurchasesReturnRequested,
  loadOnePurchasesReturnSucceeded,
  loadOnePurchasesReturnFailed,
  loadFilterPurchasesReturnRequested,
  loadFilterPurchasesReturnSucceeded,
  loadFilterPurchasesReturnFailed,
} from './purchaseReturnSlice';
import toast from 'react-hot-toast';
import { loadFilterPurchasesRequested } from 'features/purchase/purchaseSlice';

function* getPurchaseReturnEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}purchaseReturns`);
    yield put(loadPurchaseReturnSucceeded(response.data));
  } catch (error: any) {
    yield put(loadPurchaseReturnFailed(error));
  }
}

function* storePurchaseReturnEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const { image, ...updatedPurchaseReturnData } = action.payload;

    const formData = new FormData();
    formData.append(
      'purchaseReturnCreateRequest',
      JSON.stringify(updatedPurchaseReturnData)
    );
    formData.append('purchaseReturnImage', image);

    const response = yield call(
      axios.post,
      `${apiURL}purchaseReturn`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: '*/*',
        },
      }
    );

    if (response.data?.success) {
      yield put(createPurchaseReturnSucceeded(response.data));
      toast.success(response.data.message);
      window.history.back();
    } else {
      yield put(createPurchaseReturnFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error) {
    yield put(createPurchaseReturnFailed(error));
    toast.error('Something went wrong');
  }
}

function* loadOnePurchasesReturnEffect(action: {
  type: string;
  payload: {
    id?: string;
  };
}): Generator<any, void, any> {
  try {
    const { id } = action.payload;

    const response = yield call(axios.get, `${apiURL}purchaseReturn/${id}`);
    yield put(loadOnePurchasesReturnSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadOnePurchasesReturnFailed(error));
  }
}

function* updatePurchasesReturnEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const URL = `${apiURL}purchaseReturn/${action.payload.id}`;

    const { image, ...updatedPurchaseData } = action.payload.values;

    const formData = new FormData();
    formData.append(
      'purchaseReturnRequest ',
      JSON.stringify(updatedPurchaseData)
    );
    formData.append('purchaseImage', image);

    const response = yield call(axios.put, URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
      },
    });
    if (response.data?.success) {
      yield put(upadatePurchasesReturnSucceeded(response?.data));
      toast.success(response.data.message);
      window.history.back();
    } else {
      yield put(upadatePurchasesReturnFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(upadatePurchasesReturnFailed(error));
    toast.error('Something went wrong');
  }
}

// function* getpurchasesReturnFilterEffect(action: {
//   type: string;
//   payload: {
//     // taxId?: string | number | null;
//     // categoryId?: string | number | null;
//     pageSize?: number;
//     pageCount?: number;
//   };
// }): Generator {
//   try {
//     const {pageSize = 10, pageCount = 1 } = action.payload;

//     const queryParams = new URLSearchParams({
//       // ...(taxId ? { taxId: String(taxId) } : []),
//       // ...(categoryId ? { categoryId: String(categoryId) } : []),
//       pageSize: String(pageSize),
//       pageCount: String(pageCount),
//     }).toString();

//     const response = yield call(axios.get, `${apiURL}purchaseReturn/filter?${queryParams}`);

//     yield put(loadFilterPurchasesReturnSucceeded(response.data));
//   } catch (error: any) {
//     yield put(loadFilterPurchasesReturnFailed(error));
//   }
// }

function* getpurchasesReturnFilterEffect(action: {
  type: string;
  payload: {
    pageSize?: number;
    pageCount?: number;
    purchaseStatus?: string;
  };
}): Generator<any, void, any> {
  try {
    const { purchaseStatus, pageSize = 10, pageCount = 1 } = action.payload;

    const queryParams = new URLSearchParams();
    // if (taxId) {
    //   queryParams.append('taxId', taxId);
    // }
    // if (categoryId) {
    //   queryParams.append('categoryId', categoryId);
    // }

    if (purchaseStatus) {
      queryParams.append('purchaseStatus', purchaseStatus);
    }

    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}purchaseReturn/filter?${queryParams.toString()}`
    );
    yield put(loadFilterPurchasesReturnSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadFilterPurchasesReturnFailed(error));
  }
}

export function* purchaseReturnSaga() {
  yield takeLatest(loadPurchaseReturnRequested, getPurchaseReturnEffect);
  yield takeLatest(createPurchaseReturnRequested, storePurchaseReturnEffect);
  yield takeLatest(
    loadOnePurchasesReturnRequested,
    loadOnePurchasesReturnEffect
  );
  yield takeLatest(
    upadatePurchasesReturnRequested,
    updatePurchasesReturnEffect
  );
  yield takeLatest(
    loadFilterPurchasesReturnRequested,
    getpurchasesReturnFilterEffect
  );
}
