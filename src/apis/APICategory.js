import { toast } from 'react-toastify';

import { axiosInstance } from '@/configs/axiosInstance';

export const APICategory = {
  getAllCategory: async ({ search = '', pageIndex, pageSize }) => {
    try {
      const result = await axiosInstance.get(
        `/categories?category_name=${search}&page=${pageIndex}&per_page=${pageSize}`
      );
      return result.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  getCategoryById: async (category_name) => {
    try {
      const result = await axiosInstance.get(`/categories?category_name=${category_name}`);
      return result.data.categories?.[0];
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  getAllCategoryWithoutPagination: async ({ search }) => {
    try {
      const result = await axiosInstance.get(`/categories/default?category_name=${search}`);
      return result.data.categories;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  addCategory: async (data) => {
    try {
      const result = await axiosInstance.post(`/createcategory`, data);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  updateCategory: async (id, data) => {
    try {
      const result = await axiosInstance.put(`/admin/categories/${id}`, data);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  deleteCategory: async (id) => {
    try {
      const result = await axiosInstance.delete(`/admin/categories/${id}`);
      toast.success(result.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },
};
