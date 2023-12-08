import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { APIUser } from '@/apis';

export const fetchGetAllUser = createAsyncThunk('fetch/getAllUser', APIUser.getAllUser);

const initialState = {
  message: '',
  status: 'idle',
  shouldFetchLatestAllUser: false,
  data: [],
};

export const usersSlice = createSlice({
  name: 'fetchAllUser',
  initialState,
  reducers: {
    // Action
    toggleFetchLatestAllUser: (state) => {
      state.shouldFetchLatestAllUser = !state.shouldFetchLatestAllUser;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetAllUser.pending, (state) => {
      state.status = 'loading';
      state.message = '';
    });

    builder.addCase(fetchGetAllUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = '';
      state.data = action.payload;
    });

    builder.addCase(fetchGetAllUser.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.error.message;
    });
  },
});

export const selectUser = (state) => state.fetchAllUser;
export const userReducer = usersSlice.reducer;
export const { toggleFetchLatestAllUser } = usersSlice.actions;
