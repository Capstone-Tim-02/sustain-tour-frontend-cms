import { Outlet } from 'react-router-dom';

import { Login } from '@/features/auth/routes';
import { AuthService } from '@/services/AuthService';

export const PrivateRoute = () => {
  // if authorized, render children (Outlet), otherwise render Login component
  if (AuthService.isAuthorized()) return <Outlet />;

  return <Login />;
};
