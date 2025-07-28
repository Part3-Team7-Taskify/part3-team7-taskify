import { getCookie } from '@/utils/getCookie';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/16-7/',
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async (config) => {
    // const token = getAccessToken();
    const token = await getCookie('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
