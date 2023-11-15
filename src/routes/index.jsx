import { Navigate, Route, Routes } from 'react-router-dom';

import { Login } from '@/features/auth/routes';
import { Dashboard } from '@/features/dashboard/routes';
import { NotFound } from '@/features/notFound/routes';
import { EditPromoRoute } from '@/features/promo';
import { Tnc } from '@/features/Tnc';
import { EditTncRoute } from '@/features/Tnc/routes/EditTncRoute';
import { Users } from '@/features/users/routes';

import { PrivateRoute } from './private';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<Dashboard />} />
        <Route path="/pengguna" element={<Users />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
