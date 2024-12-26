import { call, put, takeLatest } from 'redux-saga/effects';
import { apiURL } from 'config';
import axios from 'lib/axios';

import toast from 'react-hot-toast';
import { loadFilterUsersFailed, loadFilterUsersRequested, loadFilterUsersSucceeded } from './userSlice';


// function* oneDiscountEffect(action: {
//   type: string;
//   payload: any;
// }): Generator<any, void, any> {
//   try {
//     const response = yield call(
//       axios.get,
//       `${apiURL}discount/${action.payload}`
//     );

//     yield put(loadOneDiscountsSucceeded(response.data));
//   } catch (error: any) {
//     yield put(loadOneDiscountsFailed(error));
//   }
// }

// function* storeDiscountEffect(action: {
//   type: string;
//   payload: any;
// }): Generator<any, void, any> {
//   try {
//     console.log(action.payload, 'actionpayload');

//     const response = yield call(
//       axios.post,
//       `${apiURL}discount?updaterId=${49}`,
//       action.payload
//     );

//     if (response.data?.success) {
//       yield put(createDiscountSucceeded(response.data));
//       toast.success(response.data.message);
//       window.history.back();
//     } else {
//       yield put(createDiscountFailed(response.data));
//       toast.error(response.data.message);
//     }
//   } catch (error) {
//     yield put(createDiscountFailed(error));
//     toast.error('Something went wrong');
//   }
// }



function* loadFilterUserEffect(action: {
  type: string;
  payload: {
    // isActive?: boolean;
    pageSize?: number;
    pageCount?: number;
  };
}): Generator<any, void, any> {
  try {
    const { pageSize = 10, pageCount = 1 } = action.payload;

    const queryParams = new URLSearchParams();

    // if (isActive !== undefined) {
    //   queryParams.append('isActive', isActive.toString());
    // }

    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}user/filter?${queryParams.toString()}`
    );

    console.log("responseresponseresponse/................",response);
    yield put(loadFilterUsersSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadFilterUsersFailed(error));
  }
}






export function* userSaga() {
  yield takeLatest(loadFilterUsersRequested, loadFilterUserEffect);

}
