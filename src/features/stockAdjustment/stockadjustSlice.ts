import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  stockadjustmentLoading: false,
  createStockAdjustmentLoading: false,
  statusStockAdjustmentLoading: false,
  error: null,
  stockadjustment: [],
  stockadjustmentFilter: [],
  createdCity: null,
  updatedCity: null,
  archivedCity: null,
  createdStockAdjustment: null,
  StockAdjustmentStatus: null,
};

const stockadjustmentSlice = createSlice({
  name: 'stockadjustment',
  initialState,
  reducers: {
    loadStockAdjustmentRequested: (state) => {
      state.stockadjustmentLoading = true;
      state.stockadjustment = [];
      state.error = null;
    },
    loadStockAdjustmentSucceeded: (state, action: PayloadAction<any>) => {
      state.stockadjustmentLoading = false;
      state.stockadjustment = action.payload;
      state.error = null;
    },
    loadStockAdjustmentFailed: (state, action: PayloadAction<any>) => {
      state.stockadjustmentLoading = false;
      state.stockadjustment = [];
      state.error = action.payload;
    },

    loadFilterStockAdjustmentRequested: (
      state,
      action: PayloadAction<{
        pageSize: number;
        pageCount: number;
        isFreeShipping?: boolean;
        productId?: string;
        productVariableId: string;
        productType?: string;
        taxId?: string;
        cityId?: string;
        unitId?: string;
        brandId?: string;
        warrantyId?: string;
        categoryId?: string;
        variationId?: string;
        variationValueId?: number;
        subCategoryId?: string;
        businessLocationId: string;
      }>
    ) => {
      state.stockadjustmentLoading = true;
      state.stockadjustmentFilter = [];
      state.error = null;
    },
    loadFilterStockAdjustmentSucceeded: (state, action: PayloadAction<any>) => {
      state.stockadjustmentLoading = false;
      state.stockadjustmentFilter = action.payload;
      state.error = null;
    },
    loadFilterStockAdjustmentFailed: (state, action: PayloadAction<any>) => {
      state.stockadjustmentLoading = false;
      state.stockadjustmentFilter = [];
      state.error = action.payload;
    },

    createStockAdjustmentRequested: (state, action: PayloadAction<any>) => {
      state.createStockAdjustmentLoading = true;
      state.createdStockAdjustment = null;
      state.error = null;
    },
    createStockAdjustmentSucceeded: (state, action: PayloadAction<any>) => {
      state.createStockAdjustmentLoading = false;
      state.createdStockAdjustment = action.payload;
      state.error = null;
    },
    createStockAdjustmentFailed: (state, action: PayloadAction<any>) => {
      state.createStockAdjustmentLoading = false;
      state.createdStockAdjustment = null;
      state.error = action.payload;
    },

    StatusStockAdjustmentRequested: (
      state,
      action: PayloadAction<{ id: number; status?: string }>
    ) => {
      state.statusStockAdjustmentLoading = true;
      state.StockAdjustmentStatus = null;
      state.error = null;
    },
    StatusStockAdjustmentFailed: (state, action: PayloadAction<any>) => {
      state.statusStockAdjustmentLoading = false;
      state.StockAdjustmentStatus = null;
      state.error = action.payload;
    },
    StatusStockAdjustmentSucceeded: (state, action: PayloadAction<any>) => {
      state.statusStockAdjustmentLoading = false;
      state.StockAdjustmentStatus = action.payload;
      state.error = null;
    },
  },
});

export const {
  loadStockAdjustmentRequested,
  loadStockAdjustmentSucceeded,
  loadStockAdjustmentFailed,
  loadFilterStockAdjustmentFailed,
  loadFilterStockAdjustmentSucceeded,
  loadFilterStockAdjustmentRequested,
  createStockAdjustmentFailed,
  createStockAdjustmentRequested,
  createStockAdjustmentSucceeded,
  StatusStockAdjustmentSucceeded,
  StatusStockAdjustmentFailed,
  StatusStockAdjustmentRequested,
} = stockadjustmentSlice.actions;

export default stockadjustmentSlice.reducer;
