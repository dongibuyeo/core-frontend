'use client'

import { BottomModalContainer } from '@/components/modals/BottomModalContainer'
import ExampleModal from '@/components/modals/ExampleModal'
import { ModalLayout } from '@/components/modals/ModalLayout'

export default function ModalPage({ params }: { params: { type: string } }) {
  const renderModal = () => {
    switch (params.type) {
      case 'example':
        return (
          <BottomModalContainer>
            <ExampleModal />
          </BottomModalContainer>
        )
      default:
        return null
    }
  }

  return <ModalLayout>{renderModal()}</ModalLayout>
}
