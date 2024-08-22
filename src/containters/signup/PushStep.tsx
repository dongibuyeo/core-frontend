import Button from '@/components/ui/Button'
import { getTokenHandler } from '@/firebase/firebase'
// import useSignupStore from '@/store/SignupStore'

import { useRouter } from 'next/navigation'

export default function PushStep() {
  const router = useRouter()

  const clickPushHandler = async () => {
    try {
      await navigator.serviceWorker
        .register('/firebase-messaging-sw.js', {
          scope: '/firebase-cloud-messaging-push-scope',
        })
        .then(async (reg) => {
          console.log('Service worker registered:', reg)
          const token = await getTokenHandler()
          if (token) {
            console.log('푸시 토큰:', token)
          } else {
            console.error('푸시 토큰이 없습니다.')
          }
        })
    } catch (error) {
      console.error('푸시 토큰 가져오는 중에 에러 발생', error)
    }
  }

  return (
    <div className="flex flex-col w-full gap-9 items-center justify-center">
      <Button text="알림 받기" onClick={clickPushHandler} />
      <Button
        text="다음에 할게요"
        className="bg-_grey-200"
        onClick={() => router.push('/signup/join')}
      />
    </div>
  )
}
