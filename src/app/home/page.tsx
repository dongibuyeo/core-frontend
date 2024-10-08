'use client'

import { Arrow, MainLogo } from '@/public/svg/index'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Banner from '@/components/banner'
import SavingsRecommendCard from '@/containers/home/SavingsRecommendCard'
import ChallengeCard from '@/components/ChallengeCard'
import { useQuery } from '@tanstack/react-query'
import { getAllChallenge } from '@/services/challenges'
import { Challenge } from '@/types/Challenge'

export default function Home() {
  const router = useRouter()
  const [isBannerOpen, setIsBannerOpen] = useState(true)

  const { data: challengeList } = useQuery({
    queryKey: ['challengeList'],
    queryFn: getAllChallenge,
  })

  return (
    <div className="w-full h-full flex flex-col pb-7">
      <div className="w-full min-h-[3.75rem] flex items-center my-4">
        <MainLogo className="h-14" />
      </div>
      {isBannerOpen && (
        <Banner setIsBannerOpen={setIsBannerOpen} type="recommend" />
      )}
      <SavingsRecommendCard />
      <div className="flex justify-between items-center mt-8">
        <h1 className="text-xl font-medium">인기 챌린지</h1>
        <Arrow
          className="w-5 h-5 rotate-180 cursor-pointer"
          stroke="#000000"
          onClick={() => router.push('/challenge/list')}
        />
      </div>
      <div className="w-full flex flex-col justify-center gap-7 mt-5">
        {challengeList
          ?.slice(0, 2)
          .map((challenge: Challenge) => (
            <ChallengeCard
              key={challenge?.challengeId}
              challengeId={challenge?.challengeId}
              title={challenge?.title}
              startDate={challenge?.startDate}
              endDate={challenge?.endDate}
              participants={challenge?.participants}
              totalDeposit={challenge?.totalDeposit}
              image={challenge?.image}
              status={challenge?.status}
              type={challenge?.type}
            />
          ))}
      </div>
    </div>
  )
}
