import ChallengeCard from '@/components/ChellengeCard'
import AccountCard from '@/components/AccountCard'
import FundCard from '@/components/FundCard'

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">메인 페이지</h1>
      <div className="w-full flex justify-center mb-4">
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
      <div className="w-full flex justify-center mb-4">
        <FundCard
          title="한 달 커피 소비 줄이기 기금"
          participants={3786}
          fund={3201000}
        />
      </div>
      <div className="w-full flex justify-center">
        <AccountCard account="110-000-000000" balance={320100} />
      </div>
    </div>
  )
}
