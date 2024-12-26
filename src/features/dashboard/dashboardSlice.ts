import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  dashboard: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    loadDashboardRequested(state) {
      state.loading = true;
      state.dashboard = null;
      state.error = null;
    },
    loadDashboardSucceeded(state, action: PayloadAction<any>) {
      state.loading = false;
      state.dashboard = action.payload;
      state.error = null;
    },
    loadDashboardFailed(state, action: PayloadAction<any>) {
      state.loading = false;
      state.dashboard = null;
      state.error = action.payload;
    },
  },
});

export const {
  loadDashboardRequested,
  loadDashboardSucceeded,
  loadDashboardFailed,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
