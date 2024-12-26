import { takeEvery, put, call, takeLatest } from "redux-saga/effects";
import axios from "lib/axios";
import { apiURL } from "config";
import {
  archiveFailed,
  createFailed,
  createCustomerRequested,
  createCustomerSucceeded,
  loadFailed,
  loadRequested,
  loadCustomersSucceeded,
  updateFailed,
  createSupplierSucceeded,
  loadSuppliersSucceeded,
  createSupplierRequested,
  archiveRequested,
  archiveSucceeded,
  updateSucceeded,
  updateRequested,
  loadPdfSucceeded,
  loadPdfFailed,
  loadRequestedPdf,
  loadRequestedExcel,
  loadExcelSucceeded,
  loadExcelFailed,
  uploadExcelRequestedFile,
  uploadExcelFileSucceeded,
  uploadExcelFileFailed,
  loadFilterSuppilerRequested,
  loadByIdRequested,
  loadByIdSucceeded,
  loadByIdFailed,
  loadFilterSuppilerSucceeded,
  loadFilterSuppilerFailed,
} from './contactsSlice';
import toast from 'react-hot-toast';


function* getContactsEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}contacts`);
    const suppliers = [];
    const customers = [];

    for (const customer of response.data) {
      if (
        customer.contactType === "SUPPLIERS" ||
        customer.contactType === "BOTH"
      ) {
        suppliers.push(customer);
      }

      if (
        customer.contactType === "CUSTOMERS" ||
        customer.contactType === "BOTH"
      ) {
        customers.push(customer);
      }
    }

    if (suppliers.length > 0) {
      yield put(loadSuppliersSucceeded(suppliers));
    }

    if (customers.length > 0) {
      yield put(loadCustomersSucceeded(customers));
    }
  } catch (error: any) {
    yield put(loadFailed(error));
  }
}

function* storeContactEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(axios.post, `${apiURL}contact`, action.payload);
    if (response.data?.success) {
      if (
        action?.payload?.contactType === "SUPPLIERS" ||
        action?.payload?.contactType === "BOTH"
      ) {
        yield put(createSupplierSucceeded(response.data));
      }

      if (
        action?.payload?.contactType === "CUSTOMERS" ||
        action?.payload?.contactType === "BOTH"
      ) {
        yield put(createCustomerSucceeded(response.data));
      }

      toast.success(response.data.message);
    } else {
      yield put(createFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(createFailed(error));
  }
}

function* updateContactEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${apiURL}contact/${action.payload.id}`,
      action.payload.values
    );
    if (response.data?.success) {
      yield put(updateSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(updateFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(updateFailed(error));
  }
}

function* archiveContactEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {

  try {
    const response = yield call(
      axios.put,
      `${apiURL}contact/active?id=${action.payload.id}`
    );
    if (response.data?.success) {
      yield put(archiveSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(archiveFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(archiveFailed(error));
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
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([data]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "productsexport.pdf");

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    yield put(loadPdfSucceeded(data));
  } catch (error: any) {
    yield put(loadPdfFailed(error));
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
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "productsexport.xlsx");

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    yield put(loadExcelSucceeded(data));
  } catch (error: any) {
    yield put(loadExcelFailed(error));
  }
}

function* handleFileUploadEffect(action: {
  type: string;
  payload: {
    file: File;
  };
}): Generator<any, void, any> {
  const { file } = action.payload;

  try {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = yield call(
      axios.post,
      `${apiURL}product/bulk-upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "*/*", // Add the Accept header here
        },
      }
    );

    if (data.success) {
      yield put(uploadExcelFileSucceeded(data));
      toast.success(` imported successfully`);
    } else {
      yield put(uploadExcelFileFailed(data.message));
      toast.error(data.message);
    }
  } catch (error: any) {
    yield put(uploadExcelFileFailed(error.message || "Failed to import file")); // Pass the error message
    toast.error(`Failed to import`);
  }
}

// function* getFilterSuppilerEffect(action: {
//   type: string;
//   payload: {
//     isActive?: boolean;
//     contactType?: string;
//   };
// }): Generator<any, void, any> {
//   try {
//     const { isActive, contactType } = action.payload;

//     const queryParams = [];

//     if (contactType !== undefined) {
//       queryParams.push(`contactType=${encodeURIComponent(contactType)}`);
//     }
//     if (isActive !== undefined) {
//       queryParams.push(`isActive=${isActive}`);
//     }

//     const queryString =
//       queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
//     const apiUrl = `${apiURL}contact/filter${queryString}&pageSize=10&pageCount=1`;
//     const response = yield call(axios.get, apiUrl);
//     yield put(loadSuppliersSucceeded(response?.data?.records));
//   } catch (error: any) {
//     yield put(loadFailed(error));
//   }
// }


function* getFilterSuppilerEffect(action: {
  type: string;
  payload: {
    isActive?: boolean;
    contactType?: string;
    pageSize?: number;
    pageCount?: number;
  };
}): Generator<any, void, any> {
  try {
    const {
      isActive,
      contactType,
      pageSize = 10,
      pageCount = 1,
    } = action.payload;

    const queryParams = new URLSearchParams();

    if (isActive !== undefined) {
      queryParams.append('isActive', isActive.toString());
    }
    if (contactType) {
      queryParams.append('contactType', contactType);
    }
    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}contact/filter?${queryParams.toString()}`
    );
    yield put(loadFilterSuppilerSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadFilterSuppilerFailed(error));
  }
}


function* getByIdContactEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${apiURL}contact/${action.payload.id}`,
      action.payload.values
    );
    yield put(loadByIdSucceeded(response.data));
  } catch (error: any) {
    yield put(loadByIdFailed(error));
  }
}

export function* contactSaga(): Generator<any, void, any> {
  yield takeLatest(loadRequested, getContactsEffect);
  yield takeLatest(createCustomerRequested, storeContactEffect);
  yield takeLatest(createSupplierRequested, storeContactEffect);
  yield takeLatest(updateRequested, updateContactEffect);
  yield takeLatest(archiveRequested, archiveContactEffect);
  yield takeLatest(loadRequestedPdf, getpdfGenerateEffect);
  yield takeLatest(loadRequestedExcel, getExcelGenerateEffect);
  yield takeLatest(uploadExcelRequestedFile, handleFileUploadEffect);
  yield takeLatest(loadFilterSuppilerRequested, getFilterSuppilerEffect);
  yield takeLatest(loadByIdRequested, getByIdContactEffect);
}
