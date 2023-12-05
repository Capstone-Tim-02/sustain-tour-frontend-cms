import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { Admins } from '@/features/admins';
import { Login } from '@/features/auth';
import { Category } from '@/features/categories';
import { Dashboard } from '@/features/Dashboard';
import { Destination } from '@/features/destination';
import { NotFound } from '@/features/notFound';
import { AddPromoRoute, ChatBotRoute, EditPromoRoute, Promo } from '@/features/promo';
import { EditTncRoute, Tnc } from '@/features/Tnc';
import { Transactions } from '@/features/transactions';
import { Unauthorized } from '@/features/unauthorized';
import { Users } from '@/features/users';
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
        <Route path="/overview" element={<Dashboard />} />
        <Route path="/admin" element={<Admins />} />
        <Route path="/pengguna" element={<Users />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/promo/tambah" element={<AddPromoRoute />} />
        <Route path="/promo/virtual-asisten" element={<ChatBotRoute />} />
        <Route path="/promo/edit/:promoId" element={<EditPromoRoute />} />
        <Route path="/destinasi" element={<Destination />} />
        <Route path="/kategori" element={<Category />} />
        <Route path="/transaksi" element={<Transactions />} />
        <Route path="/syarat_dan_ketentuan" element={<Tnc />} />
        <Route path="/syarat_dan_ketentuan/:tncId" element={<EditTncRoute />} />
      </Route>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};
