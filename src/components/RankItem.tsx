'use client'

import ProfileImage from './ui/ProfileImage'

interface RankItemProps {
  rank: number
  profileImageNumber: number
  nickname: string
  email: string
  score: number
}

function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@')

  if (localPart.length <= 3) {
    return `${localPart}`
  }

  const visiblePart = localPart.slice(0, 3)
  const maskedPart = '*'.repeat(localPart.length - 3)
  return `${visiblePart}${maskedPart}`
}

export default function RankItem({
  rank,
  profileImageNumber,
  nickname,
  email,
  score,
}: RankItemProps) {
  const maskedEmail = maskEmail(email)
  return (
    <div className="flex items-center p-4 bg-white rounded-2xl border-_grey-200 border-[.0313rem]">
      <div className="flex items-center justify-center w-6 h-6 bg-_blue-300/15 rounded-full">
        <span className="text-_blue-300 font-medium">{rank}</span>
      </div>

      <div className="flex items-center ml-4">
        <ProfileImage profileImageNumber={profileImageNumber} width="w-12" />
        <div className="ml-2">
          <div className="font-medium">{nickname}</div>
          <div className="text-_grey-300 text-xs">({maskedEmail})</div>
        </div>
      </div>

      <div className="ml-auto text-_blue-300 font-medium">+{score}</div>
    </div>
  )
}
