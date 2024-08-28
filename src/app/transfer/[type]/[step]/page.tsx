'use client'

import TransferFirstStep from '@/containters/transfer/TransferFirstStep'
import TransferSecondStep from '@/containters/transfer/TransferSecondStep'
import TransferThirdStep from '@/containters/transfer/TransferThirdStep'
import { TransferType } from '@/types/transfer'
import { useParams } from 'next/navigation'

export default function FillAccount() {
  const params = useParams<{ type: TransferType; step: string }>()

  const renderPage = () => {
    switch (Number(params.step)) {
      case 1:
        return <TransferFirstStep type={params.type} />
      case 2:
        return <TransferSecondStep type={params.type} />
      case 3:
        return <TransferThirdStep type={params.type} />
      default:
        return null
    }
  }

  return <div className="w-full h-main-screen">{renderPage()}</div>
}
