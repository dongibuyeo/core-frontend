import AmountInput from '@/components/AmountInput'
import { DEPOSIT_QUICK_AMOUNT_LIST } from '@/constants/transfer'
import { OneFinger, TwoFinger } from '@/public/svg'
import { getEstimateReward } from '@/services/challenges'
import useAmountStore from '@/store/amountStore'
import { useQuery } from '@tanstack/react-query'

export default function ConsumptionDepositSection({
  challengeId,
}: {
  challengeId: string
}) {
  const amount = useAmountStore((state) => state.amount)

  const { data: estimateReward } = useQuery({
    queryKey: ['estimateReward'],
    queryFn: () => getEstimateReward(challengeId),
  })

  return (
    <div>
      <div className="mt-4 flex flex-col gap-2 mb-10">
        <div className="flex gap-2">
          <OneFinger className="w-5" />
          <p>예치금 1~20만원까지 1만원 단위로 참여할 수 있어요!</p>
        </div>
        <div className="flex gap-2">
          <TwoFinger className="w-5" />
          <p>더 많은 예치금을 걸수록 더 많은 상금을 분배받아요!</p>
        </div>
      </div>
      <AmountInput
        placeholder="도전금액"
        quickAmounts={DEPOSIT_QUICK_AMOUNT_LIST}
        balance={200000}
        errorMessage="최대 20만원까지 걸 수 있어요!"
        isDepositType
      />
      <div className="bg-_grey-100 p-4 rounded-xl mt-10 flex flex-col gap-3 text-center">
        {amount ? (
          <>
            <p className="flex justify-between">
              <span>성공(상위10%)</span>
              <span>
                (예상){' '}
                {(
                  amount +
                  (amount / 10000) *
                    (estimateReward?.top10PercentRewardPerUnit || 0)
                ).toLocaleString()}
              </span>
            </p>
            <p className="flex justify-between">
              <span>성공(하위90%)</span>
              <span>
                (예상){' '}
                {(
                  amount +
                  (amount / 10000) *
                    (estimateReward?.lower90PercentRewardPerUnit || 0)
                ).toLocaleString()}
              </span>
            </p>
            <p className="flex justify-between">
              <span>실패</span>
              <span>성공률만큼 일부 환급</span>
            </p>
          </>
        ) : (
          <p>금액을 입력하시면 예상 환급금을 조회해드려요!</p>
        )}
      </div>
    </div>
  )
}
