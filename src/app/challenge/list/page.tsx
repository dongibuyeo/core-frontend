'use client'

import ChallengeStatusButton from '@/components/ChallengeStatusButton'
import ChallengeCard from '@/components/ChallengeCard'
import { ChallengeStatus } from '@/types/ChallengeStatus'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllChallenge } from '@/services/challenges'
import { Challenge } from '@/types/Challenge'

export default function ChallengeListPage() {
  const [filteredChallengeList, setFilteredChallengeList] = useState<
    Challenge[]
  >([])
  const [challengeStatus, setChallengeStatus] =
    useState<ChallengeStatus>('SCHEDULED')

  const { data: challengeList } = useQuery({
    queryKey: ['challengeList'],
    queryFn: getAllChallenge,
  })

  if (challengeList && challengeList.length > 0) {
    setFilteredChallengeList(
      challengeList.filter(
        (challenge: Challenge) => challenge.status === challengeStatus,
      ),
    )
  }

  return (
    <div className="w-full px-5 pt-4 pb-8">
      <ChallengeStatusButton
        challengeStatus={challengeStatus}
        setChallengeStatus={setChallengeStatus}
        tabType="main"
      />
      <div className="w-full flex flex-col justify-center gap-7 mt-9">
        {filteredChallengeList?.map((challenge: Challenge) => (
          <ChallengeCard
            key={challenge?.challengeId}
            challengeId={challenge?.challengeId}
            title={challenge?.title}
            startDate={challenge?.startDate}
            endDate={challenge?.endDate}
            participants={challenge?.participants}
            totalDeposit={challenge?.totalDeposit}
            image={challenge?.image}
          />
        ))}
        <ChallengeCard
          challengeId="1"
          title="한 달 커피 소비 줄이기"
          startDate="20240701"
          endDate="20240831"
          participants="3786"
          totalDeposit="3201000"
          image="/image/coffee.jpg"
        />
        <ChallengeCard
          challengeId="1"
          title="한 달 커피 소비 줄이기"
          startDate="20240701"
          endDate="20240831"
          participants="3786"
          totalDeposit="3201000"
          image="/image/coffee.jpg"
        />
        <ChallengeCard
          challengeId="1"
          title="한 달 커피 소비 줄이기"
          startDate="20240701"
          endDate="20240831"
          participants="3786"
          totalDeposit="3201000"
          image="/image/coffee.jpg"
        />
      </div>
    </div>
  )
}
