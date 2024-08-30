'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { AccountType, CreateSavingAccountReq } from '@/types/account'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getChallengeAccount,
  postCreateFreeAccount,
  postCreateSavingAccount,
} from '@/services/account'
import { getUserInfo } from '@/services/auth'
import { Challenge, ChallengeType } from '@/types/Challenge'
import { getChallenge } from '@/services/challenges'
import Button from '../ui/Button'

export default function EnrollConfirmModal() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') as AccountType
  const challengeId = searchParams.get('challengeId')
  const router = useRouter()

  const { data: challenge } = useQuery<Challenge>({
    queryKey: ['challenge', challengeId],
    queryFn: () => getChallenge(challengeId as string),
    enabled: !!challengeId,
  })

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  })

  const { data: myChallengeAccount } = useQuery({
    queryKey: ['account', 'challenge'],
    queryFn: () => getChallengeAccount(userInfo?.memberId as string),
    enabled: !!userInfo?.memberId,
  })

  const freeAccountMutation = useMutation({
    mutationFn: () => postCreateFreeAccount(userInfo?.memberId || ''),
    onSuccess: () => router.replace('/home'),
  })

  const savingAccountMutation = useMutation({
    mutationFn: (payload: CreateSavingAccountReq) =>
      postCreateSavingAccount(payload),
    onSuccess: () => router.replace(`/challenge/${challengeId}/deposit`),
  })

  const handleEnrollment = () => {
    if (type === 'free') {
      freeAccountMutation.mutate()
    }

    if (type === 'saving') {
      const payload = {
        challengeType: challenge?.type as ChallengeType,
        startDate: challenge?.startDate as string,
        memberId: userInfo?.memberId as string,
        withdrawalAccountNo: myChallengeAccount?.accountNo as string,
        depositBalance: 7000,
      }
      savingAccountMutation.mutate(payload)
    }
  }

  return (
    <div className="bg-white px-6 py-10 rounded-t-3xl">
      <h1 className="text-lg font-medium">상품 내용을 충분히 이해하셨나요?</h1>
      <p className="mt-1">
        금융상품 중요사항을 충분히 <span className="text-_blue-300">이해</span>
        하고 <span className="text-_blue-300">확인</span>
        하셨나요?
      </p>
      <p className="text-sm text-_grey-400 mt-6 pl-1 mb-8">
        충분한 이해없이 확인하면, 추후 소송이나 분쟁에서 <br />
        불리하게 적용될 수 있습니다.
      </p>
      <div className="flex gap-4">
        <Button
          text="다시보기"
          className="bg-_blue-300/[8%] text-_blue-300"
          onClick={() => router.back()}
        />
        <Button text="상품 가입" onClick={handleEnrollment} />
      </div>
    </div>
  )
}
