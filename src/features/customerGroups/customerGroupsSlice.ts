import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  conLoading: false,
  error: null,
  customersGroups: [],
};

const customerGroupsSlice = createSlice({
  name: 'customerGroup',
  initialState,
  reducers: {
    loadCustomerGroupRequested: (state) => {
      state.conLoading = true;
      state.customersGroups = [];
      state.error = null;
    },

    loadCustomerGroupSucceeded: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.customersGroups = action.payload;
      state.error = null;
    },
    loadCustomerGroupFailed: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.customersGroups = [];
      state.error = action.payload;
    },
  },
});

export const {
  loadCustomerGroupFailed,
  loadCustomerGroupSucceeded,
  loadCustomerGroupRequested,
} = customerGroupsSlice.actions;

export default customerGroupsSlice.reducer;
