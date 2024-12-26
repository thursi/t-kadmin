import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  archiveProductFailed,
  archiveProductRequested,
  archiveProductSucceeded,
  createProductFailed,
  createProductRequested,
  createProductSucceeded,
  loadOneProductsRequested,
  loadOneProductsSucceeded,
  loadProductExcelFailed,
  loadProductExcelSucceeded,
  loadProductImagesFailed,
  loadProductImagesRequested,
  loadProductImagesSucceeded,
  loadProductPdfFailed,
  loadProductPdfSucceeded,
  loadProductRequestedExcel,
  loadProductRequestedPdf,
  loadProductsFailed,
  loadProductsRequested,
  loadProductsSucceeded,
  productSearch,
  ProductSearchSuceeded,
  uploadExcelProFileFailed,
  uploadExcelProFileSucceeded,
  uploadExcelProRequestedFile,
  loadProductFilterRequested,
  loadProductFilterSucceeded,
  loadProductFilterFailed,
  loadProductSearchRequested,
  updateProductFailed,
  updateProductSucceeded,
  updateProductRequested,
  stockchangeProductSucceeded,
  stockchangeProductFailed,
  stockchangeProductRequested,
  updateImageProductSucceeded,
  updateImageProductFailed,
  updateImageProductRequested,
} from './productSlice';
import { apiURL } from 'config';
import axios from 'lib/axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducer';

function* productEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}products`);
    yield put(loadProductsSucceeded(response.data));
  } catch (error: any) {
    yield put(loadProductsFailed(error));
  }
}

function* getProductFilterEffect(action: {
  type: string;
  payload: {
    unitId?: any;
    pageSize?: number;
    pageCount?: number;
  };
}): Generator<any, void, any> {
  try {
    const { unitId, pageSize = 10, pageCount = 1 } = action.payload;

    const queryParams = new URLSearchParams();

    if (unitId) {
      queryParams.append('unitId', unitId);
    }

    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}product/filter?${queryParams.toString()}`
    );
    yield put(loadProductFilterSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadProductFilterFailed(error));
  }
}

function* getProductSearchEffect(action: {
  type: string;
  payload: {
    searchTerm?: string;
    pageSize: number;
    pageCount: number;
  };
}): Generator<any, void, any> {
  try {
    const { searchTerm, pageSize = 10, pageCount = 1 } = action.payload;

    const queryParams = new URLSearchParams();

    if (searchTerm) {
      queryParams.append('searchTerm', searchTerm);
    }

    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}product/search?${queryParams.toString()}`
    );

    yield put(loadProductFilterSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadProductFilterFailed(error));
  }
}

function* oneProductEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${apiURL}product/${action.payload}`
    );

    yield put(loadOneProductsSucceeded(response.data));
  } catch (error: any) {
    yield put(loadProductsFailed(error));
  }
}

function* storeProductEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const { images, imageUrls, updaterId, ...updatedProductData } =
      action.payload;
    const formData = new FormData();

    formData.append('productCreateRequest', JSON.stringify(updatedProductData));
    formData.append('updaterId', updaterId);

    Array.from(images).forEach((file: any) => {
      formData.append(`images`, file);
    });

    if (imageUrls && Array.isArray(imageUrls)) {
      imageUrls.forEach((url: string) => {
        formData.append('imageUrls', url);
      });
    } else if (imageUrls) {
      formData.append('imageUrls', imageUrls);
    }
    const response = yield call(axios.post, `${apiURL}product`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
      },
    });

    if (response.data?.success) {
      yield put(createProductSucceeded(response.data));
      toast.success(response.data.message || 'Product created successfully');
      window.history.back();
    } else {
      yield put(createProductFailed(response.data));
      toast.error(response.data.message || 'Failed to create product');
    }
  } catch (error: any) {
    console.error('Error in storeProductEffect:', error);
    yield put(createProductFailed(error));
    toast.error(error.response?.data?.message || 'Something went wrong');
  }
}

function* storeCategoryImageEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    console.log('action.payload', action.payload);
    const { images, id } = action.payload;

    const formData = new FormData();

    Array.from(images).forEach((file: any) => {
      formData.append(`images`, file);
    });
    formData.append('images', images);
    const response = yield call(
      axios.put,
      `${apiURL}product/image?id=${id}`,
      formData
    );

    if (response.data?.success) {
      yield put(updateImageProductSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(updateImageProductFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    console.error('API Error:', error);
    yield put(updateImageProductFailed(error));
    toast.error('An error occurred while creating the category.');
  }
}

function* archiveProductEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  const auth = yield select((state: RootState) => state.auth);

  try {
    const response = yield call(
      axios.put,
      // `${apiURL}product/active?id=${action.payload.id}`
      `${apiURL}product/active?id=${action.payload.id}&updaterId=${auth?.auth?.userId}`
    );
    if (response.data?.success) {
      yield put(archiveProductSucceeded(response.data));
      toast.success(response.data.message);
      window.location.reload();
    } else {
      yield put(archiveProductFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(archiveProductFailed(error));
  }
}

function* stockchangeProductEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  const auth = yield select((state: RootState) => state.auth);

  try {
    const response = yield call(
      axios.put,
      // `${apiURL}product/active?id=${action.payload.id}`
      `${apiURL}product/stock?id=${action.payload.id}&updaterId=${auth?.auth?.userId}`
    );
    if (response.data?.success) {
      yield put(stockchangeProductSucceeded(response.data));
      toast.success(response.data.message);
      window.location.reload();
    } else {
      yield put(stockchangeProductFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(stockchangeProductFailed(error));
  }
}

function* getpdfGenerateEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const { data } = yield call(
      axios.get,
      `${apiURL}products/single/pdf-generate?docType=PDF`,
      { responseType: 'blob' }
    );

    const url = window.URL.createObjectURL(new Blob([data]));

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'productsexport.pdf');

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    yield put(loadProductPdfSucceeded(data));
  } catch (error: any) {
    yield put(loadProductPdfFailed(error));
  }
}

function* getExcelGenerateEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const { data } = yield call(
      axios.get,
      `${apiURL}products/single/pdf-generate?docType=EXCEL`,
      { responseType: 'blob' }
    );

    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'productsexport.xlsx');

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    yield put(loadProductExcelSucceeded(data));
  } catch (error: any) {
    yield put(loadProductExcelFailed(error));
  }
}

