'use client'

import TransferFirstStep from '@/containters/transfer/TransferFirstStep'
import TransferSecondStep from '@/containters/transfer/TransferSecondStep'
import { useParams } from 'next/navigation'

export default function FillAccount() {
  const params = useParams<{ type: string; step: string }>()

  const renderPage = () => {
    switch (Number(params.step)) {
      case 1:
        return <TransferFirstStep type="fill" />
      case 2:
        return <TransferSecondStep type="fill" />
      default:
        return null
    }
  }

  return <div className="w-full h-main-screen">{renderPage()}</div>
}
