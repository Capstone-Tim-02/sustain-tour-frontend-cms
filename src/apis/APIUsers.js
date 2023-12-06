import { toast } from 'react-toastify';

import { axiosInstance } from '@/configs/axiosInstance';

export const APIUsers = {
  getUsers: async ({ search, pageIndex, pageSize }) => {
    try {
      const result = await axiosInstance.get(
        `/admin/user?name=${search}&page=${pageIndex}&per_page=${pageSize}`
      );
      return result.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  getUser: async (id) => {
    try {
      const result = await axiosInstance.get(`/user/${id}`);
      return result.data.user;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  updateUser: async (id, data) => {
    try {
      const result = await axiosInstance.put(`/admin/user/${id}`, data);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  deleteUser: async (id) => {
    try {
      const result = await axiosInstance.delete(`/admin/user/${id}`);
      toast.success(result.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },
};
