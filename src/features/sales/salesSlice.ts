import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  saleLoading: false,
  error: null,
  sales: [],
  salesFilter: [],
  salesStatus: null,
  sale: {},
  //   citiesFilter: [],
  //   createdSale: null,
  //   updatedSale: null,
  //   archivedSale: null,
  //   updateSale: null,
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    loadSalesRequested: (state) => {
      state.saleLoading = true;
      state.sales = [];
      state.error = null;
    },

    loadSalesSuccessed: (state, action: PayloadAction<any>) => {
      state.saleLoading = false;
      state.sales = action.payload;
      state.error = null;
    },
    loadSalesFailed: (state, action: PayloadAction<any>) => {
      state.saleLoading = false;
      state.sales = [];
      state.error = action.payload;
    },
    loadFilterSalesRequested: (
      state,
      action: PayloadAction<{
        pageSize: number;
        pageCount: number;
        customerId: string;
        businessLocationId: string;
        paymentGatewayStatus: string;
        orderDate: string;
        paymentType: string;
      }>
    ) => {
      state.saleLoading = true;
      state.sales = [];
      state.error = null;
    },

    loadFilterSalesSucceeded: (state, action: PayloadAction<any>) => {
      state.saleLoading = false;
      state.salesFilter = action.payload;
      state.error = null;
    },
    loadFilterSalesFailed: (state, action: PayloadAction<any>) => {
      state.saleLoading = false;
      state.salesFilter = [];
      state.error = action.payload;
    },

    loadOneSaleRequested: (state, action: PayloadAction<{ id: any }>) => {
      state.saleLoading = true;
      state.sale = {};
      state.error = null;
    },
    loadOneSaleSucceeded: (state, action: PayloadAction<any>) => {
      state.saleLoading = false;
      state.sale = action.payload;
      state.error = null;
    },
    loadOneSaleFailed: (state, action: PayloadAction<any>) => {
      state.saleLoading = false;
      state.sale = {};
      state.error = action.payload;
    },
    statusSalesChangeRequested: (
      state,
      action: PayloadAction<{ id: number; status?: string }>
    ) => {
      state.saleLoading = true;
      state.salesStatus = null;
      state.error = null;
    },
    statusSalesChangeSucceeded: (state, action: PayloadAction<any>) => {
      state.saleLoading = false;
      state.salesStatus = action.payload;
      state.error = null;
    },
    statusSalesChangeFailed: (state, action: PayloadAction<any>) => {
      state.saleLoading = false;
      state.salesStatus = null;
      state.error = action.payload;
    },
  },
});

export const {
  loadSalesFailed,
  loadSalesSuccessed,
  loadSalesRequested,
  loadFilterSalesRequested,
  statusSalesChangeRequested,
  statusSalesChangeSucceeded,
  statusSalesChangeFailed,
  loadOneSaleRequested,
  loadOneSaleSucceeded,
  loadOneSaleFailed,
  loadFilterSalesSucceeded,
  loadFilterSalesFailed,
} = salesSlice.actions;

export default salesSlice.reducer;
