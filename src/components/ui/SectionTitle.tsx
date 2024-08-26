interface Props {
  icon: React.ReactNode
  label: string
}

export default function SectionTitle({ icon, label }: Props) {
  return (
    <h2 className="flex items-center gap-1">
      <div className="w-5 h-5">{icon}</div>
      <p className="text-lg font-medium">{label}</p>
    </h2>
  )
}
