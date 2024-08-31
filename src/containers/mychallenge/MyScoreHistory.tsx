import { ScoreDetail } from '@/public/svg/index'
import SectionTitle from '@/components/ui/SectionTitle'
import ScoreCard from '@/components/ScoreCard'

interface DailyScoreEntry {
  description: string
  score: number
  currentTotalScore: number
}

interface DailyScore {
  date: string
  entries: DailyScoreEntry[]
}

interface Props {
  scores: DailyScore[]
}

export default function ScoreHistory({ scores }: Props) {
  return (
    <div className="w-full">
      <div className="flex p-4 items-center justify-between">
        <SectionTitle icon={<ScoreDetail />} label="챌린지 점수내역" />
      </div>
      <div>
        {scores?.map((scoreDetail) =>
          scoreDetail?.entries?.map((dat) => (
            <ScoreCard
              key={`${scoreDetail.date}-${dat.score}`}
              score={dat.currentTotalScore}
              description={dat.description}
              date={scoreDetail?.date}
              additionalScore={dat.score}
            />
          )),
        )}
      </div>
    </div>
  )
}
