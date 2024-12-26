import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    mediaLoading: false,
    error: null,
    medias: [],
    media:null,
    updatedMedia: null,
    filterSocialMedia:[],
    
    
    
  };

  const socialMediaSlice = createSlice({
    name: "socialMedia",
    initialState,
    reducers: {
      loadSocialMediasRequested: (state) => {
        state.mediaLoading = true;
        state.medias = [];
        state.error = null;
      },
      loadSocialMediasSucceeded: (state, action: PayloadAction<any>) => {
        state.mediaLoading = false;
        state.medias = action.payload;
        state.error = null;
      },
      loadSocialMediasFailed: (state, action: PayloadAction<any>) => {
        state.mediaLoading = false;
        state.medias = [];
        state.error = action.payload;
      },
      loadOneSocialMediaRequested: (state, action: PayloadAction<{ id: any }>) => {
        state.mediaLoading = true;
        state.media = null;
        state.error = null;
      },
      loadOneSocialMediaSucceeded: (state, action: PayloadAction<any>) => {
        state.mediaLoading = false;
        state.media = action.payload;
        state.error = null;
      },
      loadOneSocialMediaFailed: (state, action: PayloadAction<any>) => {
        state.mediaLoading = false;
        state.media = null;
        state.error = action.payload;
      },
  
      updateSocialMediaRequested: (
        state,
        action: PayloadAction<{ id: number; values: any }>
      ) => {
        state.mediaLoading = true;
        state.updatedMedia = null;
        state.error = null;
      },
      updateSocialMediaSucceeded: (state, action: PayloadAction<any>) => {
        state.mediaLoading = false;
        state.updatedMedia= action.payload;
        state.error = null;
      },
      updateSocialMediaFailed: (state, action: PayloadAction<any>) => {
        state.mediaLoading = false;
        state.updatedMedia = null;
        state.error = action.payload;
      },

      loadFiltereSocialMediaRequested: (
        state,
        action: PayloadAction<{
          pageSize: number;
          pageCount: number;
          // isActive: boolean;
          // warrantyName: string;
        }>
      ) => {
        state.mediaLoading = true;
        state.filterSocialMedia = [];
        state.error = null;
      },
  
      loadFiltereSocialMediaSucceeded: (state, action: PayloadAction<any>) => {
        state.mediaLoading = false;
        state.filterSocialMedia = action.payload;
        state.error = null;
      },
      loadFiltereSocialMediaFailed: (state, action: PayloadAction<any>) => {
        state.mediaLoading = false;
        state.filterSocialMedia = [];
        state.error = action.payload;
      },
  
    },
});

export const {
    loadSocialMediasRequested,
    loadSocialMediasSucceeded,
    loadSocialMediasFailed,
    loadOneSocialMediaRequested,
    loadOneSocialMediaSucceeded,
    loadOneSocialMediaFailed,
    updateSocialMediaRequested,
    updateSocialMediaSucceeded,
    updateSocialMediaFailed,
   loadFiltereSocialMediaFailed,
   loadFiltereSocialMediaRequested,
   loadFiltereSocialMediaSucceeded
 
} = socialMediaSlice.actions;

export default socialMediaSlice.reducer;