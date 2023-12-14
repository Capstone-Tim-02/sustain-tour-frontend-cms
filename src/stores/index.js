import { configureStore } from '@reduxjs/toolkit';

import {
  adminReducer,
  categoryReducer,
  destinationReducer,
  promoReducer,
  tncReducer,
  transactionReducer,
  userReducer,
} from '@/stores/features';
import { currentUserReducer, reactTableReducer } from '@/stores/ui-slice';

const store = configureStore({
  reducer: {
    fetchAllAdmin: adminReducer,
    fetchAllCategory: categoryReducer,
    currentUser: currentUserReducer,
    fetchAllDestination: destinationReducer,
    fetchAllPromo: promoReducer,
    reactTable: reactTableReducer,
    fetchAllTnc: tncReducer,
    fetchAllTransaction: transactionReducer,
    fetchAllUser: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
