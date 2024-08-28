import { Lay } from '@/public/svg/index'

export default function SavingsRecommendCard() {
  return (
    <div
      role="presentation"
      className="bg-primary/10 rounded-2xl px-5 py-1 flex justify-between items-center cursor-pointer"
    >
      <div>
        <p className="text-xl font-medium">쏠편한 챌린지 777적금</p>
        <p className="mt-1 text-sm font-medium text-_grey-400">
          7주 동안 매일 7천 원씩 저금하기!
        </p>
      </div>
      <Lay className="h-[7rem]" />
    </div>
  )
}
