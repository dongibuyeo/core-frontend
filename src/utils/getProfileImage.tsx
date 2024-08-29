import {
    Sol,
    Pli,
    Lay,
    Moli,
  } from '@/public/svg/index'

export const getProfileImage = (profileImageNumber: number) => {
    switch (profileImageNumber) {
      case 1:
        return <Sol />
      case 2:
        return <Pli />
      case 3:
        return <Lay />
      case 4:
        return <Moli />
      default:
        return <Sol />
    }
  }