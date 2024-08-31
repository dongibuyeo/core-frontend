import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { TRANSFER_TEXT } from '@/constants/transfer'
import useAmountStore from '@/store/amountStore'
import { postTransfer } from '@/services/account'
import { Account, TransferReq } from '@/types/account'
import { TransferType } from '@/types/transfer'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserInfo } from '@/services/auth'

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
  const router = useRouter()
  const amount = useAmountStore((state) => state.amount)
  const queryClient = useQueryClient()
  let email
  if (typeof window !== 'undefined') {
    email = localStorage.getItem('email')
  }

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: !!email,
  })

  const mutation = useMutation({
    mutationFn: (payload: TransferReq) => postTransfer(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account'] })
      router.push(`/transfer/${type}/3`)
    },
  })

  const handleTransfer = () => {
    const payload: TransferReq = {
      memberId: userInfo?.memberId || '',
      depositAccountNo: destinationAccount.accountNo,
      withdrawalAccountNo: sourceAccount.accountNo,
      transactionBalance: amount as number,
      transferType: 'CHALLENGE',
    }

    mutation.mutate(payload)
  }

  return (
    <div className="flex flex-col items-center h-full justify-center gap-7">
      <div className="text-2xl font-medium gap-3 h-full flex flex-col justify-center items-center">
        <p>{destinationAccount.accountName}(으)로</p>
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

      {mutation.isError && (
        <p className="text-red-500">Transfer failed. Please try again.</p>
      )}

      <Button
        text={mutation.isPending ? 'Processing...' : TRANSFER_TEXT[type].NAME}
        className="text-white"
        onClick={handleTransfer}
        disabled={mutation.isPending}
      />
    </div>
  )
}
