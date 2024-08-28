'use client'

import Image from 'next/image'
import { calculateDday } from '@/utils/calculateDday'

interface Props {
  title: string
  startDate: string
  endDate: string
  imageUrl: string
  isChallengeSuccessful?: boolean
  isSettled?: boolean
  isChatPage?: boolean
  participantCount?: number
}

export default function MiniChallengeCard({
  title,
  startDate,
  endDate,
  imageUrl,
  isChallengeSuccessful,
  isSettled,
  isChatPage = false,
  participantCount = 0,
}: Props) {
  const today = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)

  const challengeStatus = (() => {
    switch (true) {
      case today < start:
        return '참여 예정'
      case today >= start && today <= end:
        return '진행중'
      case isChallengeSuccessful && !isSettled:
        return '정산필요'
      default:
        return '완료'
    }
  })()

  const statusColor =
    challengeStatus === '정산필요' ? 'text-_red' : 'text-_blue-300'

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
          <span className={`text-lg font-medium ${statusColor}`}>
            {challengeStatus === '참여 예정' || challengeStatus === '진행중'
              ? calculateDday(startDate)
              : challengeStatus}
          </span>
          <span className="text-lg font-medium text-black ml-1">{title}</span>
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
