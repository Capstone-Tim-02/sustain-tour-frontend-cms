import { axiosInstance } from '@/configs/axiosInstance';

export const APIUsers = {
  getUsers: async () => {
    try {
      const result = await axiosInstance.get('/admin/user');
      return result.data.users;
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
      await axiosInstance.put(`/admin/user/${id}`, data);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  deleteUser: async (id) => {
    try {
      const result = await axiosInstance.delete(`/admin/user/${id}`);
      return result.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
};
