import { instance } from '@/services/config/axios'

export const getAccount = async (memberId: string) => {
  const response = await instance.get(`/account/all/${memberId}`)
  return response.data
}
