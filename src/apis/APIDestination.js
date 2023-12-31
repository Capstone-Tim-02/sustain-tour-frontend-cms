import { toast } from 'react-toastify';

import { axiosInstance } from '@/configs/axiosInstance';

export const APIDestination = {
  getAllDestination: async ({ search = '', pageIndex, pageSize }) => {
    try {
      const result = await axiosInstance.get(
        `/wisata?search=${search}&page=${pageIndex}&per_page=${pageSize}`
      );
      return result.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  getDestinationById: async (id) => {
    try {
      const result = await axiosInstance.get(`/wisata/${id}`);
      return result.data.wisata;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  editDestination: async (id, formData) => {
    try {
      const result = await axiosInstance.put(`/admin/wisata/${id}`, formData);
      toast.success(result.data.message);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  addDestination: async (data) => {
    try {
      const result = await axiosInstance.post(`/wisata/create`, data);
      toast.success(result.data.message);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  deleteDestination: async (id) => {
    try {
      const result = await axiosInstance.delete(`/admin/wisata/${id}`);
      toast.success(result.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },
};
