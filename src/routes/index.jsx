import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { AdminRoute } from '@/features/admin';
import { LoginRoute } from '@/features/auth';
import { CategoryRoute } from '@/features/category';
import { DashboardRoute } from '@/features/dashboard';
import {
  AddDestinationRoute,
  DestinationRoute,
  EditDestinationRoute,
} from '@/features/destination';
import { NotFoundRoute } from '@/features/not-found';
import { AddPromoRoute, ChatBotRoute, EditPromoRoute, PromoRoute } from '@/features/promo';
import { EditTncRoute, TncRoute } from '@/features/tnc';
import { TransactionRoute } from '@/features/transaction';
import { UnauthorizedRoute } from '@/features/unauthorized';
import { UserRoute } from '@/features/user';
import { globalRoute } from '@/lib/globalRoute';

import { PrivateRoute } from './private';
import { ProtectedRoute } from './protected';

export const AppRoutes = () => {
  const navigate = useNavigate();
  globalRoute.navigate = navigate;

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<DashboardRoute />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="/pengguna" element={<UserRoute />} />
        <Route path="/promo" element={<PromoRoute />} />
        <Route path="/promo/tambah" element={<AddPromoRoute />} />
        <Route path="/promo/virtual-asisten" element={<ChatBotRoute />} />
        <Route path="/promo/edit/:promoId" element={<EditPromoRoute />} />
        <Route path="/destinasi" element={<DestinationRoute />} />
        <Route path="/destinasi/tambah" element={<AddDestinationRoute />} />
        <Route path="/destinasi/edit/:destinationId" element={<EditDestinationRoute />} />
        <Route path="/kategori" element={<CategoryRoute />} />
        <Route path="/transaksi" element={<TransactionRoute />} />
        <Route path="/syarat_dan_ketentuan" element={<TncRoute />} />
        <Route path="/syarat_dan_ketentuan/:tncId" element={<EditTncRoute />} />
      </Route>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/login" element={<LoginRoute />} />
      </Route>
      <Route path="*" element={<NotFoundRoute />} />
      <Route path="/unauthorized" element={<UnauthorizedRoute />} />
    </Routes>
  );
};
