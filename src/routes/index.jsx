import { Navigate, Route, Routes } from 'react-router-dom';

import { Dashboard } from '@/features/dashboard/routes';
import { NotFound } from '@/features/notFound/routes';
import { Users } from '@/features/users/routes';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
