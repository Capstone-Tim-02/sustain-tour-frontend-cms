import { configureStore } from '@reduxjs/toolkit';

import tnc from '@/stores/features/TncSlice';
import users from '@/stores/features/UsersSlice';

const store = configureStore({
  reducer: {
    users,
    tnc,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
