'use client'

import ChallengeStatusButton from '@/components/ChallengeStatusButton'
import ChallengeCard from '@/components/ChallengeCard'
import { ChallengeStatus } from '@/types/ChallengeStatus'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllChallenge } from '@/services/challenges'
import { Challenge } from '@/types/Challenge'
import Image from 'next/image'
import { Arrow } from '@/public/svg/index'
import { useRouter } from 'next/navigation'

export default function ChallengeListPage() {
  const router = useRouter()
  const [filteredChallengeList, setFilteredChallengeList] = useState<
    Challenge[]
  >([])
  const [challengeStatus, setChallengeStatus] =
    useState<ChallengeStatus>('SCHEDULED')

  const { data: challengeList, isPending } = useQuery({
    queryKey: ['challengeList'],
    queryFn: getAllChallenge,
  })

  useEffect(() => {
    if (challengeList && challengeList.length > 0) {
      const filteredList = challengeList.filter(
        (challenge: Challenge) => challenge.status === challengeStatus,
      )
      setFilteredChallengeList(filteredList)
    }
  }, [challengeList, challengeStatus])

  return (
    <>
      <nav className="bg-white z-20 fixed top-0 left-0 flex items-center h-[3.75rem] w-full px-[.625rem] space-x-[.625rem] transition-opacity duration-200">
        <Arrow
          className="cursor-pointer w-7 h-7"
          stroke="#000000"
          onClick={() => router.back()}
        />
      </nav>
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
              status={challenge?.status}
              type={challenge?.type}
            />
          ))}
          {!isPending && filteredChallengeList?.length === 0 && (
            <div className="flex flex-col gap-7 justify-center items-center h-96">
              <Image
                src="/gif/crying-face.gif"
                alt="not-found"
                width={80}
                height={80}
              />
              <p className="text-center font-medium text-_grey-400">
                해당하는 챌린지가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
