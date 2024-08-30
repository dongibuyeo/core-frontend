import MyChallengeAchievementRate from '@/containers/mychallenge/MyChallengeAchievementRate'
import MyScoreHistory from '@/containers/mychallenge/MyScoreHistory'

export default function MyChallengeDetail() {
  return (
    <div>
      <MyScoreHistory scores={[]} />
      <MyChallengeAchievementRate
        progressPercentage={67}
        category="카페"
        isSuccess
      />
    </div>
  )
}
