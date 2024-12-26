import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  catLoading: false,
  error: null,
  categoriesTax: [],
  createdCategoryTax: null,
  updatedCategoryTax: null,
  archivedCategoryTax: null,
  filterCategoryTax: [],
};

const categoryTaxSlice = createSlice({
  name: 'categoryTax',
  initialState,
  reducers: {
    loadCategoriesTaxRequested: (state) => {
      state.catLoading = true;
      state.categoriesTax = [];
      state.error = null;
    },
    loadFilterCategoriesTaxRequested: (
      state,
      action: PayloadAction<{
        pageSize: number;
        pageCount: number;
        categoryId: string;
        taxId: string;
      }>
    ) => {
      state.catLoading = true;
      state.filterCategoryTax = [];
      state.error = null;
    },

    loadFilterCategoriesTaxSucceeded: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.filterCategoryTax = action.payload;
      state.error = null;
    },
    loadFilterCategoriesTaxFailed: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.filterCategoryTax = [];
      state.error = action.payload;
    },

    loadCategoriesTaxFailed: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.categoriesTax = [];
      state.error = action.payload;
    },
    loadcategoriesTaxSucceeded: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.categoriesTax = action.payload;
      state.error = null;
    },
    createCategoryTaxRequested: (state, action: PayloadAction<any>) => {
      state.catLoading = true;
      state.createdCategoryTax = null;
      state.error = null;
    },
    createCategoryTaxFailed: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.createdCategoryTax = null;
      state.error = action.payload;
    },
    createCategoryTaxSucceeded: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.createdCategoryTax = action.payload;
      state.error = null;
    },
    updateCategoryTaxRequested: (
      state,
      action: PayloadAction<{ id: number; values: any }>
    ) => {
      state.catLoading = true;
      state.updatedCategoryTax = null;
      state.error = null;
    },
    updateCategoryTaxFailed: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.updatedCategoryTax = null;
      state.error = action.payload;
    },
    updateCategoryTaxSucceeded: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.updatedCategoryTax = action.payload;
      state.error = null;
    },
    archiveCategoryTaxRequested: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      state.catLoading = true;
      state.archivedCategoryTax = null;
      state.error = null;
    },
    archiveCategoryTaxFailed: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.archivedCategoryTax = null;
      state.error = action.payload;
    },
    archiveCategoryTaxSucceeded: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.archivedCategoryTax = action.payload;
      state.error = null;
    },
  },
});

export const {
  loadCategoriesTaxRequested,
  loadCategoriesTaxFailed,
  loadcategoriesTaxSucceeded,
  createCategoryTaxRequested,
  createCategoryTaxFailed,
  createCategoryTaxSucceeded,
  updateCategoryTaxRequested,
  updateCategoryTaxFailed,
  updateCategoryTaxSucceeded,
  archiveCategoryTaxRequested,
  archiveCategoryTaxFailed,
  archiveCategoryTaxSucceeded,
  loadFilterCategoriesTaxRequested,
  loadFilterCategoriesTaxFailed,
  loadFilterCategoriesTaxSucceeded,
} = categoryTaxSlice.actions;

export default categoryTaxSlice.reducer;
