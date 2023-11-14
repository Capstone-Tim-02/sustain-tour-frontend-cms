import { toast } from 'react-toastify';

import { axiosInstance } from '@/configs/axiosInstance';

export const APIPromo = {
    editPromo: async (id, data) => {
        try {
            const result = await axiosInstance.put(`/admin/promo/${id}`, data);
            toast.success(result.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            throw new Error(error);
        }
    },

    getPromo: async (id) => {
        try {
            const result = await axiosInstance.get(`/user/promo/${id}`);
            return result.data.promo;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
 }