import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { APITnc } from '@/apis';

export const fetchGetAllTnc = createAsyncThunk('fetch/getAllTnc', APITnc.getAllTnc);

const initialState = {
  message: '',
  status: 'idle',
  shouldFetchLatestAllTnc: false,
  data: [],
};

export const tncSlice = createSlice({
  name: 'fetchAllTnc',
  initialState,
  reducers: {
    // Action
    toggleFetchLatestAllTnc: (state) => {
      state.shouldFetchLatestAllTnc = !state.shouldFetchLatestAllTnc;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetAllTnc.pending, (state) => {
      state.status = 'loading';
      state.message = '';
    });

    builder.addCase(fetchGetAllTnc.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = '';
      state.data = action.payload;
    });

    builder.addCase(fetchGetAllTnc.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.error.message;
    });
  },
});

export const selectTnc = (state) => state.fetchAllTnc;
export const tncReducer = tncSlice.reducer;
export const { toggleFetchLatestAllTnc } = tncSlice.actions;
