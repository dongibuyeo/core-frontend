import Button from '@/components/ui/Button'
import useSignupStore from '@/store/SignupStore'
import { useRouter } from 'next/navigation'

export default function PushStep() {
  const router = useRouter()
  const setPushToken = useSignupStore((state) => state.setPushToken)

  const handleRegisterPushToken = () => {
    setPushToken('pushToken')
    router.push('/signup/join')
  }

  return (
    <div className="flex flex-col w-full gap-9 items-center justify-center">
      <Button text="알림 받기" onClick={handleRegisterPushToken} />
      <Button
        text="다음에 할게요"
        className="bg-_grey-200"
        onClick={() => router.push('/signup/join')}
      />
    </div>
  )
}
