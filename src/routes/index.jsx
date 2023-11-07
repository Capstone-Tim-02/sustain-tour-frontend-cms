import { Navigate, Route, Routes } from 'react-router-dom';

import { Dashboard } from '@/features/dashboard';
import { NotFound } from '@/features/notFound';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/not-found" element={<NotFound />} />
    </Routes>
  );
};
