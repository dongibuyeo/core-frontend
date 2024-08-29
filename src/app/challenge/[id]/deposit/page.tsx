'use client'

import AmountInput from '@/components/AmountInput'
import FundCard from '@/components/FundCard'
import Button from '@/components/ui/Button'
import SectionTitle from '@/components/ui/SectionTitle'
import { DEPOSIT_QUICK_AMOUNT_LIST } from '@/constants/transfer'
import { MoneyStack, OneFinger, Prohibition, TwoFinger } from '@/public/svg'
import { getChallenge, getEstimateReward } from '@/services/challenges'
import useAmountStore from '@/store/amountStore'
import { Challenge } from '@/types/Challenge'
import { useQuery } from '@tanstack/react-query'

export default function Deposit({ params }: { params: { id: string } }) {
  const amount = useAmountStore((state) => state.amount)
  const { data: challenge } = useQuery<Challenge>({
    queryKey: ['challenge', params.id],
    queryFn: () => getChallenge(params.id),
    enabled: !!localStorage.getItem('email'),
  })

  const { data: estimateReward } = useQuery({
    queryKey: ['estimateReward'],
    queryFn: () => getEstimateReward(params.id),
  })

  const avgDeposit = Math.floor(
    Number(challenge?.totalDeposit) / Number(challenge?.participants) || 0,
  )
  return (
    <div className="px-5 flex flex-col gap-16">
      <div>
        <p className="text-sm font-normal">절약 챌린지</p>
        <h1 className="text-2xl font-medium mt-2 mb-8">{challenge?.title}</h1>
        <FundCard
          title={challenge?.title || ''}
          participants={challenge?.participants}
          fund={Number(challenge?.totalDeposit)}
        />
        <p className="mt-7 text-center">
          이번 챌린지 참가자들은 평균
          <span className="text-_blue-300">
            {' '}
            {avgDeposit.toLocaleString()}원
          </span>
          을 걸었어요!
        </p>
      </div>
      <div>
        <SectionTitle icon={<MoneyStack />} label="예치금" />
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
      <div>
        <SectionTitle icon={<Prohibition />} label="환불 정책" />
        <div className="flex flex-col gap-8 mt-5">
          <div className="flex gap-2">
            <div className="shrink-0 w-5 h-5 rounded-full bg-_grey-100 text-_grey-400 flex justify-center items-cente text-sm">
              1
            </div>
            <div>
              <h3 className="font-medium mb-1">챌린지 시작 전까지 100% 환불</h3>
              <p className="text-_grey-400">
                챌린지 시작 전에는 언제든 도전을 포기하고 예치금을
                <br /> 100% 환급받을 수 있습니다!
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="shrink-0 w-5 h-5 rounded-full bg-_grey-100 text-_grey-400 flex justify-center items-center text-sm">
              2
            </div>
            <div>
              <h3 className="font-medium mb-1">챌린지 시작 후 취소 불가</h3>
              <p className="text-_grey-400 ">
                챌린지는 많은 참가자들이 함께하는만큼, 시작 후 환불은 <br />
                불가능합니다! 신중하게 도전하고, 시작 후에는 목표달성을 위해
                포기하지 말아요!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-0 left-0 w-full">
        <Button text="참여하기" className="text-white" />
      </div>
    </div>
  )
}
