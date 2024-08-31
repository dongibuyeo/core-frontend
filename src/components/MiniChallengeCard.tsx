'use client'

import Image from 'next/image'
import { calculateDday } from '@/utils/calculateDday'
import { formatDate } from '@/utils/formatDate'

interface Props {
  title: string
  startDate?: string
  endDate?: string
  imageUrl: string
  isChatPage?: boolean
  participantCount?: number
  memberStatus?: string
}

export default function MiniChallengeCard({
  title,
  startDate,
  endDate,
  imageUrl,
  memberStatus,
  isChatPage = false,
  participantCount = 0,
}: Props) {
  const today = new Date()
  const start = new Date(formatDate(startDate as string))
  const end = new Date(formatDate(endDate as string))

  const challengeStatus = (() => {
    switch (true) {
      case today < start:
        return '참여 예정'
      case today >= start && today <= end:
        return '진행중'
      case memberStatus === 'REWARDED':
        return '완료'
      default:
        return '정산필요'
    }
  })()

  const statusColor =
    challengeStatus === '정산필요' ? 'text-_red' : 'text-_blue-300'

  const formattedParticipantCount = participantCount.toLocaleString()

  return (
    <div className="flex items-center bg-white w-full py-4">
      <div className="flex w-[3.75rem] h-[3.75rem] overflow-hidden rounded-lg mr-4">
        <Image
          src={`/image/challenge/${imageUrl}.jpg`}
          alt="Challenge Image"
          height={60}
          width={60}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-start items-center">
          {!isChatPage && (
            <span className={`text-lg font-medium mr-1 ${statusColor}`}>
              {challengeStatus === '참여 예정' || challengeStatus === '진행중'
                ? calculateDday(formatDate(startDate as string))
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
            : `${formatDate(startDate as string)} ~ ${formatDate(endDate as string)}`}
        </span>
      </div>
    </div>
  )
}
