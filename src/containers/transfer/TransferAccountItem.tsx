import Image from 'next/image'

interface Props {
  bank: string
  accountName: string
  accountNumber: number
  balance: number
}

export default function TransferAccountItem({
  bank,
  accountName,
  accountNumber,
  balance,
}: Props) {
  return (
    <div className="w-full p-4 flex items-center gap-3">
      <Image
        src="/image/toss-logo.png"
        alt="toss-logo"
        width={80}
        height={80}
        className="w-11 h-11 rounded-full"
      />
      <div className="flex flex-col flex-1">
        <p>{accountName}</p>
        <p className="flex gap-1 text-sm text-_grey-400">
          <span>{bank}</span>
          <span>{accountNumber}</span>
        </p>
      </div>
      <p className="text-sm font-medium">{balance.toLocaleString()}원</p>
    </div>
  )
}
