import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import camelcaseKeys from 'camelcase-keys';

const initialState: any = {
  loading: false,
  resetPassword: null,
  error: null,
  tokenType: 'Bearer',
  selectedOption: null,
};

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    resetPasswordRequested(
      state,
      action: PayloadAction<{
         otp: string;
         password:string;
      }>
    ) {
      state.loading = true;
      state.error = null;
    },
    resetPasswordSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = null;
      state.auth = action.payload;
    },

    resetPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // logout(state) {
    //   state.loading = false;
    //   state.error = null;
    // },
    setSelectedOptions(state, action: PayloadAction<any>) {
      state.selectedOption = action.payload;
    },
  },
});

export const { resetPasswordRequested, resetPasswordSuccess, resetPasswordFailure, setSelectedOptions } =
resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
