import { Outlet } from 'react-router-dom';

import { Unauthorized } from '@/features/unauthorized';
import { AuthService } from '@/services/AuthService';

export const PrivateRoute = () => {
  // if authorized, render children (Outlet), otherwise render Login component
  return AuthService.isAuthorized() ? <Outlet /> : <Unauthorized />;
};
