import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  variationLoading: false,
  error: null,
  variations: [],
  variationValues:[],
  filterVariation:[],

  createdVariation: null,
  updatedVariation: null,
  archivedVariation: null,
};

const variationSlice = createSlice({
  name: "variation",
  initialState,
  reducers: {
    loadVariationsRequested: (state) => {
      state.variationLoading = true;
      state.variations = [];
      state.error = null;
    },
    loadVariationsFailed: (state, action: PayloadAction<any>) => {
      state.variationLoading = false;
      state.variations = [];
      state.error = action.payload;
    },
    loadVariationsSucceeded: (state, action: PayloadAction<any>) => {
      state.variationLoading = false;
      state.variations = action.payload;
      state.error = null;
    },
    createVariationRequested: (state, action: PayloadAction<any>) => {
      state.variationLoading = true;
      state.createdVariation = null;
      state.error = null;
    },
    createVariationFailed: (state, action: PayloadAction<any>) => {
      state.variationLoading = false;
      state.createdVariation = null;
      state.error = action.payload;
    },
    createVariationSucceeded: (state, action: PayloadAction<any>) => {
      state.variationLoading = false;
      state.createdVariation = action.payload;
      state.error = null;
    },
    updateVariationRequested: (
      state,
      action: PayloadAction<{ id: number; values: any }>
    ) => {
      state.variationLoading = true;
      state.updatedVariation = null;
      state.error = null;
    },
    updateVariationFailed: (state, action: PayloadAction<any>) => {
      state.variationLoading = false;
      state.updatedVariation = null;
      state.error = action.payload;
    },
    updateVariationSucceeded: (state, action: PayloadAction<any>) => {
      state.variationLoading = false;
      state.updatedVariation = action.payload;
      state.error = null;
    },
    archiveVariationRequested: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      state.variationLoading = true;
      state.archivedVariation = null;
      state.error = null;
    },
    archiveVariationFailed: (state, action: PayloadAction<any>) => {
      state.variationLoading = false;
      state.archivedVariation = null;
      state.error = action.payload;
    },
    archiveVariationSucceeded: (state, action: PayloadAction<any>) => {
      state.variationLoading = false;
      state.archivedVariation = action.payload;
      state.error = null;
    },
    loadVariationValuesRequested: (
      state,
      action: PayloadAction<{ id: number}>
    ) => {
      state.variationValues = [];
      state.error = null;
      state.variationLoading = true;
    },
    loadVariationValuesFailed: (state, action: PayloadAction<any>) => {
      state.variationValues = [];
      state.error = action.payload;
      state.variationLoading = false;
    },
    loadVariationValuesSucceeded: (state, action: PayloadAction<any>) => {
      state.variationValues = action.payload;
      state.error = null;
      state.variationLoading = false;
    },

    loadFiltereVariationRequested: (
      state,
      action: PayloadAction<{
        pageSize: number;
        pageCount: number;
        isActive: boolean;
        warrantyName: string;
      }>
    ) => {
      state.variationLoading = true;
      state.filterVariation = [];
      state.error = null;
    },

    loadFiltereVariationSucceeded: (state, action: PayloadAction<any>) => {
      state.variationLoading = false;
      state.filterVariation = action.payload;
      state.error = null;
    },
    loadFiltereVariationFailed: (state, action: PayloadAction<any>) => {
      state.variationLoading = false;
      state.filterVariation = [];
      state.error = action.payload;
    },
  },
});

export const {
  loadVariationsRequested,
  loadVariationsFailed,
  loadVariationsSucceeded,
  createVariationRequested,
  createVariationFailed,
  createVariationSucceeded,
  updateVariationRequested,
  updateVariationFailed,
  updateVariationSucceeded,
  archiveVariationRequested,
  archiveVariationFailed,
  archiveVariationSucceeded,
  loadVariationValuesRequested,
  loadVariationValuesFailed,
  loadVariationValuesSucceeded,
  loadFiltereVariationRequested,
  loadFiltereVariationFailed,
  loadFiltereVariationSucceeded
} = variationSlice.actions;

export default variationSlice.reducer;
