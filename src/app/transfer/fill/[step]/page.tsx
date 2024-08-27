'use client'

import TransferFirstStep from '@/containters/transfer/TransferFirstStep'

export default function FillAccount({ params }: { params: { step: string } }) {
  const renderPage = () => {
    switch (Number(params.step)) {
      case 1:
        return <TransferFirstStep type="fill" />
      default:
        return null
    }
  }
  return (
    <div className="w-full h-main-screen flex flex-col items-center gap-10">
      {renderPage()}
    </div>
  )
}
