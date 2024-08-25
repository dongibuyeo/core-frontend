import { ReactNode } from 'react'

interface Props {
  imageUrl: ReactNode
}

function ProfileImage({ imageUrl }: Props) {
  return (
    <div className="relative w-36 h-36">
      <div className="bg-_grey-100 rounded-full overflow-hidden w-full h-full flex items-center justify-center">
        {imageUrl}
      </div>
    </div>
  )
}

export default ProfileImage
