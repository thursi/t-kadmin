import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';
import axios from 'lib/axios';
import { apiURL } from 'config';
import {
  loadCustomerGroupSucceeded,
  loadCustomerGroupFailed,
  loadCustomerGroupRequested,
} from './customerGroupsSlice';
import toast from 'react-hot-toast';

function* getcustomersGroupsEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}customerGroups`);
    yield put(loadCustomerGroupSucceeded(response.data));
  } catch (error: any) {
    yield put(loadCustomerGroupFailed(error));
  }
}

export function* customerGroupsSaga(): Generator<any, void, any> {
  yield takeLatest(loadCustomerGroupRequested, getcustomersGroupsEffect);
}
