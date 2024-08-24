import ToggleSwitch from '@/components/ui/ToggleSwitch'

export default function Mypage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl">마이 페이지</h1>
      <ToggleSwitch />
    </div>
  )
}