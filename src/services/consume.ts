/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import { addMonths, endOfMonth, format } from 'date-fns'
import { instance } from '@/services/config/axios'
import { convertTransferType } from '@/utils/convertTransferType'

export const getSpentMoney = async (memberId: string, transferType: string) => {
  const requestBody = {
    transferType: convertTransferType(transferType),
    history: {
      memberId,
      accountNo: '0881367640491160',
      startDate: '20240801',
      endDate: '20240831',
      transactionType: 'A',
      orderByType: 'DESC',
    },
  }

  const response = await instance.post(`/consume/total`, requestBody)
  return response.data.totalConsumption
}

export const fetchHistoryData = async (
  memberId: string,
  transferType: string,
) => {
  const results = []
  let startDate = new Date(2024, 2, 1)

  for (let i = 0; i < 6; i++) {
    const endDate = endOfMonth(startDate)
    const formattedStartDate = format(startDate, 'yyyyMMdd')
    const formattedEndDate = format(endDate, 'yyyyMMdd')

    const requestBody = {
      transferType: convertTransferType(transferType),
      history: {
        memberId,
        accountNo: '0881367640491160',
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        transactionType: 'A',
        orderByType: 'DESC',
      },
    }

    const response = await instance.post('/consume/total', requestBody)

    if (response.data) {
      results.push(response.data.totalConsumption)
      startDate = addMonths(startDate, 1)
    }
  }

  return results
}
