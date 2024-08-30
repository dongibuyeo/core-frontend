'use client'

import { TRANSFER_TEXT } from '@/constants/transfer'
import TransferAccountItem from '@/containers/transfer/TransferAccountItem'
import { getAllAccount, getChallengeAccount } from '@/services/account'
import { getUserInfo } from '@/services/auth'
import useTransferAccountStore from '@/store/transferAccountStore'
import { Account } from '@/types/account'
import { TransferType } from '@/types/transfer'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'

export default function TransferAccountListModal() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const transferType = searchParams.get('type') as TransferType

  let email
  if (typeof window !== 'undefined') {
    email = localStorage.getItem('email')
  }

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: !!email,
  })

  const { data: challengeAccount } = useQuery({
    queryKey: ['account', 'challenge'],
    queryFn: () => getChallengeAccount(userInfo?.memberId as string),
    enabled: !!userInfo?.memberId,
  })

  const { data: accountList } = useQuery({
    queryKey: ['account', 'all'],
    queryFn: () => getAllAccount(userInfo?.memberId as string),
    enabled: !!userInfo?.memberId && !!challengeAccount,
    select: (data) =>
      data.filter(
        (account) => account.accountNo !== challengeAccount?.accountNo,
      ),
  })

  const setSelectedAccount = useTransferAccountStore(
    (state) => state.setSelectedAccount,
  )

  const handleAccountSelect = (account: Account) => {
    setSelectedAccount(account)
    router.push(`/transfer/${transferType}/1`)
  }

  return (
    <div className="w-full h-full bg-white px-2 py-6 rounded-t-[2rem]">
      <h1 className="text-lg font-medium p-4 pt-0">
        {TRANSFER_TEXT[transferType].ACCOUNT_LIST_TITLE}
      </h1>
      <ul className="overflow-auto max-h-[50dvh] min-h-[12dvh]">
        {accountList?.map((account) => (
          <li
            key={account.accountNo}
            onClick={() => handleAccountSelect(account)}
            aria-hidden
          >
            <TransferAccountItem
              bank={account.bankName}
              accountName={account.accountName}
              accountNumber={Number(account.accountNo)}
              balance={Number(account.accountBalance)}
              bankCode={account.bankCode}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
