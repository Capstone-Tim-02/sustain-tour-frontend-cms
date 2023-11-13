import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { APIUsers } from '@/apis/APIUsers';

export const fetchGetUsers = createAsyncThunk('fetch/getUsers', APIUsers.getUsers);

const initialState = {
  message: '',
  status: 'idle',
  shouldFetchLatestUsers: false,
  data: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Action
    toggleFetchLatestUsers: (state) => {
      state.shouldFetchLatestUsers = !state.shouldFetchLatestUsers;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetUsers.pending, (state) => {
      state.status = 'loading';
      state.message = '';
    });

    builder.addCase(fetchGetUsers.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = '';
      state.data = action.payload;
    });

    builder.addCase(fetchGetUsers.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.error.message;
    });
  },
});

export const selectUsers = (state) => state.users;

export default usersSlice.reducer;

export const { toggleFetchLatestUsers } = usersSlice.actions;
