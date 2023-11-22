import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { APIDestinations } from '@/apis/APIDestinations';

export const fetchGetDestinations = createAsyncThunk(
  'fetch/getDestinations',
  APIDestinations.getDestinations
);

const initialState = {
  message: '',
  status: 'idle',
  shouldFetchLatestDestinations: false,
  data: [],
};

export const destinationsSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {
    // Action
    toggleFetchLatestDestinations: (state) => {
      state.shouldFetchLatestDestinations = !state.shouldFetchLatestDestinations;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetDestinations.pending, (state) => {
      state.status = 'loading';
      state.message = '';
    });

    builder.addCase(fetchGetDestinations.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = '';
      state.data = action.payload;
    });

    builder.addCase(fetchGetDestinations.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.error.message;
    });
  },
});

export const selectDestinations = (state) => state.destinations;

export default destinationsSlice.reducer;

export const { toggleFetchLatestDestinations } = destinationsSlice.actions;
