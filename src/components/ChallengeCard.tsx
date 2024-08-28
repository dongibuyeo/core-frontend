'use client'

import { KeyboardEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { calculateDday } from '@/utils/calculateDday'
import Button from '@/components/ui/Button'

interface Props {
  id: string
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
      className={`w-full flex flex-col cursor-pointer relative rounded-2xl bg-slate-100 ${isChallengeEnded ? 'pointer-events-none' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={isChallengeEnded ? -1 : 0}
    >
      {isChallengeEnded && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col gap-3 items-center justify-center rounded-2xl z-10 px-9">
          <span className="text-white text-xl font-medium">
            마감된 챌린지입니다
          </span>
          <Button
            text="결과보기"
            className="text-white pointer-events-auto"
            url={`/challenge/result/${id}`}
          />
        </div>
      )}
      <div className="relative w-full">
        <Image
          src={imageUrl}
          alt="Challenge Image"
          height={400}
          width={400}
          className="w-full rounded-t-2xl object-cover aspect-half"
        />
        <div className="absolute top-3 right-4 bg-black text-white text-xs px-5 py-1 rounded-xl">
          {participants.toLocaleString()}명 참여 중
        </div>
      </div>
      <div className="p-3 flex flex-col gap-2">
        <h3 className="text-sm font-medium">
          <span className="text-primary text-base">
            {calculateDday(startDate)}
          </span>
          <span className="text-black ml-2 text-base">{title}</span>
        </h3>
        <div className="flex justify-between items-center w-full pl-[.125rem]">
          <span className="text-_grey-300 text-xs leading-none">
            {dateRange}
          </span>
          <div className="flex items-center">
            <span className="text-_grey-300 text-xs leading-none">
              누적 기금{' '}
            </span>
            <span className="text-_blue-300 ml-1 font-medium leading-none">
              {fund.toLocaleString()} 원
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
