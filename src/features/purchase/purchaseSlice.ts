import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  purchaseLoading: false,
  error: null,
  purchases: [],
  filterPurchases:[],
  purchase: {},
  citiesFilter: [],
  createdPurchase: null,
  updatedPurchase: null,
  archivedPurchase: null,
  updatePurchase: null,
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    createPurchaseRequested: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = true;
      state.createdPurchase = null;
      state.error = null;
    },
    createPurchaseSucceeded: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.createdPurchase = action.payload;
      state.error = null;
    },
    createPurchaseFailed: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.createdPurchase = null;
      state.error = action.payload;
    },
    loadPurchasesRequested: (state) => {
      state.purchaseLoading = true;
      state.purchases = [];
      state.error = null;
    },
    loadPurchasesSucceeded: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.purchases = action.payload;
      state.error = null;
    },
    loadPurchasesFailed: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.purchases = [];
      state.error = action.payload;
    },

    // update a purchase using ID
    upadatePurchasesRequested: (
      state,
      action: PayloadAction<{ id: number; values: any }>
    ) => {
      state.purchaseLoading = true;
      state.updatePurchase = null;
      state.error = null;
    },
    upadatePurchasesSucceeded: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.updatePurchase = action.payload;
      state.error = null;
    },
    upadatePurchasesFailed: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.updatePurchase = null;
      state.error = action.payload;
    },

    // get purchase using ID
    loadOnePurchasesRequested: (state, action: PayloadAction<{ id: any }>) => {
      state.purchaseLoading = true;
      state.purchase = {};
      state.error = null;
    },
    loadOnePurchasesSucceeded: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.purchase = action.payload;
      state.error = null;
    },
    loadOnePurchasesFailed: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.purchase = {};
      state.error = action.payload;
    },

    loadFilterPurchasesRequested: (
      state,
      action: PayloadAction<{
        purchaseStatus: string;
        discountType: string;
        purchaseDate: string;
      }>
    ) => {
      state.purchaseLoading = true;
      state.purchases = [];
      state.error = null;
    },

    loadFilterePurchasesSucceeded: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.filterPurchases = action.payload;
      state.error = null;
    },
    loadFilterePurchasesFailed: (state, action: PayloadAction<any>) => {
      state.purchaseLoading = false;
      state.filterPurchases = [];
      state.error = action.payload;
    },
  },
});

export const {
  createPurchaseRequested,
  loadPurchasesRequested,
  loadPurchasesSucceeded,
  loadPurchasesFailed,
  loadFilterPurchasesRequested,
  createPurchaseSucceeded,
  createPurchaseFailed,
  upadatePurchasesRequested,
  loadOnePurchasesFailed,
  loadOnePurchasesRequested,
  loadOnePurchasesSucceeded,
  upadatePurchasesFailed,
  upadatePurchasesSucceeded,
  loadFilterePurchasesFailed,
  loadFilterePurchasesSucceeded
} = purchaseSlice.actions;

export default purchaseSlice.reducer;
