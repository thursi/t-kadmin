import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  businessLocationLoading: false,
  error: null,
  businessLocations: [],
  filterBusLoction: [],
  createdBusinessLocation: null,
  updatedBusinessLocation: null,
  updateddayAllocation: null,
  archivedBusinessLocation: null,
  updatedShopFileExcel: null,

};

const businessLocationSlice = createSlice({
  name: "businessLocation",
  initialState,
  reducers: {
    loadBusinessLocationsRequested: (state) => {
      state.businessLocationLoading = true;
      state.businessLocations = [];
      state.error = null;
    },
    loadBusinessLocationsSucceeded: (state, action: PayloadAction<any>) => {
      state.businessLocationLoading = false;
      state.businessLocations = action.payload;
      state.error = null;
    },
    loadBusinessLocationsFailed: (state, action: PayloadAction<any>) => {
      state.businessLocationLoading = false;
      state.businessLocations = [];
      state.error = action.payload;
    },
    createBusinessLocationRequested: (state) => {
      state.businessLocationLoading = true;
      state.createdBusinessLocation = null;
      state.error = null;
    },
    createBusinessLocationSucceeded: (state, action: PayloadAction<any>) => {
      state.businessLocationLoading = false;
      state.createdBusinessLocation = action.payload;
      state.error = null;
    },
    createBusinessLocationFailed: (state, action: PayloadAction<any>) => {
      state.businessLocationLoading = false;
      state.createdBusinessLocation = null;
      state.error = action.payload;
    },
    updateBusinessLocationRequested: (
      state,
      action: PayloadAction<{ name: string; id: number }>
    ) => {
      state.businessLocationLoading = true;
      state.updatedBusinessLocation = null;
      state.error = null;
    },
    updateBusinessLocationSucceeded: (state, action: PayloadAction<any>) => {
      state.businessLocationLoading = false;
      state.updatedBusinessLocation = action.payload;
      state.error = null;
    },
    updateBusinessLocationFailed: (state, action: PayloadAction<any>) => {
      state.businessLocationLoading = false;
      state.updatedBusinessLocation = null;
      state.error = action.payload;
    },
    updateBusinessLocationdayAllocationRequested: (
      state,
      action: PayloadAction<any>
    ) => {
      state.businessLocationLoading = true;
      state.updateddayAllocation = null;
      state.error = null;
    },
    updateBusinessLocationdayAllocationSucceeded: (state, action: PayloadAction<any>) => {
      state.businessLocationLoading = false;
      state.updateddayAllocation = action.payload;
      state.error = null;
    },
    updateBusinessLocationdayAllocationFailed: (state, action: PayloadAction<any>) => {
      state.businessLocationLoading = false;
      state.updateddayAllocation = null;
      state.error = action.payload;
    },
    archiveBusinessLocationRequested: (state, action: PayloadAction<{ id: number }>) => {
      state.businessLocationLoading = true;
      state.archivedBusinessLocation = null;
      state.error = null;
    },
    archiveBusinessLocationSucceeded: (state, action: PayloadAction<any>) => {
      state.businessLocationLoading = false;
      state.archivedBusinessLocation = action.payload;
      state.error = null;
    },
    archiveBusinessLocationFailed: (state, action: PayloadAction<any>) => {
      state.businessLocationLoading = false;
      state.archivedBusinessLocation = null;
      state.error = action.payload;
    },
    loadFiltereBusLoctionRequested: (
      state,
      action: PayloadAction<{
        pageSize: number;
        pageCount: number;
        isActive: boolean;
        businessName: string;
      }>
    ) => {
      state.businessLocationLoading = true;
      state.filterBusLoction = [];
      state.error = null;
    },

    loadFiltereBusLoctionSucceeded: (state, action: PayloadAction<any>) => {
      state.businessLocationLoading = false;
      state.filterBusLoction = action.payload;
      state.error = null;
    },
    loadFiltereBusLoctionFailed: (state, action: PayloadAction<any>) => {
      state.businessLocationLoading = false;
      state.filterBusLoction = [];
      state.error = action.payload;
    },



    uploadExcelShopRequestedFile: (state, action: PayloadAction<any>) => {
      state.businessLocationLoading = true;
      state.updatedShopFileExcel = null;
      state.error = null;
    },
    uploadExcelShopFileFailed: (state, action: PayloadAction<any>) => {
      state.businessLocationLoading = false;
      state.updatedShopFileExcel = null;
      state.error = action.payload;
    },
    uploadExcelShopFileSucceeded: (state, action: PayloadAction<any>) => {
      state.businessLocationLoading = false;
      state.updatedShopFileExcel = action.payload;
      state.error = null;
    },
    


  },
});

export const {
  loadBusinessLocationsRequested,
  loadBusinessLocationsSucceeded,
  loadBusinessLocationsFailed,
  createBusinessLocationRequested,
  createBusinessLocationSucceeded,
  createBusinessLocationFailed,
  updateBusinessLocationRequested,
  updateBusinessLocationSucceeded,
  updateBusinessLocationFailed,
  archiveBusinessLocationRequested,
  archiveBusinessLocationSucceeded,
  archiveBusinessLocationFailed,
  loadFiltereBusLoctionFailed,
  loadFiltereBusLoctionRequested,
  loadFiltereBusLoctionSucceeded,
  updateBusinessLocationdayAllocationFailed,
  updateBusinessLocationdayAllocationRequested,
  updateBusinessLocationdayAllocationSucceeded,
  uploadExcelShopFileFailed,
  uploadExcelShopFileSucceeded,
  uploadExcelShopRequestedFile
} = businessLocationSlice.actions;

export default businessLocationSlice.reducer;
