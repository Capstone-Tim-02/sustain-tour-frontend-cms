import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { APIPromo } from '@/apis/APIPromo';

export const fetchGetPromo = createAsyncThunk('fetch/getPromos', APIPromo.getPromo);

const initialState = {
  message: '',
  status: 'idle',
  shouldFetchLatestPromo: false,
  data: [],
};

export const PromoSlice = createSlice({
  name: 'promos',
  initialState,
  reducers: {
    // Action
    toggleFetchLatestPromo: (state) => {
      state.shouldFetchLatestPromo = !state.shouldFetchLatestPromo;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetPromo.pending, (state) => {
      state.status = 'loading';
      state.message = '';
    });

    builder.addCase(fetchGetPromo.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = '';
      state.data = action.payload;
    });

    builder.addCase(fetchGetPromo.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.error.message;
    });
  },
});

export const selectPromo = (state) => state.promos;

export default PromoSlice.reducer;

export const { toggleFetchLatestPromo } = PromoSlice.actions;
