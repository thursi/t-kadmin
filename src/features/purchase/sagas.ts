import { call, put, takeLatest } from "redux-saga/effects";
import { apiURL } from "config";
import axios from "lib/axios";
import {
  loadFilterPurchasesRequested,
  loadPurchasesFailed,
  loadPurchasesRequested,
  loadPurchasesSucceeded,
  createPurchaseFailed,
  createPurchaseRequested,
  createPurchaseSucceeded,
  loadOnePurchasesRequested,
  loadOnePurchasesFailed,
  upadatePurchasesSucceeded,
  upadatePurchasesFailed,
  loadOnePurchasesSucceeded,
  upadatePurchasesRequested,
  loadFilterePurchasesSucceeded,
  loadFilterePurchasesFailed,
} from "./purchaseSlice";
import toast from "react-hot-toast";

function* getPurchasesEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}purchases`);
    yield put(loadPurchasesSucceeded(response.data));
  } catch (error: any) {
    yield put(loadPurchasesFailed(error));
  }
}

function* storePurchaseEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const { image, ...updatedPurchaseData } = action.payload;

    const formData = new FormData();
    formData.append(
      "purchaseCreateRequest",
      JSON.stringify(updatedPurchaseData)
    );
    formData.append("purchaseImage", image);
    const response = yield call(axios.post, `${apiURL}purchase`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "*/*",
      },
    });
    console.log(response,'dsadsadsdsss');
    

    if (response.data?.success) {
      yield put(createPurchaseSucceeded(response.data));
      toast.success(response.data.message);
      window.history.back();
    } else {
      yield put(createPurchaseFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error) {
    yield put(createPurchaseFailed(error));
    toast.error("Something went wrong");
  }
}

// function* loadFilterPurchasesEffect(action: {
//   type: string;
//   payload: {
//     discountType?: string;
//     purchaseStatus?: string;
//     purchaseDate?: string;
//   };
// }): Generator<any, void, any> {
//   try {
//     const { discountType, purchaseStatus, purchaseDate } = action.payload;
//     const queryParams = new URLSearchParams();
//     if (discountType) {
//       queryParams.append("discountType", discountType);
//     }
//     if (purchaseStatus) {
//       queryParams.append("purchaseStatus", purchaseStatus);
//     }
//     if (purchaseDate) {
//       queryParams.append("purchaseDate", purchaseDate);
//     }

//     const response = yield call(
//       axios.get,
//       `${apiURL}purchase/filter?${queryParams.toString()}&pageSize=10&pageCount=1`
//     );
//     yield put(loadPurchasesSucceeded(response?.data?.records));
//   } catch (error: any) {
//     yield put(loadPurchasesFailed(error));
//   }
// }

function* loadOnePurchasesEffect(action: {
  type: string;
  payload: {
    id?: string;
  };
}): Generator<any, void, any> {
  try {
    const { id } = action.payload;

    const response = yield call(axios.get, `${apiURL}purchase/${id}`);

    yield put(loadOnePurchasesSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadOnePurchasesFailed(error));
  }
}

function* updatePurchasesEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const URL = `${apiURL}purchase/${action.payload.id}`;

    const { image, ...updatedPurchaseData } = action.payload.values;

    const formData = new FormData();
    formData.append("purchaseRequest", JSON.stringify(updatedPurchaseData));
    formData.append("purchaseImage", image);

    const response = yield call(axios.put, URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "*/*",
      },
    });
    if (response.data?.success) {
      yield put(upadatePurchasesSucceeded(response?.data));
      toast.success(response.data.message);
      window.history.back();
    } else {
      yield put(upadatePurchasesFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(upadatePurchasesFailed(error));
    toast.error("Something went wrong");
  }
}

function* loadFilterpurchaseEffect(action: {
  type: string;
  payload: {
    discountType?: string;
    purchaseStatus?: string;
    purchaseDate?: string;
    pageSize?: number;
    pageCount?: number;
  };
}): Generator<any, void, any> {
  try {
    const {discountType, purchaseStatus, purchaseDate, pageSize = 10, pageCount = 1 } = action.payload;

    const queryParams = new URLSearchParams();


    if (purchaseDate) {
      queryParams.append('purchaseDate', purchaseDate);
    }

    
    if (purchaseStatus) {
      queryParams.append('purchaseStatus', purchaseStatus);
    }

    
    if (discountType) {
      queryParams.append('discountType', discountType);
    }


    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}purchase/filter?${queryParams.toString()}`
    );
    yield put(loadFilterePurchasesSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadFilterePurchasesFailed(error));
  }
}


export function* purchaseSaga() {
  yield takeLatest(loadPurchasesRequested, getPurchasesEffect);
  // yield takeLatest(loadFilterPurchasesRequested, loadFilterPurchasesEffect);
  yield takeLatest(createPurchaseRequested, storePurchaseEffect);
  yield takeLatest(loadOnePurchasesRequested, loadOnePurchasesEffect);
  yield takeLatest(upadatePurchasesRequested, updatePurchasesEffect);
  yield takeLatest(loadFilterPurchasesRequested, loadFilterpurchaseEffect);

}
