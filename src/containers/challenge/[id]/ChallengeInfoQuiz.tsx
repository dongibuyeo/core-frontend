/* eslint-disable no-nested-ternary */

import { Calendar, Flag, MoneyBag } from '@/public/svg/index'
import FundCard from '@/components/FundCard'
import { useMutation, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { getChallenge, postChallengeJoin } from '@/services/challenges'

import { Challenge, ChallengeJoinReq } from '@/types/Challenge'
import { formatDate } from '@/utils/formatDate'
import SectionTitle from '@/components/ui/SectionTitle'
import axios, { AxiosError } from 'axios'
import { getUserInfo } from '@/services/auth'

export default function ChallengeInfoQuiz() {
  const router = useRouter()
  const pathname = usePathname()
  const challengeId = pathname.split('/')[2]

  const { data: challenge } = useQuery<Challenge>({
    queryKey: ['challenge', challengeId],
    queryFn: () => getChallenge(challengeId),
  })

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  })

  const mutation = useMutation({
    mutationFn: (payload: ChallengeJoinReq) => postChallengeJoin(payload),
    onSuccess: () => {
      alert('참여가 완료되었습니다!')
      router.replace('/challenge/my')
    },
    onError: (error: AxiosError) => {
      if (axios.isAxiosError(error)) {
        alert((error.response?.data as any).message)
      }
    },
  })

  const handleQuizChallengeJoin = () => {
    mutation.mutate({
      challengeId,
      memberId: userInfo?.memberId as string,
      deposit: 0,
    })
  }

  return (
    <div className="flex flex-col gap-[3.75rem] pb-24 relative">
      <div className="mt-7">
        <div className="text-sm font-normal">퀴즈 챌린지</div>
        <div className="text-2xl font-medium mt-2">{challenge?.title}</div>
        <div className="text-base font-normal mt-6">
          매일 금융 퀴즈 한 문제 풀면 추첨으로 42분께 상금을 드려요! <br />
          정답을 맞힐 때마다 추첨권이 발행됩니다!
        </div>
      </div>
      <div>
        <div className="flex space-x-1 items-center">
          <Calendar />
          <span className="text-lg font-medium">챌린지 참여기간</span>
        </div>
        <div className="bg-_grey-100 w-full py-5 mt-4 text-center rounded-xl">
          <span className="text-_grey-400 text-base font-medium">
            {`${formatDate(challenge?.startDate ?? '')} ~ ${formatDate(challenge?.endDate ?? '')}`}
          </span>
        </div>
      </div>

      <div>
        <SectionTitle icon={<Flag />} label="챌린지 성공조건" />
        <div className="p-4 bg-_grey-100 rounded-2xl text-center mt-4">
          <p className="text-lg">
            한 달 동안
            <span className="text-primary text-medium">
              {' '}
              매일 금융 퀴즈 한 문제
            </span>
            풀기!
          </p>
        </div>
      </div>

      <div className="mb-10">
        <SectionTitle icon={<MoneyBag />} label="챌린지 누적 기금" />

        <div className="px-1 mb-2 flex flex-col gap-2">
          <p className="mt-4 flex gap-2 items-center">
            <div className="w-5 h-5 rounded-full bg-_grey-100 flex justify-center items-center">
              1
            </div>
            <p>
              챌린지 참여자 중
              <span className="text-primary font-medium"> 42명</span> 추첨해서
              상금드려요!
            </p>
          </p>
          <p className="mb-3 flex gap-2 items-center">
            <div className="w-5 h-5 rounded-full bg-_grey-100 flex justify-center items-center">
              2
            </div>
            <p>문제를 한 문제 맞힐 때마다 추첨권이 발행됩니다!</p>
          </p>
        </div>
        <FundCard
          title={`${challenge?.title} 기금`}
          participants={challenge?.participants}
          fund={challenge?.totalDeposit ?? ''}
        />
      </div>

      <div className="w-full px-5 z-50 fixed bottom-9 left-0">
        <button
          type="button"
          className="py-3 text-sm font-medium rounded-xl bg-_blue-300 text-white w-full"
          onClick={handleQuizChallengeJoin}
        >
          0원으로 참여하기
        </button>
      </div>
    </div>
  )
}
