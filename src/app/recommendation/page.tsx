'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  fetchTotalConsumption,
  fetchHistoryData,
} from '@/services/recommendation'
import Loader from '@/components/Loader'
import RecommendTo from '@/containers/recommendation/RecommendTo'
import ChartSummary from '@/containers/recommendation/ChartSummary'
import Button from '@/components/ui/Button'
import { getUserInfo } from '@/services/auth'

interface RecommendationPageProps {
  challengeType:
    | 'CONSUMPTION_COFFEE'
    | 'CONSUMPTION_DRINK'
    | 'CONSUMPTION_DELIVERY'
  memberEmail: string
  accountNo: string
  startDate: string
  endDate: string
  transactionType: string
  orderByType: string
  accountTypeUniqueNo: string
}

export default function RecommendationPage({
  challengeType,
  memberEmail,
  accountNo,
  startDate,
  endDate,
  transactionType,
  orderByType,
  accountTypeUniqueNo,
}: RecommendationPageProps) {
  const [lastMonthChange, setLastMonthChange] = useState<number>(0)
  const [sixMonthsChange, setSixMonthsChange] = useState<number>(0)

  const { data: userInfo, isLoading: userLoading } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: !!localStorage.getItem('email'),
  })

  const { data: totalSpent = 0, isLoading: isTotalLoading } = useQuery({
    queryKey: ['totalConsumption', memberEmail],
    queryFn: () =>
      fetchTotalConsumption(
        memberEmail,
        accountNo,
        startDate,
        endDate,
        transactionType,
        orderByType,
      ),
  })

  const { data: spendingData = [], isLoading: isHistoryLoading } = useQuery({
    queryKey: ['historyData', memberEmail],
    queryFn: () => fetchHistoryData(memberEmail, accountTypeUniqueNo),
  })

  useEffect(() => {
    if (!isHistoryLoading && spendingData.length > 0) {
      const calculatedLastMonthChange =
        ((spendingData[5] - spendingData[4]) / spendingData[4]) * 100
      const calculatedSixMonthsChange =
        ((spendingData[5] - spendingData[0]) / spendingData[0]) * 100

      setLastMonthChange(calculatedLastMonthChange)
      setSixMonthsChange(calculatedSixMonthsChange)
    }
  }, [isHistoryLoading, spendingData])

  const isLoading = userLoading || isTotalLoading || isHistoryLoading

  if (isLoading) {
    return <Loader />
  }

  let expenseLabel
  if (challengeType === 'CONSUMPTION_DRINK') {
    expenseLabel = '유흥비'
  } else if (challengeType === 'CONSUMPTION_COFFEE') {
    expenseLabel = '카페'
  } else {
    expenseLabel = '배달음식'
  }

  return (
    <div className="w-full h-full flex flex-col justify-center p-4">
      <RecommendTo name={userInfo?.name || ''} challengeType={challengeType} />
      <ChartSummary
        challengeType={challengeType}
        spendingData={spendingData}
        totalSpent={totalSpent}
        lastMonthChange={lastMonthChange}
        sixMonthsChange={sixMonthsChange}
        expenseLabel={expenseLabel}
      />
      <Button text={`${challengeType} 바로가기`} />
    </div>
  )
}
