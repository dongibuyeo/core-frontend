'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { calculateDday } from '@/utils/calculateDday'

interface Props {
  title: string
  startDate: string
  endDate: string
  imageUrl: string
  isChallengeSuccessful?: boolean
  isChatPage?: boolean
  participantCount?: number
}

export default function MiniChallengeCard({
  title,
  startDate,
  endDate,
  imageUrl,
  isChallengeSuccessful,
  isChatPage = false,
  participantCount = 0,
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
    return isChallengeSuccessful ? '정산 필요' : '완료'
  }, [startDate, endDate, isChallengeSuccessful])

  const formattedParticipantCount = participantCount.toLocaleString()

  return (
    <div className="flex items-center bg-white w-full py-4">
      <div className="flex w-[3.75rem] h-[3.75rem] overflow-hidden rounded-lg mr-4">
        <Image
          src={imageUrl}
          alt="Challenge Image"
          height={60}
          width={60}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-start items-center">
          {!isChatPage && (
            <span className="text-lg font-medium text-primary mr-1">
              {challengeStatus === '참여 예정' || challengeStatus === '진행중'
                ? calculateDday(startDate)
                : challengeStatus}
            </span>
          )}
          <span className="text-lg font-medium text-black">{title}</span>
        </div>
        <span
          className={`text-sm ${isChatPage ? 'text-_blue-300' : 'text-_grey-300'}`}
        >
          {isChatPage
            ? `현재 ${formattedParticipantCount}명 채팅 참여중`
            : `${startDate} ~ ${endDate}`}
        </span>
      </div>
    </div>
  )
}
