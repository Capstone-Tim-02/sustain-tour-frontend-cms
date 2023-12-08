import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { APIDestination } from '@/apis';

export const fetchgetAllDestination = createAsyncThunk(
  'fetch/getAllDestination',
  APIDestination.getAllDestination
);

const initialState = {
  message: '',
  status: 'idle',
  shouldFetchLatestAllDestination: false,
  data: [],
};

export const destinationsSlice = createSlice({
  name: 'fetchAllDestination',
  initialState,
  reducers: {
    // Action
    toggleFetchLatestAllDestination: (state) => {
      state.shouldFetchLatestAllDestination = !state.shouldFetchLatestAllDestination;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchgetAllDestination.pending, (state) => {
      state.status = 'loading';
      state.message = '';
    });

    builder.addCase(fetchgetAllDestination.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = '';
      state.data = action.payload;
    });

    builder.addCase(fetchgetAllDestination.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.error.message;
    });
  },
});

export const selectDestination = (state) => state.fetchAllDestination;
export const destinationReducer = destinationsSlice.reducer;
export const { toggleFetchLatestAllDestination } = destinationsSlice.actions;
