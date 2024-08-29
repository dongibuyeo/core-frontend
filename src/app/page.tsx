'use client'

import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '@/services/auth'

export default function Home() {
  const router = useRouter()
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
    enabled: !!localStorage.getItem('email'),
  })

  const handleRedirect = () => {
    if (user) {
      toast.success('로그인 되었습니다.')
      router.push('/home')
    } else {
      toast.success('아직 회원이 아니시군요\n회원가입을 시작합니다!')
      router.push('/signup/emailCheck')
    }
  }

  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <Button text="로그인" onClick={handleRedirect} className="text-white" />
    </div>
  )
}
