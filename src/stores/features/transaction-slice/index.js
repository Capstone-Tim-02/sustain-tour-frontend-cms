import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { APITransaction } from '@/apis';

export const fetchGetAllTransaction = createAsyncThunk(
  'fetch/getAllTransaction',
  APITransaction.getAllTransaction
);

const initialState = {
  message: '',
  status: 'idle',
  shouldFetchLatestAllTransaction: false,
  data: [],
};

export const transactionsSlice = createSlice({
  name: 'fetchAllTransaction',
  initialState,
  reducers: {
    // Action
    toggleFetchLatestAllTransaction: (state) => {
      state.shouldFetchLatestAllTransaction = !state.shouldFetchLatestAllTransaction;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetAllTransaction.pending, (state) => {
      state.status = 'loading';
      state.message = '';
    });

    builder.addCase(fetchGetAllTransaction.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = '';
      state.data = action.payload;
    });

    builder.addCase(fetchGetAllTransaction.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.error.message;
    });
  },
});

export const selectTransaction = (state) => state.fetchAllTransaction;
export const transactionReducer = transactionsSlice.reducer;
export const { toggleFetchLatestAllTransaction } = transactionsSlice.actions;
