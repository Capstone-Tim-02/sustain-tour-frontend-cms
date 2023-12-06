import { toast } from 'react-toastify';

import { axiosInstance } from '@/configs/axiosInstance';

export const APITransactions = {
  getTransactions: async ({ search, pageIndex, pageSize }) => {
    try {
      const result = await axiosInstance.get(
        `/admin/ticket?search=${search}&page=${pageIndex}&per_page=${pageSize}`
      );
      return result.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  getTransaction: async (invoiceNumber) => {
    try {
      const result = await axiosInstance.get(`/admin/ticket/${invoiceNumber}`);
      return result.data.ticket_data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  updateTransaction: async (invoiceId, data) => {
    try {
      const result = await axiosInstance.put(`/admin/ticket/${invoiceId}`, data);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },
};
