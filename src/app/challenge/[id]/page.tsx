'use client'

import ChallengeRanking from '@/containters/challenge/[id]/ChallengeRanking'
import ChallengeInfo from '@/containters/challenge/[id]/ChallengeInfo'
import { ArrowLeft } from '@/public/svg/index'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ChallengeDetailPage() {
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState('info')

  return (
    <div className="w-full h-full">
      <Image
        src="/image/coffee.jpg"
        alt="챌린지 썸네일"
        height={400}
        width={400}
        className={`w-full aspect-square object-cover object-center fixed top-0 left-0 transition-opacity duration-200 ${currentTab === 'ranking' ? 'opacity-0' : 'opacity-100'}`}
      />
      <div className="fixed top-0 left-0 w-full aspect-square bg-gradient-to-b from-black to-transparent opacity-20" />
      <nav
        className={`bg-white z-20 fixed top-0 left-0 flex items-center h-[3.75rem] w-full px-[.625rem] space-x-[.625rem] transition-opacity duration-200 ${currentTab === 'ranking' ? 'opacity-100' : 'opacity-0'}`}
      >
        <ArrowLeft
          className="cursor-pointer w-6 h-6"
          onClick={() => router.back()}
        />
      </nav>
      <div className="relative">
        <div
          className={`w-full transition-max-height duration-300 ease-out ${currentTab === 'info' ? 'max-h-screen' : 'max-h-0'}`}
        >
          <div className="aspect-4-3" />
        </div>
        <div
          className={`relative z-50 w-full ${currentTab === 'info' && 'rounded-t-[2rem]'} bg-white`}
        >
          <div className="flex">
            <button
              type="button"
              className="w-1/2 py-5 font-medium"
              onClick={() => {
                setCurrentTab('info')
                window.scrollTo(0, 0)
              }}
            >
              <span
                className={`${currentTab === 'info' && 'border-b-2 border-black font-medium'} leading-5`}
              >
                챌린지 정보
              </span>
            </button>
            <button
              type="button"
              className="w-1/2 py-5 font-normal"
              onClick={() => {
                setCurrentTab('ranking')
                window.scrollTo(0, 0)
              }}
            >
              <span
                className={`${currentTab === 'ranking' && 'border-b-2 border-black font-medium'} leading-5`}
              >
                현재랭킹
              </span>
            </button>
          </div>
          <div className="px-5">
            {currentTab === 'info' && <ChallengeInfo />}
            {currentTab === 'ranking' && <ChallengeRanking />}
          </div>
        </div>
      </div>
    </div>
  )
}
