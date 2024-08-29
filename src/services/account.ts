import { Account } from '@/types/account'
import { instance } from './config/axios'

export const getChallengeAccount: (
  memberId: string,
) => Promise<Account> = async (memberId) => {
  const response = await instance.get(`/account/challenge/${memberId}`)
  return response.data
}

export const getAllAccount: (memberId: string) => Promise<Account[]> = async (
  memberId,
) => {
  const response = await instance.get(`/account/all/${memberId}`)
  return response.data
}
