import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  purchaseLoading: false,
  error: null,
  purchaseReturn: [],
  purchasesReturn: {},
  filterpurchasesReturn: {},
  createdPurchaseReturn: null,
  updatedPurchaseReturnReturn: null,
  archivedPurchaseReturn: null,
  updatePurchaseReturn: null,
};

const purchaseReturnSlice = createSlice({
  name: 'purchaseReturn',
  initialState,
  reducers: {
    loadPurchaseReturnRequested: (state) => {
      state.purchaseLoading = true;
      state.purchaseReturn = [];
      state.error = null;
    },
    loadPurchaseReturnSucceeded: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.purchaseReturn = action.payload;
      state.error = null;
    },
    loadPurchaseReturnFailed: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.purchaseReturn = [];
      state.error = action.payload;
    },
    createPurchaseReturnRequested: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = true;
      state.createdPurchaseReturn = null;
      state.error = null;
    },
    createPurchaseReturnSucceeded: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.createdPurchaseReturn = action.payload;
      state.error = null;
    },
    createPurchaseReturnFailed: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.createdPurchaseReturn = null;
      state.error = action.payload;
    },
    upadatePurchasesReturnRequested: (
      state,
      action: PayloadAction<{ id: number; values: any }>
    ) => {
      state.purchaseLoading = true;
      state.updatePurchaseReturn = null;
      state.error = null;
    },
    upadatePurchasesReturnSucceeded: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.updatePurchaseReturn = action.payload;
      state.error = null;
    },
    upadatePurchasesReturnFailed: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.updatePurchaseReturn = null;
      state.error = action.payload;
    },
    loadOnePurchasesReturnRequested: (
      state,
      action: PayloadAction<{ id: any }>
    ) => {
      state.purchaseLoading = true;
      state.purchasesReturn = {};
      state.error = null;
    },
    loadOnePurchasesReturnSucceeded: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.purchasesReturn = action.payload;
      state.error = null;
    },
    loadOnePurchasesReturnFailed: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.purchasesReturn = {};
      state.error = action.payload;
    },

    loadFilterPurchasesReturnRequested: (
      state,
      action: PayloadAction<{
        pageSize: number;
        pageCount: number;
        purchaseStatus: string;
      }>
    ) => {
      state.purchaseLoading = true;
      state.filterpurchasesReturn = {}; 
      state.error = null;
    },

    loadFilterPurchasesReturnSucceeded: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.filterpurchasesReturn = action.payload;
      state.error = null;
    },
    loadFilterPurchasesReturnFailed: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.filterpurchasesReturn = {}; 
      state.error = action.payload;
    },
  },
});
export const {
  loadPurchaseReturnRequested,
  loadPurchaseReturnSucceeded,
  loadPurchaseReturnFailed,
  createPurchaseReturnRequested,
  createPurchaseReturnSucceeded,
  createPurchaseReturnFailed,
  upadatePurchasesReturnRequested,
  upadatePurchasesReturnSucceeded,
  upadatePurchasesReturnFailed,
  loadOnePurchasesReturnRequested,
  loadOnePurchasesReturnSucceeded,
  loadOnePurchasesReturnFailed,
  loadFilterPurchasesReturnFailed,
  loadFilterPurchasesReturnRequested,
  loadFilterPurchasesReturnSucceeded,
} = purchaseReturnSlice.actions;

export default purchaseReturnSlice.reducer;
