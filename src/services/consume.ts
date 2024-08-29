import { instance } from '@/services/config/axios'
import { convertTransferType } from '@/utils/convertTransferType'

export const getSpentMoney = async (
  memberId: string,
  transferType: string,
  accountNo: string,
) => {
  const requestBody = {
    transferType: convertTransferType(transferType),
    history: {
      memberId,
      accountNo,
      startDate: '20240801',
      endDate: '20240831',
      transactionType: 'A',
      orderByType: 'DESC',
    },
  }

  const response = await instance.post(`/consume/total`, requestBody)
  return response.data
}
