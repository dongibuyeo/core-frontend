/* eslint-disable react/require-default-props */
import { useRouter } from 'next/navigation'

interface Props {
  text: string
  url?: string
  onClick?: () => void
}

export default function Button({ text, url, onClick }: Props) {
  const router = useRouter()

  return (
    <button
      type="button"
      className="w-full py-3 bg-_blue-300 text-white text-sm font-medium rounded-xl"
      onClick={() => (onClick ? onClick() : router.push(url as string))}
    >
      {text}
    </button>
  )
}
