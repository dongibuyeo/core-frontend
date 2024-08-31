/* eslint-disable no-unsafe-optional-chaining */
import MyChallengeAchievementRate from '@/containers/mychallenge/MyChallengeAchievementRate'
import MyChallengeFinalRefund from '@/containers/mychallenge/MyChallengeFinalRefund'
import MyScoreHistory from '@/containers/mychallenge/MyScoreHistory'
import { Trophy } from '@/public/svg/index'
import { getUserInfo } from '@/services/auth'
import {
  getEstimateReward,
  getMyChallengeResult,
  getMyRanking,
  getMyScores,
} from '@/services/challenges'
import { getSpentMoneyList } from '@/services/consume'
import { MemberChallengeDetail } from '@/types/MyChallenge'
import { useQuery } from '@tanstack/react-query'

export default function NotRewardedDetail({
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

  const { data: myRanking } = useQuery({
    queryKey: ['myRanking'],
    queryFn: () =>
      getMyRanking(user?.memberId as string, challenge?.challengeId as string),
    enabled: !!user?.memberId,
  })

  const { data: myScores } = useQuery({
    queryKey: ['myScores'],
    queryFn: () =>
      getMyScores(
        user?.memberId as string,
        challenge?.challengeId as string,
        challenge?.memberDeposit,
      ),
    enabled: !!user?.memberId && !!challenge?.memberDeposit,
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
      <div>
        <div className="flex space-x-1 items-center">
          <Trophy />
          <span className="text-lg font-medium">내 현재 랭킹</span>
        </div>
        <div className="bg-_grey-100 w-full p-4 mt-4 text-center rounded-xl text-sm font-normal">
          <p className="text-xl font-medium text-primary">
            상위 {myRanking?.percentileRank}%
          </p>
          <p className="font-normal text-base">
            {myRanking?.totalScore?.toLocaleString()}점
          </p>
        </div>
        <p className="text-center mt-2 text-sm font-normal text-_grey-400">
          현재 상위 10% 커트라인은{' '}
          {myRanking?.top10PercentCutoff?.toLocaleString()}점이에요!
        </p>
      </div>
      <MyScoreHistory scores={myScores} />
    </div>
  )
}
