import { MoneyBag } from '@/public/svg/index'
import SectionTitle from '@/components/ui/SectionTitle'

interface Props {
  depositAmount: number
  top10PercentRewardPerUnit: number
  lower90PercentRewardPerUnit: number
  isSuccess: boolean
  top10PercentMemberNum?: number
  lower90PercentMemberNum?: number
  lastMonthIncreaseRate?: number
}

export default function MyChallengeFinalRefund({
  depositAmount,
  top10PercentRewardPerUnit,
  lower90PercentRewardPerUnit,
  isSuccess,
  lastMonthIncreaseRate,
  top10PercentMemberNum,
  lower90PercentMemberNum,
}: Props) {
  const refundAmountSuccess =
    depositAmount + (depositAmount / 10000) * lower90PercentRewardPerUnit
  const refundAmountFailure =
    lastMonthIncreaseRate !== undefined
      ? depositAmount - depositAmount * lastMonthIncreaseRate
      : 0

  const refundAmount = isSuccess ? refundAmountSuccess : refundAmountFailure

  return (
    <div className="w-full">
      <SectionTitle icon={<MoneyBag />} label="최종 환급금" />

      <div className="my-4 py-4 bg-_grey-100 rounded-xl">
        <div className="text-center text-primary text-xl font-medium">
          {refundAmount.toLocaleString('ko-KR')}원
        </div>
      </div>

      <div className="px-4 bg-_grey-100 rounded-xl">
        {isSuccess ? (
          <div className="pt-5">
            <div className="flex justify-between">
              <div>
                <span className="font-medium text-_grey-400 mr-1">
                  상위 10%
                </span>
                <span className="text-_grey-400 text-xs">
                  ({top10PercentMemberNum}명)
                </span>
              </div>
              <div>
                <span className="text-_grey-400 mr-3 text-xs">
                  예치금 1만원 당
                </span>
                <span className="text-_blue-300">
                  {top10PercentRewardPerUnit.toLocaleString('ko-KR')}원
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <span className="font-medium text-_grey-400 mr-1">
                  하위 90%
                </span>
                <span className="text-_grey-400 text-xs">
                  ({lower90PercentMemberNum}명)
                </span>
              </div>
              <div>
                <span className="text-_grey-400 mr-3 text-xs">
                  예치금 1만원 당
                </span>
                <span className="text-_blue-300">
                  {lower90PercentRewardPerUnit.toLocaleString('ko-KR')}원
                </span>
              </div>
            </div>
            <div className="my-5 mx-6 pb-5 text-center">
              <div className="text-sm mb-2">
                환급액 = 예치금+(예치금/10,000 * 단위상금)
              </div>
              <div className="text-sm text-_grey-400">
                단위상금 = {lower90PercentRewardPerUnit.toLocaleString('ko-KR')}
                원
              </div>
              <div className="flex">
                <div className="text-sm text-_grey-400">
                  환급액 = {depositAmount.toLocaleString('ko-KR')}원 + (
                  {(depositAmount / 10000).toFixed(0)} *{' '}
                  {lower90PercentRewardPerUnit.toLocaleString('ko-KR')}원) ={' '}
                </div>
                <div className="text-sm text-_blue-300 fint-bold">
                  {refundAmountSuccess.toLocaleString('ko-KR')}원
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-5 my-5 px-6">
            <div className="text-sm mb-2">
              환급액 = 예치금 - (예치금 * 증가율)
            </div>
            <div className="text-sm text-_grey-400">
              지난 달 대비 증가율 ={' '}
              {lastMonthIncreaseRate !== undefined
                ? (lastMonthIncreaseRate * 100).toFixed(1)
                : '0'}
              %
            </div>
            <div className="flex">
              <div className="text-sm text-_grey-400">
                환급액 = {depositAmount.toLocaleString('ko-KR')}원 - (
                {depositAmount.toLocaleString('ko-KR')}원 *{' '}
                {lastMonthIncreaseRate !== undefined
                  ? lastMonthIncreaseRate.toFixed(2)
                  : '0'}
                ) ={' '}
              </div>
              <div className="text-sm text-_blue-300 fint-bold">
                {refundAmountFailure.toLocaleString('ko-KR')}원
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
