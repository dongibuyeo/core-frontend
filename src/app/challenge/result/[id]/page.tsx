'use client'

import FundCard from '@/components/FundCard'
import ChallengeRanking from '@/containters/challenge/[id]/ChallengeRanking'
import PieChartComponent from '@/containters/challenge/result/[id]/ResultChart'
import { Calendar, MoneyBag, People, Rocket, Trophy } from '@/public/svg/index'
import Image from 'next/image'

export default function ChallengeResultPage() {
  return (
    <div className="w-full h-full">
      <Image
        src="/image/coffee.jpg"
        alt="챌린지 썸네일"
        height={400}
        width={400}
        className="w-full aspect-square object-cover object-center fixed top-0 left-0 transition-opacity duration-200"
      />
      <div className="fixed top-0 left-0 w-full aspect-square bg-gradient-to-b from-black to-transparent opacity-20" />
      <div className="relative">
        <div className="w-full transition-max-height duration-300 ease-out">
          <div className="aspect-4-3" />
        </div>
        <div className=" relative z-50 w-full  bg-white rounded-t-[2rem] pt-5">
          <div className="flex justify-center items-center">
            <div className="text-base font-medium border-b-2 py-1 px-3 border-black">
              챌린지 결과
            </div>
          </div>
          <div className="px-5 flex flex-col gap-[3.75rem]">
            <div className="mt-7">
              <div className="text-sm font-normal">절약 챌린지</div>
              <div className="text-2xl font-medium mt-2">
                한 달 커피 소비 줄이기
              </div>
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
                <People />
                <span className="text-lg font-medium">총 참여인원</span>
              </div>
              <div className="bg-_grey-100 w-full py-5 mt-4 text-center rounded-xl">
                <p className="text-base font-medium text-_grey-400">
                  <span className="text-xl font-bold text-primary">3,254</span>{' '}
                  명
                </p>
              </div>
            </div>
            <div>
              <div className="flex space-x-1 items-center">
                <Rocket />
                <span className="text-lg font-medium">성공률</span>
              </div>
              <div className="bg-_grey-100 w-full py-6 mt-4 text-center rounded-xl flex flex-col items-center">
                <div className="relative w-32 h-32">
                  <PieChartComponent successPercentage="80" />
                  <div className="absolute -left-12 bottom-1/2">
                    <p className="text-primary font-bold">
                      <span className="text-2xl">80</span>%
                    </p>
                  </div>
                </div>
                <p className="font-medium text-_grey-400 mt-8">
                  참여자 3,254명 중 <span className="text-primary">2668명</span>
                  이 성공했어요!
                </p>
              </div>
            </div>
            <div>
              <div className="flex space-x-1 items-center mb-4">
                <MoneyBag />
                <span className="text-lg font-medium">분배 상금</span>
              </div>
              <FundCard title="한 달 커피 소비 줄이기 기금" fund={46510000} />
              <div className="bg-_grey-100 w-full p-5 mt-3 rounded-xl text-_grey-400">
                <h2 className="text-base font-medium flex space-x-3">
                  <span>총 상금</span>
                  <span className="text-primary">1,989,233원</span>
                </h2>
                <p className="mt-1 text-sm font-normal">
                  이자 155,033원 + 실패 예치금 1,834,200원
                </p>
                <div className="flex justify-between items-center mt-5">
                  <h3 className="text-base font-medium">
                    상위 10%{' '}
                    <span className="text-xs font-normal">(267명)</span>
                  </h3>
                  <div className="flex items-center space-x-3 min-w-36 justify-between">
                    <p className="text-xs font-normal">예치금 1만원 당 </p>
                    <span className="text-primary text-base font-normal">
                      3,725원
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <h3 className="text-base font-medium">
                    하위 90%
                    <span className="text-xs font-normal">(2401명)</span>
                  </h3>
                  <div className="flex items-center space-x-3 min-w-36 justify-between">
                    <p className="text-xs font-normal">예치금 1만원 당 </p>
                    <span className="text-primary text-base font-normal">
                      414원
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex space-x-1 items-center">
                <Trophy />
                <span className="text-lg font-medium">명예의 전당</span>
              </div>
              <ChallengeRanking />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
