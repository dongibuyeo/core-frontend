import { ChallengeStatusCounts } from '@/types/ChallengeStatus'
import StatusItem from './StatusItem'

interface Props {
  challengeStatus: ChallengeStatusCounts
}

function MyChallengeStatusBar({ challengeStatus }: Props) {
  return (
    <div className="w-full bg-_grey-100 rounded-xl p-3 flex justify-between items-center divide-x divide-_grey-400">
      <StatusItem count={challengeStatus.SCHEDULED} label="참여예정" />
      <StatusItem count={challengeStatus.IN_PROGRESS} label="참여중" />
      <StatusItem count={challengeStatus.COMPLETED} label="완료" />
    </div>
  )
}

export default MyChallengeStatusBar
