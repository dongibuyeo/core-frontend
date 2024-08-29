import { getProfileImage } from '@/utils/getProfileImage'

interface Props {
  profileImage: string
  className?: string
}

function ProfileImage({ profileImage, className }: Props) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-36 h-36 bg-_grey-100 rounded-full overflow-hidden flex items-center justify-center">
        <div className="w-36 h-36 flex items-center justify-center object-contain">
          {getProfileImage(profileImage)}
        </div>
      </div>
    </div>
  )
}

export default ProfileImage
