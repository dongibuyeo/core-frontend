import Button from '@/components/ui/Button'
import { Document } from '@/public/svg'
import Link from 'next/link'

export default function Enroll() {
  return (
    <div className="px-2 h-[calc(100dvh-5rem)] flex flex-col">
      <Document className="w-20 mb-4 mt-28 mx-1" />
      <h1 className="text-2xl font-medium">
        상금 도전을 위해 <br />
        챌린지 전용 통장을 개설해주세요!
      </h1>
      <div className="mt-10">
        <h2 className="text-lg font-medium mb-4 text-_blue-300">필수동의</h2>
        <div className="text-_grey-400 text-sm border-l-8 border-_blue-300/[16%] pl-4 ml-1">
          <p>
            <span>{'쏠쏠한 챌린지 입출금'}통장</span> 상품설명서
          </p>
          <p>
            <span>{'쏠쏠한 챌린지 입출금'}통장</span> 특약
          </p>
          <p>예금거래기본약관</p>
          <p>{'입출금이자유로운예금약관'}</p>
          <p>금융거래 목적 확인서</p>
          <p>불법/탈명 차명거래 금지 설명 확인서</p>
          <p>접근매체 양도 및 매매 금지 설명 확인서</p>
          <p>예금자보호법 설명 확인</p>
        </div>
      </div>
      <Link href="/modals/enroll-confirm" className="mt-auto">
        <Button text="필수 동의" className=" text-white mb-4" />
      </Link>
    </div>
  )
}
