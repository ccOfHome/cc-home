import { request } from 'umi'

export const getArticleList = async (data: any) => {
  return await request('/api/article/getArticleList', {
    method: 'POST',
    data,
  })
}

export const addArticle = async (data: any) => {
  return await request('/api/article/addArticle', {
    method: 'POST',
    data,
  })
}

export const deleteArticle = async (data: any) => {
  return await request('/api/article/deleteArticle', {
    method: 'POST',
    data,
  })
}

export const updateStatus = async (data: any) => {
  return await request('/api/article/updateStatus', {
    method: 'POST',
    data,
  })
}