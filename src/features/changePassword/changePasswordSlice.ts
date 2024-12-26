import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import camelcaseKeys from 'camelcase-keys';

const initialState: any = {
  loading: false,
  changePassword: null,
  error: null,
  tokenType: 'Bearer',
  selectedOption: null,
};

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    changePasswordRequested(
      state,
      action: PayloadAction<{ 
        oldPassword: string;
        newPassword: string;
      }>
    ) {
      state.loading = true;
      state.error = null;
    },
    changePasswordSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = null;
      state.changePassword = action.payload;
    },

    changePasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // logout(state) {
    //   state.loading = false;
    //   state.error = null;
    // },
    setSelectedOptionsChangePassword(state, action: PayloadAction<any>) {
      state.selectedOption = action.payload;
    },
  },
});

export const { changePasswordRequested, changePasswordSuccess, changePasswordFailure, setSelectedOptionsChangePassword } =
changePasswordSlice.actions;

export default changePasswordSlice.reducer;
