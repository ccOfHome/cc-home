import { request } from 'umi'

export const login = async (data: any) => {
  return await request('/api/user/login', {
    method: 'POST',
    data,
  })
}


