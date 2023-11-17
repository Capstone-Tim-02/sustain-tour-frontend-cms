import { toast } from 'react-toastify';

import { axiosInstance } from '@/configs/axiosInstance';
import { AuthService } from '@/services/AuthService';

export const APIAuth = {
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
};
