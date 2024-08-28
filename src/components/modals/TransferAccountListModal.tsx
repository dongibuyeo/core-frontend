'use client'

import { TRANSFER_TEXT } from '@/constants/transfer'
import TransferAccountItem from '@/containters/transfer/TransferAccountItem'
import useTransferAccountStore from '@/store/transferAccountStore'
import { TransferAccount, TransferType } from '@/types/transfer'
import { useRouter, useSearchParams } from 'next/navigation'

const dummy: TransferAccount[] = [
  {
    id: 1,
    bank: '토스뱅크',
    accountName: '신한 주거래S20 통장',
    accountNumber: 110472000000,
    balance: 121344252,
  },
  {
    id: 2,
    bank: '토스뱅크',
    accountName: '신한 주거래S20 통장',
    accountNumber: 110472000001,
    balance: 121344253,
  },
  {
    id: 3,
    bank: '토스뱅크',
    accountName: '신한 주거래S20 통장',
    accountNumber: 110472000002,
    balance: 121344254,
  },
]

export default function TransferAccountListModal() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const transferType = searchParams.get('type') as TransferType

  const setSelectedAccount = useTransferAccountStore(
    (state) => state.setSelectedAccount,
  )

  const handleAccountSelect = (account: TransferAccount) => {
    setSelectedAccount(account)
    router.push(`/transfer/${transferType}/1`)
  }

  return (
    <div className="w-full h-full bg-white px-2 py-6 rounded-t-[2rem]">
      <h1 className="text-lg font-medium p-4 pt-0">
        {TRANSFER_TEXT[transferType].ACCONT_LIST_TITLE}
      </h1>
      <ul className="overflow-auto max-h-[50dvh] min-h-[12dvh]">
        {dummy.map((account) => (
          <li
            key={account.id}
            onClick={() => handleAccountSelect(account)}
            aria-hidden
          >
            <TransferAccountItem
              bank={account.bank}
              accountName={account.accountName}
              accountNumber={account.accountNumber}
              balance={account.balance}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
