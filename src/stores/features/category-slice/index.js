import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { APICategory } from '@/apis';

export const fetchGetAllCategory = createAsyncThunk(
  'fetch/getAllCategory',
  APICategory.getAllCategory
);

const initialState = {
  message: '',
  status: 'idle',
  shouldFetchLatestAllCategory: false,
  data: [],
};

export const categoriesSlice = createSlice({
  name: 'fetchAllCategory',
  initialState,
  reducers: {
    // Action
    toggleFetchLatestAllCategory: (state) => {
      state.shouldFetchLatestAllCategory = !state.shouldFetchLatestAllCategory;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetAllCategory.pending, (state) => {
      state.status = 'loading';
      state.message = '';
    });
    builder.addCase(fetchGetAllCategory.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = '';
      state.data = action.payload;
    });

    builder.addCase(fetchGetAllCategory.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.error.message;
    });
  },
});

export const selectCategory = (state) => state.fetchAllCategory;
export const categoryReducer = categoriesSlice.reducer;
export const { toggleFetchLatestAllCategory } = categoriesSlice.actions;
