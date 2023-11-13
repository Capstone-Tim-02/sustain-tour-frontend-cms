import { Navigate, Outlet } from 'react-router-dom';

import { AuthService } from '@/services/AuthService';

export const PrivateRoute = () => {
  // if authorized, render children (Outlet), otherwise render Login component
  if (AuthService.isAuthorized()) return <Outlet />;

  return <Navigate to="/login" replace />;
};
