import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import camelcaseKeys from 'camelcase-keys';

const initialState: any = {
  loading: false,
  forgotPassword: null,
  error: null,
  tokenType: 'Bearer',
  selectedOption: null,
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    forgotPasswordRequested(
      state,
      action: PayloadAction<{ email: string;}>
    ) {
      state.loading = true;
      state.error = null;
    },
    forgotPasswordSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = null;
      state.auth = action.payload;
    },

    forgotPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // logout(state) {
    //   state.loading = false;
    //   state.error = null;
    // },
    setSelectedOptionsFor(state, action: PayloadAction<any>) {
      state.selectedOption = action.payload;
    },
  },
});

export const { forgotPasswordRequested, forgotPasswordSuccess, forgotPasswordFailure, setSelectedOptionsFor } =
  forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
