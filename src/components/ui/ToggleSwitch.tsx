'use client'

interface Props {
  isChecked: boolean
  onToggle: () => void
}

export default function ToggleSwitch({ isChecked, onToggle }: Props) {
  return (
    <label className="relative inline-block w-[3.25rem] h-7">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onToggle}
        className="sr-only peer"
        aria-label="Toggle Switch"
      />
      <span
        className={`block w-full h-full rounded-full transition-all duration-300 border-2 ${
          isChecked
            ? 'bg-_blue-300/20 border-_blue-300'
            : 'bg-transparent border-gray-300'
        }`}
      />
      <span
        className={`absolute top-1 left-1 right-1 w-5 h-5 rounded-full transform transition-all duration-300 ${
          isChecked ? 'translate-x-6 bg-_blue-300' : 'bg-gray-300'
        }`}
      />
    </label>
  )
}
