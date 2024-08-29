import { Sol, Pli, Lay, Moli } from '@/public/svg/index'

export const getProfileImage = (imageName: string) => {
  switch (imageName) {
    case 'Sol':
      return <Sol className="h-[8.375rem]" />
    case 'Pli':
      return <Pli className="h-[8.375rem]" />
    case 'Lay':
      return <Lay className="h-[8.375rem]" />
    case 'Moli':
      return <Moli className="h-[8.375rem]" />
    default:
      return <Sol className="h-[8.375rem]" />
  }
}
