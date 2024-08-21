'use client'

import Button from '@/components/ui/Button'
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
      router.push('/signup/emailCheck')
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Button text="로그인" onClick={handleRedirect} />
    </div>
  )
}
