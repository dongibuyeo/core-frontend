/* eslint-disable no-unsafe-optional-chaining */
import MyChallengeAchievementRate from '@/containers/mychallenge/MyChallengeAchievementRate'
import MyChallengeFinalRefund from '@/containers/mychallenge/MyChallengeFinalRefund'
import { getUserInfo } from '@/services/auth'
import { getEstimateReward, getMyChallengeResult } from '@/services/challenges'
import { getSpentMoneyList } from '@/services/consume'
import { MemberChallengeDetail } from '@/types/MyChallenge'
import { useQuery } from '@tanstack/react-query'

export default function CompletedDetail({
  challenge,
}: {
  challenge: MemberChallengeDetail
}) {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
  })

  const { data: spentMoneyList } = useQuery({
    queryKey: ['spentMoney'],
    queryFn: () =>
      getSpentMoneyList(user?.memberId ?? '', challenge?.type ?? ''),
    enabled: !!user?.memberId,
  })

  const { data: estimateReward } = useQuery({
    queryKey: ['estimateReward'],
    queryFn: () => getEstimateReward(challenge?.challengeId as string),
  })

  const { data: myChallengeResult } = useQuery({
    queryKey: ['myChallengeResult'],
    queryFn: () =>
      getMyChallengeResult(
        user?.memberId as string,
        challenge?.challengeId as string,
      ),
    enabled: !!user?.memberId && !!challenge?.challengeId,
  })

  console.log(myChallengeResult)

  let lastSpentMoney
  let currentSpentMoney
  let progressPercentage
  if (spentMoneyList && spentMoneyList.length > 0) {
    ;[lastSpentMoney, currentSpentMoney] = spentMoneyList

    progressPercentage = Math.round((currentSpentMoney / lastSpentMoney) * 100)
  }

  let expenseLabel
  if (challenge?.type === 'CONSUMPTION_DRINK') {
    expenseLabel = '술'
  } else if (challenge?.type === 'CONSUMPTION_COFFEE') {
    expenseLabel = '카페'
  } else {
    expenseLabel = '배달'
  }

  return (
    <div className="flex flex-col gap-[3.75rem]">
      <div>
        <MyChallengeAchievementRate
          progressPercentage={progressPercentage as number}
          category={expenseLabel}
          isSuccess
        />
      </div>
      {/* <MyChallengeFinalRefund /> */}
    </div>
  )
}
