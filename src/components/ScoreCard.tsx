'use client'

import { scoreLabelMap } from '@/constants/score-label-map'
import { ScoreUp, ScoreDown } from '@/public/svg'
import { formatDate } from '@/utils/formatDate'

interface Props {
  score: number
  description: string
  date: string
  additionalScore: number
}

export default function ScoreCard({
  score,
  description,
  date,
  additionalScore,
}: Props) {
  const isPositive = additionalScore > 0

  return (
    <div className="flex items-center justify-between bg-white w-full px-2 py-3">
      <div className="flex items-center">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isPositive ? 'bg-_blue-300/15' : 'bg-_red/10'
          }`}
        >
          {isPositive ? (
            <ScoreUp className="text-_blue-300 w-4 h-4 mt-1" />
          ) : (
            <ScoreDown className="text-_red w-4 h-4 mt-1" />
          )}
        </div>
        <div className="ml-3">
          <span>{score}점</span>
          <div className="text-sm text-_grey-400">
            {scoreLabelMap[description]} ・ {formatDate(date)}
          </div>
        </div>
      </div>
      <div
        className={`font-medium ${
          isPositive ? 'text-_blue-300 ' : 'text-_red'
        }`}
      >
        {isPositive ? `+${additionalScore}` : `${additionalScore}`}점
      </div>
    </div>
  )
}
