import type { NextApiRequest, NextApiResponse } from 'next'
import { instance } from './index';

// const getArticleList = async  (
//     req: NextApiRequest,
//     res: NextApiResponse
// ) => {
//     const result = await fetch(`http://127.0.0.1:7001/article/getArticleList`)
//     res.status(200).json({ name: result })
// }

const getArticleList = async (url: string) => {
  const result = await instance.post(url);
  return result?.data?.data ?? [];
}

const queryArticleById = async (url: string, id: string) => {
  const result = await instance.post(url, { id });
  return result?.data?.data ?? '';
}


export {
  getArticleList,
  queryArticleById,
}