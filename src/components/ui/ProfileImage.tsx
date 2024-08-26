import React from 'react'
import { Sol, Pli, Lay, Moli } from '@/public/svg/index'

interface Props {
  profileImageNumber: number
  width?: string
}

const profileImages = [<Sol />, <Pli />, <Lay />, <Moli />]

const ProfileImage: React.FC<Props> = ({
  profileImageNumber,
  width = 'w-36',
}) => {
  const validImageNumber = Math.min(Math.max(profileImageNumber, 0), 3)
  const selectedImage = profileImages[validImageNumber]

  return (
    <div className={`relative ${width} aspect-square`}>
      <div className="bg-_grey-100 rounded-full overflow-hidden w-full h-full flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center object-cover">
          {selectedImage}
        </div>
      </div>
    </div>
  )
}

export default ProfileImage
