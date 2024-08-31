'use client'

import { getUserInfo } from '@/services/auth'
import { instance } from '@/services/config/axios'
import { convertTransferType } from '@/utils/convertTransferType'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface Props {
  status: '참여예정' | '참여중' | '정산필요' | '완료'
  detailPage: boolean
  type?: string
  challengeId?: string
}

function ChallengeButton({ status, detailPage, type, challengeId }: Props) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
  })

  const mutation = useMutation({
    mutationFn: async () => {
      await instance.post(`/challenges/member/cancel`, {
        memberId: user?.memberId,
        challengeId,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myChallengeList'] })
      router.push('/challenge/my')
    },
    onError: () => {
      console.error('에러 발생')
    },
  })

  function renderButtons() {
    const blueButton =
      'w-full py-3 my-4 bg-_blue-300 bg-opacity-15 text-_blue-300 rounded-lg text-center text-sm font-medium'

    const redButton =
      'w-full py-3 my-4 bg-_red bg-opacity-10 text-_red rounded-lg text-center text-sm font-medium'

    if (detailPage) {
      switch (status) {
        case '참여예정':
          return (
            <div className="flex gap-3">
              <button
                type="button"
                className={redButton}
                onClick={() => mutation.mutate()}
              >
                포기하기
              </button>
              <button
                type="button"
                className={blueButton}
                onClick={() =>
                  router.push(`/chat/${convertTransferType(type as string)}`)
                }
              >
                채팅
              </button>
            </div>
          )
        case '참여중':
          return (
            <button
              type="button"
              className={blueButton}
              onClick={() =>
                router.push(`/chat/${convertTransferType(type as string)}`)
              }
            >
              채팅
            </button>
          )
        case '정산필요':
          return (
            <div className="flex gap-3">
              <button
                type="button"
                className={blueButton}
                onClick={() => router.push(`/challenge/result/${challengeId}`)}
              >
                챌린지 전체 결과보기
              </button>
              <button type="button" className={redButton}>
                정산받기
              </button>
            </div>
          )
        case '완료':
          return (
            <button
              type="button"
              className={blueButton}
              onClick={() => router.push(`/challenge/result/${challengeId}`)}
            >
              챌린지 전체 결과보기
            </button>
          )
        default:
          return null
      }
    } else {
      switch (status) {
        case '참여예정':
        case '참여중':
          return (
            <div className="flex gap-3">
              <button
                type="button"
                className={blueButton}
                onClick={() => router.push(`/challenge/${challengeId}`)}
              >
                챌린지 상세보기
              </button>
              <button
                type="button"
                className={blueButton}
                onClick={() =>
                  router.push(`/chat/${convertTransferType(type as string)}`)
                }
              >
                채팅
              </button>
            </div>
          )
        case '정산필요':
        case '완료':
          return (
            <button
              type="button"
              className={blueButton}
              onClick={() => router.push(`/challenge/result/${challengeId}`)}
            >
              챌린지 전체 결과보기
            </button>
          )
        default:
          return null
      }
    }
  }

  return <div>{renderButtons()}</div>
}

export default ChallengeButton
