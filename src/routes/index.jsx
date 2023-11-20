import { Navigate, Route, Routes } from 'react-router-dom';

import { Login } from '@/features/auth/routes';
import { Dashboard } from '@/features/Dashboard/routes';
import { NotFound } from '@/features/notFound/routes';
import { EditPromoRoute, PromoRoute } from '@/features/promo';
import { Tnc } from '@/features/Tnc';
import { EditTncRoute } from '@/features/Tnc/routes/EditTncRoute';
import { Transactions } from '@/features/transactions/routes';
import { Users } from '@/features/users/routes';

import { PrivateRoute } from './private';
import { ProtectedRoute } from './protected';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<Dashboard />} />
        <Route path="/pengguna" element={<Users />} />
        <Route path='/promo/edit/:id' element={<EditPromoRoute/>}/>
        <Route path="/promo" element={<PromoRoute />} />
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
