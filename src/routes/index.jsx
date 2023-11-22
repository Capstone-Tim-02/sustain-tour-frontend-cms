import { Navigate, Route, Routes } from 'react-router-dom';

import { Login } from '@/features/auth';
import { Category } from '@/features/categories';
import { Dashboard } from '@/features/Dashboard';
import { NotFound } from '@/features/notFound';
import { Promo } from '@/features/promo';
import { EditTncRoute, Tnc } from '@/features/Tnc';
import { Transactions } from '@/features/transactions';
import { Users } from '@/features/users';

import { PrivateRoute } from './private';
import { ProtectedRoute } from './protected';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<Dashboard />} />
        <Route path="/pengguna" element={<Users />} />
        <Route path="/kategori" element={<Category />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/transaksi" element={<Transactions />} />
        <Route path="/syarat_dan_ketentuan" element={<Tnc />} />
        <Route path="/syarat_dan_ketentuan/:tncId" element={<EditTncRoute />} />
      </Route>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
