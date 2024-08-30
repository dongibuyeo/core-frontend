import { Trophy } from '@/public/svg/index'
import SectionTitle from '@/components/ui/SectionTitle'

interface Props {
  rankPercent: number
  score: number
  cutoffScore: number
  challengeCompleted: boolean
}

export default function CurrentRanking({
  rankPercent,
  score,
  cutoffScore,
  challengeCompleted,
}: Props) {
  return (
    <div className="w-full">
      <div className="mb-4">
        <SectionTitle
          icon={<Trophy />}
          label={challengeCompleted ? '내 최종 랭킹' : '내 현재 랭킹'}
        />
      </div>
      <div className="bg-_grey-100 pt-6 pb-5 rounded-xl text-center mb-2">
        <p className="text-primary text-xl font-medium">상위 {rankPercent}%</p>
        <p>{score}점</p>
      </div>
      {challengeCompleted ? (
        <p className="text-sm text-_grey-400">
          최종 상위 10% 커트라인은 {cutoffScore}점었어요!
        </p>
      ) : (
        <p className="text-sm text-_grey-400">
          현재 상위 10% 커트라인은 {cutoffScore}점이에요!
        </p>
      )}
    </div>
  )
}
