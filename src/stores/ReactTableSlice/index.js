import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchGlobal: '',
  pageIndex: 0,
  pageSize: 10,
};

export const reactTableSlice = createSlice({
  name: 'reactTable',
  initialState,
  reducers: {
    // Action
    setQuerySearchGlobal: (state, action) => {
      state.searchGlobal = action.payload;
    },
    setQueryPageIndex: (state, action) => {
      state.pageIndex = action.payload;
    },
    setQueryPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    clearQuery: () => initialState,
  },
});

export const { setQuerySearchGlobal, setQueryPageIndex, setQueryPageSize, clearQuery } =
  reactTableSlice.actions;

export const selectReactTable = (state) => state.reactTable;

export default reactTableSlice.reducer;
