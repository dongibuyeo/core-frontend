import ToggleSwitch from '@/components/ui/ToggleSwitch'

interface Props {
  label: string
  isChecked: boolean
  onToggle: () => void
}

export default function ToggleSettingItem({
  label,
  isChecked,
  onToggle,
}: Props) {
  return (
    <div className="flex justify-between w-full py-6">
      <span className="flex items-center text-lg font-medium ml-8">
        {label}
      </span>
      <div className="flex items-center mr-5">
        <ToggleSwitch isChecked={isChecked} onToggle={onToggle} />
      </div>
    </div>
  )
}
