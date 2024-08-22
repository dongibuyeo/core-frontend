import Image from 'next/image'

type Props = {
  account: string
  balance: number
}

function AccountCard({ account, balance }: Props) {
  return (
    <div className="bg-white border-_grey-200 border-[.0313rem] shadow-[0rem_.0625rem_.25rem_rgba(12, 12, 13, 0.05)] rounded-xl p-4 relative w-full">
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
          <h2 className="font-medium text-sm">
            입출금
            <span className="text-[#7d7d7d] ml-1">
              쏠편한 챌린지 입출금통장(저축예금)
            </span>
          </h2>
          <p className="text-sm text-[#7d7d7d]">신한 {account}</p>
        </div>
      </div>
      <div className="text-[2rem] text-end">
        <span className="font-bold mr-1">{balance.toLocaleString()}</span>
        <span>원</span>
      </div>
    </div>
  )
}

export default AccountCard
