/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-expressions */

'use client'

import ChallengeStatusButton from '@/components/ChallengeStatusButton'
import MyChallengeCard from '@/components/MyChallengeCard'
import { getUserInfo } from '@/services/auth'
import { getMyChallengeList } from '@/services/challenges'
import { ChallengeStatus } from '@/types/ChallengeStatus'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { MemberChallengeDetail, MyChallengeList } from '@/types/MyChallenge'

export default function MyChallengePage() {
  const [challengeStatus, setChallengeStatus] =
    useState<ChallengeStatus>('SCHEDULED')
  const [filteredChallengeList, setFilteredChallengeList] =
    useState<MemberChallengeDetail[]>()

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
  })

  const { data: myChallengeList, isPending } = useQuery<MyChallengeList>({
    queryKey: ['myChallengeList'],
    queryFn: () => getMyChallengeList(user?.memberId as string),
    enabled: !!user?.memberId,
  })

  useEffect(() => {
    if (!myChallengeList) return

    const filteredList: MemberChallengeDetail[] =
      myChallengeList?.memberChallengeDetails?.filter(
        (challenge) => challenge?.status === challengeStatus,
      )
    setFilteredChallengeList(filteredList)
    console.log(filteredList)
  }, [challengeStatus, myChallengeList])

  return (
    <div className="pt-6 px-5">
      <ChallengeStatusButton
        challengeStatus={challengeStatus}
        setChallengeStatus={setChallengeStatus}
        tabType="my"
      />
      <div className="mt-7 flex flex-col gap-4">
        {filteredChallengeList?.map((challenge) => (
          <MyChallengeCard
            title={challenge?.title}
            startDate={challenge?.startDate}
            endDate={challenge?.endDate}
            imageUrl={challenge?.image}
            status={challenge?.status}
            memberStatus={challenge?.memberStatus}
            challengeId={challenge?.challengeId}
            type={challenge?.type}
          />
        ))}
        {!isPending &&
          (!filteredChallengeList || filteredChallengeList?.length === 0) && (
            <div className="flex flex-col gap-7 justify-center items-center h-96">
              <Image
                src="/gif/crying-face.gif"
                alt="not-found"
                width={80}
                height={80}
              />
              <p className="text-center font-medium text-_grey-400">
                {challengeStatus === 'SCHEDULED'
                  ? '참여예정인'
                  : challengeStatus === 'IN_PROGRESS'
                    ? '참여중인'
                    : '완료한'}{' '}
                챌린지가 없습니다!
              </p>
            </div>
          )}
      </div>
    </div>
  )
}
