/* eslint-disable react/require-default-props */
import { useRouter } from 'next/navigation'

interface Props {
  text: string
  url?: string
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export default function Button({
  text,
  url,
  onClick,
  className,
  disabled,
}: Props) {
  const router = useRouter()

  return (
    <button
      type="button"
      className={`w-full py-3 text-sm font-medium rounded-xl ${disabled ? 'bg-_grey-200' : 'bg-_blue-300'} ${className || 'text-white'}`}
      onClick={() => (onClick ? onClick() : router.push(url as string))}
      disabled={!!disabled}
    >
      {text}
    </button>
  )
}
