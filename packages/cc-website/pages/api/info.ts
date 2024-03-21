import { instance } from './index'

const getInfo = async (url) => {
  const result = await instance.get(url)
  return result?.data?.data ?? []
}

export { getInfo }
