/* eslint-disable no-unsafe-optional-chaining */
import MyChallengeAchievementRate from '@/containers/mychallenge/MyChallengeAchievementRate'
import MyScoreHistory from '@/containers/mychallenge/MyScoreHistory'
import { MoneyBag, Trophy } from '@/public/svg/index'
import { getUserInfo } from '@/services/auth'
import {
  getEstimateReward,
  getMyRanking,
  getMyScores,
} from '@/services/challenges'
import { getSpentMoneyList } from '@/services/consume'
import { MemberChallengeDetail } from '@/types/MyChallenge'
import { useQuery } from '@tanstack/react-query'

export default function ProgressDetail({
  challenge,
}: {
  challenge: MemberChallengeDetail
}) {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
  })

  const { data: spentMoneyList } = useQuery({
    queryKey: ['spentMoney', challenge?.type],
    queryFn: () =>
      getSpentMoneyList(user?.memberId ?? '', challenge?.type ?? ''),
    enabled: !!user?.memberId,
  })

  const { data: estimateReward } = useQuery({
    queryKey: ['estimateReward'],
    queryFn: () => getEstimateReward(challenge?.challengeId as string),
  })

  const { data: myRanking } = useQuery({
    queryKey: ['myRanking'],
    queryFn: () =>
      getMyRanking(user?.memberId as string, challenge?.challengeId as string),
    enabled: !!user?.memberId,
  })

  const { data: myScores } = useQuery({
    queryKey: ['myScores', challenge?.challengeId],
    queryFn: () =>
      getMyScores(
        user?.memberId as string,
        challenge?.challengeId as string,
        challenge?.memberDeposit,
      ),
    enabled: !!user?.memberId && !!challenge?.memberDeposit,
  })

  console.log(myScores)

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
          currentSpentMoney={currentSpentMoney}
          lastSpentMoney={lastSpentMoney}
          isSuccess
        />
      </div>
      <div>
        <div className="flex space-x-1 items-center">
          <MoneyBag />
          <span className="text-lg font-medium">도전 예치금</span>
        </div>
        <div className="bg-_grey-100 w-full p-4 mt-4 text-center rounded-xl text-sm font-normal">
          <p className="text-xl font-medium text-primary">
            {challenge?.memberDeposit?.toLocaleString()}원
          </p>
        </div>
        <div className="bg-_grey-100 p-4 rounded-xl mt-4 flex flex-col gap-3 text-center">
          {challenge?.memberDeposit ? (
            <>
              <p className="flex justify-between">
                <span>성공(상위10%)</span>
                <span>
                  (예상){' '}
                  {(
                    challenge?.memberDeposit +
                    (challenge?.memberDeposit / 10000) *
                      (estimateReward?.top10PercentRewardPerUnit || 0)
                  ).toLocaleString()}
                </span>
              </p>
              <p className="flex justify-between">
                <span>성공(하위90%)</span>
                <span>
                  (예상){' '}
                  {(
                    challenge?.memberDeposit +
                    (challenge?.memberDeposit / 10000) *
                      (estimateReward?.lower90PercentRewardPerUnit || 0)
                  ).toLocaleString()}
                </span>
              </p>
              <p className="flex justify-between">
                <span>실패</span>
                <span>성공률만큼 일부 환급</span>
              </p>
            </>
          ) : (
            <p>금액을 입력하시면 예상 환급금을 조회해드려요!</p>
          )}
        </div>
      </div>
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
