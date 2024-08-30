/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-redeclare */

import ChallengeRankingCard from '@/containers/challenge/[id]/ChallengeRankingCard'
import { getChallengeRanking } from '@/services/challenges'
import type { ChallengeRanking, Member } from '@/types/Challenge'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function ChallengeRanking() {
  const pathname = usePathname()
  const pathList = pathname.split('/')
  const challengeId = pathList[pathList?.length - 1]

  const { data: challengeRanking, isPending } = useQuery<ChallengeRanking>({
    queryKey: ['challengeRanking', challengeId],
    queryFn: () => getChallengeRanking(challengeId),
  })

  return (
    <div className="w-full pb-12">
      <div className="flex flex-col gap-7">
        <div className="bg-_grey-100 w-full p-4 mt-4 text-center rounded-xl font-medium">
          <p className="text-base">상위 10% 커트라인 점수</p>
          <p className="mt-1 text-xl">
            <span className="font-semibold text-primary">
              {challengeRanking?.top10PercentCutoff}
            </span>
            점
          </p>
        </div>
        <div className="w-full px-4 flex flex-col gap-3">
          {challengeRanking?.top5Members?.map((member: Member, idx: number) => (
            <ChallengeRankingCard
              key={challengeId + member.nickname}
              index={idx + 1}
              nickname={member.nickname}
              email={member.email}
              profileImage={member.profileImage}
              score={member.score}
            />
          ))}
          {!isPending && challengeRanking?.top5Members?.length === 0 && (
            <div className="flex flex-col gap-7 justify-center items-center h-96">
              <Image
                src="/gif/crying-face.gif"
                alt="not-found"
                width={80}
                height={80}
              />
              <p className="text-center font-medium text-_grey-400">
                참여중인 사용자가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
