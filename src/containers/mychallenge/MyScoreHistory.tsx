import { ScoreDetail, ArrowRight } from '@/public/svg/index'
import SectionTitle from '@/components/ui/SectionTitle'
import ScoreCard from '@/components/ScoreCard'

interface Props {
  scores: {
    score: number
    description: string
    date: string
    additionalScore: number
  }[]
}

export default function ScoreHistory({ scores }: Props) {
  return (
    <div className="w-full">
      <div className="flex p-4 mb-4 items-center justify-between">
        <SectionTitle icon={<ScoreDetail />} label="챌린지 점수내역" />
        <ArrowRight />
      </div>
      <div>
        {scores.map((scoreDetail) => (
          <ScoreCard
            key={`${scoreDetail.date}-${scoreDetail.score}`}
            score={scoreDetail.score}
            description={scoreDetail.description}
            date={new Date(scoreDetail.date).toLocaleDateString('ko-KR')}
            additionalScore={scoreDetail.additionalScore}
          />
        ))}
      </div>
    </div>
  )
}
