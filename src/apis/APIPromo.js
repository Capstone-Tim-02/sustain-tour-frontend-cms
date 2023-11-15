import { toast } from 'react-toastify';

import { axiosInstance } from '@/configs/axiosInstance';

export const APIPromo = {
    editPromo: async (id, data) => {
        try {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, key === 'status_aktif' ? value === 'true' : value);
            });
            
            const result = await axiosInstance.put(`/admin/promo/${id}`, formData);
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