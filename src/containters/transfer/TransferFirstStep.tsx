import AmountInput from '@/components/AmountInput'
import Button from '@/components/ui/Button'
import { TRANSFER_QUICK_AMOUNT_LIST } from '@/constants/quickAmounts'
import useTransferAccountStore from '@/store/transferAccountStore'
import { useRouter } from 'next/navigation'

export default function TransferFirstStep({ type }: { type: 'fill' | 'send' }) {
  const router = useRouter()
  const sourceAccount = useTransferAccountStore(
    (state) => state.selectedAccount,
  )

  const destinationAccount = {
    accountName: '신한 쏠쏠한 챌린지 통장',
    accountNumber: 110472000000,
    balance: 0,
    bank: '토스뱅크',
    id: 1,
  }

  const handleClickNextBtn = () => {}

  if (!sourceAccount) {
    router.push('/mypage')
    return null
  }

  return (
    <>
      <div className="text-center mt-16">
        <p className="text-xl font-medium">{sourceAccount.accountName}에서</p>
        <p className="text-_grey-400">
          출금가능 {sourceAccount.balance.toLocaleString()}원
        </p>
      </div>
      <div className="text-center mb-10">
        <p className="text-xl font-medium">
          {destinationAccount.accountName}으로
        </p>
        <p className="text-_grey-400">
          잔액 {destinationAccount.balance.toLocaleString()}원
        </p>
      </div>
      <AmountInput
        placeholder={type === 'fill' ? '가져올 금액' : '보낼 금액'}
        quickAmounts={TRANSFER_QUICK_AMOUNT_LIST}
        hasFullAmountOption
        balance={sourceAccount.balance}
        errorMessage="잔액보다 많이 가져올 수 없습니다."
      />
      <div className="mt-auto w-full" onClick={handleClickNextBtn} aria-hidden>
        <Button text="다음" />
      </div>
    </>
  )
}
