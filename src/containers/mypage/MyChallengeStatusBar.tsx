import StatusItem from './StatusItem'

function MyChallengeStatusBar() {
  return (
    <div className="w-full bg-_grey-100 rounded-xl p-3 flex justify-between items-center divide-x divide-_grey-400">
      <StatusItem count={1} label="참여예정" />
      <StatusItem count={1} label="참여중" />
      <StatusItem count={2} label="완료" />
    </div>
  )
}

export default MyChallengeStatusBar
