import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  warrantyLoading: false,
  error: null,
  warranties: [],
  warrantiesName: [],
  filterWarranty: [],

  createdWarranty: null,
  updatedWarranty: null,
  archivedWarranty: null,
};

const warrantySlice = createSlice({
  name: 'warranty',
  initialState,
  reducers: {
    loadWarrantiesRequested: (state) => {
      state.warrantyLoading = true;
      state.warranties = [];
      state.error = null;
    },
    loadWarrantiesNameRequested: (state) => {
      state.warrantyLoading = true;
      state.warrantiesName = [];
      state.error = null;
    },
    // loadFilterWarrantiesRequested: (     state,
    //   action: PayloadAction<{ isActive: boolean; warrantyName:string;}>
    // ) => {
    //   state.warrantyLoading = true;
    //   state.warranties = [];
    //   state.error = null;
    // },
    loadWarrantiesFailed: (state, action: PayloadAction<any>) => {
      state.warrantyLoading = false;
      state.warranties = [];
      state.error = action.payload;
    },
    loadWarrantiesSucceeded: (state, action: PayloadAction<any>) => {
      state.warrantyLoading = false;
      state.warranties = action.payload;
      state.error = null;
    },
    loadWarrantiesNameSucceeded: (state, action: PayloadAction<any>) => {
      state.warrantyLoading = false;
      state.warrantiesName = action.payload;
      state.error = null;
    },

    loadWarrantyNameFailed: (state, action: PayloadAction<any>) => {
      state.warrantyLoading = false;
      state.warrantiesName = [];
      state.error = action.payload;
    },

    createWarrantyRequested: (state, action: PayloadAction<any>) => {
      state.warrantyLoading = true;
      state.createdWarranty = null;
      state.error = null;
    },
    createWarrantyFailed: (state, action: PayloadAction<any>) => {
      state.warrantyLoading = false;
      state.createdWarranty = null;
      state.error = action.payload;
    },
    createWarrantySucceeded: (state, action: PayloadAction<any>) => {
      state.warrantyLoading = false;
      state.createdWarranty = action.payload;
      state.error = null;
    },
    updateWarrantyRequested: (
      state,
      action: PayloadAction<{ id: number; values: any }>
    ) => {
      state.warrantyLoading = true;
      state.updatedWarranty = null;
      state.error = null;
    },
    updateWarrantyFailed: (state, action: PayloadAction<any>) => {
      state.warrantyLoading = false;
      state.updatedWarranty = null;
      state.error = action.payload;
    },
    updateWarrantySucceeded: (state, action: PayloadAction<any>) => {
      state.warrantyLoading = false;
      state.updatedWarranty = action.payload;
      state.error = null;
    },
    archiveWarrantyRequested: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      state.warrantyLoading = true;
      state.archivedWarranty = null;
      state.error = null;
    },
    archiveWarrantyFailed: (state, action: PayloadAction<any>) => {
      state.warrantyLoading = false;
      state.archivedWarranty = null;
      state.error = action.payload;
    },
    archiveWarrantySucceeded: (state, action: PayloadAction<any>) => {
      state.warrantyLoading = false;
      state.archivedWarranty = action.payload;
      state.error = null;
    },

    loadFiltereWarrantyRequested: (
      state,
      action: PayloadAction<{
        pageSize: number;
        pageCount: number;
        isActive: boolean;
        warrantyName: string;
      }>
    ) => {
      state.warrantyLoading = true;
      state.filterWarranty = [];
      state.error = null;
    },

    loadFiltereWarrantySucceeded: (state, action: PayloadAction<any>) => {
      state.warrantyLoading = false;
      state.filterWarranty = action.payload;
      state.error = null;
    },
    loadFiltereWarrantyFailed: (state, action: PayloadAction<any>) => {
      state.warrantyLoading = false;
      state.filterWarranty = [];
      state.error = action.payload;
    },
  },
});

export const {
  loadWarrantiesRequested,
  loadWarrantiesFailed,
  loadWarrantiesSucceeded,
  createWarrantyRequested,
  createWarrantyFailed,
  createWarrantySucceeded,
  updateWarrantyRequested,
  updateWarrantyFailed,
  updateWarrantySucceeded,
  archiveWarrantyRequested,
  archiveWarrantyFailed,
  archiveWarrantySucceeded,
  loadWarrantiesNameSucceeded,
  loadWarrantyNameFailed,
  loadWarrantiesNameRequested,
  loadFiltereWarrantyFailed,
  loadFiltereWarrantyRequested,
  loadFiltereWarrantySucceeded,
} = warrantySlice.actions;

export default warrantySlice.reducer;
