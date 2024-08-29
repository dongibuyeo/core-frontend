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

type Props = {
  userName: string
  challengeType:
    | '술값 줄이기 챌린지'
    | '커피 줄이기 챌린지'
    | '배달음식 줄이기 챌린지'
  memberId: string
  accountNo: string
  startDate: string
  endDate: string
  transactionType: string
  orderByType: string
  accountTypeUniqueNo: string
}

function RecommendationPage({
  userName,
  challengeType,
  memberId,
  accountNo,
  startDate,
  endDate,
  transactionType,
  orderByType,
  accountTypeUniqueNo,
}: Props) {
  const [lastMonthChange, setLastMonthChange] = useState<number>(0)
  const [sixMonthsChange, setSixMonthsChange] = useState<number>(0)

  const { data: totalSpent = 0, isLoading: isTotalLoading } = useQuery({
    queryKey: ['totalConsumption', memberId],
    queryFn: () =>
      fetchTotalConsumption(
        memberId,
        accountNo,
        startDate,
        endDate,
        transactionType,
        orderByType,
      ),
  })

  const { data: spendingData = [], isLoading: isHistoryLoading } = useQuery({
    queryKey: ['historyData', memberId],
    queryFn: () => fetchHistoryData(memberId, accountTypeUniqueNo),
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

  const isLoading = isTotalLoading || isHistoryLoading

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  let expenseLabel
  if (challengeType === '술값 줄이기 챌린지') {
    expenseLabel = '유흥비'
  } else if (challengeType === '커피 줄이기 챌린지') {
    expenseLabel = '카페'
  } else {
    expenseLabel = '배달음식'
  }

  return (
    <div className="w-full h-full flex flex-col justify-center p-4">
      <h1 className="text-left text-xl mt-8 mb-2">
        <span className="font-medium">{userName}</span>
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
