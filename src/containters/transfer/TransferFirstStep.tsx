import AmountInput from '@/components/AmountInput'
import Button from '@/components/ui/Button'
import { TRANSFER_QUICK_AMOUNT_LIST } from '@/constants/transfer'
import useTransferAccountStore from '@/store/transferAccountStore'
import { TransferType } from '@/types/transfer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function TransferFirstStep({ type }: { type: TransferType }) {
  const router = useRouter()
  const selectedAccount = useTransferAccountStore(
    (state) => state.selectedAccount,
  )
  const myChallengeAccount = {
    accountName: '신한 쏠쏠한 챌린지 통장',
    accountNumber: 110472000000,
    balance: 0,
    bank: '토스뱅크',
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-[80%] justify-center gap-16">
        <div className="flex flex-col gap-9 justify-center text-center">
          <div>
            <p className="text-xl font-medium mb-1">
              {sourceAccount.accountName}에서
            </p>
            <p className="text-_grey-400">
              출금가능 {sourceAccount.balance.toLocaleString()}원
            </p>
          </div>
          <div>
            <p className="text-xl font-medium mb-1">
              {destinationAccount.accountName}으로
            </p>
            <p className="text-_grey-400">
              잔액 {destinationAccount.balance.toLocaleString()}원
            </p>
          </div>
        </div>
        <AmountInput
          placeholder={type === 'fill' ? '가져올 금액' : '보낼 금액'}
          quickAmounts={TRANSFER_QUICK_AMOUNT_LIST}
          hasFullAmountOption
          balance={sourceAccount.balance}
          errorMessage="잔액보다 많이 가져올 수 없습니다."
        />
      </div>
      <Link href="/transfer/fill/2" className="mt-auto">
        <Button text="다음" />
      </Link>
    </div>
  )
}
