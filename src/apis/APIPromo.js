import { toast } from 'react-toastify';

import { axiosInstance } from '@/configs/axiosInstance';

export const APIPromo = {
    editPromo: async (id, formData) => {
        try {            
            const result = await axiosInstance.put(`/admin/promo/${id}`, formData);
            console.log('data result API: ', result.data.promo_data);
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