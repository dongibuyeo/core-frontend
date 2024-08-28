'use client'

import ChallengeStatusButton from '@/components/ChallengeStatusButton'
import ChallengeCard from '@/components/ChellengeCard'
import { ChallengeStatus } from '@/types/ChallengeStatus'
import { useState } from 'react'

export default function ChallengeListPage() {
  const [challengeStatus, setChallengeStatus] =
    useState<ChallengeStatus>('SCHEDULED')

  return (
    <div className="w-full px-5 pt-4 pb-8">
      <ChallengeStatusButton
        challengeStatus={challengeStatus}
        setChallengeStatus={setChallengeStatus}
        tabType="main"
      />
      <div className="w-full flex flex-col justify-center gap-7 mt-9">
        <ChallengeCard
          id="1"
          title="한 달 커피 소비 줄이기"
          startDate="2024-07-01"
          endDate="2024-08-31"
          participants={3786}
          fund={3201000}
          imageUrl="/image/coffee.jpg"
        />
        <ChallengeCard
          id="2"
          title="한 달 커피 소비 줄이기"
          startDate="2024-07-01"
          endDate="2024-08-31"
          participants={3786}
          fund={3201000}
          imageUrl="/image/coffee.jpg"
        />
        <ChallengeCard
          id="3"
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
