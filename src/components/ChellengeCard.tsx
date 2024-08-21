'use client'

import { KeyboardEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { calculateDday } from '@/utils/calculateDday'

type Props = {
  id: number
  title: string
  startDate: string
  endDate: string
  participants: number
  fund: number
  imageUrl: string
}

export default function ChallengeCard({
  id,
  title,
  startDate,
  endDate,
  participants,
  fund,
  imageUrl,
}: Props) {
  const router = useRouter()

  const dateRange = `${startDate} ~ ${endDate}`

  const isChallengeEnded = new Date(endDate) < new Date()

  const handleClick = () => {
    if (!isChallengeEnded) {
      router.push(`/challenge/${id}`)
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick()
    }
  }

  return (
    <div
      className={`flex flex-col pb-2 cursor-pointer relative rounded-2xl ${isChallengeEnded ? 'pointer-events-none' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={isChallengeEnded ? -1 : 0}
    >
      {isChallengeEnded && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl z-10">
          <span className="text-white text-xl font-medium">
            마감된 챌린지입니다
          </span>
        </div>
      )}
      <div className="relative w-full">
        <Image
          src={imageUrl}
          alt="Challenge Image"
          height={400}
          width={400}
          className="rounded-2xl object-cover aspect-video"
        />
        <div className="absolute top-3 right-4 bg-black text-white text-xs px-5 py-1 rounded-xl">
          {participants.toLocaleString()}명 참여 중
        </div>
      </div>
      <div className="mt-2 mb-1">
        <h3 className="text-base font-medium">
          <span className="text-primary text-lg">
            {calculateDday(startDate)}
          </span>
          <span className="text-black ml-2 text-lg">{title}</span>
        </h3>
      </div>
      <div className="mt-auto flex justify-between items-center w-full">
        <span className="text-_grey-300 text-sm leading-none">{dateRange}</span>
        <span className="flex items-center">
          <span className="text-_grey-300 text-sm leading-none">
            누적 기금{' '}
          </span>
          <span className="text-_blue-300 ml-1 font-medium leading-none">
            {fund.toLocaleString()} 원
          </span>
        </span>
      </div>
    </div>
  )
}
