'use client'

import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

export default function AccountEmptyCard() {
  const router = useRouter()
  return (
    <div className="flex flex-col w-full bg-_grey-100 rounded-xl p-6 items-center justify-center gap-4 min-h-48">
      <p>챌린지에 참여하려면 전용통장이 필요해요!</p>
      <Button
        text="쏠편한 챌린지통장 만들기"
        className="text-white"
        onClick={() => router.push('/enroll?type=free')}
      />
    </div>
  )
}
