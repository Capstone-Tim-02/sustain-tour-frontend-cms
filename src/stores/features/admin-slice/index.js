import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { APIAdmin } from '@/apis';

export const fetchGetAllAdmin = createAsyncThunk('fetch/getAllAdmin', APIAdmin.getAllAdmin);

const initialState = {
  message: '',
  status: 'idle',
  shouldFetchLatestAllAdmin: false,
  data: [],
};

export const adminsSlice = createSlice({
  name: 'fetchAllAdmin',
  initialState,
  reducers: {
    // Action
    toggleFetchLatestAllAdmin: (state) => {
      state.shouldFetchLatestAllAdmin = !state.shouldFetchLatestAllAdmin;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetAllAdmin.pending, (state) => {
      state.status = 'loading';
      state.message = '';
    });

    builder.addCase(fetchGetAllAdmin.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = '';
      state.data = action.payload;
    });

    builder.addCase(fetchGetAllAdmin.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.error.message;
    });
  },
});

export const selectAdmin = (state) => state.fetchAllAdmin;
export const adminReducer = adminsSlice.reducer;
export const { toggleFetchLatestAllAdmin } = adminsSlice.actions;
