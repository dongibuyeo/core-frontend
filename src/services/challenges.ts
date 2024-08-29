import { instance } from '@/services/config/axios'

export const getAllChallenge = async () => {
  const response = await instance.get('/challenges')
  return response.data
}
