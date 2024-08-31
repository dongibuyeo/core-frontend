'use client'

import ChallengeButton from '@/components/ChallengeButton'
import CompletedDetail from '@/components/CompletedDetail'
import MiniChallengeCard from '@/components/MiniChallengeCard'
import NotRewardedDetail from '@/components/NotRewardedDetail'
import ProgressDetail from '@/components/ProgressDetail'
import ScheduledDetail from '@/components/ScheduledDetail'
import { getUserInfo } from '@/services/auth'
import { getMyChallengeList } from '@/services/challenges'
import { MemberChallengeDetail } from '@/types/MyChallenge'
import { formatDate } from '@/utils/formatDate'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'

export default function MyChallengeDetail() {
  const pathname = usePathname()
  const challengeId = pathname.split('/')[3]

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
  })

  const { data: myChallengeList } = useQuery({
    queryKey: ['myChallengeList'],
    queryFn: () => getMyChallengeList(user?.memberId as string),
    enabled: !!user?.memberId,
  })

  let challenge: MemberChallengeDetail | undefined

  if (myChallengeList?.memberChallengeDetails?.length) {
    challenge = myChallengeList.memberChallengeDetails.find(
      (data: MemberChallengeDetail) => data.challengeId === challengeId,
    )
  }

  const status: '참여예정' | '참여중' | '완료' | '정산필요' = (() => {
    if (myChallengeList?.memberChallengeDetails?.length) {
      challenge = myChallengeList?.memberChallengeDetails?.filter(
        (data: MemberChallengeDetail) => data?.challengeId === challengeId,
      )[0]
    }

    const today = new Date()
    const start = new Date(formatDate(challenge?.startDate as string))
    const end = new Date(formatDate(challenge?.endDate as string))

    if (today < start) {
      return '참여예정'
    }
    if (today >= start && today <= end) {
      return '참여중'
    }
    if (challenge?.status === 'COMPLETED') {
      return challenge?.memberStatus === 'REWARDED' ? '완료' : '정산필요'
    }
    return '완료'
  })()

  return (
    <div className="px-5">
      <MiniChallengeCard
        title={challenge?.title as string}
        startDate={challenge?.startDate}
        endDate={challenge?.endDate}
        imageUrl={challenge?.image as string}
        memberStatus={challenge?.memberStatus}
      />
      <ChallengeButton
        status={status}
        type={challenge?.type as string}
        detailPage
        challengeId={challenge?.challengeId}
      />
      <hr className="mt-5 mb-10" />
      {status === '참여예정' && (
        <ScheduledDetail challenge={challenge as MemberChallengeDetail} />
      )}
      {status === '참여중' && (
        <ProgressDetail challenge={challenge as MemberChallengeDetail} />
      )}
      {status === '정산필요' && (
        <NotRewardedDetail challenge={challenge as MemberChallengeDetail} />
      )}
      {status === '완료' && (
        <CompletedDetail challenge={challenge as MemberChallengeDetail} />
      )}
    </div>
  )
}
