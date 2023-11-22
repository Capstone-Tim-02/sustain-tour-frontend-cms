import { configureStore } from '@reduxjs/toolkit';

import categories from '@/stores/features/CategoriesSlice'
import promos from '@/stores/features/PromoSlice';
import tnc from '@/stores/features/TncSlice';
import transactions from '@/stores/features/TransactionsSlice';
import users from '@/stores/features/UsersSlice';
import destinations from './features/DestinationSlice';

const store = configureStore({
  reducer: {
    categories,
    users,
    tnc,
    destinations,
    promos,
    transactions,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
