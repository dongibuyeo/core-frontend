import Button from '@/components/ui/Button'
import { TRANSFER_TEXT } from '@/constants/transfer'
import useAmountStore from '@/store/amountStore'
import { Account } from '@/types/account'
import { TransferType } from '@/types/transfer'
import Link from 'next/link'

interface Props {
  type: TransferType
  sourceAccount: Account
  destinationAccount: Account
}

export default function TransferSecondStep({
  type,
  sourceAccount,
  destinationAccount,
}: Props) {
  const amount = useAmountStore((state) => state.amount)

  return (
    <div className="flex flex-col items-center h-full justify-center gap-7">
      <div className="text-2xl font-medium gap-3 h-full flex flex-col justify-center items-center">
        <p>{destinationAccount.accountName}으로</p>
        <p>
          <span className="text-_blue-300">
            {(amount as number).toLocaleString()}원
          </span>
          <span>을 {TRANSFER_TEXT[type].CHECK}</span>
        </p>
      </div>

      <p className="w-full flex justify-between text-_grey-400 px-2">
        <span>출금계좌</span>
        <span>
          {sourceAccount.bankName} {sourceAccount.accountNo}
        </span>
      </p>
      <Link href={`/transfer/${type}/3`} className="w-full">
        <Button text={TRANSFER_TEXT[type].NAME} className="text-white" />
      </Link>
    </div>
  )
}
