/* eslint-disable @typescript-eslint/no-shadow */

'use client'

import { usePathname, useRouter } from 'next/navigation'
import EmailCheckStep from '@/containters/signup/EmailCheckStep'
import ProfileStep from '@/containters/signup/ProfileStep'
import PushStep from '@/containters/signup/PushStep'
import toast from 'react-hot-toast'
import useSignupStore from '@/store/SignupStore'
import { useEffect, useRef } from 'react'

export default function SignupPage() {
  const router = useRouter()
  const pathname = usePathname()
  const username = useSignupStore((state) => state.username)
  const nickname = useSignupStore((state) => state.nickname)
  const email = useSignupStore((state) => state.email)
  const pushToken = useSignupStore((state) => state.pushToken)
  const signupSuccess = useRef(false)

  const currentPath = pathname.split('/').pop()

  useEffect(() => {
    if (currentPath === 'join' && !signupSuccess.current) {
      const body = {
        username,
        email,
        nickname,
        pushToken,
      }
      localStorage.setItem('token', JSON.stringify(body))
      localStorage.removeItem('signupState')
      signupSuccess.current = true

      toast.success('회원가입 되었습니다.')
      router.push('/home')
    }
  }, [currentPath, email, nickname, pushToken, router, signupSuccess, username])

  return (
    <div
      className={`w-full h-[calc(100dvh-5rem)] flex justify-center ${currentPath === 'push' ? '' : 'pt-[3.125rem]'}`}
    >
      {currentPath === 'emailCheck' && <EmailCheckStep />}
      {currentPath === 'profile' && <ProfileStep />}
      {currentPath === 'push' && <PushStep />}
    </div>
  )
}
