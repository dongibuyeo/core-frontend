/* eslint-disable react/require-default-props */

interface Props {
  text: string
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export default function Button({ text, onClick, className, disabled }: Props) {
  return (
    <button
      type="button"
      className={`w-full py-3 text-sm font-medium rounded-xl ${disabled ? 'bg-_grey-200' : 'bg-_blue-300'} ${className || 'text-white'}`}
      onClick={onClick}
      disabled={!!disabled}
    >
      {text}
    </button>
  )
}
