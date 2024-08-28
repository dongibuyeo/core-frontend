import ChallengeRankingCard from '@/containters/challenge/[id]/ChallengeRankingCard'

export default function ChallengeRanking() {
  return (
    <div className="w-full pb-12">
      <div className="flex flex-col gap-7">
        <div className="bg-_grey-100 w-full p-4 mt-4 text-center rounded-xl font-medium">
          <p className="text-base">상위 10% 커트라인 점수</p>
          <p className="mt-1 text-xl">
            <span className="font-semibold text-primary">182</span>점
          </p>
        </div>
        <div className="w-full px-4 flex flex-col gap-3">
          <ChallengeRankingCard />
          <ChallengeRankingCard />
          <ChallengeRankingCard />
          <ChallengeRankingCard />
        </div>
      </div>
    </div>
  )
}