function* handleFileUploadEffect(action: {
  type: string;
  payload: {
    file: File;
    updaterId: number;
  };
}): Generator {
  const { file, updaterId } = action.payload;
  try {
    const formData = new FormData();
    formData.append('file', file);
    const { data: response }: any = yield call(
      axios.post,
      `${apiURL}product/bulk-upload?updaterId=${updaterId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: '*/*',
        },
      }
    );

    console.log('Server Response:', response);

    if (response?.successCount > 0) {
      yield put(uploadExcelProFileSucceeded(response.successCount));
      toast.success(
        `Successfully imported ${response.successCount} records. that is ${response.successRecords}`
      );
    }

    if (response?.invalidRecords?.length > 0) {
      response.invalidRecords.map((record: any) => {
        toast.error(record.error);
      });
    }

    if (response?.successRecords?.length > 0) {
      console.log('Successfully processed records:', response.successRecords);
    } else if (
      response?.successCount === 0 &&
      (!response.invalidRecords || response.invalidRecords.length === 0)
    ) {
      toast.error('No records processed. Please check the file.');
    }
  } catch (error: any) {
    console.error('Upload error:', error);
    yield put(
      uploadExcelProFileFailed(error.message || 'Failed to import file')
    );
    toast.error(`Failed to import file: ${error.message}`);
  }
}

// function* handleFileUploadEffect(action: {
//   type: string;
//   payload: {
//     file: File;
//     updaterId: number; // Add updaterId to the action payload
//   };
// }): Generator {
//   const { file, updaterId } = action.payload; // Destructure updaterId
//   try {
//     const formData = new FormData();
//     formData.append('file', file);

//     // Include updaterId as a query parameter in the URL
//     const { response }: any = yield call(
//       axios.post,
//       `${apiURL}product/bulk-upload?updaterId=${updaterId}`,
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Accept: '*/*',
//         },
//       }
//     );
// console.log("response?.data...........................",response?.data);
//     if (response?.data?.successCount > 0) {
//       yield put(uploadExcelProFileSucceeded(response?.data?.successCount));
//       toast.success(`Imported successfully: ${response?.data?.successCount}`);
//     } else {
//       const invalidRecords = response?.data?.invalidRecords;
//       if (invalidRecords) {
//         invalidRecords.map((record: { error: string }) => {
//           toast.error(record.error);
//         });
//       }
//     }
//   } catch (error: any) {
//     yield put(
//       uploadExcelProFileFailed(error.message || 'Failed to import file')
//     );
//     toast.error(`Failed to import`);
//   }
// }

function* handleProductSearch(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    if (action.payload.length > 0) {
      const { data } = yield call(
        axios.get,
        `${apiURL}product/search?searchTerm=${action?.payload}&pageSize=10&pageCount=1`
      );

      if (data?.records) {
        yield put(ProductSearchSuceeded(data?.records));
      }
    }
  } catch (error: any) {}
}

function* getProductImagesEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${apiURL}products/get-images?image=${action.payload.name}&count=9&size=medium`
    );

    if (response.data) {
      yield put(loadProductImagesSucceeded(response.data));
    } else {
      yield put(loadProductImagesFailed(response.data));
    }
  } catch (error) {
    yield put(loadProductImagesFailed(error));
    toast.error('Something went wrong....');
  }
}

function* updateProductEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  const auth = yield select((state: RootState) => state.auth);

  try {
    console.log(
      'action.payload.idaction.payload.idaction.payload.id.................',
      action.payload.id
    );
    // const URL = `${apiURL}product/${action.payload.id}?updaterId=${action.payload.id}`;
    const URL = `${apiURL}product/${action.payload.id}?updaterId=${auth?.auth?.userId}`;

    // const { image, ...updatedPurchaseData } = action.payload.values;

    // const formData = new FormData();
    // formData.append("purchaseRequest", JSON.stringify(updatedPurchaseData));
    // formData.append("purchaseImage", image);

    const response = yield call(axios.put, URL, action.payload.values);
    if (response.data?.success) {
      yield put(updateProductSucceeded(response?.data));
      toast.success(response.data.message);
      window.history.back();
    } else {
      yield put(updateProductFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(updateProductFailed(error));
    toast.error('Something went wrong');
  }
}

export function* productSaga(): Generator<any, void, any> {
  yield takeLatest(loadProductsRequested, productEffect);
  yield takeLatest(loadOneProductsRequested, oneProductEffect);
  yield takeLatest(createProductRequested, storeProductEffect);
  yield takeLatest(archiveProductRequested, archiveProductEffect);
  yield takeLatest(loadProductRequestedPdf, getpdfGenerateEffect);
  yield takeLatest(loadProductRequestedExcel, getExcelGenerateEffect);
  yield takeLatest(uploadExcelProRequestedFile, handleFileUploadEffect);
  yield takeLatest(productSearch, handleProductSearch);
  yield takeLatest(loadProductImagesRequested, getProductImagesEffect);
  yield takeLatest(loadProductFilterRequested, getProductFilterEffect);
  yield takeLatest(loadProductSearchRequested, getProductSearchEffect);
  yield takeLatest(updateProductRequested, updateProductEffect);
  yield takeLatest(stockchangeProductRequested, stockchangeProductEffect);
  yield takeLatest(updateImageProductRequested, storeCategoryImageEffect);
}
