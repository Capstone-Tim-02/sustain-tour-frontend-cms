import { toast } from 'react-toastify';

import { axiosInstance } from '@/configs/axiosInstance';

export const APIDestinations = {
  getDestinations: async () => {
    try {
      const result = await axiosInstance.get(`/wisata`);
      return result.data.wisatas;
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
      toast.error(error.response.data.message);
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
