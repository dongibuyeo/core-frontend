'use client'

import { BottomModalContainer } from '@/components/modals/BottomModalContainer'
import ExampleModal from '@/components/modals/ExampleModal'
import { ModalLayout } from '@/components/modals/ModalLayout'
import TransferAccountListModal from '@/components/modals/TransferAccountListModal'

export default function ModalPage({ params }: { params: { type: string } }) {
  const renderModal = () => {
    switch (params.type) {
      case 'example':
        return (
          <BottomModalContainer>
            <ExampleModal />
          </BottomModalContainer>
        )
      case 'transfer':
        return (
          <BottomModalContainer>
            <TransferAccountListModal />
          </BottomModalContainer>
        )
      default:
        return null
    }
  }

  return <ModalLayout>{renderModal()}</ModalLayout>
}
