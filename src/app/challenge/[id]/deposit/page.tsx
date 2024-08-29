'use client'

import AmountInput from '@/components/AmountInput'
import FundCard from '@/components/FundCard'
import Button from '@/components/ui/Button'
import SectionTitle from '@/components/ui/SectionTitle'
import { DEPOSIT_QUICK_AMOUNT_LIST } from '@/constants/transfer'
import { MoneyStack, OneFinger, Prohibition, TwoFinger } from '@/public/svg'

export default function Deposit() {
  return (
    <div className="px-5 flex flex-col gap-16">
      <div>
        <p className="text-sm font-normal">절약 챌린지</p>
        <h1 className="text-2xl font-medium mt-2 mb-8">
          한 달 커피 소비 줄이기
        </h1>
        <FundCard
          title="한 달 커피 소비 줄이기"
          participants={786}
          fund={21510000}
        />
        <p className="mt-7 text-center">
          이번 챌린지 참가자들은 평균
          <span className="text-_blue-300"> {(22444).toLocaleString()}원</span>
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
        />
        <div className="bg-_grey-100 p-4 rounded-xl mt-10 flex flex-col gap-3">
          <p>성공(상위10%)</p>
          <p>성공(하위90%)</p>
          <p>실패</p>
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
