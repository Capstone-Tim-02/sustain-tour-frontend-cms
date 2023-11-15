import { toast } from 'react-toastify';

import { axiosInstance } from '@/configs/axiosInstance';

export const APITnc = {
  getTnc: async () => {
    try {
      const result = await axiosInstance.get(`/tnc`);
      return result.data.term_conditions;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  getTncById: async (id) => {
    try {
      const result = await axiosInstance.get(`/tnc/${id}`);
      return result.data.term_condition;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  updateTnc: async (id, data) => {
    try {
      const result = await axiosInstance.put(`/admin/tnc/${id}`, data);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },
};
