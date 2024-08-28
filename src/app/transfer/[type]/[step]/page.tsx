'use client'

import TransferFirstStep from '@/containters/transfer/TransferFirstStep'
import TransferSecondStep from '@/containters/transfer/TransferSecondStep'
import TransferThirdStep from '@/containters/transfer/TransferThirdStep'
import useTransferAccountStore from '@/store/transferAccountStore'
import { TransferType } from '@/types/transfer'
import { useParams, useRouter } from 'next/navigation'

export default function Transfer() {
  const router = useRouter()
  const params = useParams<{ type: TransferType; step: string }>()
  const { type, step } = params

  const selectedAccount = useTransferAccountStore(
    (state) => state.selectedAccount,
  )
  const myChallengeAccount = {
    accountName: '신한 쏠쏠한 챌린지 통장',
    accountNumber: 110472000000,
    balance: 0,
    bank: '신한',
    id: 1,
  }

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
