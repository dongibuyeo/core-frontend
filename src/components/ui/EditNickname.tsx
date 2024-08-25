import { forwardRef } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
}

const EditNickname = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange }, ref) => (
    <input
      ref={ref}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-_grey-200 rounded-3xl px-5 py-2 w-56 focus:outline-none focus:ring-1 focus:ring-primary"
    />
  ),
)

EditNickname.displayName = 'EditNickname'

export default EditNickname
