/* eslint-disable @typescript-eslint/no-shadow */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const NICKNAME_REGEX = /^[a-zA-Z0-9가-힣]{1,10}$/

export default function SignupPage() {
  const router = useRouter()
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')

  const isValidEmail = (email: string) => EMAIL_REGEX.test(email)
  const isValidNickname = (nickname: string) => NICKNAME_REGEX.test(nickname)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const body = {
      username,
      email,
      nickname,
    }

    localStorage.setItem('token', JSON.stringify(body))
    toast.success('회원가입 되었습니다.')
    router.push('/home')
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <h1 className="text-2xl">회원가입</h1>
        <div className="flex flex-col gap-3">
          <label htmlFor="username">이름</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-lg p-2 focus:outline-[#4BAFF5]"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg p-2 focus:outline-[#4BAFF5]"
          />
          {email && !isValidEmail(email) && (
            <span className="text-red-500 text-xs">
              올바른 이메일 형식이 아닙니다.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="border rounded-lg p-2 focus:outline-[#4BAFF5]"
            autoComplete="off"
          />
          {nickname && !isValidNickname(nickname) && (
            <span className="text-red-500 text-xs">
              1~10자의 영문, 한글, 숫자만 사용 가능합니다.
            </span>
          )}
        </div>
        <button
          type="submit"
          className={`px-5 py-2 border rounded-xl bg-[#4BAFF5] text-white ${!isValidEmail(email) || !isValidNickname(nickname) ? 'bg-gray-400' : 'bg-[#4BAFF5]'}`}
          disabled={!isValidEmail(email) || !isValidNickname(nickname)}
        >
          로그인
        </button>
      </form>
    </div>
  )
}
