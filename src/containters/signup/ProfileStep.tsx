/* eslint-disable @typescript-eslint/no-shadow */

'use client'

import { NICKNAME_REGEX } from '@/constants/regex'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import useSignupStore from '@/store/SignupStore'

export default function ProfileStep() {
  const router = useRouter()
  const username = useSignupStore((state) => state.username)
  const setUsername = useSignupStore((state) => state.setUsername)
  const nickname = useSignupStore((state) => state.nickname)
  const setNickname = useSignupStore((state) => state.setNickname)

  const isValidNickname = (nickname: string) => NICKNAME_REGEX.test(nickname)

  return (
    <div className="flex flex-col w-full gap-9 relative">
      <div className="relative">
        <input
          type="text"
          id="username"
          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full h-14 text-base font-normal bg-white border-0 border-b-2 border-_grey-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
          placeholder=" "
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
        <label
          htmlFor="username"
          className="absolute text-base font-medium text-_grey-300 duration-300 transform -translate-y-8 scale-75 top-4 z-10 origin-[0] start-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          이름
        </label>
      </div>

      <div className="relative">
        <input
          type="text"
          id="nickname"
          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full h-14 text-base font-normal bg-white border-0 border-b-2 border-_grey-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
          placeholder=" "
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          autoComplete="off"
        />
        <label
          htmlFor="nickname"
          className="absolute text-base font-medium text-_grey-300 duration-300 transform -translate-y-8 scale-75 top-4 z-10 origin-[0] start-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          닉네임
        </label>
        {nickname && !isValidNickname(nickname) && (
          <span className="absolute left-0 -bottom-7 text-red-500 text-sm pl-2">
            닉네임은 1~10자의 영문, 한글, 숫자만 사용 가능합니다.
          </span>
        )}
      </div>

      <Button
        text="다음"
        className="absolute bottom-5 right-0"
        disabled={!isValidNickname(nickname) || !username}
        onClick={() => router.push('/signup/push')}
      />
    </div>
  )
}
