interface Props {
  count: number
  label: string
}

function StatusItem({ count, label }: Props) {
  return (
    <div className="flex-1 text-center">
      <div className="text-lg font-medium">{count}</div>
      <div className="text-_grey-400 text-xs">{label}</div>
    </div>
  )
}

function MyChallengeStatusBar() {
  return (
    <div className="w-full bg-_grey-100 rounded-xl p-3 flex justify-between items-center">
      <StatusItem count={1} label="참여예정" />
      <div className="h-10 w-[.0625rem] bg-_grey-400" />
      <StatusItem count={1} label="참여중" />
      <div className="h-10 w-[.0625rem] bg-_grey-400" />
      <StatusItem count={2} label="완료" />
    </div>
  )
}

export default MyChallengeStatusBar
