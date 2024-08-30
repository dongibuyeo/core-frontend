/* eslint-disable no-nested-ternary */

'use client'

import { useEffect, useState } from 'react'

import {
  ArrowDown,
  Calendar,
  Flag,
  MoneyBag,
  SuccessModalChart,
  Trophy,
} from '@/public/svg/index'
import FundCard from '@/components/FundCard'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { getChallenge } from '@/services/challenges'
import { challengeTypeToLabel } from '@/constants/challengeType-map'
import { Challenge, ChallengeType } from '@/types/Challenge'
import { formatDate } from '@/utils/formatDate'
import { getUserInfo } from '@/services/auth'
import { getAccount } from '@/services/account'
import { getSpentMoney } from '@/services/consume'
import { UserInfo } from '@/types/user'

export default function ChallengeInfo() {
  const router = useRouter()
  const pathname = usePathname()
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isFailModalOpen, setIsFailModalOpen] = useState(false)
  const challengeId = pathname.split('/')[2]
  const [scoreMessages, setScoreMessages] = useState<string[]>()
  const [successCondition, setSuccessCondition] = useState<string>()

  const { data: user } = useQuery<UserInfo>({
    queryKey: ['user'],
    queryFn: getUserInfo,
    enabled: !!localStorage.getItem('email'),
  })

  const { data: accountList } = useQuery({
    queryKey: ['accountNo'],
    queryFn: () => getAccount(user?.memberId ?? ''),
    enabled: !!user?.memberId,
  })

  const { data: challenge } = useQuery<Challenge>({
    queryKey: ['challenge', challengeId],
    queryFn: () => getChallenge(challengeId),
  })

  const { data: spentMoney } = useQuery({
    queryKey: ['spentMoney'],
    queryFn: () => getSpentMoney(user?.memberId ?? '', challenge?.type ?? ''),
    enabled: !!accountList?.length,
  })

  const getScoreMessages = (challengeType: string): string[] => {
    switch (challengeType) {
      case 'CONSUMPTION_COFFEE':
        return [
          '모닝커피 참기, (오전 7시 ~ 오전 10시), + 2',
          '식후커피 참기, (오전 11시 ~ 오후 2시), + 3',
          '커피 마실 경우, , - 5',
        ]
      case 'CONSUMPTION_DRINK':
        return [
          '금요일 안마시기, , + 5',
          '토요일 안마시기, , + 5',
          '술을 마실 경우, , - 5',
        ]
      case 'CONSUMPTION_DELIVERY':
        return [
          '야식 시간대에 안먹기, (오후 9시 ~ 오전 2시), + 5',
          '배달을 먹을 경우, , - 5',
        ]
      default:
        return []
    }
  }

  const getCategoryMessage = (challengeType: string): string => {
    switch (challengeType) {
      case 'SAVINGS_SEVEN':
        return '49일 동안 매일 납입하면'
      case 'QUIZ_SOLBEING':
        return ''
      default:
        return '카테고리 소비가 지난 달 대비 줄어들면'
    }
  }

  useEffect(() => {
    if (challenge) {
      const scoreMessageList = getScoreMessages(challenge.type as string)
      const successConditionMessage = getCategoryMessage(
        challenge.type as string,
      )
      setScoreMessages(scoreMessageList)
      setSuccessCondition(successConditionMessage)
    }
  }, [challenge])

  return (
    <div className="flex flex-col gap-[3.75rem] pb-24 relative">
      <div className="mt-7">
        <div className="text-sm font-normal">
          {challenge?.type === 'QUIZ_SOLBEING'
            ? '퀴즈'
            : challenge?.type === 'SAVINGS_SEVEN'
              ? '적금'
              : '절약'}{' '}
          챌린지
        </div>
        <div className="text-2xl font-medium mt-2">{challenge?.title}</div>
        {successCondition && (
          <div className="text-base font-normal mt-6">
            [{challengeTypeToLabel[challenge?.type as ChallengeType]}]{' '}
            {successCondition} 성공!
          </div>
        )}
      </div>
      <div>
        <div className="flex space-x-1 items-center">
          <Calendar />
          <span className="text-lg font-medium">챌린지 참여기간</span>
        </div>
        <div className="bg-_grey-100 w-full py-5 mt-4 text-center rounded-xl">
          <span className="text-_grey-400 text-base font-medium">
            {`${formatDate(challenge?.startDate ?? '')} ~ ${formatDate(challenge?.endDate ?? '')}`}
          </span>
        </div>
      </div>
      {!!scoreMessages?.length && (
        <div>
          <div className="flex space-x-1 items-center">
            <Flag />
            <span className="text-lg font-medium">내 챌린지 성공조건</span>
          </div>
          <div className="bg-_grey-100 w-full p-4 mt-4 text-center rounded-xl text-sm font-normal">
            <p>
              이번 달 나의 [
              {challengeTypeToLabel[challenge?.type as ChallengeType]}] 소비
              내역
            </p>
            <p className="mt-1">
              <span className="text-xl font-bold text-primary">
                {spentMoney?.totalConsumption}
              </span>{' '}
              원
            </p>
            <p className="mt-5">
              다음 달 &lt;카페&gt; 소비가{' '}
              <span className="text-medium text-primary">
                {spentMoney?.totalConsumption}
              </span>
              원 미만이면 성공이에요!
            </p>
            <p className="mt-2 text-xs leading-5 text-_grey-400">
              소비내역 기준은 챌린지 시작 전날 부터 30일간을 기준으로,
              <br />
              보여지는 금액과 상이할 수 있습니다.
            </p>
          </div>
        </div>
      )}
      <div>
        <div className="flex space-x-1 items-center">
          <MoneyBag />
          <span className="text-lg font-medium">챌린지 누적 기금</span>
        </div>
        <p className="text-base font-normal mt-3 mb-5">
          챌린지에 성공하면{' '}
          <span className="font-medium text-primary">상금을 분배</span>
          받을 수 있어요!
        </p>
        <FundCard
          title={`${challenge?.title} 기금`}
          participants={challenge?.participants}
          fund={challenge?.totalDeposit ?? ''}
        />
      </div>
      <div>
        <div className="flex space-x-1 items-center">
          <MoneyBag />
          <span className="text-lg font-medium">챌린지 누적 기금</span>
        </div>
        <p className="text-base font-normal mt-3 mb-5">
          챌린지에 성공하면{' '}
          <span className="font-medium text-primary">상금을 분배</span>
          받을 수 있어요!
        </p>
        <div
          role="presentation"
          className="bg-_blue-300/10 w-full p-4 mt-4 rounded-xl cursor-pointer"
          onClick={() => setIsSuccessModalOpen((prev) => !prev)}
        >
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="font-medium">챌린지 성공 시</div>
                <div className="text-sm font-normal">
                  예치금 전액 환급 +{' '}
                  <span className="text-primary font-medium">상금</span>
                </div>
              </div>
              <ArrowDown
                className={`w-5 h-5 transition-transform duration-300 ${isSuccessModalOpen && 'rotate-180'}`}
              />
            </div>
            <div
              className={`w-auto flex flex-col gap-2 overflow-hidden transition-max-height duration-300 ease-in-out ${
                isSuccessModalOpen ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <div className="text-sm font-normal mt-5">
                상금 = 예치금 이자 + 실패한 인원의 예치금
              </div>
              <div className="text-xs font-normal">
                상금의 50%는 상위 10%에게,
                <br />
                나머지 50%는 하위 90%에게 1/n로 분배됩니다!
              </div>
              <div className="w-full flex justify-center">
                <SuccessModalChart className="w-3/4 object-cover" />
              </div>
            </div>
          </div>
        </div>
        <div
          role="presentation"
          className="bg-[#EA4141]/10 w-full p-4 mt-4 rounded-xl cursor-pointer"
          onClick={() => setIsFailModalOpen((prev) => !prev)}
        >
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="font-medium">챌린지 실패 시</div>
                <div className="text-sm font-normal">
                  지난 달 소비액 대비 증가율만큼 예치금 차감
                </div>
              </div>
              <ArrowDown
                className={`w-5 h-5 transition-transform duration-300 ${isFailModalOpen && 'rotate-180'}`}
              />
            </div>
            <div
              className={`w-auto flex flex-col gap-2 overflow-hidden transition-max-height duration-300 ease-in-out ${
                isFailModalOpen ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <div className="text-sm font-normal mt-5">
                환급액 = 예치금 - (예치금 * 증가율)
              </div>
              <div className="text-xs font-normal text-_grey-400">
                <span className="font-medium">예시</span>
                <br />
                지난 달 소비액 10,000원
                <br />
                이번 달 소비액 12,000원
                <br />
                증가율 = 20%
                <br />
                <br />
                환급액 = 10,000원 - (10,000원 * 0.2) = 8,000원
              </div>
            </div>
          </div>
        </div>
      </div>
      {!!scoreMessages?.length && (
        <div>
          <div className="flex space-x-1 items-center">
            <Trophy />
            <span className="text-lg font-medium">랭킹 산정 방식</span>
          </div>
          <p className="text-base font-medium mt-3 mb-5 text-primary">
            랭킹 상위 10%는 상금을 더 많이 분배받아요!
          </p>
          <div className="bg-_grey-100 w-full p-6 mt-4 text-center rounded-xl flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="font-normal">일일 기본 점수</div>
              <div className="font-medium text-primary">+ 10</div>
            </div>
            {scoreMessages?.map((message) => {
              const parts = message.split(', ')
              const description = parts[0]
              const time = parts.length === 3 ? parts[1] : ''
              const score = parts[parts.length - 1]
              const scoreClass = score.startsWith('-')
                ? 'text-_red'
                : 'text-primary'

              return (
                <div key={message} className="flex justify-between items-end">
                  <div className="font-normal">
                    {description}
                    {` `}
                    {time && (
                      <span className="text-_grey-400 font-normal text-xs">
                        {time}
                      </span>
                    )}
                  </div>
                  <div className={`font-medium ${scoreClass}`}>{score}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}
      {/* CSS 적용이 안되는중 */}
      <div className="w-full px-5 z-50 fixed bottom-9 left-0">
        <button
          type="button"
          className="py-3 text-sm font-medium rounded-xl bg-_blue-300 text-white w-full"
          onClick={() => router.push(`/challenge/${challengeId}/deposit`)}
        >
          참여하기
        </button>
      </div>
    </div>
  )
}
