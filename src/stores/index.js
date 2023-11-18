import { configureStore } from '@reduxjs/toolkit';

import promos from '@/stores/features/PromoSlice';
import tnc from '@/stores/features/TncSlice';
import users from '@/stores/features/UsersSlice';

const store = configureStore({
  reducer: {
    users,
    tnc,
    promos,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
