'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { calculateDday } from '@/utils/calculateDday'
import { ArrowRight } from '@/public/svg'
import ChallengeButton from './ChallengeButton'

interface Props {
  title: string
  startDate: string
  endDate: string
  imageUrl: string
  isChallengeSuccessful?: boolean
  isSettled?: boolean
}

export default function MyChallengeCard({
  title,
  startDate,
  endDate,
  imageUrl,
  isChallengeSuccessful,
  isSettled,
}: Props) {
  const challengeStatus = useMemo(() => {
    const today = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (today < start) {
      return '참여 예정'
    }
    if (today >= start && today <= end) {
      return '진행중'
    }

    if (isChallengeSuccessful) {
      return isSettled ? '완료' : '정산필요'
    }

    return '완료'
  }, [startDate, endDate, isChallengeSuccessful, isSettled])

  let mappedStatus: '참여예정' | '참여중' | '정산필요' | '완료'

  if (challengeStatus === '참여 예정') {
    mappedStatus = '참여예정'
  } else if (challengeStatus === '진행중') {
    mappedStatus = '참여중'
  } else if (challengeStatus === '정산필요') {
    mappedStatus = '정산필요'
  } else {
    mappedStatus = '완료'
  }

  const statusColor =
    challengeStatus === '정산필요' ? 'text-red-500' : 'text-_blue-300'

  return (
    <div className="w-full bg-white rounded-2xl px-4 items-center border border_grey-200/50 divide-y divide-_grey-200/50">
      <div className="flex items-center w-full py-4">
        <div className="flex w-[3.75rem] h-[3.75rem] overflow-hidden rounded-lg mr-3">
          <Image
            src={imageUrl}
            alt="Challenge Image"
            height={60}
            width={60}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className={`text-xs font-medium ${statusColor}`}>
            {challengeStatus === '참여 예정' || challengeStatus === '진행중'
              ? calculateDday(startDate)
              : challengeStatus}
          </span>
          <div className="flex flex-col justify-start">
            <span className="text-lg font-medium text-black">{title}</span>
            <span className="text-sm text-_grey-300">
              {startDate} ~ {endDate}
            </span>
          </div>
        </div>
        <button type="button" className="ml-auto" aria-label="View details">
          <ArrowRight />
        </button>
      </div>
      <div className="w-full">
        <ChallengeButton status={mappedStatus} detailPage={false} />
      </div>
    </div>
  )
}
