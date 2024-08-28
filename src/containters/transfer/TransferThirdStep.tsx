import Button from '@/components/ui/Button'
import { TRANSFER_TEXT } from '@/constants/transfer'
import useAmountStore from '@/store/amountStore'
import { TransferType } from '@/types/transfer'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function TransferThirdStep({ type }: { type: TransferType }) {
  const router = useRouter()
  const { amount } = useAmountStore()

  const destinationAccount = {
    accountName: '신한 쏠쏠한 챌린지 통장',
    accountNumber: 110472000000,
    balance: 0,
    bank: '토스뱅크',
    id: 1,
  }

  const handleClick = () => {
    alert('완료~~')
    router.push('/mypage')
  }

  return (
    <div className="flex flex-col items-center h-full justify-center gap-7">
      <div className="text-2xl font-medium gap-3 h-full flex flex-col items-center mt-40">
        <Image src="/gif/check.gif" width={80} height={80} alt="check" />
        <p className="mt-10">{destinationAccount.accountName}으로</p>
        <p>
          <span className="text-_blue-300">
            {(amount as number).toLocaleString()}원
          </span>
          <span>을 {TRANSFER_TEXT[type].CONFIRM}</span>
        </p>
      </div>
      <Button text="확인" className="text-white" onClick={handleClick} />
    </div>
  )
}
