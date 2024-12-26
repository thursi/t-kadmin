import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'lib/axios';
import { apiURL } from 'config';
import {
  archiveCategoryTaxFailed,
  archiveCategoryTaxRequested,
  archiveCategoryTaxSucceeded,
  createCategoryTaxFailed,
  createCategoryTaxRequested,
  createCategoryTaxSucceeded,
  loadCategoriesTaxFailed,
  loadCategoriesTaxRequested,
  loadcategoriesTaxSucceeded,
  loadFilterCategoriesTaxFailed,
  loadFilterCategoriesTaxRequested,
  loadFilterCategoriesTaxSucceeded,
  updateCategoryTaxFailed,
  updateCategoryTaxRequested,
  updateCategoryTaxSucceeded,
} from './categoryTaxSlice';
import toast from 'react-hot-toast';

function* getCategoriesTaxEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}categoryTax`);
    yield put(loadcategoriesTaxSucceeded(response.data));
  } catch (error: any) {
    yield put(loadCategoriesTaxFailed(error));
  }
}

function* storeCategoryTaxEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.post,
      `${apiURL}categoryTaxes`,
      action.payload
    );
    if (response.data?.success) {
      yield put(createCategoryTaxSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(createCategoryTaxFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(createCategoryTaxFailed(error));
  }
}

function* updateCategoryTaxEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}categoryTaxes/${action.payload.id}`,
      action.payload.values
    );
    if (response.data?.success) {
      yield put(updateCategoryTaxSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(updateCategoryTaxFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(updateCategoryTaxFailed(error));
  }
}

function* archiveCategoryTaxEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}categoryTaxes/active?id=${action.payload.id}`
    );
    if (response.data?.success) {
      yield put(archiveCategoryTaxSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(archiveCategoryTaxFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(archiveCategoryTaxFailed(error));
  }
}

// function* getCategoriesTaxFilterEffect(action: {
//   type: string;
//   payload: { taxId?: string; categoryId?: string };
// }): Generator<any, void, any> {
//   try {
//     const { taxId, categoryId } = action.payload;
//     const queryParams = [];

//     if (taxId !== undefined) {
//       queryParams.push(`taxId=${encodeURIComponent(taxId)}`);
//     }
//     if (categoryId !== undefined) {
//       queryParams.push(`categoryId=${categoryId}`);
//     }

//     const queryString =
//       queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

//     const apiUrl = `${apiURL}categoryTaxes/filter${queryString}&pageSize=10&pageCount=1`;

//     // console.log('API URL:', apiUrl);

//     const response = yield call(axios.get, apiUrl);
//     yield put(loadcategoriesTaxSucceeded(response?.data?.records));
//   } catch (error: any) {
//     yield put(loadCategoriesTaxFailed(error));
//   }
// }

// function* getCategoriesTaxFilterEffect(action: {
//   type: string;
//   payload: {
//     taxId?: any;
//     categoryId?: any;
//     pageSize: number;
//     pageCount: number;
//   };
// }): Generator<any, void, any> {
//   try {
//     const { pageSize = 10, pageCount = 1 } = action.payload;

//     const queryParams = new URLSearchParams();

//     if (taxId) {
//       queryParams.append('taxId', taxId);
//     }

//     if (categoryId) {
//       queryParams.append('categoryId', categoryId);
//     }

//     queryParams.append('pageSize', pageSize.toString());
//     queryParams.append('pageCount', pageCount.toString());

//     const response = yield call(
//       axios.get,
//       `${apiURL}categoryTaxes/filter?${queryParams.toString()}`
//     );

//     yield put(loadFilterCategoriesTaxSucceeded(response?.data));
//   } catch (error: any) {
//     yield put(loadFilterCategoriesTaxFailed(error));
//   }
// }

// function* getCategoriesTaxFilterEffect(action: {
//   type: string;
//   payload: {
//     taxId?: any;
//     categoryId?: any;
//     pageSize: number;
//     pageCount: number;
//   };
// }): Generator {
//   try {
//     const { taxId, categoryId, pageSize = 10, pageCount = 1 } = action.payload;

//     const queryParams = new URLSearchParams();

//     if (taxId) {
//       queryParams.append('taxId', taxId);
//     }

//     if (categoryId) {
//       queryParams.append('categoryId', categoryId);
//     }

//     queryParams.append('pageSize', pageSize.toString());
//     queryParams.append('pageCount', pageCount.toString());

//     const response = yield call(
//       axios.get,
//       `${apiURL}categoryTaxes/filter?${queryParams.toString()}`
//     );

//     console.log("praveen",response?.data);

//     yield put(loadFilterCategoriesTaxSucceeded(response?.data));
//   } catch (error: any) {
//     yield put(loadFilterCategoriesTaxFailed(error));
//   }
// }

// function* getCategoriesTaxFilterEffect(action: {
//   type: string;
//   payload: {
//     taxId?: string | number | null;
//     categoryId?: string | number | null;
//     pageSize?: number;
//     pageCount?: number;
//   };
// }): Generator {
//   try {
//     const { taxId, categoryId, pageSize = 10, pageCount = 1 } = action.payload;
//     const queryParams: Record<string, string> = {};

//     if (taxId !== undefined && taxId !== null) {
//       queryParams['taxId'] = String(taxId);
//     }

//     if (categoryId !== undefined && categoryId !== null) {
//       queryParams['categoryId'] = String(categoryId);
//     }

//     queryParams['pageSize'] = String(pageSize);
//     queryParams['pageCount'] = String(pageCount);

//     const queryString = Object.entries(queryParams)
//       .map(
//         ([key, value]) =>
//           `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
//       )
//       .join('&');

