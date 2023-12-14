import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { APIAuth } from '@/apis';

export const fetchGetCurrentUser = createAsyncThunk('fetch/getCurrentUser', APIAuth.getCurrentUser);

const initialState = {
  message: '',
  status: 'idle',
  shouldFetchLatestCurrentUser: false,
  data: {},
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    // Action
    toggleFetchLatestCurrentUser: (state) => {
      state.shouldFetchLatestCurrentUser = !state.shouldFetchLatestCurrentUser;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetCurrentUser.pending, (state) => {
      state.status = 'loading';
      state.message = '';
    });

    builder.addCase(fetchGetCurrentUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = '';
      state.data = action?.payload?.profile;
    });

    builder.addCase(fetchGetCurrentUser.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.error.message;
    });
  },
});

export const selectCurrentUser = (state) => state.currentUser;
export const currentUserReducer = currentUserSlice.reducer;
export const { toggleFetchLatestCurrentUser } = currentUserSlice.actions;
