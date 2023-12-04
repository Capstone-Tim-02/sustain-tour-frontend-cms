import { configureStore } from '@reduxjs/toolkit';

import currentUser from '@/stores/CurrentUserSlice';
import categories from '@/stores/features/CategoriesSlice';
import destinations from '@/stores/features/DestinationSlice';
import promos from '@/stores/features/PromoSlice';
import tnc from '@/stores/features/TncSlice';
import transactions from '@/stores/features/TransactionsSlice';
import users from '@/stores/features/UsersSlice';
import reactTable from '@/stores/ReactTableSlice';

const store = configureStore({
  reducer: {
    categories,
    users,
    tnc,
    destinations,
    promos,
    transactions,
    reactTable,
    currentUser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
