import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'lib/axios';
import { apiURL } from 'config';
import toast from 'react-hot-toast';
import { resetPasswordFailure, resetPasswordRequested, resetPasswordSuccess } from './resetPasswordSlice';

function* resetPasswordSaga(action: { type: string; payload: any }): Generator<any, void, any> {
  console.log("payloadpayloadpayload1111",action.payload)
  try {
    const { data } = yield call(axios.post,`${apiURL}auth/resetPassword`, action.payload);
   console.log("first",data);
    if (data?.success) {
      yield put(resetPasswordSuccess(data));
      
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  } catch (error: any) {
    yield put(resetPasswordFailure(error.message));
    toast.error('Reset password failed. Please try again.');
  }
}

export function* resetPasswordsSaga(): Generator<any, void, any> {
  yield takeLatest(resetPasswordRequested, resetPasswordSaga);
}
