import { Navigate, Outlet } from 'react-router-dom';

import { AuthService } from '@/services/AuthService';

export function ProtectedRoute() {
  if (!AuthService.isAuthorized()) return <Outlet />;
  return <Navigate to="/" />;
}
