import { toast } from 'react-toastify';

import { axiosInstance } from '@/configs/axiosInstance';

export const APIPromo = {
  getPromo: async () => {
    try {
      const result = await axiosInstance.get(`/user/promo`)
      return result.data.promos;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  deletePromo: async (id) => {
    try {
      const result = await axiosInstance.delete(`/admin/promo/${id}`);
      toast.success(result.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },
};
