import { toast } from 'react-toastify';

import { axiosInstance } from '@/configs/axiosInstance';

export const APITnc = {
  getAllTnc: async ({ pageIndex, pageSize }) => {
    try {
      const result = await axiosInstance.get(`/tnc?page=${pageIndex}&per_page=${pageSize}`);
      return result.data;
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
