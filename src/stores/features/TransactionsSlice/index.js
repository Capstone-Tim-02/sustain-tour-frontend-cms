import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { APITransactions } from '@/apis/APITransactions';

export const fetchGetTransactions = createAsyncThunk(
  'fetch/getTransactions',
  APITransactions.getTransactions
);

const initialState = {
  message: '',
  status: 'idle',
  shouldFetchLatestTransactions: false,
  data: [],
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    // Action
    toggleFetchLatestTransactions: (state) => {
      state.shouldFetchLatestTransactions = !state.shouldFetchLatestTransactions;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetTransactions.pending, (state) => {
      state.status = 'loading';
      state.message = '';
    });

    builder.addCase(fetchGetTransactions.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = '';
      state.data = action.payload;
    });

    builder.addCase(fetchGetTransactions.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.error.message;
    });
  },
});

export const selectTransactions = (state) => state.transactions;

export default transactionsSlice.reducer;

export const { toggleFetchLatestTransactions } = transactionsSlice.actions;
