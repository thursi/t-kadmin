import { call, put, takeLatest } from 'redux-saga/effects';
import { apiURL } from 'config';
import axios from 'lib/axios';
import {
  loadSocialMediasRequested,
  loadSocialMediasSucceeded,
  loadSocialMediasFailed,
  updateSocialMediaRequested,
  updateSocialMediaSucceeded,
  updateSocialMediaFailed,
  loadOneSocialMediaRequested,
  loadOneSocialMediaSucceeded,
  loadOneSocialMediaFailed,
  loadFiltereSocialMediaRequested,
  loadFiltereSocialMediaSucceeded,
  loadFiltereSocialMediaFailed,
} from './socialMediaSlice';
import toast from 'react-hot-toast';

function* getSocialMediasEffect(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${apiURL}businessInfos`);
    yield put(loadSocialMediasSucceeded(response.data));
  } catch (error: any) {
    yield put(loadSocialMediasFailed(error));
  }
}

function* loadOneSocialMediaEffect(action: {
  type: string;
  payload: {
    id?: string;
  };
}): Generator<any, void, any> {
  try {
    const { id } = action.payload;

    const response = yield call(axios.get, `${apiURL}businessInfo/${id}`);

    console.log('🚀 ~ response:', response);
    yield put(loadOneSocialMediaSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadOneSocialMediaFailed(error));
  }
}

function* updateSocialMediaEffect(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  console.log('🚀 ~ payload:', action.payload);
  try {
    const response = yield call(
      axios.put,
      `${apiURL}businessInfo/${action.payload.id}`,
      action.payload.values
    );
    if (response.data?.success) {
      yield put(updateSocialMediaSucceeded(response.data));
      toast.success(response.data.message);
    } else {
      yield put(updateSocialMediaFailed(response.data));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(updateSocialMediaFailed(error));
  }
}
// function* updateSocialMediaEffect(action: {
//   type: string;
//   payload: {
//     id?:string;
//   };
// }): Generator<any, void, any> {
//   try {

//     const {id} = action.payload;
//     const response = yield call(
//       axios.put,
//       `${apiURL}businessInfo/${id}`,

//     );
//     yield put(updateSocialMediaSucceeded(response.data));
//   } catch (error: any) {
//     yield put(updateSocialMediaFailed(error.message));
//   }
// }


function* loadFilterSocialMediaEffect(action: {
  type: string;
  payload: {
    isActive?: boolean; warrantyName?: string 
    pageSize?: number;
    pageCount?: number;
  };
}): Generator<any, void, any> {
  try {
    const { warrantyName, isActive , pageSize = 10, pageCount = 1 } = action.payload;

    const queryParams = new URLSearchParams();

    // if (isActive !== undefined) {
    //   queryParams.append('isActive', isActive.toString());
    // }
 
    // if (warrantyName) {
    //   queryParams.append('warrantyName', warrantyName);
    // }
    queryParams.append('pageSize', pageSize.toString());
    queryParams.append('pageCount', pageCount.toString());

    const response = yield call(
      axios.get,
      `${apiURL}businessInfo/filter?${queryParams.toString()}`
    );
    yield put(loadFiltereSocialMediaSucceeded(response?.data));
  } catch (error: any) {
    yield put(loadFiltereSocialMediaFailed(error));
  }
}


export function* socialMediaSaga() {
  yield takeLatest(loadSocialMediasRequested, getSocialMediasEffect);
  yield takeLatest(updateSocialMediaRequested, updateSocialMediaEffect);
  yield takeLatest(loadOneSocialMediaRequested, loadOneSocialMediaEffect);
  yield takeLatest(loadFiltereSocialMediaRequested,loadFilterSocialMediaEffect)
}
