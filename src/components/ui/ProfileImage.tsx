import { ReactNode } from 'react'

interface Props {
  imageUrl: ReactNode
  className?: string
}

function ProfileImage({ imageUrl, className }: Props) {
  return (
    <div className={`relative ${className}`}>
      <div className="bg-_grey-100 rounded-full overflow-hidden w-full h-full flex items-center justify-center">
        <div className="w-[85%] h-[85%] flex items-center justify-center object-contain">
          {imageUrl}
        </div>
      </div>
    </div>
  )
}

ProfileImage.defaultProps = {
  className: '',
}

export default ProfileImage
