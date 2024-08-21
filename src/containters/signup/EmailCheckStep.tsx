/* eslint-disable @typescript-eslint/no-shadow */

'use client'

import { EMAIL_REGEX } from '@/constants/regex'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import useSignupStore from '@/store/SignupStore'
import useDebounce from '@/hooks/useDebounce'
import { useEffect } from 'react'

export default function EmailCheckStep() {
  const router = useRouter()
  const email = useSignupStore((state) => state.email)
  const debouncedEmail = useDebounce(email, 500)
  const setEmail = useSignupStore((state) => state.setEmail)
  const isValidEmail = (email: string) => EMAIL_REGEX.test(email)

  useEffect(() => {
    console.log('debouncedEmail', debouncedEmail)
  }, [debouncedEmail])

  return (
    <div className="flex flex-col w-full relative">
      <div className="relative">
        <input
          type="email"
          id="email"
          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full h-14 text-base font-normal bg-white border-0 border-b-2 border-_grey-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label
          htmlFor="email"
          className="absolute text-base font-medium text-_grey-300 duration-300 transform -translate-y-8 scale-75 top-4 z-10 origin-[0] start-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          이메일
        </label>
      </div>
      {email && !isValidEmail(email) && (
        <span className="text-red-500 text-sm pl-2 mt-2">
          이메일 형식에 맞지 않습니다.
        </span>
      )}
      <Button
        text="다음"
        className="absolute bottom-5 right-0"
        disabled={!isValidEmail(email)}
        onClick={() => router.push('/signup/profile')}
      />
    </div>
  )
}
