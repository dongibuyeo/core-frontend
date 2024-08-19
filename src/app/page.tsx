'use client'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function Home() {
  const router = useRouter()

  const handleRedirect = () => {
    const token = localStorage.getItem('token')
    if (token) {
      toast.success('로그인 되었습니다.')
      router.push('/home')
    } else {
      toast.success('아직 회원이 아니시군요\n회원가입을 시작합니다!')
      router.push('/signup')
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <button
        type="button"
        className="px-5 py-2 border rounded-xl bg-[#4BAFF5] text-white"
        onClick={handleRedirect}
      >
        로그인
      </button>
    </div>
  )
}
