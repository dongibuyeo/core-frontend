'use client'

import ExampleModal from '@/components/modals/ExampleModal'
import { ModalLayout } from '@/components/modals/ModalLayout'

export default function ModalPage({ params }: { params: { type: string } }) {
  const renderModal = () => {
    switch (params.type) {
      case 'example':
        return <ExampleModal />
      default:
        return null
    }
  }

  return <ModalLayout>{renderModal()}</ModalLayout>
}
