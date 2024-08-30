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
      <div className="flex mb-4 justify-between">
        <SectionTitle icon={<ScoreDetail />} label="챌린지 점수내역" />
        <ArrowRight />
      </div>
      <div>
        <ScoreCard />
      </div>
    </div>
  )
}
