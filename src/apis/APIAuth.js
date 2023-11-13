import { axiosInstance } from '@/configs/axiosInstance';
import { AuthService } from '@/services/AuthService';

export const APIAuth = {
  signInWithCredentials: async (data) => {
    try {
      const result = await axiosInstance.post('/admin/signin', data);
      AuthService.storeCredentialsToCookie(result.data.token);
    } catch (error) {
      throw new Error(error);
    }
  },
};
