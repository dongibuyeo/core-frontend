import { Correct, Incorrect } from '@/public/svg'

export default function QuizMain() {
  return (
    <div className="h-main-screen flex flex-col items-center">
      <h1 className="text-xl font-medium mb-8 mt-20">
        <span>Q</span>. {'쓰레기 봉투의 가격은 지역별로 다르다?'}
      </h1>
      <div className="flex gap-10">
        <button
          type="button"
          className="bg-_blue-300/[8%] rounded-3xl"
          aria-label="그렇다"
        >
          <Correct className="p-10 w-40" />
        </button>
        <button
          type="button"
          className="bg-_red/[8%] rounded-3xl"
          aria-label="그렇지않다"
        >
          <Incorrect className="p-12 w-40" />
        </button>
      </div>
      <div className="w-full bg-_grey-100 rounded-2xl mt-auto p-6">
        <h2 className="text-lg font-medium">정답: O</h2>
        <p>쓰레기본투의 가격은 지역별로 달라유</p>
      </div>
    </div>
  )
}
