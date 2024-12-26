import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  roleLoading: false,
  error: null,
  roles: [],
  rolesFilter: {},
  filterShopProductSearch: [],
  createdRole: null,
  updatedRole: null,
  archivedRole: null,
  updateRole: null,
  updatedDiscountFileExcel: null,
  onerole: <any>{},
};

const RoleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    loadRoleRequested: (state) => {
      state.roleLoading = true;
      state.roles = [];
      state.error = null;
    },
    loadRoleSucceeded: (state, action: PayloadAction<any>) => {
      state.roleLoading = false;
      state.roles = action.payload;
      state.error = null;
    },
    loadRoleFailed: (state, action: PayloadAction<any>) => {
      state.roleLoading = false;
      state.roles = [];
      state.error = action.payload;
    },
    loadoneroleFailed: (state, action: PayloadAction<any>) => {
      state.roleLoading = false;
      state.onerole = [];
      state.error = action.payload;
    },
    loadoneroleRequested: (state) => {
      state.roleLoading = true;
      state.onerole = {};
      state.error = null;
    },
    loadoneroleSucceeded: (state, action: PayloadAction<any>) => {
      state.roleLoading = false;
      state.onerole = action.payload;
      state.error = null;
    },
    createRoleRequested: (state, action: PayloadAction<any>) => {
      state.roleLoading = true;
      state.createdRole = null;
      state.error = null;
    },
    createRoleSucceeded: (state, action: PayloadAction<any>) => {
      state.roleLoading = false;
      state.createdRole = action.payload;
      state.error = null;
    },
    createRoleFailed: (state, action: PayloadAction<any>) => {
      state.roleLoading = false;
      state.createdRole = null;
      state.error = action.payload;
    },

    loadFilterRolesRequested: (
      state,
      action: PayloadAction<{
        pageSize: number;
        pageCount: number;
        isActive: boolean;
      }>
    ) => {
      state.roleLoading = true;
      state.rolesFilter = {};
      state.error = null;
    },
    loadFilterRolesSucceeded: (state, action: PayloadAction<any>) => {
      state.roleLoading = false;
      state.rolesFilter = action.payload;
      state.error = null;
    },
    loadFilterRolesFailed: (state, action: PayloadAction<any>) => {
      state.roleLoading = false;
      state.rolesFilter = {};
      state.error = action.payload;
    },
   
  },
});

export const {
  loadRoleRequested,
  loadRoleFailed,
  loadRoleSucceeded,
  loadFilterRolesFailed,
  loadFilterRolesRequested,
  loadFilterRolesSucceeded,
  createRoleFailed,
  createRoleRequested,
  createRoleSucceeded,
  loadoneroleFailed,
  loadoneroleRequested,
  loadoneroleSucceeded,
} = RoleSlice.actions;

export default RoleSlice.reducer;
