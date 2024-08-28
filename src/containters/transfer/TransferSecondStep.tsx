import Button from '@/components/ui/Button'
import { TRANSFER_TEXT } from '@/constants/transfer'
import { TransferType } from '@/types/transfer'

export default function TransferSecondStep({ type }: { type: TransferType }) {
  const amount = 10000
  const sourceAccount = {
    accountName: '신한 쏠쏠한 챌린지 통장',
    accountNumber: 110472000000,
    balance: 0,
    bank: '토스뱅크',
    id: 1,
  }

  const destinationAccount = {
    accountName: '신한 쏠쏠한 챌린지 통장',
    accountNumber: 110472000000,
    balance: 0,
    bank: '토스뱅크',
    id: 1,
  }

  return (
    <div className="flex flex-col items-center h-full justify-center gap-7">
      <div className="text-2xl font-medium gap-3 h-full flex flex-col justify-center items-center">
        <p>{destinationAccount.accountName}으로</p>
        <p>
          <span className="text-_blue-300">{amount.toLocaleString()}원</span>
          <span>을 {TRANSFER_TEXT[type].CONFIRM}</span>
        </p>
      </div>

      <p className="w-full flex justify-between text-_grey-400 px-2">
        <span>출금계좌</span>
        <span>
          {sourceAccount.bank} {sourceAccount.accountNumber}
        </span>
      </p>
      <Button text={TRANSFER_TEXT[type].NAME} className="text-white" />
    </div>
  )
}
