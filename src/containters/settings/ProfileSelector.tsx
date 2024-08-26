import { Sol, Pli, Lay, Moli } from '@/public/svg/index'
import { useState } from 'react'

interface Props {
  onSelect: (imageIndex: number) => void
}

function ProfileSelector({ onSelect }: Props) {
  const images: { component: JSX.Element; alt: string }[] = [
    { component: <Sol />, alt: 'Sol' },
    { component: <Pli />, alt: 'Pli' },
    { component: <Lay />, alt: 'Lay' },
    { component: <Moli />, alt: 'Moli' },
  ]

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleClick = (index: number) => {
    if (selectedIndex === index) {
      onSelect(index)
    } else {
      setSelectedIndex(index)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {images.map((image, index) => (
        <button
          key={image.alt}
          type="button"
          onClick={() => handleClick(index)}
          className={`w-36 h-36 p-2 rounded-xl bg-_grey-100
                      ${selectedIndex === index ? 'border-2 border-_blue-300' : 'border-transparent'}`}
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
