/* eslint-disable react/require-default-props */
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  icon: ReactNode
  label: string
  url?: string
  onClick?: () => void
  text?: string
}

function SettingItem({ icon, label, url, onClick, text }: Props) {
  const router = useRouter()

  return (
    <button
      type="button"
      className="flex items-center py-6 w-full cursor-pointer"
      onClick={() => (onClick ? onClick() : router.push(url as string))}
    >
      <div className="w-6 h-6 ml-8 mr-5">{icon}</div>
      <div className="text-lg text-left font-medium text-black">{label}</div>

      {text && <div className="text-black mr-8 ml-auto">{text}</div>}
    </button>
  )
}

export default SettingItem
