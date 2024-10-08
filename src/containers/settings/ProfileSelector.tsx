import { useState } from 'react'
import { Sol, Pli, Lay, Moli } from '@/public/svg/index'

interface Props {
  onSelect: (image: string) => void
}

function ProfileSelector({ onSelect }: Props) {
  const images: { component: JSX.Element; alt: string }[] = [
    { component: <Sol className="h-[8.375rem]" />, alt: 'Sol' },
    { component: <Pli />, alt: 'Pli' },
    { component: <Lay className="h-[8.375rem]" />, alt: 'Lay' },
    { component: <Moli />, alt: 'Moli' },
  ]

  const [selectedAlt, setSelectedAlt] = useState<string | null>(null)

  const handleClick = (alt: string) => {
    if (selectedAlt === alt) {
      onSelect(alt)
    } else {
      setSelectedAlt(alt)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {images.map((image) => (
        <button
          key={image.alt}
          type="button"
          onClick={() => handleClick(image.alt)}
          className={`w-36 h-36 p-2 rounded-xl bg-_grey-100 ${
            selectedAlt === image.alt
              ? 'border-2 border-_blue-300'
              : 'border-transparent'
          }`}
        >
          <div className="w-full h-full flex items-center justify-center">
            {image.component}
          </div>
        </button>
      ))}
    </div>
  )
}

export default ProfileSelector
