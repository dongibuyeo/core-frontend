import { MoneyBag } from '@/public/svg/index'
import SectionTitle from '@/components/ui/SectionTitle'

interface Props {
  depositAmount: number
  top10PercentRewardPerUnit: number
  lower90PercentRewardPerUnit: number
}

export default function MyChallengeDeposit({
  depositAmount,
  top10PercentRewardPerUnit,
  lower90PercentRewardPerUnit,
}: Props) {
  const estimatedTop10Reward =
    (top10PercentRewardPerUnit * depositAmount) / 10000
  const estimatedLower90Reward =
    (lower90PercentRewardPerUnit * depositAmount) / 10000
  return (
    <div>
      <SectionTitle icon={<MoneyBag />} label="도전 예치금" />

      <div className="mt-4 py-4 text-center text-primary text-xl font-medium rounded-xl bg-_grey-100">
        {depositAmount.toLocaleString('ko-KR')}원
      </div>

      <div className="mt-4 p-4 text-sm bg-_grey-100 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <span>성공(상위10%)</span>
          <span>(예상) {estimatedTop10Reward.toLocaleString('ko-KR')}원</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span>성공(하위90%)</span>
          <span>(예상) {estimatedLower90Reward.toLocaleString('ko-KR')}원</span>
        </div>
        <div className="flex items-center justify-between">
          <span>실패</span>
          <span>성공률만큼 일부 환급</span>
        </div>
      </div>
    </div>
  )
}
