import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import camelcaseKeys from 'camelcase-keys';

const initialState: any = {
  loading: false,
  auth: null,
  error: null,
  tokenType: 'Bearer',
  selectedOption: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequested(
      state,
      action: PayloadAction<{ userName: string; password: string }>
    ) {
      state.loading = true;
      state.error = null;
    },
    SocialLoginRequest(state, action: PayloadAction<any>) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = null;
      state.auth = action.payload;
    },

    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.loading = false;
      state.error = null;
    },

    signUpSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.auth = action.payload;
    },
    signUpFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    signUpRequested(state, action: PayloadAction<any>) {
      state.isLoading = true;
      state.error = null;
    },
    
    setSelectedOption(state, action: PayloadAction<any>) {
      state.selectedOption = action.payload;
    },
  },
});

export const {
  loginRequested,
  loginSuccess,
  SocialLoginRequest,
  loginFailure,
  signUpFailure,
  signUpRequested,
  signUpSuccess,
  logout,
  setSelectedOption,
} = authSlice.actions;

export default authSlice.reducer;
