import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  cityLoading: false,
  error: null,
  cities: [],
  citiesFilter:{},
  createdCity: null,
  updatedCity: null,
  archivedCity: null,
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    loadCitiesRequested: (state) => {
      state.cityLoading = true;
      state.cities = [];
      state.error = null;
    },
    loadCitiesSucceeded: (state, action: PayloadAction<any>) => {
      state.cityLoading = false;
      state.cities = action.payload;
      state.error = null;
    },
    loadCitiesFailed: (state, action: PayloadAction<any>) => {
      state.cityLoading = false;
      state.cities = [];
      state.error = action.payload;
    },
    createCityRequested: (state) => {
      state.cityLoading = true;
      state.createdCity = null;
      state.error = null;
    },
    createCitySucceeded: (state, action: PayloadAction<any>) => {
      state.cityLoading = false;
      state.createdCity = action.payload;
      state.error = null;
    },
    createCityFailed: (state, action: PayloadAction<any>) => {
      state.cityLoading = false;
      state.createdCity = null;
      state.error = action.payload;
    },
    updateCityRequested: (
      state,
      action: PayloadAction<{ name: string; id: number }>
    ) => {
      state.cityLoading = true;
      state.updatedCity = null;
      state.error = null;
    },
    updateCitySucceeded: (state, action: PayloadAction<any>) => {
      state.cityLoading = false;
      state.updatedCity = action.payload;
      state.error = null;
    },
    updateCityFailed: (state, action: PayloadAction<any>) => {
      state.cityLoading = false;
      state.updatedCity = null;
      state.error = action.payload;
    },
    archiveCityRequested: (state, action: PayloadAction<{ id: number }>) => {
      state.cityLoading = true;
      state.archivedCity = null;
      state.error = null;
    },
    archiveCitySucceeded: (state, action: PayloadAction<any>) => {
      state.cityLoading = false;
      state.archivedCity = action.payload;
      state.error = null;
    },
    archiveCityFailed: (state, action: PayloadAction<any>) => {
      state.cityLoading = false;
      state.archivedCity = null;
      state.error = action.payload;
    },

    loadFilterCitiesRequested: (     state,
      action: PayloadAction<{   pageSize: number;
        pageCount: number; isActive: boolean; }>
    ) => {
      state.cityLoading = true;
      state.citiesFilter = {};
      state.error = null;
    },
    loadFilterCitiesSucceeded: (state, action: PayloadAction<any>) => {
      state.cityLoading = false;
      state.citiesFilter = action.payload;
      state.error = null;
    },
    loadFilterCitiesFailed: (state, action: PayloadAction<any>) => {
      state.cityLoading = false;
      state.citiesFilter = {};
      state.error = action.payload;
    },
  },
});

export const {
  loadCitiesRequested,
  loadCitiesSucceeded,
  loadCitiesFailed,
  createCityRequested,
  createCitySucceeded,
  createCityFailed,
  updateCityRequested,
  updateCitySucceeded,
  updateCityFailed,
  archiveCityRequested,
  archiveCitySucceeded,
  archiveCityFailed,
  loadFilterCitiesFailed,
  loadFilterCitiesSucceeded,
  loadFilterCitiesRequested
} = citySlice.actions;

export default citySlice.reducer;
