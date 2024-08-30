'use client'

import Image from 'next/image'
import { calculateDday } from '@/utils/calculateDday'
import { ArrowRight } from '@/public/svg'
import { formatDate } from '@/utils/formatDate'
import { useRouter } from 'next/navigation'
import ChallengeButton from './ChallengeButton'

interface Props {
  title: string
  startDate: string
  endDate: string
  imageUrl: string
  status?: string
  memberStatus?: string
  challengeId?: string
  type?: string
}

export default function MyChallengeCard({
  title,
  startDate,
  endDate,
  imageUrl,
  status,
  memberStatus,
  challengeId,
  type,
}: Props) {
  const router = useRouter()
  const today = new Date()
  const start = new Date(formatDate(startDate))
  const end = new Date(formatDate(endDate))

  const challengeStatus: '참여 예정' | '진행중' | '완료' | '정산필요' = (() => {
    if (today < start) {
      return '참여 예정'
    }
    if (today >= start && today <= end) {
      return '진행중'
    }
    if (status === 'COMPLETED') {
      return memberStatus === 'REWARDED' ? '완료' : '정산필요'
    }
    return '완료'
  })()

  const mappedStatus: '참여예정' | '참여중' | '정산필요' | '완료' = (() => {
    switch (challengeStatus) {
      case '참여 예정':
        return '참여예정'
      case '진행중':
        return '참여중'
      case '정산필요':
        return '정산필요'
      default:
        return '완료'
    }
  })()

  const statusColor =
    challengeStatus === '정산필요' ? 'text-_red' : 'text-_blue-300'

  return (
    <div className="w-full bg-white rounded-2xl px-4 items-center border border_grey-200/50 divide-y divide-_grey-200/50">
      <div className="flex items-center w-full py-4">
        <div className="flex min-w-[3.75rem] h-[3.75rem] overflow-hidden rounded-lg mr-3">
          <Image
            src={`/image/challenge/${imageUrl}.jpg`}
            alt="Challenge Image"
            height={60}
            width={60}
            className="object-cover"
          />
        </div>
        <div
          role="presentation"
          className="w-full flex justify-between items-center cursor-pointer"
          onClick={() => router.push(`/challenge/my/${challengeId}`)}
        >
          <div className="flex flex-col">
            <span className={`text-xs font-medium ${statusColor}`}>
              {challengeStatus === '참여 예정' || challengeStatus === '진행중'
                ? calculateDday(formatDate(startDate))
                : challengeStatus}
            </span>
            <div className="flex flex-col justify-start">
              <span className="text-lg font-medium text-black">{title}</span>
              <span className="text-sm text-_grey-300">
                {formatDate(startDate)} ~ {formatDate(endDate)}
              </span>
            </div>
          </div>
          <button type="button" className="ml-auto" aria-label="View details">
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className="w-full">
        <ChallengeButton
          status={mappedStatus}
          detailPage={false}
          type={type}
          challengeId={challengeId}
        />
      </div>
    </div>
  )
}
