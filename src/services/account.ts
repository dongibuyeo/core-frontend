import { instance } from '@/services/config/axios'
import {
  Account,
  CreateFreeAccountRes,
  CreateSavingAccountReq,
  CreateSavingAccountRes,
  TransferReq,
  TransferRes,
} from '@/types/account'

export const getAccount = async (memberId: string) => {
  const response = await instance.get(`/account/all/${memberId}`)
  return response.data
}

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

export const postTransfer: (
  payload: TransferReq,
) => Promise<TransferRes[]> = async (payload) => {
  const response = await instance.post('/account/transfer', payload)
  return response.data
}

export const getSavingsSevenAccounts: (
  memberId: string,
) => Promise<Account[]> = async (memberId) => {
  const response = await instance.get(`/savings/all/${memberId}`)
  const allAccounts: Account[] = response.data
  const savingsSevenAccounts = allAccounts.filter((account) =>
    account.accountName.startsWith('SAVINGS_SEVEN'),
  )
  return savingsSevenAccounts
}
