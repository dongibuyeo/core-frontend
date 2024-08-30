/* eslint-disable no-nested-ternary */

'use client'

import { ArrowDown, Calendar, Flag, MoneyBag } from '@/public/svg/index'
import FundCard from '@/components/FundCard'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { getChallenge } from '@/services/challenges'

import { Challenge } from '@/types/Challenge'
import { formatDate } from '@/utils/formatDate'
import SectionTitle from '@/components/ui/SectionTitle'
import { useState } from 'react'

export default function ChallengeInfoSaving() {
  const router = useRouter()
  const pathname = usePathname()
  const challengeId = pathname.split('/')[2]
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const { data: challenge } = useQuery<Challenge>({
    queryKey: ['challenge', challengeId],
    queryFn: () => getChallenge(challengeId),
  })

  return (
    <div className="flex flex-col gap-[3.75rem] pb-24 relative">
      <div className="mt-7">
        <div className="text-sm font-normal">적금 챌린지</div>
        <div className="text-2xl font-medium mt-2">{challenge?.title}</div>
        <div className="text-base font-normal mt-6">
          7주동안 매일 7천원 납입하면 7명 추첨해서 상금드려요!
        </div>
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

      <div>
        <SectionTitle icon={<Flag />} label="챌린지 성공조건" />
        <div className="p-4 bg-_grey-100 rounded-2xl text-center mt-4">
          <p className="text-lg">
            <span className="text-primary text-medium">7주</span>동안 매일{' '}
            <span className="text-primary text-medium">7천원</span> 납입하면
            성공!
          </p>
          <p>하루라도 미납하면 즉시 챌린지가 실패로 종료됩니다!</p>
        </div>
      </div>

      <div>
        <SectionTitle icon={<MoneyBag />} label="챌린지 누적 기금" />

        <div className="px-1 mb-2 flex flex-col gap-2">
          <p className="mt-4 flex gap-2 items-center">
            <div className="w-5 h-5 rounded-full bg-_grey-100 flex justify-center items-center">
              1
            </div>
            <p>
              챌린지 성공한 사람 중{' '}
              <span className="font-medium text-primary">7명</span> 추첨해서
              <span className="font-medium text-primary"> 상금을 분배</span>
              해요!
            </p>
          </p>
          <p className="mb-3 flex gap-2 items-center">
            <div className="w-5 h-5 rounded-full bg-_grey-100 flex justify-center items-center">
              2
            </div>
            <p>
              777적금은{' '}
              <span className="text-primary font-medium">예치금을 7만원</span>을
              필수로 예치해야합니다!
            </p>
          </p>
        </div>
        <FundCard
          title={`${challenge?.title} 기금`}
          participants={challenge?.participants}
          fund={challenge?.totalDeposit ?? ''}
        />
        <div className="flex flex-col gap-2 mb-10">
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
                    <span className="text-primary font-medium">
                      7명 추첨하여 상금
                    </span>
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
                상금 = 모인 예치금으로 쌓인 이자
              </div>
            </div>
          </div>
          <div className="bg-_red/[8%] rounded-2xl p-4">
            <p className="font-medium mb-2">챌린지 실패 시</p>
            <p className="text-sm">
              챌린지에 실패해도 예치금은 전액 환급받는 챌린지에요!
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-5 z-50 fixed bottom-9 left-0">
        <button
          type="button"
          className="py-3 text-sm font-medium rounded-xl bg-_blue-300 text-white w-full"
          onClick={() =>
            router.push(`/enroll?type=saving&challengeId=${challengeId}`)
          }
        >
          참여하기
        </button>
      </div>
    </div>
  )
}
