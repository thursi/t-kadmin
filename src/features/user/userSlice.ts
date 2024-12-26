import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  userLoading: false,
  error: null,
  users: [],
  usersFilter:{},
  createdUser: null,
  updatedUser: null,
  archivedUser: null,
  updateUser: null,
  oneusers: <any>{},

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUsersRequested: (state) => {
      state.userLoading = true;
      state.users = [];
      state.error = null;
    },
    loadUsersSucceeded: (state, action: PayloadAction<any>) => {
      state.userLoading = false;
      state.users = action.payload;
      state.error = null;
    },
    loadUsersFailed: (state, action: PayloadAction<any>) => {
      state.userLoading = false;
      state.users = [];
      state.error = action.payload;
    },
   

    loadFilterUsersRequested: (     state,
      action: PayloadAction<{   pageSize: number;
        pageCount: number; isActive?: boolean; }>
    ) => {
      state.userLoading = true;
      state.usersFilter = {};
      state.error = null;
    },
    loadFilterUsersSucceeded: (state, action: PayloadAction<any>) => {
      state.userLoading = false;
      state.usersFilter = action.payload;
      state.error = null;
    },
    loadFilterUsersFailed: (state, action: PayloadAction<any>) => {
      state.userLoading = false;
      state.usersFilter = {};
      state.error = action.payload;
    },
   

    updateUserRequested: (state, action: PayloadAction<any>) => {
      state.userLoading = true;
      state.updateUser = null;
      state.error = null;
    },
    updateUserSucceeded: (state, action: PayloadAction<any>) => {
      state.userLoading = false;
      state.updateUser = action.payload;
      state.error = null;
    },
    updateUserFailed: (state, action: PayloadAction<any>) => {
      state.userLoading = false;
      state.updateUser = null;
      state.error = action.payload;
    },

   
  },
});

export const {
loadUsersFailed,
loadUsersRequested,
loadUsersSucceeded,
loadFilterUsersFailed,
loadFilterUsersRequested,
loadFilterUsersSucceeded,
updateUserFailed,
updateUserRequested,
updateUserSucceeded,

} = userSlice.actions;

export default userSlice.reducer;