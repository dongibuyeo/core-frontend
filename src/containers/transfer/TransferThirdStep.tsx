import Button from '@/components/ui/Button'
import { TRANSFER_TEXT } from '@/constants/transfer'
import useAmountStore from '@/store/amountStore'
import { TransferType } from '@/types/transfer'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
  type: TransferType
  destinationAccountName: string
}

export default function TransferThirdStep({
  type,
  destinationAccountName,
}: Props) {
  const router = useRouter()
  const { amount } = useAmountStore()

  const handleClick = () => {
    alert('완료~~')
    router.push('/mypage')
  }

  return (
    <div className="flex flex-col items-center h-full justify-center gap-7">
      <div className="text-2xl font-medium gap-3 h-full flex flex-col items-center mt-40">
        <Image src="/gif/check.gif" width={80} height={80} alt="check" />
        <p className="mt-10">{destinationAccountName}으로</p>
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
