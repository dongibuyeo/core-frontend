import Image from 'next/image'
import { Flag } from '@/public/svg/index'
import SectionTitle from '@/components/ui/SectionTitle'

interface Props {
  progressPercentage: number
  category: string
  isSuccess: boolean
}

export default function MyChallengeAchievementRate({
  progressPercentage,
  category,
  isSuccess,
}: Props) {
  const diffPercentage = Math.abs(100 - progressPercentage)
  const textColor = isSuccess ? 'text-primary' : 'text-_red'
  const messageText = isSuccess ? '챌린지 성공' : '챌린지 실패'
  const emojiSrc = isSuccess ? '/gif/partying-face.gif' : '/gif/crying-face.gif'
  const emojiAlt = isSuccess ? '파티이모지' : '슬픈이모지'
  const achievementMessage = isSuccess
    ? `지난 달 [${category}] 소비보다 ${diffPercentage}% 절약했어요!`
    : `이번 달에는 [${category}] 소비보다 ${diffPercentage}% 더 소비했어요!`
  const progressBarWidth = Math.min(progressPercentage, 100)
  return (
    <div className="w-full p-4 bg-white">
      <div className="flex items-center mb-4">
        <SectionTitle icon={<Flag />} label="챌린지 달성률" />
      </div>
      <div className="text-right mb-2">
        <span className={`${textColor} font-bold text-xl`}>
          {progressPercentage}%
        </span>
      </div>
      <div className="flex mb-4">
        <div className="w-full bg-_grey-100 rounded-full h-4 items-center">
          <div
            className={`h-4 rounded-full ${isSuccess ? 'bg-primary' : 'bg-_red'}`}
            style={{
              width: `${progressBarWidth}%`,
              background: isSuccess
                ? 'linear-gradient(to right, rgba(0, 70, 255, 0.5), rgba(0, 70, 255, 1))'
                : 'linear-gradient(to right, rgba(234, 65, 65, 0.5), rgba(234, 65, 65, 1))',
            }}
          />
        </div>
      </div>
      <div className="mt-5 py-5 bg-_grey-100 rounded-xl flex items-center justify-center">
        <div>
          <p
            className={`${textColor} font-bold text-xl flex justify-center items-center mb-3`}
          >
            <span className="mr-1">{messageText}</span>
            <Image src={emojiSrc} width={28} height={28} alt={emojiAlt} />
          </p>
          <p>{achievementMessage}</p>
        </div>
      </div>
    </div>
  )
}
