import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  productLoading: false,
  error: null,
  products: [],
  product: <any>{},
  // filterProduct: <any>{},
  filterProduct: {},

  createdProduct: null,
  updatedProduct: null,
  archivedProduct: null,
  stockchange: null,
  productImage: null,
  updatedFileExcel: null,
  updateImagedProduct: null,
  exportPdf: [],
  exportExcel: [],
  searchedProduct: [],
  productSearchLoading: false,
  productImages: [],
  searchProductImages: null,
  editproductImages: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    loadProductsRequested: (state) => {
      state.productLoading = true;
      state.products = [];
      state.error = null;
    },
    loadProductsSucceeded: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.products = action.payload;
      state.error = null;
    },
    loadProductsFailed: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.products = [];
      state.error = action.payload;
    },
    loadOneProductsRequested: (state) => {
      state.productLoading = true;
      state.product = {};
      state.error = null;
    },
    loadOneProductsSucceeded: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.product = action.payload;
      state.error = null;
    },
    createProductRequested: (state, action: PayloadAction<any>) => {
      state.productLoading = true;
      state.createdProduct = null;
      state.error = null;
    },
    createProductSucceeded: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.createdProduct = action.payload;
      state.error = null;
    },
    createProductFailed: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.createdProduct = null;
      state.error = action.payload;
    },
    updateProductRequested: (
      state,
      action: PayloadAction<{ id: number; values: any }>
    ) => {
      state.productLoading = true;
      state.updatedProduct = null;
      state.error = null;
    },
    updateProductSucceeded: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.updatedProduct = action.payload;
      state.error = null;
    },
    updateProductFailed: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.updatedProduct = null;
      state.error = action.payload;
    },
    archiveProductRequested: (state, action: PayloadAction<any>) => {
      state.productLoading = true;
      state.archivedProduct = null;
      state.error = null;
    },
    archiveProductSucceeded: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.archivedProduct = action.payload;
      state.error = null;
    },
    archiveProductFailed: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.archivedProduct = null;
      state.error = action.payload;
    },
    stockchangeProductRequested: (state, action: PayloadAction<any>) => {
      state.productLoading = true;
      state.stockchange = null;
      state.error = null;
    },
    stockchangeProductSucceeded: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.stockchange = action.payload;
      state.error = null;
    },
    stockchangeProductFailed: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.stockchange = null;
      state.error = action.payload;
    },
    storeProductImageRequested: (
      state,
      action: PayloadAction<{ id: number; image: any }>
    ) => {
      state.productLoading = true;
      state.productImage = null;
      state.error = null;
    },
    storeProductImageSucceeded: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.productImage = action.payload;
      state.error = null;
    },
    storeProductImageFailed: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.productImage = null;
      state.error = action.payload;
    },
    loadProductRequestedPdf: (state) => {
      state.productLoading = true;
      state.exportPdf = [];
      state.error = null;
    },
    loadProductPdfSucceeded: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.exportPdf = action.payload;
      state.error = null;
    },
    loadProductPdfFailed: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.exportPdf = [];
      state.error = action.payload;
    },
    loadProductRequestedExcel: (state) => {
      state.productLoading = true;
      state.exportExcel = [];
      state.error = null;
    },
    loadProductExcelSucceeded: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.exportExcel = action.payload;
      state.error = null;
    },
    loadProductExcelFailed: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.exportExcel = [];
      state.error = action.payload;
    },
    uploadExcelProRequestedFile: (state, action: PayloadAction<any>) => {
      state.productLoading = true;
      state.updatedFileExcel = null;
      state.error = null;
    },
    uploadExcelProFileFailed: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.updatedFileExcel = null;
      state.error = action.payload;
    },
    uploadExcelProFileSucceeded: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.updatedFileExcel = action.payload;
      state.error = null;
    },

    productSearch: (state, action: PayloadAction<any>) => {
      state.productSearchLoading = true;
      state.searchedProduct = [];
      state.error = null;
    },
    ProductSearchSuceeded: (state, action: PayloadAction<any>) => {
      state.productSearchLoading = false;
      state.searchedProduct = action.payload;
      state.error = null;
    },
    loadProductImagesRequested: (
      state,
      action: PayloadAction<{ name: string }>
    ) => {
      state.productLoading = true;
      state.productImages = [];
      state.error = null;
    },
    loadProductImagesSucceeded: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.productImages = action.payload;
      state.error = null;
    },
    loadProductImagesFailed: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.productImages = [];
      state.error = action.payload;
    },



    loadProductFilterRequested: (
      state,
      action: PayloadAction<{
        unitId?: any;
        pageSize: number;
        pageCount: number;
      }>
    ) => {
      state.productLoading = true;
      state.filterProduct = {};
      state.error = null;
    },
    loadProductFilterSucceeded: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.filterProduct = action.payload;
      state.error = null;
    },
    loadProductFilterFailed: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.filterProduct = {};
      state.error = action.payload;
    },
    loadProductSearchRequested: (
      state,
      action: PayloadAction<{
        unitId?: any;
        pageSize: number;
        pageCount: number;
      }>
    ) => {
      state.productLoading = true;
      state.filterProduct = {};
      state.error = null;
    },
    loadProductSearchSucceeded: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.filterProduct = action.payload;
      state.error = null;
    },
    loadProductSearchFailed: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.filterProduct = {};
      state.error = action.payload;
    },

    updateImageProductRequested: (state, action: PayloadAction<any>) => {
      state.productLoading = true;
      state.updateImagedProduct = null;
      state.error = null;
    },
    updateImageProductFailed: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.updateImagedProduct = null;
      state.error = action.payload;
    },
    updateImageProductSucceeded: (state, action: PayloadAction<any>) => {
      state.productLoading = false;
      state.updateImagedProduct = action.payload;
      state.error = null;
    },
  },
});

export const {
  loadProductsRequested,
  loadProductsSucceeded,
  loadProductsFailed,
  createProductRequested,
  createProductSucceeded,
  createProductFailed,
  updateProductRequested,
  updateProductSucceeded,
  updateProductFailed,
  archiveProductRequested,
  archiveProductSucceeded,
  archiveProductFailed,
  storeProductImageRequested,
  storeProductImageSucceeded,
  storeProductImageFailed,
  loadProductRequestedPdf,
  loadProductPdfFailed,
  loadProductPdfSucceeded,
  loadProductRequestedExcel,
  loadProductExcelFailed,
  loadProductExcelSucceeded,
  uploadExcelProRequestedFile,
  uploadExcelProFileFailed,
  uploadExcelProFileSucceeded,
  loadOneProductsRequested,
  loadOneProductsSucceeded,
  ProductSearchSuceeded,
  productSearch,
  loadProductImagesRequested,
  loadProductImagesSucceeded,
  loadProductImagesFailed,
  loadProductFilterRequested,
  loadProductFilterSucceeded,
  loadProductFilterFailed,
  loadProductSearchRequested,
  loadProductSearchSucceeded,
  loadProductSearchFailed,
  stockchangeProductFailed,
  stockchangeProductRequested,
  stockchangeProductSucceeded,
  updateImageProductFailed,
  updateImageProductRequested,
  updateImageProductSucceeded
} = productSlice.actions;

export default productSlice.reducer;
