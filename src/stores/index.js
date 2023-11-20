import { configureStore } from '@reduxjs/toolkit';

import categories from '@/stores/features/CategoriesSlice'
import tnc from '@/stores/features/TncSlice';
import users from '@/stores/features/UsersSlice';

const store = configureStore({
  reducer: {
    categories,
    users,
    tnc,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
