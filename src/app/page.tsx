/* eslint-disable react/jsx-boolean-value */

'use client'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '@/services/auth'
import { LandingLogo } from '@/public/svg/index'
import CloudLottie from '@/constants/cloud.json'
import LottieComponent from '@/components/LottieComponent'

export default function Home() {
  const router = useRouter()
  const email = localStorage.getItem('email')

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
    enabled: !!email,
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
    <div className="relative w-full h-dvh flex flex-col items-center justify-around bg-[#5084EF] overflow-hidden">
      <LandingLogo className="md:w-1/4 w-1/2 relative z-10" />
      <LottieComponent
        animationData={CloudLottie}
        speed={0.8}
        isPaused={false}
        isStopped={false}
        loop={false}
        init={0}
        end={100}
        className="w-2/3 mt-10 md:w-1/4 md:mt-0 absolute top-0 z-0"
      />

      <div />
      <div className="fixed bottom-24 z-10 w-full max-w-[400px] px-10">
        <button
          type="button"
          className="w-full py-3 text-sm font-medium rounded-xl bg-white"
          onClick={handleRedirect}
        >
          시작하기
        </button>
      </div>
    </div>
  )
}
