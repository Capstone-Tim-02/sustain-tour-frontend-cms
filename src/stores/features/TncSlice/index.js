import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { APITnc } from '@/apis/APITnc';

export const fetchGetTnc = createAsyncThunk('fetch/getTnc', APITnc.getTnc);

const initialState = {
  message: '',
  status: 'idle',
  shouldFetchLatestTnc: false,
  data: [],
};

export const tncSlice = createSlice({
  name: 'tnc',
  initialState,
  reducers: {
    // Action
    toggleFetchLatestTnc: (state) => {
      state.shouldFetchLatestTnc = !state.shouldFetchLatestTnc;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetTnc.pending, (state) => {
      state.status = 'loading';
      state.message = '';
    });

    builder.addCase(fetchGetTnc.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = '';
      state.data = action.payload;
    });

    builder.addCase(fetchGetTnc.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.error.message;
    });
  },
});

export const selectTnc = (state) => state.tnc;

export default tncSlice.reducer;

export const { toggleFetchLatestTnc } = tncSlice.actions;
