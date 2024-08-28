'use client'

import ChallengeCard from '@/components/ChellengeCard'
import AccountCard from '@/components/AccountCard'
import FundCard from '@/components/FundCard'

import { Arrow } from '@/public/svg/index'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import Banner from '@/components/banner'
import SavingsRecommendCard from '@/containters/home/SavingsRecommendCard'

export default function Home() {
  const router = useRouter()
  const [isBannerOpen, setIsBannerOpen] = useState(true)

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full min-h-[3.75rem] flex items-center">
        <h1 className="text-2xl font-bold text-primary/80">돈기부여</h1>
      </div>
      {isBannerOpen && <Banner setIsBannerOpen={setIsBannerOpen} />}
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
      <div className="w-full flex flex-col justify-center gap-5 mt-5">
        <div className="w-full flex justify-center">
          <FundCard
            title="한 달 커피 소비 줄이기 기금"
            participants={3786}
            fund={3201000}
          />
        </div>
        <div className="w-full flex justify-center">
          <AccountCard
            account="110-000-000000"
            balance={210000}
            accountType="deposit"
          />
        </div>
        <div className="w-full flex justify-center">
          <AccountCard
            account="110-000-000000"
            balance={70000}
            accountType="saving"
          />
        </div>
        <Button
          text="모달 사용법"
          onClick={() => router.push('/modals/example')}
          className="text-white"
        />
      </div>
    </div>
  )
}
