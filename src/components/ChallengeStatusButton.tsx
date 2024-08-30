/* eslint-disable no-nested-ternary */

'use client'

import { getUserInfo } from '@/services/auth'
import { getMyChallengeList } from '@/services/challenges'
import { ChallengeStatus } from '@/types/ChallengeStatus'
import { MyChallengeList } from '@/types/MyChallenge'
import { useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  challengeStatus: ChallengeStatus
  setChallengeStatus: Dispatch<SetStateAction<ChallengeStatus>>
  tabType: 'main' | 'my'
}
export default function ChallengeStatusButton({
  challengeStatus,
  setChallengeStatus,
  tabType,
}: Props) {
  const email = localStorage.getItem('email')

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
    enabled: !!email,
  })

  const { data: myChallengeList } = useQuery<MyChallengeList>({
    queryKey: ['myChallengeList'],
    queryFn: () => getMyChallengeList(user?.memberId as string),
    enabled: !!user?.memberId,
  })

  return (
    <div
      className={`relative z-10 w-full grid ${tabType === 'main' ? 'grid-cols-2' : 'grid-cols-3'} bg-[#EDEDED] px-2 py-[.375rem] rounded-3xl mb-9 text-lg`}
    >
      <div
        className={`z-0 absolute px-[.375rem] py-2  ${tabType === 'main' ? 'w-1/2' : 'w-1/3'} left-2 right-2 top-[.375rem] h-[2.75rem] bg-white rounded-[1.3125rem] transition-transform duration-300 ${challengeStatus === 'SCHEDULED' ? 'translate-x-0' : challengeStatus === 'IN_PROGRESS' ? 'translate-x-custom_100_my' : tabType === 'main' ? 'translate-x-custom_100_main' : 'translate-x-custom_200'}`}
      />
      <button
        type="button"
        className={`${challengeStatus === 'SCHEDULED' ? 'font-medium' : 'font-normal text-_grey-300'} relative bg-transparent rounded-[1.3125rem] px-5 py-2 transition-colors duration-300 min-w-max`}
        onClick={() => setChallengeStatus('SCHEDULED')}
      >
        {tabType === 'main' ? '진행예정' : '참여예정'}
      </button>
      {tabType === 'my' && (
        <button
          type="button"
          className={`${challengeStatus === 'IN_PROGRESS' ? 'font-medium' : 'font-normal text-_grey-300'} relative bg-transparent rounded-[1.3125rem] px-5 py-2 transition-colors duration-300 min-w-max`}
          onClick={() => setChallengeStatus('IN_PROGRESS')}
        >
          참여중
        </button>
      )}
      <button
        type="button"
        className={`${challengeStatus === 'COMPLETED' ? 'font-medium' : 'font-normal text-_grey-300'} relative bg-transparent rounded-[1.3125rem] px-5 py-2 transition-colors duration-300 min-w-max`}
        onClick={() => setChallengeStatus('COMPLETED')}
      >
        {tabType === 'main' ? '마감' : '완료'}
        {tabType === 'my' && !!myChallengeList?.totalCalculatedNum && (
          <div className="bg-_red rounded-full w-6 h-6 absolute -top-2 right-1/4 z-10 flex justify-center items-center font-medium text-white">
            {myChallengeList?.totalCalculatedNum}
          </div>
        )}
      </button>
    </div>
  )
}
