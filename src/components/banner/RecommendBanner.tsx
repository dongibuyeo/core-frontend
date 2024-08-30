'use client'

import { Close } from '@/public/svg/index'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
  setIsBannerOpen: (value: boolean) => void
}

export default function RecommendBanner({ setIsBannerOpen }: Props) {
  const router = useRouter()

  return (
    <div className="px-6 py-4 bg-_grey-100 rounded-2xl flex mt-3 mb-5">
      <div className="w-full flex items-center justify-between">
        <div className="flex space-x-4 items-center">
          <Image
            src="/gif/money-flying.gif"
            width={32}
            height={32}
            alt="100점"
            className="w-8 h-8"
          />
          <div className="flex flex-col gap-1">
            <p className="leading-5 text-base font-medium text-_grey-400">
              돈이 줄줄 새고 있어요!!!!
            </p>
            <button
              type="button"
              className="leading-5 text-sm font-normal text-primary"
              onClick={() => router.push('/recommendation')}
            >
              내 소비패턴에 따른 챌린지 추천받기 &gt;
            </button>
          </div>
        </div>
        <Close
          className="w-4 h-4 cursor-pointer"
          onClick={() => setIsBannerOpen(false)}
        />
      </div>
    </div>
  )
}
