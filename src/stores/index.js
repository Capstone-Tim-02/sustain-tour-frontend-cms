import { configureStore } from '@reduxjs/toolkit';

import tnc from '@/stores/features/TncSlice';
import transactions from '@/stores/features/TransactionsSlice';
import users from '@/stores/features/UsersSlice';

const store = configureStore({
  reducer: {
    users,
    tnc,
    transactions,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
