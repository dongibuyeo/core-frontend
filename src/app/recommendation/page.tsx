'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/components/Loader'
import RecommendTo from '@/containers/recommendation/RecommendTo'
import ChartSummary from '@/containers/recommendation/ChartSummary'
import Button from '@/components/ui/Button'
import { getUserInfo } from '@/services/auth'
import { fetchHistoryData, getSpentMoney } from '@/services/consume'
import { ChallengeType } from '@/types/Challenge'

export default function RecommendationPage() {
  const [lastMonthChange, setLastMonthChange] = useState<number>(0)
  const [sixMonthsChange, setSixMonthsChange] = useState<number>(0)
  const [type, setType] = useState<ChallengeType>('CONSUMPTION_COFFEE')
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const types: ChallengeType[] = [
      'CONSUMPTION_COFFEE',
      'CONSUMPTION_DELIVERY',
      'CONSUMPTION_DRINK',
    ]
    const randomType = types[Math.floor(Math.random() * types.length)]
    setType(randomType)
  }, [])

  let email
  if (typeof window !== 'undefined') {
    email = localStorage.getItem('email')
  }
  let challengeLabel

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: !!email,
  })

  const { data: totalSpent, isLoading: isTotalLoading } = useQuery({
    queryKey: ['totalConsumption'],
    queryFn: () => getSpentMoney(user?.memberId ?? '', type),
    enabled: !!user,
  })

  const { data: spendingData, isLoading: isHistoryLoading } = useQuery({
    queryKey: ['historyData'],
    queryFn: () => fetchHistoryData(user?.memberId ?? '', type),
    enabled: !!user,
  })

  useEffect(() => {
    if (!isHistoryLoading && spendingData && spendingData.length > 0) {
      const calculatedLastMonthChange =
        ((spendingData[5] - spendingData[4]) / spendingData[4]) * 100
      const calculatedSixMonthsChange =
        ((spendingData[5] - spendingData[0]) / spendingData[0]) * 100

      setLastMonthChange(calculatedLastMonthChange)
      setSixMonthsChange(calculatedSixMonthsChange)
    }
  }, [isHistoryLoading, spendingData])

  const isLoading = userLoading || isTotalLoading || isHistoryLoading

  if (mounted && isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  let expenseLabel
  if (type === 'CONSUMPTION_DRINK') {
    expenseLabel = '유흥비'
    challengeLabel = '술값 줄이기 챌린지'
  } else if (type === 'CONSUMPTION_COFFEE') {
    expenseLabel = '카페'
    challengeLabel = '커피 줄이기 챌린지'
  } else {
    expenseLabel = '배달음식'
    challengeLabel = '배달음식 줄이기 챌린지'
  }

  return (
    <div className="w-full h-full flex flex-col justify-center p-4">
      <RecommendTo name={user?.name || ''} challengeLabel={challengeLabel} />
      <ChartSummary
        challengeLabel={challengeLabel}
        spendingData={spendingData as number[]}
        totalSpent={totalSpent}
        lastMonthChange={lastMonthChange}
        sixMonthsChange={sixMonthsChange}
        expenseLabel={expenseLabel}
      />
      <Button text={`${challengeLabel} 바로가기`} />
    </div>
  )
}
