import Image from 'next/image'

type Props = {
  title: string
  participants: number
  fund: number
}

function FundCard({ title, participants, fund }: Props) {
  return (
    <div className="bg-white border-_grey-200 border-[0.5px] shadow-[0px_1px_4px_rgba(12, 12, 13, 0.05)] rounded-xl p-4 relative w-full">
      <div className="flex items-center mb-6">
        <div className="mr-1">
          <Image
            src="/image/icon-192x192.png"
            alt="Icon"
            width={48}
            height={48}
          />
        </div>
        <div>
          <h2 className="font-medium">{title}</h2>
          <p className="text-sm text-_blue-300 font-medium">
            현재 {participants.toLocaleString()}명 참여 중
          </p>
        </div>
      </div>
      <div className="text-[32px] text-end">
        <span className="font-bold mr-1">{fund.toLocaleString()}</span>
        <span>원</span>
      </div>
    </div>
  )
}

export default FundCard
