'use client'

import Button from '@/components/ui/Button'
import { Correct, Incorrect } from '@/public/svg'
import { getUserInfo } from '@/services/auth'
import { getRandomQuiz, postSolvedQuiz } from '@/services/challenges'
import { SolvedQuizReq } from '@/types/Challenge'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Quiz() {
  const router = useRouter()
  const [showAnswer, setShowAnswer] = useState(false)
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  })

  const { data: quiz } = useQuery({
    queryKey: ['todayQuiz'],
    queryFn: () => getRandomQuiz(userInfo?.memberId as string),
  })

  const answerMutation = useMutation({
    mutationFn: (payload: SolvedQuizReq) => postSolvedQuiz(payload),
    onSuccess: () => {
      router.replace('/challenge/my')
    },
  })

  const handleAnswer = (selectedAnswer: boolean) => {
    setShowAnswer(true)
    if (quiz && selectedAnswer === quiz.answer) {
      const payload = {
        quizId: quiz.id as string,
        memberId: userInfo?.memberId as string,
      }
      answerMutation.mutate(payload)
    }
  }

  return (
    <div className="h-main-screen flex flex-col items-center">
      <h1 className="text-xl font-medium mb-8 mt-20 text-center">
        <span>Q</span>. {quiz?.question}
      </h1>
      <div className="flex gap-8">
        <button
          type="button"
          className="bg-_blue-300/[8%] rounded-3xl"
          aria-label="그렇다"
          onClick={() => handleAnswer(true)}
        >
          <Correct className="p-10 w-40" />
        </button>
        <button
          type="button"
          className="bg-_red/[8%] rounded-3xl"
          aria-label="그렇지않다"
          onClick={() => handleAnswer(false)}
        >
          <Incorrect className="p-12 w-40" />
        </button>
      </div>
      {showAnswer && (
        <div className="w-full bg-_grey-100 rounded-2xl mt-auto p-6">
          <h2 className="text-lg font-medium">
            정답: {quiz?.answer ? '그렇다' : '아니다'}
          </h2>
          <p className="text-center text-lg">{quiz?.description}</p>
        </div>
      )}
      {showAnswer && <Button text="확인" />}
    </div>
  )
}
