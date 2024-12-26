import { call, put, select, takeLatest } from 'redux-saga/effects';
import { apiURL } from 'config';
import axios from 'lib/axios';

import toast from 'react-hot-toast';
import {
  createStockAdjustmentFailed,
  createStockAdjustmentRequested,
  createStockAdjustmentSucceeded,
  loadFilterStockAdjustmentFailed,
  loadFilterStockAdjustmentRequested,
  loadFilterStockAdjustmentSucceeded,
  loadStockAdjustmentFailed,
  loadStockAdjustmentRequested,
  loadStockAdjustmentSucceeded,
  StatusStockAdjustmentFailed,
  StatusStockAdjustmentRequested,
  StatusStockAdjustmentSucceeded,
} from './stockadjustSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducer';

function* getStockAdjustmentEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}product/shops`);
    yield put(loadStockAdjustmentSucceeded(response.data));
  } catch (error: any) {
    yield put(loadStockAdjustmentFailed(error));
  }
}

// function* getFilterStockAdjustmentEffect(action: {
//   type: string;
//   payload: {
//     isActive?: boolean;
//     productType?: string;
//     productId?: string;
//     taxId?: string;
//     cityId?: string;
//     unitId?: string;
//     brandId?: string;
//     warrantyId?: string;
//     categoryId?: string;
//     variationId?: string;
//     variationValueId?: number;
//     subCategoryId?: string;
//     businessLocationId: string;
//     productVariableId: string;
//   };
// }): Generator<any, void, any> {
//   try {
//     const { ...filters } = action.payload;

//     const queryParams = new URLSearchParams();
//     // const appendParam = (key: string, value: any) => {
//     //   if (value !== undefined) {
//     //     queryParams.append(key, value.toString());
//     //   }
//     // };

//     const appendParam = (key: string, value: any) => {
//       if (value !== undefined && value !== "") {
//         queryParams.append(key, value.toString());
//       }
//     };

//     Object.entries(filters).forEach(([key, value]) => {
//       appendParam(key, value);
//     });

//     const response = yield call(
//       axios.get,
//       `${apiURL}product/shops/filter?${queryParams.toString()}&pageSize=10&pageCount=1`
//     );
//     console.log(
//       "${apiURL}product/shops/filter?${queryParams.toString()}&pageSize=10&pageCount=1",
//       `${apiURL}product/shops/filter?${queryParams.toString()}&pageSize=10&pageCount=1`
//     );
//     yield put(loadFilterStockAdjustmentSucceeded(response?.data?.records));
//   } catch (error: any) {
//     yield put(loadFilterStockAdjustmentSucceeded(error));
//   }
// }

// function* getFilterStockAdjustmentEffect(action: {
//   type: string;
//   payload: {
//     isActive?: boolean;
//     productType?: string;
//     productId?: string;
//     taxId?: string;
//     cityId?: string;
//     unitId?: string;
//     brandId?: string;
//     warrantyId?: string;
//     categoryId?: string;
//     variationId?: string;
//     variationValueId?: number;
//     subCategoryId?: string;
//     businessLocationId: string;
//     productVariableId: string;
//     pageSize?: number;
//     pageCount?: number;
//   };
// }): Generator {
//   try {
//     const {
//     isActive,
//     productType,
//     productId,
//     taxId,
//     cityId,
//     unitId,
//     brandId,
//     warrantyId,
//     categoryId,
//     variationId,
//     variationValueId,
//     subCategoryId,
//     businessLocationId,
//     productVariableId, pageSize = 10, pageCount = 1 } = action.payload;

//     const queryParams = new URLSearchParams({
//       ...(taxId ? { taxId: String(taxId) } : []),
//       ...(categoryId ? { categoryId: String(categoryId) } : []),
//       pageSize: String(pageSize),
//       pageCount: String(pageCount),
//     }).toString();

//     const response = yield call(
//       axios.get,`${apiURL}product/shops/filter?${queryParams.toString()}`);

//     yield put(loadFilterStockAdjustmentSucceeded(response?.data));
//   } catch (error: any) {
//     yield put(loadFilterStockAdjustmentFailed(error));
//   }
// }

function* getFilterStockAdjustmentEffect(action: {
  type: string;
  payload: {
    isActive?: boolean;
    productType?: string;
    productId?: string;
    taxId?: string;
    cityId?: string;
    unitId?: string;
    brandId?: string;
    warrantyId?: string;
    categoryId?: string;
    variationId?: string;
    variationValueId?: number;
    subCategoryId?: string;
    businessLocationId: string;
    productVariableId: string;
    pageSize?: number;
    pageCount?: number;
  };
}): Generator<any, void, any> {
  try {
    const {
      isActive,
      productType,
      productId,
      taxId,
      cityId,
      unitId,
      brandId,
      warrantyId,
      categoryId,
      variationId,
      variationValueId,
      subCategoryId,
      businessLocationId,
      productVariableId,
      pageSize = 10,
      pageCount = 1,
    } = action.payload;

    const queryParams = new URLSearchParams();
    if (taxId) {
      queryParams.append('taxId', taxId);
    }
    if (cityId) {
      queryParams.append('cityId', cityId);
    }
    if (categoryId) {
      queryParams.append('categoryId', categoryId);
    }

    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}product/shops/filter?${queryParams.toString()}`
    );
    yield put(loadFilterStockAdjustmentSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadFilterStockAdjustmentFailed(error));
  }
}

function* storeStockAdjustmentEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const auth = yield select((state: RootState) => state.auth);

    const response = yield call(
      axios.post,
      `${apiURL}product/shop?updaterId=${auth?.auth?.userId}`,
      action.payload
    );

    if (response.data?.success) {
      yield put(createStockAdjustmentSucceeded(response.data));
      toast.success(response.data.message);
      window.history.back();
    } else {
      yield put(createStockAdjustmentFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error) {
    yield put(createStockAdjustmentFailed(error));
    toast.error('Something went wrong');
  }
}

function* statusStockAdjustmentEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}product/shop/active?id=${action.payload.id}`
    );
    if (response.data?.success) {
      yield put(StatusStockAdjustmentSucceeded(response.data));
      toast.success(response.data.message);
      window.location.reload();
    } else {
      yield put(StatusStockAdjustmentFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(StatusStockAdjustmentFailed(error));
  }
}

export function* stockAdjustmentSaga() {
  yield takeLatest(loadStockAdjustmentRequested, getStockAdjustmentEffect);
  yield takeLatest(
    loadFilterStockAdjustmentRequested,
    getFilterStockAdjustmentEffect
  );
  yield takeLatest(createStockAdjustmentRequested, storeStockAdjustmentEffect);
  yield takeLatest(StatusStockAdjustmentRequested, statusStockAdjustmentEffect);
}
