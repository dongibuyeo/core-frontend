'use client'

import ChallengeStatusButton from '@/components/ChallengeStatusButton'
import ChallengeCard from '@/components/ChellengeCard'
import AccountCard from '@/components/AccountCard'
import FundCard from '@/components/FundCard'

import { ArrowLeft } from '@/public/svg/index'
import { ChallengeStatus } from '@/types/ChallengeStatus'
import { useState } from 'react'
import RankItem from '@/components/RankItem'

export default function Home() {
  const [challengeStatus, setChallengeStatus] =
    useState<ChallengeStatus>('SCHEDULED')

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full min-h-[3.75rem] flex items-center">
        <h1 className="text-xl font-bold">LOGO</h1>
      </div>
      <div className="py-2 sticky top-0 z-10 w-full">
        <ChallengeStatusButton
          challengeStatus={challengeStatus}
          setChallengeStatus={setChallengeStatus}
          tabType="main"
        />
      </div>
      <div className="flex justify-between">
        <h1 className="text-xl font-medium">인기 챌린지</h1>
        <ArrowLeft className="w-6 h-76 rotate-180 cursor-pointer" />
      </div>
      <div className="w-full flex flex-col justify-center gap-7 mt-5">
        <ChallengeCard
          id={1}
          title="한 달 커피 소비 줄이기"
          startDate="2024-07-01"
          endDate="2024-07-31"
          participants={3786}
          fund={3201000}
          imageUrl="/image/coffee.jpg"
        />
        <ChallengeCard
          id={1}
          title="한 달 커피 소비 줄이기"
          startDate="2024-07-01"
          endDate="2024-07-31"
          participants={3786}
          fund={3201000}
          imageUrl="/image/coffee.jpg"
        />
        <ChallengeCard
          id={1}
          title="한 달 커피 소비 줄이기"
          startDate="2024-07-01"
          endDate="2024-07-31"
          participants={3786}
          fund={3201000}
          imageUrl="/image/coffee.jpg"
        />
      </div>
      <div className="w-full flex flex-col justify-center gap-5 mt-5 mb-40">
        <RankItem
          rank={1}
          profileImageNumber={1}
          nickname={'강남건물주될거야'}
          email={'onepst@hanyang.ac.kr'}
          score={214}
        />
      </div>
    </div>
  )
}
