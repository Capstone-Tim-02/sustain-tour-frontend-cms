import { toast } from 'react-toastify';

import { axiosInstance } from '@/configs/axiosInstance';
import { AuthService } from '@/services/AuthService';

export const APIAuth = {
  getCurrentUser: async () => {
    if (AuthService.getToken()) {
      try {
        const dataUser = await axiosInstance.get('/profile');
        return dataUser?.data;
      } catch (error) {
        AuthService.clearCredentialsFromCookie();
        toast.error(error.response.data.message);
        throw new Error(error);
      }
    }
  },

  signInWithCredentials: async (data) => {
    try {
      const result = await axiosInstance.post('/admin/signin', data);
      AuthService.storeCredentialsToCookie(result.data.token);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  signOut: () => AuthService.clearCredentialsFromCookie(),
};
