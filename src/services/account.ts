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

export const postCreateFreeAccount: (
  memberId: string,
) => Promise<CreateFreeAccountRes> = async (memberId) => {
  const response = await instance.post('/challenges/member/account', {
    memberId,
  })
  return response.data
}

export const postCreateSavingAccount: (
  payload: CreateSavingAccountReq,
) => Promise<CreateSavingAccountRes> = async (payload) => {
  const response = await instance.post('/account/personal', payload)
  return response.data
}
