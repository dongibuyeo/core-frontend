/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-no-useless-fragment */
import { Flag, MoneyBag } from '@/public/svg/index'
import { getEstimateReward } from '@/services/challenges'
import { MemberChallengeDetail } from '@/types/MyChallenge'
import { useQuery } from '@tanstack/react-query'


export default function ScheduledDetail({
  challenge,
}: {
  challenge: MemberChallengeDetail
}) {
  const { data: estimateReward } = useQuery({
    queryKey: ['estimateReward'],
    queryFn: () => getEstimateReward(challenge?.challengeId as string),
  })

  return (
    <div className="flex flex-col gap-[3.75rem]">
      <div>
        <div className="flex space-x-1 items-center">
          <Flag />
          <span className="text-lg font-medium">내 챌린지 성공조건</span>
        </div>
        <div className="bg-_grey-100 w-full p-4 mt-4 text-center rounded-xl text-sm font-normal">
          <p>지난달 나의 소비보다 더 적게 소비하면 성공!</p>
        </div>
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
    </div>
  )
}