//     const response = yield call(
//       axios.get,
//       `${apiURL}categoryTaxes/filter?${queryString}`
//     );
//     yield put(loadFilterCategoriesTaxSucceeded(response?.data));
//   } catch (error: any) {
//     yield put(loadFilterCategoriesTaxFailed(error));
//   }
// }

// function* getCategoriesTaxFilterEffect(action: {
//   type: string;
//   payload: {
//     taxId?: string | number | null;
//     categoryId?: string | number | null;
//     pageSize?: number;
//     pageCount?: number;
//   };
// }): Generator {
//   try {
//     const { taxId, categoryId, pageSize = 10, pageCount = 1 } = action.payload;

//     const queryParams = new URLSearchParams({
//       ...(taxId ? { taxId: String(taxId) } : []),
//       ...(categoryId ? { categoryId: String(categoryId) } : []),
//       pageSize: String(pageSize),
//       pageCount: String(pageCount),
//     }).toString();

//     const response = yield call(
//       axios.get,`${apiURL}categoryTaxes/filter?${queryParams}`);

//     yield put(loadFilterCategoriesTaxSucceeded(response?.data));
//   } catch (error: any) {
//     yield put(loadFilterCategoriesTaxFailed(error));
//   }
// }

function* getCategoriesTaxFilterEffect(action: {
  type: string;
  payload: {
    taxId?: any;
    categoryId?: any;
    pageSize?: number;
    pageCount?: number;
  };
}): Generator<any, void, any> {
  try {
    const { taxId, categoryId, pageSize = 10, pageCount = 1 } = action.payload;

    const queryParams = new URLSearchParams();

    if (taxId) {
      queryParams.append('taxId', taxId);
    }

    if (categoryId) {
      queryParams.append('categoryId', categoryId);
    }
    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}categoryTaxes/filter?${queryParams.toString()}`
    );
    yield put(loadFilterCategoriesTaxSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadFilterCategoriesTaxFailed(error));
  }
}

export function* categoryTaxSaga(): Generator<any, void, any> {
  yield takeLatest(loadCategoriesTaxRequested, getCategoriesTaxEffect);
  yield takeLatest(createCategoryTaxRequested, storeCategoryTaxEffect);
  yield takeLatest(updateCategoryTaxRequested, updateCategoryTaxEffect);
  yield takeLatest(archiveCategoryTaxRequested, archiveCategoryTaxEffect);
  yield takeLatest(
    loadFilterCategoriesTaxRequested,
    getCategoriesTaxFilterEffect
  );
}
