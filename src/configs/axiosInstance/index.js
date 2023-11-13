import axios from 'axios';
import Cookies from 'js-cookie';

import { CONST } from '@/utils/constants';

const config = {
  baseURL: CONST.BASE_URL_API,
};

export const axiosInstance = axios.create(config);
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');

    if (token) config.headers.Authorization = `Bearer ${token}`;
    config.headers.Accept = 'application/json';

    return config;
  },
  (error) => Promise.reject(error)
);
