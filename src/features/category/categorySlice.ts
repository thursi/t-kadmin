import { act } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  catLoading: false,
  error: null,
  categories: [],
  category: {},
  parentsubcategory: [],
  subcategories: [],
  createdCategory: null,
  updateImagedCategory: null,
  updatedCategory: null,
  archivedCategory: null,
  filterCategory: <any>{},

};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    loadCategoriesRequested: (state) => {
      state.catLoading = true;
      state.categories = [];
      state.error = null;
    },
    loadCategoriesFailed: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.categories = [];
      state.error = action.payload;
    },
    loadCategoriesSucceeded: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.categories = action.payload;
      state.error = null;
    },
    loadSubCategoriesRequested: (state) => {
      state.catLoading = true;
      state.subcategories = [];
      state.error = null;
    },
    loadSubCategoriesFailed: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.subcategories = [];
      state.error = action.payload;
    },
    loadSubCategoriesSucceeded: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.subcategories = action.payload;
      state.error = null;
    },
    loadParentCategoryRequested: (state, action: PayloadAction<any>) => {
      state.catLoading = true;
      state.categories = [];
      state.error = null;
    },
    loadParentCategoryFailed: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.categories = [];
      state.error = action.payload;
    },
    loadParentCategorySucceeded: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.categories = action.payload;
      state.error = null;
    },
    createCategoryRequested: (state, action: PayloadAction<any>) => {
      state.catLoading = true;
      state.createdCategory = null;
      state.error = null;
    },
    createCategoryFailed: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.createdCategory = null;
      state.error = action.payload;
    },
    createCategorySucceeded: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.createdCategory = action.payload;
      state.error = null;
    },
    updateCategoryRequested: (
      state,
      action: PayloadAction<{ id: number; values: any }>
    ) => {
      state.catLoading = true;
      state.updatedCategory = null;
      state.error = null;
    },
    updateCategoryFailed: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.updatedCategory = null;
      state.error = action.payload;
    },
    updateCategorySucceeded: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.updatedCategory = action.payload;
      state.error = null;
    },
    archiveCategoryRequested: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      state.catLoading = true;
      state.archivedCategory = null;
      state.error = null;
    },
    archiveCategoryFailed: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.archivedCategory = null;
      state.error = action.payload;
    },
    archiveCategorySucceeded: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.archivedCategory = action.payload;
      state.error = null;
    },
    loadOneCategoryRequested: (state, action: PayloadAction<any>) => {
      state.catLoading = true;
      state.category = {};
      state.error = null;
    },
    loadOneCategoryFailed: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.category = {};
      state.error = action.payload;
    },
    loadOneCategorySucceeded: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.category = action.payload;
      state.error = null;
    },


    loadOneParentSubCategoryRequested: (state, action: PayloadAction<{id: number}>) => {
      state.catLoading = true;
      state.parentsubcategory = [];
      state.error = null;
    },
    loadOneParentSubCategoryFailed: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.parentsubcategory = [];
      state.error = action.payload;
    },
    loadOneParentSubCategorySucceeded: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.parentsubcategory = action.payload;
      state.error = null;
    },




    loadCategoryFilterRequested: (
      state,
      action: PayloadAction<{
        featuredCategory?: string;
        pageSize: number;
        pageCount: number

      }>
    ) => {
      state.catLoading = true;
      state.filterCategory = {};
      state.error = null;
    },
    loadCategoryFilterSucceeded: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.filterCategory = action.payload;
      state.error = null;
    },
    loadCategoryFilterFailed: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.filterCategory = {};
      state.error = action.payload;
    },

    updateImageCategoryRequested: (state, action: PayloadAction<any>) => {
      state.catLoading = true;
      state.updateImagedCategory = null;
      state.error = null;
    },
    updateImageCategoryFailed: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.updateImagedCategory = null;
      state.error = action.payload;
    },
    updateImageCategorySucceeded: (state, action: PayloadAction<any>) => {
      state.catLoading = false;
      state.updateImagedCategory = action.payload;
      state.error = null;
    },
  },
});

export const {
  loadCategoriesRequested,
  loadCategoriesFailed,
  loadCategoriesSucceeded,
  loadSubCategoriesRequested,
  loadSubCategoriesFailed,
  loadSubCategoriesSucceeded,
  createCategoryRequested,
  createCategoryFailed,
  createCategorySucceeded,
  updateCategoryRequested,
  updateCategoryFailed,
  updateCategorySucceeded,
  archiveCategoryRequested,
  archiveCategoryFailed,
  archiveCategorySucceeded,
  loadParentCategoryRequested,
  loadParentCategoryFailed,
  loadParentCategorySucceeded,
  loadOneCategoryRequested,
  loadOneCategoryFailed,
  loadOneCategorySucceeded,
  loadCategoryFilterFailed,
  loadCategoryFilterRequested,
  loadCategoryFilterSucceeded,
  loadOneParentSubCategoryFailed,
  loadOneParentSubCategoryRequested,
  loadOneParentSubCategorySucceeded,
  updateImageCategoryFailed,
  updateImageCategoryRequested,
  updateImageCategorySucceeded
} = categorySlice.actions;

export default categorySlice.reducer;
