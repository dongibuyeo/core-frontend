'use client'

import TransferFirstStep from '@/containers/transfer/TransferFirstStep'
import TransferSecondStep from '@/containers/transfer/TransferSecondStep'
import TransferThirdStep from '@/containers/transfer/TransferThirdStep'
import { getChallengeAccount } from '@/services/account'
import { getUserInfo } from '@/services/auth'
import useTransferAccountStore from '@/store/transferAccountStore'
import { TransferType } from '@/types/transfer'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'

export default function Transfer() {
  const router = useRouter()
  const params = useParams<{ type: TransferType; step: string }>()

  let email
  if (typeof window !== 'undefined') email = localStorage.getItem('email')

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: !!email,
  })
  const { type, step } = params
  const { data: myChallengeAccount } = useQuery({
    queryKey: ['account', 'challenge'],
    queryFn: () => getChallengeAccount(userInfo?.memberId as string),
    enabled: !!userInfo?.memberId,
  })
  const selectedAccount = useTransferAccountStore(
    (state) => state.selectedAccount,
  )

  let sourceAccount = null
  let destinationAccount = null

  if (type === 'fill') {
    sourceAccount = selectedAccount
    destinationAccount = myChallengeAccount
  }
  if (type === 'send') {
    sourceAccount = myChallengeAccount
    destinationAccount = selectedAccount
  }

  if (!sourceAccount || !destinationAccount) {
    router.push('/mypage')
    return null
  }

  const renderPage = () => {
    switch (Number(step)) {
      case 1:
        return (
          <TransferFirstStep
            type={type}
            sourceAccount={sourceAccount}
            destinationAccount={destinationAccount}
          />
        )
      case 2:
        return (
          <TransferSecondStep
            type={type}
            sourceAccount={sourceAccount}
            destinationAccount={destinationAccount}
          />
        )
      case 3:
        return (
          <TransferThirdStep
            type={type}
            destinationAccountName={destinationAccount.accountName}
          />
        )
      default:
        return null
    }
  }

  return <div className="w-full h-main-screen">{renderPage()}</div>
}
