// import { takeLatest, put, call } from 'redux-saga/effects';
// import axios from 'lib/axios';
// import { apiURL, authURL } from 'config';
// import toast from 'react-hot-toast';
// import { loginFailure, loginRequested, loginSuccess } from './authSlice';

// function* loginSaga(action: {
//   type: string;
//   payload: any;
// }): Generator<any, void, any> {
//   console.log('firstthusuiiiiiiiiiiiiiii',`${apiURL}auth/logIn`)
//   try {
//     const { data } = yield call(axios.post, `${apiURL}auth/logIn`, action.payload);
// console.log("datadatadatadata",data)
//     if (data?.success) {
//       yield put(loginSuccess(data));
//       toast.success(data?.message);
//     } else {
//       toast.error(data?.message);
//     }
//   } catch (error: any) {
//     yield put(loginFailure(error.message));
//   }
// }

// export function* authSaga(): Generator<any, void, any> {
//   yield takeLatest(loginRequested, loginSaga);
// }


// authSaga.ts
import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'lib/axios';
import { apiURL } from 'config';
import toast from 'react-hot-toast';
import { loginFailure, loginRequested, loginSuccess, signUpFailure, signUpRequested, signUpSuccess, SocialLoginRequest } from './authSlice';

function* loginSaga(action: { type: string; payload: any }): Generator<any, void, any> {

  try {
    const { data } = yield call(axios.post,`${apiURL}auth/logIn`, action.payload);
    console.log("loginSagaloginSaga",data);
    if (data?.success) {
      yield put(loginSuccess(data));
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  } catch (error: any) {
    yield put(loginFailure(error.message));
    toast.error('Login failed. Please try again.');
  }
}


function* AuthSignUp(action: { type: string; payload: any }): Generator<any, void, any> {

  try {
    const { data } = yield call(axios.post,`${apiURL}user`, action.payload);
    console.log("loginSagaloginSaga",data);
    if (data?.success) {
      yield put(signUpSuccess(data));
     
      toast.success(data?.message);
      
    } else {
      toast.error(data?.message);
    }
  } catch (error: any) {
    yield put(signUpFailure(error.message));
    toast.error('Login failed. Please try again.');
  }
}

export function* Sociallogin(action: { type: string; payload: any }): Generator<any, void, any> {
  try {
    const response = yield call(axios.post, `${apiURL}auth/social-login`, {
      authProvider: action.payload.authProvider,
      token: action.payload.token,
    });
    yield put(loginSuccess(response.data));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}




// export function AuthLogIn(login: Auth, selectedCartItem: any) {
//   // console.log("🚀 ~ AuthLogIn ~ selectedCartItem:", selectedCartItem);
//   // const { selectedCartItem } = store.getState().cart;
//   return async (dispatch: any) => {
//     dispatch(actions.startLoading());
//     try {
//       const response = await axiosInstance.post("/auth/logIn", login);
//       // console.log(selectedCartItem);

//       if (response?.data?.success) {
//         localStorage.setItem('authToken', response.data.token)
//         dispatch(fetchUser(response.data.userId));
//         dispatch(actions.logInSuccess(response.data));
//         dispatch(setIsLoggedin(true));
//         if (selectedCartItem) {
//           dispatch(addToCart(selectedCartItem));
//         }
//         await fetchUser(response.data.userId);
//         toast.success(response?.data?.message || "Login successful");
//       } else {
//         toast.error(response?.data?.message || "Something went wrong");
//       }
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.message || "Login failed"; // more robust error handling
//       dispatch(actions.loginFailure(errorMessage));
//       toast.error(errorMessage);
//     }
//   };
// }

export function* authSaga(): Generator<any, void, any> {
  yield takeLatest(loginRequested, loginSaga);
  yield takeLatest(signUpRequested, AuthSignUp);
  yield takeLatest(SocialLoginRequest, Sociallogin);


}
