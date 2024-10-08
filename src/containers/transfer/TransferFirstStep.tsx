import AmountInput from '@/components/AmountInput'
import Button from '@/components/ui/Button'
import { TRANSFER_QUICK_AMOUNT_LIST } from '@/constants/transfer'
import useAmountStore from '@/store/amountStore'
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
  const amount = useAmountStore((state) => state.amount)
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-[80%] justify-center gap-16">
        <div className="flex flex-col gap-9 justify-center text-center">
          <div>
            <p className="text-xl font-medium mb-1">
              <span className={`${type === 'fill' && 'text-_blue-300'}`}>
                {sourceAccount.accountName}
              </span>
              에서
            </p>
            <p className="text-_grey-400">
              출금가능 {Number(sourceAccount.accountBalance).toLocaleString()}원
            </p>
          </div>
          <div>
            <p className="text-xl font-medium mb-1">
              <span className={`${type === 'send' && 'text-_blue-300'}`}>
                {destinationAccount.accountName}
              </span>
              으로
            </p>
            <p className="text-_grey-400">
              잔액 {Number(destinationAccount.accountBalance).toLocaleString()}
              원
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
        <Button
          text="다음"
          disabled={(amount as number) > Number(sourceAccount.accountBalance)}
        />
      </Link>
    </div>
  )
}
