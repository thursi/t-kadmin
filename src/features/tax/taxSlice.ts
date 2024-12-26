import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  taxLoading: false,
  error: null,
  taxs: [],
  createdTax: null,
  updatedTax: null,
  archivedTax: null,
  filtertax: <any>{},
};

const taxSlice = createSlice({
  name: "tax",
  initialState,
  reducers: {
    loadTaxsRequested: (state) => {
      state.taxLoading = true;
      state.taxs = [];
      state.error = null;
    },
    loadTaxsFailed: (state, action: PayloadAction<any>) => {
      state.taxLoading = false;
      state.taxs = [];
      state.error = action.payload;
    },
    loadTaxsSucceeded: (state, action: PayloadAction<any>) => {
      state.taxLoading = false;
      state.taxs = action.payload;
      state.error = null;
    },
    createTaxRequested: (state, action: PayloadAction<any>) => {
      state.taxLoading = true;
      state.createdTax = null;
      state.error = null;
    },
    createTaxFailed: (state, action: PayloadAction<any>) => {
      state.taxLoading = false;
      state.createdTax = null;
      state.error = action.payload;
    },
    createTaxSucceeded: (state, action: PayloadAction<any>) => {
      state.taxLoading = false;
      state.createdTax = action.payload;
      state.error = null;
    },
    updateTaxRequested: (
      state,
      action: PayloadAction<{ id: number; values: any }>
    ) => {
      state.taxLoading = true;
      state.updatedTax = null;
      state.error = null;
    },
    updateTaxFailed: (state, action: PayloadAction<any>) => {
      state.taxLoading = false;
      state.updatedTax = null;
      state.error = action.payload;
    },
    updateTaxSucceeded: (state, action: PayloadAction<any>) => {
      state.taxLoading = false;
      state.updatedTax = action.payload;
      state.error = null;
    },
    archiveTaxRequested: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      state.taxLoading = true;
      state.archivedTax = null;
      state.error = null;
    },
    archiveTaxFailed: (state, action: PayloadAction<any>) => {
      state.taxLoading = false;
      state.archivedTax = null;
      state.error = action.payload;
    },
    archiveTaxSucceeded: (state, action: PayloadAction<any>) => {
      state.taxLoading = false;
      state.archivedTax = action.payload;
      state.error = null;
    },
    
    loadTaxFilterRequested: (
      state,
      action: PayloadAction<{   pageSize: number;
        pageCount: number; taxName?:string; tax?: number; }>
    ) => {
      state.taxLoading = true;
      state.filtertax= {};
      state.error = null;
    },
    loadTaxFilterSucceeded: (state, action: PayloadAction<any>) => {
      state.taxLoading = false;
      state.filtertax = action.payload;
      state.error = null;
    },
    loadTaxFilterFailed: (state, action: PayloadAction<any>) => {
      state.taxLoading = false;
      state.filtertax = {};
      state.error = action.payload;
    },
  },
});

export const {
  loadTaxsRequested,
  loadTaxsFailed,
  loadTaxsSucceeded,
  createTaxRequested,
  createTaxFailed,
  createTaxSucceeded,
  updateTaxRequested,
  updateTaxFailed,
  updateTaxSucceeded,
  archiveTaxRequested,
  archiveTaxFailed,
  archiveTaxSucceeded,
  loadTaxFilterFailed,
  loadTaxFilterSucceeded,
  loadTaxFilterRequested
} = taxSlice.actions;

export default taxSlice.reducer;