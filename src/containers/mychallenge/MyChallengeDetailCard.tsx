'use client'

import ChallengeButton from '@/components/ChallengeButton'
import MiniChallengeCard from '@/components/MiniChallengeCard'

interface Props {
  title: string
  startDate?: string
  endDate?: string
  imageUrl: string
  isChallengeSuccessful?: boolean
  isSettled?: boolean
  isChatPage?: boolean
  participantCount?: number
  detailPage?: boolean
}

export default function MyChallengeDetailCard({
  title,
  startDate,
  endDate,
  imageUrl,
  isChallengeSuccessful,
  isSettled,
  isChatPage = false,
  participantCount = 0,
  detailPage = false,
}: Props) {
  const today = new Date()
  const start = new Date(startDate as string)
  const end = new Date(endDate as string)

  const challengeStatus = (() => {
    switch (true) {
      case today < start:
        return '참여예정'
      case today >= start && today <= end:
        return '참여중'
      case isChallengeSuccessful && !isSettled:
        return '정산필요'
      default:
        return '완료'
    }
  })()

  return (
    <div className="w-full">
      <MiniChallengeCard
        title={title}
        startDate={startDate}
        endDate={endDate}
        imageUrl={imageUrl}
        isChatPage={isChatPage}
        participantCount={participantCount}
      />
      <div className="-mt-4">
        <ChallengeButton status={challengeStatus} detailPage={detailPage} />
      </div>
    </div>
  )
}
