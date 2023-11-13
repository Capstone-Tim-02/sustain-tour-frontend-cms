import { configureStore } from '@reduxjs/toolkit';

import users from '@/stores/features/UsersSlice';

const store = configureStore({
  reducer: {
    users,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
