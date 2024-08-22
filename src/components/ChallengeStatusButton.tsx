/* eslint-disable no-nested-ternary */

'use client'

import { ChallengeStatus } from '@/types/ChallengeStatus'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  challengeStatus: ChallengeStatus
  setChallengeStatus: Dispatch<SetStateAction<ChallengeStatus>>
  tabCount: 'two' | 'three'
}
export default function ChallengeStatusButton({
  challengeStatus,
  setChallengeStatus,
  tabCount,
}: Props) {
  return (
    <div
      className={`relative z-10 w-full grid ${tabCount === 'two' ? 'grid-cols-2' : 'grid-cols-3'} bg-[#EDEDED] px-2 py-[.375rem] rounded-3xl mb-9 text-lg`}
    >
      <div
        className={`z-0 absolute px-[.375rem] py-2  ${tabCount === 'two' ? 'w-1/2' : 'w-1/3'} left-2 right-2 top-[.375rem] h-[2.75rem] bg-white rounded-[1.3125rem] transition-transform duration-300 ${challengeStatus === 'SCHEDULED' ? 'translate-x-0' : challengeStatus === 'IN_PROGRESS' ? 'translate-x-custom_100_three' : tabCount === 'two' ? 'translate-x-custom_100_two' : 'translate-x-custom_200'}`}
      />
      <button
        type="button"
        className={`${challengeStatus === 'SCHEDULED' ? 'font-medium' : 'font-normal text-_grey-300'} relative bg-transparent rounded-[1.3125rem] px-5 py-2 transition-colors duration-300 min-w-max`}
        onClick={() => setChallengeStatus('SCHEDULED')}
      >
        진행예정
      </button>
      {tabCount === 'three' && (
        <button
          type="button"
          className={`${challengeStatus === 'IN_PROGRESS' ? 'font-medium' : 'font-normal text-_grey-300'} relative bg-transparent rounded-[1.3125rem] px-5 py-2 transition-colors duration-300 min-w-max`}
          onClick={() => setChallengeStatus('IN_PROGRESS')}
        >
          진행중
        </button>
      )}
      <button
        type="button"
        className={`${challengeStatus === 'COMPLETED' ? 'font-medium' : 'font-normal text-_grey-300'} relative bg-transparent rounded-[1.3125rem] px-5 py-2 transition-colors duration-300 min-w-max`}
        onClick={() => setChallengeStatus('COMPLETED')}
      >
        마감
      </button>
    </div>
  )
}
