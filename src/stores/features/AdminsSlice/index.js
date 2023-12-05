import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { APIAdmin } from '@/apis/APIAdmin';

export const fetchGetAdmins = createAsyncThunk('fetch/getAdmins', APIAdmin.getAdmins);

const initialState = {
  message: '',
  status: 'idle',
  shouldFetchLatestAdmins: false,
  data: [],
};

export const adminsSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {
    // Action
    toggleFetchLatestAdmins: (state) => {
      state.shouldFetchLatestAdmins = !state.shouldFetchLatestAdmins;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetAdmins.pending, (state) => {
      state.status = 'loading';
      state.message = '';
    });

    builder.addCase(fetchGetAdmins.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = '';
      state.data = action.payload;
    });

    builder.addCase(fetchGetAdmins.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.error.message;
    });
  },
});

export const selectAdmins = (state) => state.admins;

export default adminsSlice.reducer;

export const { toggleFetchLatestAdmins } = adminsSlice.actions;
