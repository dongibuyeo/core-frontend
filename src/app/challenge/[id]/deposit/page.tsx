'use client'

import FundCard from '@/components/FundCard'
import Button from '@/components/ui/Button'
import SectionTitle from '@/components/ui/SectionTitle'
import ConsumptionDepositSection from '@/containers/challenge/deposit/ConsumptionDepositSection'
import { MoneyStack, Prohibition } from '@/public/svg'
import { getUserInfo } from '@/services/auth'
import { getChallenge, postChallengeJoin } from '@/services/challenges'
import useAmountStore from '@/store/amountStore'
import { Challenge, ChallengeJoinReq } from '@/types/Challenge'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

export default function Deposit({ params }: { params: { id: string } }) {
  const router = useRouter()
  const amount = useAmountStore((state) => state.amount)
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: !!localStorage.getItem('email'),
  })

  const { data: challenge } = useQuery<Challenge>({
    queryKey: ['challenge', params.id],
    queryFn: () => getChallenge(params.id),
    enabled: !!localStorage.getItem('email'),
  })

  const mutation = useMutation({
    mutationFn: (payload: ChallengeJoinReq) => postChallengeJoin(payload),
    onSuccess: () => {
      alert('참여가 완료되었습니다!')
      router.replace('/challenge/my')
    },
    onError: (error: AxiosError) => {
      if (axios.isAxiosError(error)) {
        alert((error.response?.data as any).message)
      }
    },
  })

  const avgDeposit = Math.floor(
    Number(challenge?.totalDeposit) / Number(challenge?.participants) || 0,
  )

  const handleChallengeJoin = () => {
    if (challenge?.type === 'SAVINGS_SEVEN') {
      mutation.mutate({
        challengeId: params.id,
        memberId: userInfo?.memberId as string,
        deposit: 70000,
      })
    } else {
      mutation.mutate({
        challengeId: params.id,
        memberId: userInfo?.memberId as string,
        deposit: amount || 0,
      })
    }
  }
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
        {challenge?.type === 'SAVINGS_SEVEN' ? (
          <div className="py-6 px-4 rounded-2xl mt-4 bg-_grey-100 flex flex-col gap-4">
            <p className="text-3xl font-bold text-center">70,000원</p>
            <div className="text-center">
              <p>777매일 적금 챌린지는 예치금이 7만원으로 고정이에요!</p>
              <p>
                <span className="text-primary font-medium">
                  성공여부와 상관없이 챌린지 종료후 전액 환급
                </span>
                됩니다.
              </p>
            </div>
          </div>
        ) : (
          <ConsumptionDepositSection
            challengeId={challenge?.challengeId as string}
          />
        )}
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
      <Button
        onClick={handleChallengeJoin}
        text="참여하기"
        className="text-white mb-8"
      />
    </div>
  )
}
