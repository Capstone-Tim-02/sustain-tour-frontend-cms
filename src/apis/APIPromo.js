import { toast } from 'react-toastify';

import { axiosInstance } from '@/configs/axiosInstance';

export const APIPromo = {
  addPromo: async (formData) => {
    try {
      const result = await axiosInstance.post(`/createpromo`, formData);
      console.log("data result API: ", result.data.promo_data);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

    editPromo: async (id, formData) => {
        try {               
            const result = await axiosInstance.put(`/admin/promo/${id}`, formData);
            toast.success(result.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            throw new Error(error);
        }
    },

    getPromoById: async (id) => {
        try {
            const result = await axiosInstance.get(`/user/promo/${id}`);
            return result.data.promo;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },

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
 }
};
