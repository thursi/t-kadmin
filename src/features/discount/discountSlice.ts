import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  discountLoading: false,
  error: null,
  discounts: [],
  discountsFilter:{},
  filterShopProductSearch:[],
  createdDiscount: null,
  updatedCity: null,
  archivedCity: null,
  updatediscount: null,
  updatedDiscountFileExcel: null,
  onediscounts: <any>{},

};

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    loadDiscountsRequested: (state) => {
      state.discountLoading = true;
      state.discounts = [];
      state.error = null;
    },
    loadDiscountsSucceeded: (state, action: PayloadAction<any>) => {
      state.discountLoading = false;
      state.discounts = action.payload;
      state.error = null;
    },
    loadDiscountsFailed: (state, action: PayloadAction<any>) => {
      state.discountLoading = false;
      state.discounts = [];
      state.error = action.payload;
    },
    loadOneDiscountsFailed: (state, action: PayloadAction<any>) => {
      state.discountLoading = false;
      state.onediscounts = [];
      state.error = action.payload;
    },
    loadOneDiscountsRequested: (state) => {
      state.discountLoading = true;
      state.onediscounts = {};
      state.error = null;
    },
    loadOneDiscountsSucceeded: (state, action: PayloadAction<any>) => {
      state.discountLoading = false;
      state.onediscounts = action.payload;
      state.error = null;
    },
    createDiscountRequested: (state, action: PayloadAction<any>) => {
      state.discountLoading = true;
      state.createdDiscount = null;
      state.error = null;
    },
    createDiscountSucceeded: (state, action: PayloadAction<any>) => {
      state.discountLoading = false;
      state.createdDiscount = action.payload;
      state.error = null;
    },
    createDiscountFailed: (state, action: PayloadAction<any>) => {
      state.discountLoading = false;
      state.createdDiscount = null;
      state.error = action.payload;
    },
    // updateCityRequested: (
    //   state,
    //   action: PayloadAction<{ name: string; id: number }>
    // ) => {
    //   state.discountLoading = true;
    //   state.updatedCity = null;
    //   state.error = null;
    // },
    // updateCitySucceeded: (state, action: PayloadAction<any>) => {
    //   state.discountLoading = false;
    //   state.updatedCity = action.payload;
    //   state.error = null;
    // },
    // updateCityFailed: (state, action: PayloadAction<any>) => {
    //   state.discountLoading = false;
    //   state.updatedCity = null;
    //   state.error = action.payload;
    // },
    // archiveCityRequested: (state, action: PayloadAction<{ id: number }>) => {
    //   state.discountLoading = true;
    //   state.archivedCity = null;
    //   state.error = null;
    // },
    // archiveCitySucceeded: (state, action: PayloadAction<any>) => {
    //   state.discountLoading = false;
    //   state.archivedCity = action.payload;
    //   state.error = null;
    // },
    // archiveCityFailed: (state, action: PayloadAction<any>) => {
    //   state.discountLoading = false;
    //   state.archivedCity = null;
    //   state.error = action.payload;
    // },

    loadFilterDiscountsRequested: (     state,
      action: PayloadAction<{   pageSize: number;
        pageCount: number; isActive: boolean; }>
    ) => {
      state.discountLoading = true;
      state.discountsFilter = {};
      state.error = null;
    },
    loadFilterDiscountsSucceeded: (state, action: PayloadAction<any>) => {
      state.discountLoading = false;
      state.discountsFilter = action.payload;
      state.error = null;
    },
    loadFilterDiscountsFailed: (state, action: PayloadAction<any>) => {
      state.discountLoading = false;
      state.discountsFilter = {};
      state.error = action.payload;
    },
    loadShopProductSearchFilterSucceeded: (state, action: PayloadAction<any>) => {
      state.discountLoading = false;
      state.filterShopProductSearch = action.payload;
      state.error = null;
    },
    loadShopProductSearchFilterFailed: (state, action: PayloadAction<any>) => {
      state.discountLoading = false;
      state.filterShopProductSearch = [];
      state.error = action.payload;
    },
    loadShopProductSearchFilterRequested: (
      state,
      action: PayloadAction<any>
    ) => {
      state.discountLoading = true;
      state.filterShopProductSearch = [];
      state.error = null;
    },

    updateDiscountRequested: (state, action: PayloadAction<any>) => {
      state.discountLoading = true;
      state.updatediscount = null;
      state.error = null;
    },
    updateDiscountSucceeded: (state, action: PayloadAction<any>) => {
      state.discountLoading = false;
      state.updatediscount = action.payload;
      state.error = null;
    },
    updateDiscountFailed: (state, action: PayloadAction<any>) => {
      state.discountLoading = false;
      state.updatediscount = null;
      state.error = action.payload;
    },

    uploadExcelDiscountRequestedFile: (state, action: PayloadAction<any>) => {
      state.discountLoading = true;
      state.updatedDiscountFileExcel = null;
      state.error = null;
    },
    uploadExcelDiscountFileFailed: (state, action: PayloadAction<any>) => {
      state.discountLoading = false;
      state.updatedDiscountFileExcel = null;
      state.error = action.payload;
    },
    uploadExcelDiscountFileSucceeded: (state, action: PayloadAction<any>) => {
      state.discountLoading = false;
      state.updatedDiscountFileExcel = action.payload;
      state.error = null;
    },
  },
});

export const {
loadDiscountsFailed,
loadDiscountsRequested,
loadDiscountsSucceeded,
loadFilterDiscountsFailed,
loadFilterDiscountsRequested,
loadFilterDiscountsSucceeded,
createDiscountFailed,
createDiscountRequested,
createDiscountSucceeded,
loadShopProductSearchFilterFailed,
loadShopProductSearchFilterRequested,
loadShopProductSearchFilterSucceeded,
loadOneDiscountsFailed,
loadOneDiscountsRequested,
loadOneDiscountsSucceeded,
updateDiscountFailed,
updateDiscountRequested,
updateDiscountSucceeded,
uploadExcelDiscountFileFailed,
uploadExcelDiscountFileSucceeded,
uploadExcelDiscountRequestedFile,

} = discountSlice.actions;

export default discountSlice.reducer;