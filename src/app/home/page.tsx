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
      <h1 className="text-2xl mb-4">메인 페이지</h1>
      <ChallengeStatusButton
        challengeStatus={challengeStatus}
        setChallengeStatus={setChallengeStatus}
      />
      <div className="w-full flex justify-center">
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
