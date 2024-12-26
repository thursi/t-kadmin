import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'lib/axios';
import { apiURL } from 'config';
import toast from 'react-hot-toast';
import { forgotPasswordFailure, forgotPasswordRequested, forgotPasswordSuccess } from './forgotPasswordSlice';


function* forgotPasswordSaga(action: { type: string; payload: any }): Generator<any, void, any> {
  console.log("payloadpayloadpayload1111",action.payload)

  try {
    const { data } = yield call(axios.post,`${apiURL}auth/forgotPassword/${ action.payload.email}`, action.payload);
   console.log("first",data);
    // if (data?.success) {
    //   yield put(forgotPasswordSuccess(data));
    //   toast.success(data?.message);
      
    // }
    // Inside forgotPasswordSaga after dispatching success
if (data?.success) {
  yield put(forgotPasswordSuccess(data)); // Dispatch success action
  console.log("Password reset email sent successfully!"); // Debug log
  toast.success(data?.message);
}
 else {
      toast.error(data?.message);
    }
  } catch (error: any) {
    yield put(forgotPasswordFailure(error.message));
    toast.error('Forgot password failed. Please try again.');
  }
}

export function* forgotPasswordsSaga(): Generator<any, void, any> {
  yield takeLatest(forgotPasswordRequested, forgotPasswordSaga);
}

