/* eslint-disable react/jsx-no-undef */

import { Lay, Moli, Pli, Sol } from '@/public/svg/index'

interface Props {
  index: number
  nickname: string
  email: string
  profileImage: string
  score: number
}

const getProfileImage = (imageName: string) => {
  switch (imageName) {
    case 'Sol':
      return <Sol className="w-12 h-12 rounded-full" />
    case 'Pli':
      return <Pli className="w-12 h-12 rounded-full" />
    case 'Lay':
      return <Lay className="w-12 h-12 rounded-full" />
    case 'Moli':
      return <Moli className="w-12 h-12 rounded-full" />
    default:
      return <Sol className="w-12 h-12 rounded-full" />
  }
}

function maskEmail(email: string): string {
  const localPart = email.split('@')[0]
  if (localPart.length <= 3) {
    return localPart
  }
  return localPart.substring(0, 3) + '*'.repeat(localPart.length - 3)
}

export default function ChallengeRankingCard({
  index,
  nickname,
  email,
  profileImage,
  score,
}: Props) {
  return (
    <div className="w-full p-4 flex justify-between items-center border border-_grey-200 rounded-2xl">
      <div className="flex space-x-4 items-center">
        <div className="bg-_blue-300/15 rounded-full w-6 h-6 text-sm font-medium text-_blue-300 flex items-center justify-center">
          {index}
        </div>
        <div className="flex space-x-2">
          <div className="w-12 h-12 bg-_grey-200 rounded-full flex justify-center items-center overflow-hidden">
            {getProfileImage(profileImage)}
          </div>
          <div className="flex flex-col">
            <div className="text-base font-medium">{nickname}</div>
            <div className="text-xs font-normal">
              ({maskEmail(email ?? '')})
            </div>
          </div>
        </div>
      </div>
      <div className="text-base font-medium text-primary">+ {score}</div>
    </div>
  )
}
