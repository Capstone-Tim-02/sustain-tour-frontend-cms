import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { APIPromo } from '@/apis';

export const fetchGetAllPromo = createAsyncThunk('fetch/getAllPromo', APIPromo.getAllPromo);

const initialState = {
  message: '',
  status: 'idle',
  shouldFetchLatestAllPromo: false,
  data: [],
};

export const PromoSlice = createSlice({
  name: 'fetchAllPromo',
  initialState,
  reducers: {
    // Action
    toggleFetchLatestAllPromo: (state) => {
      state.shouldFetchLatestAllPromo = !state.shouldFetchLatestAllPromo;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetAllPromo.pending, (state) => {
      state.status = 'loading';
      state.message = '';
    });

    builder.addCase(fetchGetAllPromo.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = '';
      state.data = action.payload;
    });

    builder.addCase(fetchGetAllPromo.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.error.message;
    });
  },
});

export const selectPromo = (state) => state.fetchAllPromo;
export const promoReducer = PromoSlice.reducer;
export const { toggleFetchLatestAllPromo } = PromoSlice.actions;
