import AmountInput from '@/components/AmountInput'
import Button from '@/components/ui/Button'
import { TRANSFER_QUICK_AMOUNT_LIST } from '@/constants/transfer'
import { Account } from '@/types/account'
import { TransferType } from '@/types/transfer'
import Link from 'next/link'

interface Props {
  type: TransferType
  sourceAccount: Account
  destinationAccount: Account
}

export default function TransferFirstStep({
  type,
  sourceAccount,
  destinationAccount,
}: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-[80%] justify-center gap-16">
        <div className="flex flex-col gap-9 justify-center text-center">
          <div>
            <p className="text-xl font-medium mb-1">
              {sourceAccount.accountName}에서
            </p>
            <p className="text-_grey-400">
              출금가능 {sourceAccount.accountBalance.toLocaleString()}원
            </p>
          </div>
          <div>
            <p className="text-xl font-medium mb-1">
              {destinationAccount.accountName}으로
            </p>
            <p className="text-_grey-400">
              잔액 {destinationAccount.accountBalance.toLocaleString()}원
            </p>
          </div>
        </div>
        <AmountInput
          placeholder={type === 'fill' ? '가져올 금액' : '보낼 금액'}
          quickAmounts={TRANSFER_QUICK_AMOUNT_LIST}
          hasFullAmountOption
          balance={Number(sourceAccount.accountBalance)}
          errorMessage="잔액보다 많이 가져올 수 없습니다."
        />
      </div>
      <Link href={`/transfer/${type}/2`} className="mt-auto">
        <Button text="다음" />
      </Link>
    </div>
  )
}
