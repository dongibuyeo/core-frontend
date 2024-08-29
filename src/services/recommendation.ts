import { instance } from '@/services/config/axios'

export const fetchTotalConsumption = async (
  memberId: string,
  accountNo: string,
  startDate: string,
  endDate: string,
  transactionType: string,
  orderByType: string,
) => {
  const response = await instance.post('/consume/total', {
    transferType: 'CHALLENGE',
    history: {
      memberId,
      accountNo,
      startDate,
      endDate,
      transactionType,
      orderByType,
    },
  })
  return response.data.totalConsumtion
}

export const fetchHistoryData = async (
  memberId: string,
  accountTypeUniqueNo: string,
) => {
  const response = await instance.post('/consume', {
    memberId,
    accountTypeUniqueNo,
  })
  return response.data.map((item: any) => item.transactionBalance)
}

export const fetchSpendingData = async (
  memberId: string,
  accountTypeUniqueNo: string,
): Promise<number[]> => {
  const response = await instance.post('/consume', {
    memberId,
    accountTypeUniqueNo,
  })

  return response.data.map((item: any) => item.transactionBalance)
}
