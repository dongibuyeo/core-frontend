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

export default StatusItem
