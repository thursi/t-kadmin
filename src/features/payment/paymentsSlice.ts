import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  paymentLoading: false,
  error: null,
  payments: [],
  paymentFilter: [],
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    loadPaymentsRequested: (state) => {
      state.paymentLoading = true;
      state.payments = [];
      state.error = null;
    },
    loadPaymentsFailed: (state, action: PayloadAction<any>) => {
      state.paymentLoading = false;
      state.payments = [];
      state.error = action.payload;
    },
    loadPaymentsSucceeded: (state, action: PayloadAction<any>) => {
      state.paymentLoading = false;
      state.payments = action.payload;
      state.error = null;
    },
    loadPaymentFilterRequested: (
      state,
      action: PayloadAction<{
        paymentGatewayStatus?: string;
      }>
    ) => {
      state.paymentLoading = true;
      state.paymentFilter = [];
      state.error = null;
    },
    loadPaymentFilterSucceeded: (state, action: PayloadAction<any>) => {
      state.paymentLoading = false;
      state.paymentFilter = action.payload;
      state.error = null;
    },
    loadPaymentFilterFailed: (state, action: PayloadAction<any>) => {
      state.paymentLoading = false;
      state.paymentFilter = [];
      state.error = action.payload;
    },
  },
});

export const {
  loadPaymentsRequested,
  loadPaymentsFailed,
  loadPaymentsSucceeded,
  loadPaymentFilterRequested,
  loadPaymentFilterSucceeded,
  loadPaymentFilterFailed,
} = paymentSlice.actions;

export default paymentSlice.reducer;
