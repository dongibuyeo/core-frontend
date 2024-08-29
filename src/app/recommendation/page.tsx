'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  fetchTotalConsumption,
  fetchHistoryData,
} from '@/services/recommendation'
import Button from '@/components/ui/Button'
import MyChart from '@/containers/Chart'
import { DollarsFlying, ChartUp } from '@/public/svg/index'
import Loader from '@/components/Loader'
import { getUserInfo } from '@/services/auth'

type Props = {
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

function RecommendationPage({
  challengeType,
  memberEmail,
  accountNo,
  startDate,
  endDate,
  transactionType,
  orderByType,
  accountTypeUniqueNo,
}: Props) {
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
      <h1 className="text-left text-xl mt-8 mb-2">
        <span className="font-medium">{userInfo?.name}</span>
        <span>님,</span>
      </h1>
      <h2 className="text-left mb-20">
        <span className="text-2xl font-medium text-primary">
          {challengeType}
        </span>
        <span className="text-xl"> 어떠세요?</span>
      </h2>
      <MyChart
        challengeType={challengeType}
        spendingData={spendingData}
        memberId=""
        accountTypeUniqueNo=""
      />
      <div className="text-left mt-16">
        <p className="mb-10">
          지난 6개월 간
          <span className="font-medium text-primary"> [{expenseLabel}]</span>{' '}
          지출이 크게 늘었습니다!
        </p>
        <h2 className="flex gap-1 items-center mb-3">
          <DollarsFlying className="w-5 h-5" />
          <p>
            지난 6개월 간 {expenseLabel}에 소비한 돈{' '}
            <span className="font-medium text-primary">
              {totalSpent.toLocaleString()}원
            </span>
          </p>
        </h2>
        <h2 className="flex gap-1 items-center mb-3">
          <ChartUp className="w-5 h-5" />
          <p>
            지난 달 대비 {expenseLabel} 소비{' '}
            <span className="font-medium text-primary">
              {lastMonthChange.toFixed(1)}%
            </span>{' '}
            증가
          </p>
        </h2>
        <h2 className="flex gap-1 items-center mb-16">
          <ChartUp className="w-5 h-5" />
          <p>
            6개월 전 대비 {expenseLabel} 소비{' '}
            <span className="font-medium text-primary">
              {sixMonthsChange.toFixed(1)}%
            </span>{' '}
            증가
          </p>
        </h2>
      </div>
      <Button text={`${challengeType} 바로가기`} />
    </div>
  )
}

export default RecommendationPage
