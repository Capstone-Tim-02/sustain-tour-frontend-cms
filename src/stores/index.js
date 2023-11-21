import { configureStore } from '@reduxjs/toolkit';

import tnc from '@/stores/features/TncSlice';
import users from '@/stores/features/UsersSlice';
import destinations from './features/DestinationSlice';

const store = configureStore({
  reducer: {
    users,
    tnc,
    destinations,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
