import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type StockTrasferState= {
  stocktransferLoading: boolean;
  createStockTransferLoading: boolean
  error: any;
  StockTransfer: any;
  StockTransferOne: any;
  StockTransferFilter: any;
  stockTransferReport: any;
  StockTransferStatus: any;
  updatedContactStockTransfer: any;
  archivedCity: any;
  createdStockTransfer: any;
}

const initialState : StockTrasferState = {
  stocktransferLoading: false,
  createStockTransferLoading: false,
  error: null,
  StockTransfer: [],
  StockTransferOne: [],
  StockTransferFilter: [],
  stockTransferReport: null,
  StockTransferStatus: null,
  updatedContactStockTransfer: null,
  archivedCity: null,
  createdStockTransfer: null,
};

const stockTransferSlice = createSlice({
  name: 'stocktransfer',
  initialState,
  reducers: {
    loadStockTransferRequested: (state) => {
      state.stocktransferLoading = true;
      state.StockTransfer = [];
      state.error = null;
    },
    loadStockTransferSucceeded: (state, action: PayloadAction<any>) => {
      state.stocktransferLoading = false;
      state.StockTransfer = action.payload;
      state.error = null;
    },
    loadStockTransferFailed: (state, action: PayloadAction<any>) => {
      state.stocktransferLoading = false;
      state.StockTransfer = [];
      state.error = action.payload;
    },
    loadOneStockTransferRequested: (
      state,
      action: PayloadAction<{ id: any }>
    ) => {
      state.stocktransferLoading = true;
      state.StockTransferOne = [];
      state.error = null;
    },
    loadOneStockTransferSucceeded: (state, action: PayloadAction<any>) => {
      state.stocktransferLoading = false;
      state.StockTransferOne = action.payload;
      state.error = null;
    },
    loadOneStockTransferFailed: (state, action: PayloadAction<any>) => {
      state.stocktransferLoading = false;
      state.StockTransferOne = [];
      state.error = action.payload;
    },

    loadFilterStockTransferRequested: (
      state,
      action: PayloadAction<{
        pageSize: number;
        pageCount: number;
        referenceNumber?: string;
        date?: string;
        stockTransferStatus?: string;
        locationTo?: string;
      }>
    ) => {
      state.stocktransferLoading = true;
      state.StockTransferFilter = [];
      state.error = null;
    },
    loadFilterStockTransferSucceeded: (state, action: PayloadAction<any>) => {
      state.stocktransferLoading = false;
      state.StockTransferFilter = action.payload;
      state.error = null;
    },
    loadFilterStockTransferFailed: (state, action: PayloadAction<any>) => {
      state.stocktransferLoading = false;
      state.StockTransferFilter = [];
      state.error = action.payload;
    },

    loadStockTransferReportRequested: (
      state,
      action: PayloadAction<{
        startDate?: string;
        endDate?: string;
        businessLocationId?: string;
      }>
    ) => {
      state.stocktransferLoading = true;
      state.stockTransferReport = null;
      state.error = null;
    },
    loadStockTransferReportSucceeded: (state, action: PayloadAction<any>) => {
      state.stocktransferLoading = false;
      state.stockTransferReport = action.payload;
      state.error = null;
    },
    loadStockTransferReportFailed: (state, action: PayloadAction<any>) => {
      state.stocktransferLoading = false;
      state.stockTransferReport = null;
      state.error = action.payload;
    },

    createStockTransferRequested: (state, action: PayloadAction<any>) => {
      state.createStockTransferLoading = true;
      state.createdStockTransfer = null;
      state.error = null;
    },
    createStockTransferSucceeded: (state, action: PayloadAction<any>) => {
      state.createStockTransferLoading = false;
      state.createdStockTransfer = action.payload;
      state.error = null;
    },
    createStockTransfereFailed: (state, action: PayloadAction<any>) => {
      state.createStockTransferLoading = false;
      state.createdStockTransfer = null;
      state.error = action.payload;
    },
    updateStockTransfereRequested: (
      state,
      action: PayloadAction<{ id: number; values: any }>
    ) => {
      state.createStockTransferLoading = true;
      state.updatedContactStockTransfer = null;
      state.error = null;
    },
    updateStockTransfereFailed: (state, action: PayloadAction<any>) => {
      state.createStockTransferLoading = false;
      state.updatedContactStockTransfer = null;
      state.error = action.payload;
    },
    updateStockTransfereSucceeded: (state, action: PayloadAction<any>) => {
      state.createStockTransferLoading = false;
      state.updatedContactStockTransfer = action.payload;
      state.error = null;
    },
    StatusStockTransferRequested: (
      state,
      action: PayloadAction<{ id: number, status?:string }>
    ) => {
      state.createStockTransferLoading = true;
      state.StockTransferStatus = null;
      state.error = null;
    },
    StatusStockTransferFailed: (state, action: PayloadAction<any>) => {
      state.createStockTransferLoading = false;
      state.StockTransferStatus = null;
      state.error = action.payload;
    },
    StatusStockTransferSucceeded: (state, action: PayloadAction<any>) => {
      state.createStockTransferLoading = false;
      state.StockTransferStatus = action.payload;
      state.error = null;
    },
  },
});

export const {
  loadStockTransferRequested,
  loadStockTransferSucceeded,
  loadStockTransferFailed,
  loadOneStockTransferRequested,
  loadOneStockTransferSucceeded,
  loadOneStockTransferFailed,
  loadFilterStockTransferFailed,
  loadFilterStockTransferSucceeded,
  loadFilterStockTransferRequested,
  createStockTransferRequested,
  createStockTransferSucceeded,
  createStockTransfereFailed,
  updateStockTransfereRequested,
  updateStockTransfereSucceeded,
  updateStockTransfereFailed,
  StatusStockTransferSucceeded,
  StatusStockTransferFailed,
  StatusStockTransferRequested,
  loadStockTransferReportRequested,
  loadStockTransferReportSucceeded,
  loadStockTransferReportFailed
} = stockTransferSlice.actions;

export default stockTransferSlice.reducer;
