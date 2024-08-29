import { Sol, Pli, Lay, Moli } from '@/public/svg/index'

const getProfileImage = (profileImageName: string) => {
  switch (profileImageName) {
    case 'Sol':
      return <Sol className="h-[8.375rem]" />
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

export default getProfileImage
