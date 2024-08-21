'use client'

import { KeyboardEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ChallengeCardProps {
  id: number
  title: string
  startDate: string
  endDate: string
  participants: number
  fund: number
  imageUrl: string
}

const calculateDday = (startDate: string) => {
  const today = new Date()
  const start = new Date(startDate)

  const diffTime = start.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays > 0) {
    return `D-${diffDays}`
  }
  return '진행중'
}

export default function ChallengeCard({
  id,
  title,
  startDate,
  endDate,
  participants,
  fund,
  imageUrl,
}: ChallengeCardProps) {
  const router = useRouter()

  const dateRange = `${startDate} ~ ${endDate}`

  const handleClick = () => {
    router.push(`/challenge/${id}`)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick()
    }
  }

  return (
    <div
      className="flex flex-col cursor-pointer relative"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="relative w-[350px] h-[180px]">
        <Image
          src={imageUrl}
          alt="Challenge Image"
          fill
          className="rounded-2xl object-cover"
        />
        <div className="absolute top-3 right-4 bg-black text-white text-xs px-5 py-1 rounded-xl">
          {participants.toLocaleString()}명 참여 중
        </div>
      </div>
      <div className="mt-2 mb-1">
        <h3 className="text-base font-bold">
          <span className="text-primary">{calculateDday(startDate)}</span>
          <span className="text-black ml-2">{title}</span>
        </h3>
      </div>
      <div className="mt-auto flex justify-between w-full text-xs">
        <span className="text-_grey-300">{dateRange}</span>
        <span>
          <span className="text-_grey-300">누적 기금 </span>
          <span className="text-_blue-300 ml-1 font-bold">
            {fund.toLocaleString()} 원
          </span>
        </span>
      </div>
    </div>
  )
}
