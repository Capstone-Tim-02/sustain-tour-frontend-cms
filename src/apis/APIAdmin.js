import { toast } from 'react-toastify';

import { axiosInstance } from '@/configs/axiosInstance';

export const APIAdmin = {
  getAllAdmin: async ({ search = '', pageIndex, pageSize }) => {
    try {
      const result = await axiosInstance.get(
        `/admin?name=${search}&page=${pageIndex}&per_page=${pageSize}`
      );
      return result.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  updateAdmin: async (id, data) => {
    try {
      const result = await axiosInstance.put(`/admin/${id}`, data);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  deleteAdmin: async (id) => {
    try {
      const result = await axiosInstance.delete(`/admin/${id}`);
      toast.success(result.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },
};
