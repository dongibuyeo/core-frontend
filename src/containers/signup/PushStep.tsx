/* eslint-disable no-console */
import Button from '@/components/ui/Button'
import { getTokenHandler } from '@/firebase/firebase'
import { Info } from '@/public/svg/index'
import Image from 'next/image'
import useSignupStore from '@/store/SignupStore'

import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import { signupUser } from '@/services/auth'

export default function PushStep() {
  const router = useRouter()
  const { username, email, nickname } = useSignupStore((state) => state)
  const token = useRef('')

  const mutation = useMutation({
    mutationFn: async () =>
      signupUser(email, username, nickname, { current: token.current }),

    onSuccess: () => {
      localStorage.setItem('email', email)
      localStorage.removeItem('signupState')
      toast.success('회원가입 되었습니다.')
      router.push('/home')
    },
    onError: (error) => {
      console.error('회원가입 중 에러가 발생했습니다.', error)
    },
  })

  const clickPushHandler = async () => {
    try {
      await navigator.serviceWorker
        .register('/firebase-messaging-sw.js', {
          scope: '/firebase-cloud-messaging-push-scope',
        })
        .then(async (reg) => {
          console.log('Service worker registered:', reg)
          const pushToken = await getTokenHandler()
          if (pushToken) {
            token.current = pushToken
            mutation.mutate()
          } else {
            console.error('푸시 토큰이 없습니다.')
          }
        })
    } catch (error) {
      console.error('푸시 토큰 가져오는 중에 에러가 발생했습니다.')
    }
  }

  return (
    <div className="flex flex-col w-full h-dvh justify-start p-5">
      <div className="pt-[6.25rem] mx-auto">
        <Image src="/gif/bell.gif" width={90} height={90} alt="알림 설정" />
      </div>
      <div className="flex flex-col gap-12 mt-12">
        <h1 className="text-center text-xl font-semibold">푸시 알림 받기</h1>
        <h3 className="whitespace-pre-wrap text-center text-base font-normal">
          <p>알람을 허용하시면 더 갓생살 수 있도록!</p>
          <p className="flex justify-center items-center">
            <span className="font-bold">챌린지 관련 알림</span>을 보내드려요
            <span className="ml-1">
              <Image
                src="/gif/heart-face.gif"
                width={20}
                height={20}
                alt="하트이모지"
              />
            </span>
          </p>
        </h3>
      </div>
      <div className="absolute bottom-0 w-full left-0 px-5 flex flex-col items-center gap-7">
        <p className="flex items-center space-x-1 text-center">
          <span>
            <Info className="w-5 h-5" />
          </span>
          <span className="text-_grey-300 text-sm">
            알림에 동의하지 않아도 서비스를 이용할 수 있습니다.
          </span>
        </p>
        <Button
          text="알림 받기"
          onClick={clickPushHandler}
          className="w-full text-white"
        />
        <Button
          text="다음에 할게요!"
          className="w-full bg-transparent text-[#626262]"
          onClick={mutation.mutate}
        />
      </div>
    </div>
  )
}
