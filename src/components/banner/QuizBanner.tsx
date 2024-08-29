import { Close } from '@/public/svg/index'
import Image from 'next/image'

interface Props {
  setIsBannerOpen: (value: boolean) => void
}

export default function QuizBanner({ setIsBannerOpen }: Props) {
  return (
    <div className="px-6 py-4 bg-_grey-100 rounded-2xl flex mt-3 mb-5">
      <div className="w-full flex items-center justify-between">
        <div className="flex space-x-4 items-center">
          <Image
            src="/gif/100.gif"
            width={32}
            height={32}
            alt="100점"
            className="w-8 h-8"
          />
          <div className="flex flex-col gap-1">
            <p className="leading-5 text-base font-medium text-_grey-400">
              경제 퀴즈 풀고 상금받기
            </p>
            <button
              type="button"
              className="leading-5 text-sm font-normal text-primary"
            >
              SOL-ving 퀴즈 챌린지 참여하기 &gt;
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
