import { request } from 'umi'

export const getInfoList = async (data: any) => {
  return await request('/api/info/getAllInfo', {
    method: 'GET',
    data,
  })
}