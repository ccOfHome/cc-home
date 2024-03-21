import { instance } from './index'

// 模拟登录获取token
const login = async (url, data) => {
  const result = await instance.post(url, data);
  window.sessionStorage.setItem('token', result.data.data.token);
}

export { login }
