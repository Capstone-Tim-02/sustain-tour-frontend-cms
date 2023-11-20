import { axiosInstance } from '@/configs/axiosInstance';
import { formatDate } from '@/utils/format';

export const APIDashboard = {
  getGraphics: async (dateRange) => {
    try {
      const startDate = dateRange.startDate ? formatDate(dateRange.startDate, 'YYYY-MM-DD') : '';
      const endDate = dateRange.endDate ? formatDate(dateRange.endDate, 'YYYY-MM-DD') : '';

      const result = await axiosInstance.get(`/grafik?start_date=${startDate}&end_date=${endDate}`);
      return result.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  getTopDestinations: async () => {
    try {
      const result = await axiosInstance.get(`/top/wisata`);
      return result.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  getTopEmissionCarbon: async () => {
    try {
      const result = await axiosInstance.get(`/top/emition`);
      return result.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
};
