'use client'

import Button from '@/components/ui/Button'
import MyChart from '@/containters/Chart'
import { DollarsFlying, ChartUp } from '@/public/svg'

type Props = {
  userName: string
  challengeType:
    | '술값 줄이기 챌린지'
    | '커피 줄이기 챌린지'
    | '배달음식 줄이기 챌린지'
  spendingData?: number[]
}

function RecommendationPage({
  userName = '박수진', // 더미 데이터
  challengeType = '커피 줄이기 챌린지', // 더미 데이터
  spendingData = [150, 200, 250, 230, 270, 350],
}: Props) {
  const validSpendingData = Array.isArray(spendingData)
    ? spendingData
    : [150, 200, 250, 230, 270, 350] // 더미 데이터

  const totalSpent = validSpendingData.reduce((acc, value) => acc + value, 0)

  const lastMonthChange =
    ((validSpendingData[5] - validSpendingData[4]) / validSpendingData[4]) * 100

  const sixMonthsChange =
    ((validSpendingData[5] - validSpendingData[0]) / validSpendingData[0]) * 100

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
      <MyChart challengeType={challengeType} spendingData={validSpendingData} />
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
