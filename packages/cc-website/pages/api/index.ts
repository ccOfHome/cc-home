import axios from 'axios'

export const instance = axios.create({
  baseURL: '',
  timeout: 2000,
  headers: {},
})

instance.interceptors.request.use((config) => {
  // if (config.url === '/user/login') return config;

  // // 设置 token
  // const token = window.sessionStorage.getItem('token');
  // if (token) {
  //   config!.headers!.Authorization = `Bearer ${token}`;
  // }

  return config;
})
