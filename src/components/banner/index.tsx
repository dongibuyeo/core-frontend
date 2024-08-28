/* eslint-disable react/jsx-no-useless-fragment */
import QuizBanner from '@/components/banner/QuizBanner'
import RecommendBanner from '@/components/banner/RecommendBanner'

interface Props {
  type?: 'quiz' | 'recommend'
  setIsBannerOpen: (value: boolean) => void
}

export default function Banner({ type = 'quiz', setIsBannerOpen }: Props) {
  return (
    <>
      {type === 'quiz' ? (
        <QuizBanner setIsBannerOpen={setIsBannerOpen} />
      ) : (
        <RecommendBanner setIsBannerOpen={setIsBannerOpen} />
      )}
    </>
  )
}
