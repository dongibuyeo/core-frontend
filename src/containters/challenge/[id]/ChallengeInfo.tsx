'use client'

import { useState } from 'react'

import {
  ArrowDown,
  Calendar,
  Flag,
  MoneyBag,
  SuccessModalChart,
  Trophy,
} from '@/public/svg/index'
import FundCard from '@/components/FundCard'
import Button from '@/components/ui/Button'

export default function ChallengeInfo() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isFailModalOpen, setIsFailModalOpen] = useState(false)

  return (
    <div className="px-5 flex flex-col gap-[3.75rem] pb-24">
      <div className="mt-7">
        <div className="text-sm font-normal">절약 챌린지</div>
        <div className="text-2xl font-medium mt-2">한 달 커피 소비 줄이기</div>
        <div className="text-base font-normal mt-6">
          [카페] 카테고리 소비가 지난 달 대비 줄어들면 성공!
        </div>
      </div>
      <div>
        <div className="flex space-x-1 items-center">
          <Calendar />
          <span className="text-lg font-medium">챌린지 참여기간</span>
        </div>
        <div className="bg-_grey-100 w-full py-5 mt-4 text-center rounded-xl">
          <span className="text-_grey-400 text-base font-medium">
            2024.09.01 ~ 2024.09.31
          </span>
        </div>
      </div>
      <div>
        <div className="flex space-x-1 items-center">
          <Flag />
          <span className="text-lg font-medium">내 챌린지 성공조건</span>
        </div>
        <div className="bg-_grey-100 w-full p-4 mt-4 text-center rounded-xl text-sm font-normal">
          <p>이번 달 나의 [카페] 소비 내역</p>
          <p className="mt-1">
            <span className="text-xl font-bold text-primary">75,400</span>원
          </p>
          <p className="mt-5">
            다음 달 &lt;카페&gt; 소비가{' '}
            <span className="text-medium text-primary">75,400</span>원 미만이면
            성공이에요!
          </p>
        </div>
      </div>
      <div>
        <div className="flex space-x-1 items-center">
          <MoneyBag />
          <span className="text-lg font-medium">챌린지 누적 기금</span>
        </div>
        <p className="text-base font-normal mt-3 mb-5">
          챌린지에 성공하면{' '}
          <span className="font-medium text-primary">상금을 분배</span>
          받을 수 있어요!
        </p>
        <FundCard
          title="한 달 커피 소비 줄이기 기금"
          participants={3786}
          fund={3201000}
        />
      </div>
      <div>
        <div className="flex space-x-1 items-center">
          <MoneyBag />
          <span className="text-lg font-medium">챌린지 누적 기금</span>
        </div>
        <p className="text-base font-normal mt-3 mb-5">
          챌린지에 성공하면{' '}
          <span className="font-medium text-primary">상금을 분배</span>
          받을 수 있어요!
        </p>
        <div
          role="presentation"
          className="bg-_blue-300/10 w-full p-4 mt-4 rounded-xl cursor-pointer"
          onClick={() => setIsSuccessModalOpen((prev) => !prev)}
        >
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="font-medium">챌린지 성공 시</div>
                <div className="text-sm font-normal">
                  예치금 전액 환급 +{' '}
                  <span className="text-primary font-medium">상금</span>
                </div>
              </div>
              <ArrowDown
                className={`w-5 h-5 transition-transform duration-300 ${isSuccessModalOpen && 'rotate-180'}`}
              />
            </div>
            <div
              className={`w-auto flex flex-col gap-2 overflow-hidden transition-max-height duration-300 ease-in-out ${
                isSuccessModalOpen ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <div className="text-sm font-normal mt-5">
                상금 = 예치금 이자 + 실패한 인원의 예치금
              </div>
              <div className="text-xs font-normal">
                상금의 50%는 상위 10%에게,
                <br />
                나머지 50%는 하위 90%에게 1/n로 분배됩니다!
              </div>
              <div className="w-full flex justify-center">
                <SuccessModalChart className="w-3/4 object-cover" />
              </div>
            </div>
          </div>
        </div>
        <div
          role="presentation"
          className="bg-[#EA4141]/10 w-full p-4 mt-4 rounded-xl cursor-pointer"
          onClick={() => setIsFailModalOpen((prev) => !prev)}
        >
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="font-medium">챌린지 실패 시</div>
                <div className="text-sm font-normal">
                  지난 달 소비액 대비 증가율만큼 예치금 차감
                </div>
              </div>
              <ArrowDown
                className={`w-5 h-5 transition-transform duration-300 ${isFailModalOpen && 'rotate-180'}`}
              />
            </div>
            <div
              className={`w-auto flex flex-col gap-2 overflow-hidden transition-max-height duration-300 ease-in-out ${
                isFailModalOpen ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <div className="text-sm font-normal mt-5">
                환급액 = 예치금 - (예치금 * 증가율)
              </div>
              <div className="text-xs font-normal text-_grey-400">
                <span className="font-medium">예시</span>
                <br />
                지난 달 소비액 10,000원
                <br />
                이번 달 소비액 12,000원
                <br />
                증가율 = 20%
                <br />
                <br />
                환급액 = 10,000원 - (10,000원 * 0.2) = 8,000원
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex space-x-1 items-center">
          <Trophy />
          <span className="text-lg font-medium">랭킹 산정 방식</span>
        </div>
        <p className="text-base font-medium mt-3 mb-5 text-primary">
          랭킹 상위 10%는 상금을 더 많이 분배받아요!
        </p>
        <div className="bg-_grey-100 w-full p-6 mt-4 text-center rounded-xl flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="font-normal">일일 기본 점수</div>
            <div className="font-medium text-primary">+ 10</div>
          </div>
          <div className="flex justify-between items-end">
            <div className="font-normal">
              모닝커피 참기{' '}
              <span className="text-_grey-400 font-normal text-xs">
                (오전 7시~ 오전 10시)
              </span>
            </div>
            <div className="font-medium text-primary">+ 2</div>
          </div>
          <div className="flex justify-between items-end">
            <div className="font-normal">
              식후커피 참기{' '}
              <span className="text-_grey-400 font-normal text-xs">
                (오전 11시~ 오후 2시)
              </span>
            </div>
            <div className="font-medium text-primary">+ 3</div>
          </div>
          <div className="flex justify-between">
            <div className="font-normal">커피 마실 경우</div>
            <div className="font-medium text-[#E91717]">- 5</div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 px-5 w-full pb-9">
        <Button text="참여하기" className="text-white" />
      </div>
    </div>
  )
}
