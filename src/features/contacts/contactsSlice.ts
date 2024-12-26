import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  conLoading: false,
  error: null,
  customers: [],
  contactById: [],
  suppliers: [],
  filersuppliers: [],
  exportPdf: [],
  exportExcel: [],
  contactFilter: [],
  customersGroups: [],
  createdCustomer: null,
  createdSupplier: null,
  updatedContact: null,
  archivedContact: null,
  updatedFileExcel: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    loadRequested: (state) => {
      state.conLoading = true;
      state.customers = [];
      state.suppliers = [];
      // state.customersGroups=[];
      state.error = null;
    },
    loadByIdRequested: (state, action: PayloadAction<{ id: any }>) => {
      state.conLoading = true;
      state.contactById = [];
      state.error = null;
    },

    loadByIdFailed: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.contactById = [];
      state.error = action.payload;
    },
    loadByIdSucceeded: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.contactById = action.payload;
      state.error = null;
    },

    loadFilterSuppilerRequested: (
      state,
      action: PayloadAction<{ pageSize?: number;
        pageCount?: number;contactType?:string, customerGroupName?: string; isActive?: boolean }>
    ) => {
      state.conLoading = true;
      state.customers = [];
      state.contactFilter = [];
      state.error = null;
    },


    loadFilterSuppilerSucceeded: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.contactFilter = action.payload;
      state.error = null;
    },
    loadFilterSuppilerFailed: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.contactFilter = [];
      state.error = action.payload;
    },
    loadFailed: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.customers = [];
      state.error = action.payload;
    },
    loadCustomersSucceeded: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.customers = action.payload;
      state.error = null;
    },
    createCustomerRequested: (state, action: PayloadAction<any>) => {
      state.conLoading = true;
      state.createdCustomer = null;
      state.error = null;
    },
    createFailed: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.createdCustomer = null;
      state.error = action.payload;
    },
    createCustomerSucceeded: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.createdCustomer = action.payload;
      state.error = null;
    },
    updateRequested: (
      state,
      action: PayloadAction<{ id: number; values: any }>
    ) => {
      state.conLoading = true;
      state.updatedContact = null;
      state.error = null;
    },
    updateFailed: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.updatedContact = null;
      state.error = action.payload;
    },
    updateSucceeded: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.updatedContact = action.payload;
      state.error = null;
    },

    loadSuppliersSucceeded: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.suppliers = action.payload;
      state.error = null;
    },
    createSupplierRequested: (state, action: PayloadAction<any>) => {
      state.conLoading = true;
      state.createdSupplier = null;
      state.error = null;
    },

    createSupplierSucceeded: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.createdSupplier = action.payload;
      state.error = null;
    },
    archiveRequested: (state, action: PayloadAction<{ id: number }>) => {
      state.conLoading = true;
      state.archivedContact = null;
      state.error = null;
    },
    archiveSucceeded: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.archivedContact = action.payload;
      state.error = null;
    },

    archiveFailed: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.archivedContact = null;
      state.error = action.payload;
    },

    loadRequestedPdf: (state) => {
      state.conLoading = true;
      state.exportPdf = [];
      state.error = null;
    },
    loadPdfSucceeded: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.exportPdf = action.payload;
      state.error = null;
    },
    loadPdfFailed: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.exportPdf = [];
      state.error = action.payload;
    },
    loadRequestedExcel: (state) => {
      state.conLoading = true;
      state.exportExcel = [];
      state.error = null;
    },
    loadExcelSucceeded: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.exportExcel = action.payload;
      state.error = null;
    },
    loadExcelFailed: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.exportExcel = [];
      state.error = action.payload;
    },
    uploadExcelRequestedFile: (state, action: PayloadAction<any>) => {
      state.conLoading = true;
      state.updatedFileExcel = null;
      state.error = null;
    },
    uploadExcelFileFailed: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.updatedFileExcel = null;
      state.error = action.payload;
    },
    uploadExcelFileSucceeded: (state, action: PayloadAction<any>) => {
      state.conLoading = false;
      state.updatedFileExcel = action.payload;
      state.error = null;
    },
  },
});

export const {
  loadRequested,
  loadFailed,
  loadCustomersSucceeded,
  createCustomerRequested,
  createFailed,
  createCustomerSucceeded,
  updateFailed,
  updateSucceeded,
  loadSuppliersSucceeded,
  createSupplierRequested,
  createSupplierSucceeded,
  updateRequested,
  archiveRequested,
  archiveSucceeded,
  archiveFailed,
  loadRequestedPdf,
  loadPdfFailed,
  loadPdfSucceeded,
  loadRequestedExcel,
  loadExcelFailed,
  loadExcelSucceeded,
  uploadExcelRequestedFile,
  loadFilterSuppilerRequested,
  uploadExcelFileFailed,
  uploadExcelFileSucceeded,
  loadByIdRequested,
  loadByIdSucceeded,
  loadByIdFailed,
  loadFilterSuppilerFailed,
  loadFilterSuppilerSucceeded
} = contactSlice.actions;

export default contactSlice.reducer;
