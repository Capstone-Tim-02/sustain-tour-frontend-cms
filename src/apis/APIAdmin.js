import { axiosInstance } from '@/configs/axiosInstance';

export const APIAdmin = {
  getAdmins: async ({ search, pageIndex, pageSize }) => {
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
};
