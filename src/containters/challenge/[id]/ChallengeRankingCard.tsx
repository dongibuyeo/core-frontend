import { Sol } from '@/public/svg/index'

export default function ChallengeRankingCard() {
  return (
    <div className="w-full p-4 flex justify-between items-center border border-_grey-200 rounded-2xl">
      <div className="flex space-x-4 items-center">
        <div className="bg-_blue-300/15 rounded-full w-6 h-6 text-sm font-medium text-_blue-300 flex items-center justify-center">
          1
        </div>
        <div className="flex space-x-2">
          <div className="w-12 h-12 bg-_grey-200 rounded-full flex justify-center items-center">
            <Sol className="h-full" />
          </div>
          <div className="flex flex-col">
            <div className="text-base font-medium">강남건물주될거야</div>
            <div className="text-xs font-normal">(one***)</div>
          </div>
        </div>
      </div>
      <div className="text-base font-medium text-primary">+ 214</div>
    </div>
  )
}
