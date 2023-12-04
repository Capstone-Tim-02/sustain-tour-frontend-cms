import axios from 'axios';
import Cookies from 'js-cookie';

import { globalRoute } from '@/lib/globalRoute';
import { AuthService } from '@/services/AuthService';
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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      globalRoute.navigate && globalRoute.navigate('/unauthorized');

      AuthService.clearCredentialsFromCookie();
    }
    return Promise.reject(error);
  }
);
