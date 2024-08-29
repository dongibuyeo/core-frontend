import { Sol, Pli, Lay, Moli } from '@/public/svg/index'

interface Props {
  profileImage: string
  className?: string
}

function ProfileImage({ profileImage, className }: Props) {
  const renderProfileImage = (imageName: string): React.ReactNode => {
    switch (imageName) {
      case 'Sol':
        return <Sol />
      case 'Pli':
        return <Pli />
      case 'Lay':
        return <Lay className="h-[8.375rem]" />
      case 'Moli':
        return <Moli />
      default:
        return <Sol />
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="bg-_grey-100 rounded-full overflow-hidden w-full h-full flex items-center justify-center">
        <div className="w-[85%] h-[85%] flex items-center justify-center object-contain">
          {renderProfileImage(profileImage)}
        </div>
      </div>
    </div>
  )
}

ProfileImage.defaultProps = {
  className: '',
}

export default ProfileImage
