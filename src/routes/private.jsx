import { Outlet } from 'react-router-dom';

import { UnauthorizedRoute } from '@/features/unauthorized';
import { AuthService } from '@/services/AuthService';

export const PrivateRoute = () => {
  // if authorized, render children (Outlet), otherwise render Login component
  return AuthService.isAuthorized() ? <Outlet /> : <UnauthorizedRoute />;
};
