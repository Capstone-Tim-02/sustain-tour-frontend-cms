import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { APICategories } from '@/apis/APICategories';

export const fetchGetCategories = createAsyncThunk(
  'fetch/getCategories',
  APICategories.getCategories
);

const initialState = {
  message: '',
  status: 'idle',
  shouldFetchLatestCategories: false,
  data: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // Action
    toggleFetchLatestCategories: (state) => {
      state.shouldFetchLatestCategories = !state.shouldFetchLatestCategories;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetCategories.pending, (state) => {
      state.status = 'loading';
      state.message = '';
    });
    builder.addCase(fetchGetCategories.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = '';
      state.data = action.payload;
    });

    builder.addCase(fetchGetCategories.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.error.message;
    });
  },
});

export const selectCategories = (state) => state.categories;

export default categoriesSlice.reducer;

export const { toggleFetchLatestCategories } = categoriesSlice.actions;
