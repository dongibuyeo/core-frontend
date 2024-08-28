/* eslint-disable @typescript-eslint/no-shadow */

'use client'

import { usePathname, useRouter } from 'next/navigation'
import EmailCheckStep from '@/containers/signup/EmailCheckStep'
import ProfileStep from '@/containers/signup/ProfileStep'
import PushStep from '@/containers/signup/PushStep'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getUser } from '@/services/auth'

export default function SignupPage() {
  const router = useRouter()
  const pathname = usePathname()

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: !!localStorage.getItem('email'),
  })

  if (user) {
    toast.success('이미 로그인 되었습니다.')
    router.push('/home')
  }

  const currentPath = pathname.split('/').pop()

  return (
    <div className="w-full h-[calc(100dvh-5rem)] flex justify-center pt-[3.125rem]">
      {currentPath === 'emailCheck' && <EmailCheckStep />}
      {currentPath === 'profile' && <ProfileStep />}
      {currentPath === 'push' && <PushStep />}
    </div>
  )
}
