'use client'

import ChallengeStatusButton from '@/components/ChallengeStatusButton'
import ChallengeCard from '@/components/ChellengeCard'
import { ChallengeStatus } from '@/types/ChallengeStatus'
import { useState } from 'react'

export default function Home() {
  const [challengeStatus, setChallengeStatus] =
    useState<ChallengeStatus>('SCHEDULED')

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-[3.75rem] flex items-center">
        <h1 className="text-xl font-bold">LOGO</h1>
      </div>
      <div className="py-2 sticky top-0 z-10 w-full">
        <ChallengeStatusButton
          challengeStatus={challengeStatus}
          setChallengeStatus={setChallengeStatus}
          tabType="main"
        />
      </div>
      <div className="w-full flex flex-col justify-center gap-7">
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
    </div>
  )
}
