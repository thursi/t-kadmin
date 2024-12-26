import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  unitLoading: false,
  error: null,
  units: [],
  createdUnit: null,
  updatedUnit: null,
  archivedUnit: null,
  filterUnit: <any>{},
};

const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    loadUnitsRequested: (state) => {
      state.unitLoading = true;
      state.units = [];
      state.error = null;
    },
    loadUnitsFailed: (state, action: PayloadAction<any>) => {
      state.unitLoading = false;
      state.units = [];
      state.error = action.payload;
    },
    loadUnitsSucceeded: (state, action: PayloadAction<any>) => {
      state.unitLoading = false;
      state.units = action.payload;
      state.error = null;
    },
    createUnitRequested: (state, action: PayloadAction<any>) => {
      state.unitLoading = true;
      state.createdUnit = null;
      state.error = null;
    },
    createUnitFailed: (state, action: PayloadAction<any>) => {
      state.unitLoading = false;
      state.createdUnit = null;
      state.error = action.payload;
    },
    createUnitSucceeded: (state, action: PayloadAction<any>) => {
      state.unitLoading = false;
      state.createdUnit = action.payload;
      state.error = null;
    },
    updateUnitRequested: (
      state,
      action: PayloadAction<{ id: number; values: any }>
    ) => {
      state.unitLoading = true;
      state.updatedUnit = null;
      state.error = null;
    },
    updateUnitFailed: (state, action: PayloadAction<any>) => {
      state.unitLoading = false;
      state.updatedUnit = null;
      state.error = action.payload;
    },
    updateUnitSucceeded: (state, action: PayloadAction<any>) => {
      state.unitLoading = false;
      state.updatedUnit = action.payload;
      state.error = null;
    },
    archiveUnitRequested: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      state.unitLoading = true;
      state.archivedUnit = null;
      state.error = null;
    },
    archiveUnitFailed: (state, action: PayloadAction<any>) => {
      state.unitLoading = false;
      state.archivedUnit = null;
      state.error = action.payload;
    },
    archiveUnitSucceeded: (state, action: PayloadAction<any>) => {
      state.unitLoading = false;
      state.archivedUnit = action.payload;
      state.error = null;
    },
    loadUnitFilterRequested: (
      state,
      action: PayloadAction<{
        uniCode?:string;
        unitName?:string;
        // unitId?: any;
        pageSize: number;
        pageCount: number

      }>
    ) => {
      state.unitLoading = true;
      state.filterUnit = {};
      state.error = null;
    },
    loadUnitFilterSucceeded: (state, action: PayloadAction<any>) => {
      state.unitLoading = false;
      state.filterUnit = action.payload;
      state.error = null;
    },
    loadUnitFilterFailed: (state, action: PayloadAction<any>) => {
      state.unitLoading = false;
      state.filterUnit = {};
      state.error = action.payload;
    },
  },
});

export const {
  loadUnitsRequested,
  loadUnitsFailed,
  loadUnitsSucceeded,
  createUnitRequested,
  createUnitFailed,
  createUnitSucceeded,
  updateUnitRequested,
  updateUnitFailed,
  updateUnitSucceeded,
  archiveUnitRequested,
  archiveUnitFailed,
  archiveUnitSucceeded,
  loadUnitFilterFailed,
  loadUnitFilterRequested,
  loadUnitFilterSucceeded
} = unitSlice.actions;

export default unitSlice.reducer;