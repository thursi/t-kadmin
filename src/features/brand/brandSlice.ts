import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  brandLoading: false,
  error: null,
  brands: [],
  createdBrand: null,
  updatedBrand: null,
  archivedBrand: null,
  filterBrand: <any>{},
};

const brandsSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    loadBrandRequested: (state) => {
      state.brandLoading = true;
      state.brands = [];
      state.error = null;
    },
    loadBrandFailed: (state, action: PayloadAction<any>) => {
      state.brandLoading = false;
      state.brands = [];
      state.error = action.payload;
    },
    loadBrandSucceeded: (state, action: PayloadAction<any>) => {
      state.brandLoading = false;
      state.brands = action.payload;
      state.error = null;
    },
    createBrandRequested: (state, acttion: PayloadAction<any>) => {
      state.brandLoading = true;
      state.createdBrand = null;
      state.error = null;
    },
    createBrandFailed: (state, action: PayloadAction<any>) => {
      state.brandLoading = false;
      state.createdBrand = null;
      state.error = action.payload;
    },
    createBrandSucceeded: (state, action: PayloadAction<any>) => {
      state.brandLoading = false;
      state.createdBrand = action.payload;
      state.error = null;
    },

    updateBrandRequested: (
      state,
      action: PayloadAction<{ id: number; values: any }>
    ) => {
      state.brandLoading = true;
      state.updatedBrand = null;
      state.error = null;
    },
    updateBrandFailed: (state, action: PayloadAction<any>) => {
      state.brandLoading = false;
      state.updatedBrand = null;
      state.error = action.payload;
    },
    updateBrandSucceeded: (state, action: PayloadAction<any>) => {
      state.brandLoading = false;
      state.updatedBrand = action.payload;
      state.error = null;
    },
    archiveBrandRequested: (state, action: PayloadAction<{ id: number }>) => {
      state.brandLoading = true;
      state.archivedBrand = null;
      state.error = null;
    },
    archiveBrandFailed: (state, action: PayloadAction<any>) => {
      state.brandLoading = false;
      state.archivedBrand = null;
      state.error = action.payload;
    },
    archiveBrandSucceeded: (state, action: PayloadAction<any>) => {
      state.brandLoading = false;
      state.archivedBrand = action.payload;
      state.error = null;
    },

    loadBrandFilterRequested: (
      state,
      action: PayloadAction<{
        brandName?: string;
        isActive?: boolean;

        pageSize: number;
        pageCount: number;
      }>
    ) => {
      state.brandLoading = true;
      state.filterBrand = {};
      state.error = null;
    },
    loadBrandFilterSucceeded: (state, action: PayloadAction<any>) => {
      state.brandLoading = false;
      state.filterBrand = action.payload;
      state.error = null;
    },
    loadBrandFilterFailed: (state, action: PayloadAction<any>) => {
      state.brandLoading = false;
      state.filterBrand = {};
      state.error = action.payload;
    },
  },
});

export const {
  loadBrandRequested,
  loadBrandFailed,
  loadBrandSucceeded,
  createBrandRequested,
  createBrandFailed,
  createBrandSucceeded,
  updateBrandRequested,
  updateBrandFailed,
  updateBrandSucceeded,
  archiveBrandRequested,
  archiveBrandFailed,
  archiveBrandSucceeded,
  loadBrandFilterFailed,
  loadBrandFilterRequested,
  loadBrandFilterSucceeded,
} = brandsSlice.actions;

export default brandsSlice.reducer;
