import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  promotionLoading: false,
  error: null,
  promotions: [],
  filterPromotion: [],
  createdPromotion: null,
  updatedpromotion: null,
  onePromotion: <any>{},
  archivedPromotion: null,


  //promotion:{},
  //updatedPromotion: null,
};

const promotionSlice = createSlice({
  name: "promotion",
  initialState,
  reducers: {
    loadPromotionsRequested: (state) => {
      state.promotionLoading = true;
      state.promotions = [];
      state.error = null;
    },
    loadPromotionsSucceeded: (state, action: PayloadAction<any>) => {
      state.promotionLoading = false;
      state.promotions = action.payload;
      state.error = null;
    },
    loadPromotionsFailed: (state, action: PayloadAction<any>) => {
      state.promotionLoading = false;
      state.promotions = [];
      state.error = action.payload;
    },

    loadOnePromotionFailed: (state, action: PayloadAction<any>) => {
      state.promotionLoading = false;
      state.onePromotion = [];
      state.error = action.payload;
    },
    loadOnePromotionRequested: (state) => {
      state.promotionLoading = true;
      state.onePromotion = {};
      state.error = null;
    },
    loadOnePromotionSucceeded: (state, action: PayloadAction<any>) => {
      state.promotionLoading = false;
      state.onePromotion = action.payload;
      state.error = null;
    },
    createPromotionRequested: (state, action: PayloadAction<any>) => {
      state.promotionLoading = true;
      state.createdPromotion = null;
      state.error = null;
    },
    createPromotionSucceeded: (state, action: PayloadAction<any>) => {
      state.promotionLoading = false;
      state.createdPromotion = action.payload;
      state.error = null;
    },
    createPromotionFailed: (state, action: PayloadAction<any>) => {
      state.promotionLoading = false;
      state.createdPromotion = null;
      state.error = action.payload;
    },
    loadFilterPromotionRequested: (
      state,
      action: PayloadAction<{
        pageSize: number;
        pageCount: number;
        isActive: boolean;
        warrantyName: string;
      }>
    ) => {
      state.promotionLoading = true;
      state.filterPromotion = [];
      state.error = null;
    },

    loadFilterePromotionSucceeded: (state, action: PayloadAction<any>) => {
      state.promotionLoading = false;
      state.filterPromotion = action.payload;
      state.error = null;
    },
    loadFilterePromotionFailed: (state, action: PayloadAction<any>) => {
      state.promotionLoading = false;
      state.filterPromotion = [];
      state.error = action.payload;
    },

    updatePromotionRequested: (state, action: PayloadAction<{ id: number; values: any }>) => {
      state.promotionLoading = true;
      state.updatedpromotion = null;
      state.error = null;
    },
    updatePromotionSucceeded: (state, action: PayloadAction<any>) => {
      state.promotionLoading = false;
      state.updatedpromotion = action.payload;
      state.error = null;
    },
    updatePromotionFailed: (state, action: PayloadAction<any>) => {
      state.promotionLoading = false;
      state.updatedpromotion = null;
      state.error = action.payload;
    },

    archivePromotionRequested: (state, action: PayloadAction<any>) => {
      state.promotionLoading = true;
      state.archivedPromotion = null;
      state.error = null;
    },
    archivePromotionSucceeded: (state, action: PayloadAction<any>) => {
      state.promotionLoading = false;
      state.archivedPromotion = action.payload;
      state.error = null;
    },
    archivePromotionFailed: (state, action: PayloadAction<any>) => {
      state.promotionLoading = false;
      state.archivedPromotion = null;
      state.error = action.payload;
    },

  },
});

export const {
  loadPromotionsRequested,
  loadPromotionsSucceeded,
  loadPromotionsFailed,
  createPromotionRequested,
  createPromotionSucceeded,
  createPromotionFailed,
  loadFilterPromotionRequested,
  loadFilterePromotionFailed,
  loadFilterePromotionSucceeded,
  loadOnePromotionFailed,
  loadOnePromotionRequested,
  loadOnePromotionSucceeded,
  updatePromotionFailed,updatePromotionRequested,updatePromotionSucceeded,
  archivePromotionFailed,archivePromotionRequested,archivePromotionSucceeded
} = promotionSlice.actions;

export default promotionSlice.reducer;
