import MyChart from '@/containers/recommendation/Chart'
import { DollarsFlying, ChartUp } from '@/public/svg/index'

type Props = {
  challengeType: string
  spendingData: number[]
  totalSpent: number
  lastMonthChange: number
  sixMonthsChange: number
  expenseLabel: string
}

export default function ChartSummary({
  challengeType,
  spendingData,
  totalSpent,
  lastMonthChange,
  sixMonthsChange,
  expenseLabel,
}: Props) {
  return (
    <div>
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
    </div>
  )
}
