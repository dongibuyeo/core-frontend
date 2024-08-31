'use client'

import Button from '@/components/ui/Button'
import { Correct, Incorrect } from '@/public/svg'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function QuizModal() {
  const router = useRouter()
  const [showAnswer, setShowAnswer] = useState(false)
  const [res, setRes] = useState<boolean>()
  const answer = false

  return (
    <div className="p-4 h-full w-full flex flex-col items-center rounded-t-3xl bg-white">
      <h1 className="text-xl font-medium mb-8 mt-4 text-center">
        <span>Q</span>. 대출상품을 조회하면 신용점수가 떨어진다.
      </h1>
      <div className="flex gap-8">
        <button
          type="button"
          className="bg-_blue-300/[8%] rounded-3xl"
          aria-label="그렇다"
          onClick={() => {
            setRes(true)
            setShowAnswer(true)
          }}
        >
          <Correct className="p-10 w-40" />
        </button>
        <button
          type="button"
          className="bg-_red/[8%] rounded-3xl"
          aria-label="그렇지않다"
          onClick={() => {
            setRes(false)
            setShowAnswer(true)
          }}
        >
          <Incorrect className="p-12 w-40" />
        </button>
      </div>
      {showAnswer && (
        <div className="w-full bg-_grey-100 rounded-2xl mt-6 p-6">
          <h1 className="text-3xl font-medium">
            {res === answer ? '정답입니다' : '오답입니다'}
          </h1>
          <h2 className="text-lg font-medium mt-4">정답: 아니다!</h2>
          <p className="text-center text-lg">
            대출상품을 조회하는 것만으로는 신용정보에 영향을 미치지 않습니다.
            신용정보에 영향을 주는 것은 대출 신청 후 실제 심사가 진행될 때이므로
            상품비교를 위해 조회하는 것은 신용 점수에 영향을 주지 않습니다!
            하지만 대출 신청과 심사 과정에서 잦은 신용조회가 이루어지면
            신용점수에 영향을 줄 수 있으니 주의하세요.
          </p>
        </div>
      )}
      {showAnswer && (
        <div className="mt-6 w-full bg-_blue-300/[8%] rounded-3xl p-6 flex flex-col">
          <h1 className="mb-4">안심하고 신한은행에서 대출상품 비교해보세요!</h1>
          <Button text="알아보러가기" onClick={() => router.back()} />
          <button
            type="button"
            onClick={() => router.back()}
            className="text-_grey-400 p-4 pb-0"
          >
            다음에 확인하기
          </button>
        </div>
      )}
    </div>
  )
}
