import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  deeliveryLoading: false,
  error: null,
  deliveryCharges: [],
  deliveryChargFilter: {},
  onedeliveryCharge: <any>{},
  createdDeliveryCharge: null,
  updatedeliveryCharge: null,
  archivedCity: null,
};

const deliveryChargeSlice = createSlice({
  name: 'deliveryCharge',
  initialState,
  reducers: {
    loadDeliveryChargesRequested: (state) => {
      state.deeliveryLoading = true;
      state.deliveryCharges = [];
      state.error = null;
    },
    loadDeliveryChargesSucceeded: (state, action: PayloadAction<any>) => {
      state.deeliveryLoading = false;
      state.deliveryCharges = action.payload;
      state.error = null;
    },
    loadDeliveryChargesFailed: (state, action: PayloadAction<any>) => {
      state.deeliveryLoading = false;
      state.deliveryCharges = [];
      state.error = action.payload;
    },

    loadFilterDeliveryChargesRequested: (
      state,
      action: PayloadAction<{ pageSize: number; pageCount: number }>
    ) => {
      state.deeliveryLoading = true;
      state.deliveryChargFilter = {};
      state.error = null;
    },
    loadFilterDeliveryChargesSucceeded: (state, action: PayloadAction<any>) => {
      state.deeliveryLoading = false;
      state.deliveryChargFilter = action.payload;
      state.error = null;
    },
    loadFilterDeliveryChargesFailed: (state, action: PayloadAction<any>) => {
      state.deeliveryLoading = false;
      state.deliveryChargFilter = {};
      state.error = action.payload;
    },
    createDeliveryChargesRequested: (state, action: PayloadAction<any>) => {
      state.deeliveryLoading = true;
      state.createdDeliveryCharge = null;
      state.error = null;
    },
    createDeliveryChargesSucceeded: (state, action: PayloadAction<any>) => {
      state.deeliveryLoading = false;
      state.createdDeliveryCharge = action.payload;
      state.error = null;
    },
    createDeliveryChargesFailed: (state, action: PayloadAction<any>) => {
      state.deeliveryLoading = false;
      state.createdDeliveryCharge = null;
      state.error = action.payload;
    },

    loadOneDeliveryChargesFailed: (state, action: PayloadAction<any>) => {
      state.deeliveryLoading = false;
      state.onedeliveryCharge = [];
      state.error = action.payload;
    },
    loadOneDeliveryChargesRequested: (state) => {
      state.deeliveryLoading = true;
      state.onedeliveryCharge = {};
      state.error = null;
    },
    loadOneDeliveryChargesSucceeded: (state, action: PayloadAction<any>) => {
      state.deeliveryLoading = false;
      state.onedeliveryCharge = action.payload;
      state.error = null;
    },

    updateDeliveryChargeRequested: (
      state,
      action: PayloadAction<{ id: number; values: any }>
    ) => {
      state.deeliveryLoading = true;
      state.updatedeliveryCharge = null;
      state.error = null;
    },
    updateDeliveryChargeSucceeded: (state, action: PayloadAction<any>) => {
      state.deeliveryLoading = false;
      state.updatedeliveryCharge = action.payload;
      state.error = null;
    },
    updateDeliveryChargeFailed: (state, action: PayloadAction<any>) => {
      state.deeliveryLoading = false;
      state.updatedeliveryCharge = null;
      state.error = action.payload;
    },
  },
});

export const {
  loadDeliveryChargesFailed,
  loadDeliveryChargesRequested,
  loadDeliveryChargesSucceeded,
  loadFilterDeliveryChargesFailed,
  loadFilterDeliveryChargesRequested,
  loadFilterDeliveryChargesSucceeded,
  loadOneDeliveryChargesFailed,
  loadOneDeliveryChargesRequested,
  loadOneDeliveryChargesSucceeded,
  createDeliveryChargesFailed,
  createDeliveryChargesRequested,
  createDeliveryChargesSucceeded,
  updateDeliveryChargeFailed,
  updateDeliveryChargeRequested,
  updateDeliveryChargeSucceeded,
} = deliveryChargeSlice.actions;

export default deliveryChargeSlice.reducer;
