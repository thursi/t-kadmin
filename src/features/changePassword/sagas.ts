import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'lib/axios';
import { apiURL } from 'config';
import toast from 'react-hot-toast';
import { changePasswordFailure, changePasswordRequested, changePasswordSuccess } from './changePasswordSlice';


function* changePasswordSaga(action: { type: string; payload: any }): Generator<any, void, any> {
  console.log("payloadpayloadpayload1111",action.payload)

  try {
    const { data } = yield call(axios.post,`${apiURL}auth/changePassword`, action.payload);
   console.log("first",data);
    if (data?.success) {
      yield put(changePasswordSuccess(data));
      toast.success(data?.message);
      
    } else {
      toast.error(data?.message);
    }
  } catch (error: any) {
    yield put(changePasswordFailure(error.message));
    toast.error('Change password failed. Please try again.');
  }
}

export function* changePasswordsSaga(): Generator<any, void, any> {
  yield takeLatest(changePasswordRequested, changePasswordSaga);
}

