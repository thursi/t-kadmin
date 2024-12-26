import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'lib/axios';
import { apiURL } from 'config';
import {
  archiveCategoryFailed,
  archiveCategoryRequested,
  archiveCategorySucceeded,
  createCategoryFailed,
  createCategoryRequested,
  createCategorySucceeded,
  loadCategoriesFailed,
  loadCategoriesRequested,
  loadCategoriesSucceeded,
  loadCategoryFilterFailed,
  loadCategoryFilterRequested,
  loadCategoryFilterSucceeded,
  loadOneCategoryFailed,
  loadOneCategoryRequested,
  loadOneCategorySucceeded,
  loadOneParentSubCategoryFailed,
  loadOneParentSubCategoryRequested,
  loadOneParentSubCategorySucceeded,
  loadSubCategoriesFailed,
  loadSubCategoriesRequested,
  loadSubCategoriesSucceeded,
  updateCategoryFailed,
  updateCategoryRequested,
  updateCategorySucceeded,
  updateImageCategoryRequested,
  updateImageCategorySucceeded,
} from './categorySlice';
import toast from 'react-hot-toast';

function* getCategoriesEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}categories/parent/list`);
    yield put(loadCategoriesSucceeded(response.data));
  } catch (error: any) {
    yield put(loadCategoriesFailed(error));
  }
}
function* getsubCategoriesEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}categories/children`);
    yield put(loadSubCategoriesSucceeded(response.data));
  } catch (error: any) {
    yield put(loadSubCategoriesFailed(error));
  }
}

function* getParentSubCategoriesEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${apiURL}categories/children/parent?id=${action.payload.id}`
    );
    console.log('response', response?.data);
    yield put(loadOneParentSubCategorySucceeded(response?.data));
  } catch (error: any) {
    yield put(loadOneParentSubCategoryFailed(error));
  }
}

function* getsubCategoriesBasedOnIDEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${apiURL}category/${action.payload.id}`
    );

    yield put(loadOneCategorySucceeded(response.data));
  } catch (error: any) {
    yield put(loadOneCategoryFailed(error));
  }
}

function* storeCategoryEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const { image, ...updatedProductData } = action.payload;

    const formData = new FormData();

    formData.append(
      'categoryCreateRequest',
      JSON.stringify(updatedProductData)
    );
    Array.from(image).forEach((file: any) => {
      formData.append(`image`, file);
    });
    formData.append('image', image);

    const response = yield call(axios.post, `${apiURL}category`, formData);

    console.log('API Response:', response);

    if (response.data?.success) {
      yield put(createCategorySucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(createCategoryFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    console.error('API Error:', error);
    yield put(createCategoryFailed(error));
    toast.error('An error occurred while creating the category.');
  }
}

function* updateCategoryEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}category/${action.payload.id}`,
      action.payload.values
    );
    if (response.data?.success) {
      yield put(updateCategorySucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(updateCategoryFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(updateCategoryFailed(error));
  }
}

function* archiveCategoryEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}category/active?id=${action.payload.id}`
    );
    if (response.data?.success) {
      yield put(archiveCategorySucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(archiveCategoryFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(archiveCategoryFailed(error));
  }
}

function* getCategoryFilterEffect(action: {
  type: string;
  payload: {
    featuredCategory?: string;
    pageSize: number;
    pageCount: number;
  };
}): Generator<any, void, any> {
  try {
    const { featuredCategory, pageSize = 10, pageCount = 1 } = action.payload;

    const queryParams = new URLSearchParams();

    if (featuredCategory) {
      queryParams.append('featuredCategory', featuredCategory);
    }

    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}category/filter?${queryParams.toString()}`
    );

    yield put(loadCategoryFilterSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadCategoryFilterFailed(error));
  }
}


function* storeCategoryImageEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    console.log("action.payload",action.payload)
    const { image,id } = action.payload;

    const formData = new FormData();

 
    Array.from(image).forEach((file: any) => {
      formData.append(`image`, file);
    });
    formData.append('image', image);
    const response = yield call(axios.put, `${apiURL}category/image?id=${id}`, formData);


    if (response.data?.success) {
      yield put(updateImageCategorySucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(updateImageCategorySucceeded(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    console.error('API Error:', error);
    yield put(updateImageCategorySucceeded(error));
    toast.error('An error occurred while creating the category.');
  }
}
export function* categorySaga(): Generator<any, void, any> {
  yield takeLatest(loadCategoriesRequested, getCategoriesEffect);
  yield takeLatest(loadSubCategoriesRequested, getsubCategoriesEffect);
  yield takeLatest(createCategoryRequested, storeCategoryEffect);
  yield takeLatest(updateCategoryRequested, updateCategoryEffect);
  yield takeLatest(archiveCategoryRequested, archiveCategoryEffect);
  yield takeLatest(loadOneCategoryRequested, getsubCategoriesBasedOnIDEffect);
  yield takeLatest(loadCategoryFilterRequested, getCategoryFilterEffect);
  yield takeLatest(updateImageCategoryRequested, storeCategoryImageEffect);

  yield takeLatest(
    loadOneParentSubCategoryRequested,
    getParentSubCategoriesEffect
  );
}
