'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
  account: string
  balance: number
  accountType: 'deposit' | 'saving'
}

function AccountCard({ account, balance, accountType }: Props) {
  const router = useRouter()
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
            {accountType === 'deposit' ? '입출금' : '예적금'}
            <span className="text-_grey-400 ml-1">
              {accountType === 'deposit'
                ? '쏠편한 챌린지 입출금통장(저축예금)'
                : '쏠편한 챌린지 777적금 통장'}
            </span>
          </h2>
          <p className="text-sm text-_grey-400">신한 {account}</p>
        </div>
      </div>
      <div className="text-[2rem] text-end">
        <span className="font-bold mr-1">{balance.toLocaleString()}</span>
        <span>원</span>
      </div>
      <div className="mt-5 flex gap-3">
        {accountType === 'deposit' ? (
          <>
            <button
              type="button"
              className="flex flex-1 justify-center items-center bg-[rgba(40,120,245,0.16)] text-primary py-[.5625rem] font-medium rounded-lg"
              onClick={() => router.push('/modals/transfer?type=fill')}
            >
              채우기
            </button>
            <button
              type="button"
              className="flex flex-1 justify-center items-center bg-primary text-white py-[.5625rem] font-medium rounded-lg"
              onClick={() => router.push('/modals/transfer?type=send')}
            >
              보내기
            </button>
          </>
        ) : (
          <button
            type="button"
            className="flex flex-1 justify-center items-center bg-primary text-white py-[.5625rem] font-medium rounded-lg"
            // onClick={} 추후 api 연결 예정
          >
            출금계좌 잔액확인
          </button>
        )}
      </div>
    </div>
  )
}

export default AccountCard
