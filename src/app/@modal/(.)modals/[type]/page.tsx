'use client'

import { BottomModalContainer } from '@/components/modals/BottomModalContainer'
import { CenterModalContainer } from '@/components/modals/CenterModalContainer'
import EnrollConfirmModal from '@/components/modals/EnrollConfirmModal'
import ExampleModal from '@/components/modals/ExampleModal'
import { ModalLayout } from '@/components/modals/ModalLayout'
import QuizModal from '@/components/modals/QuizModal'
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
      case 'enroll-confirm':
        return (
          <BottomModalContainer>
            <EnrollConfirmModal />
          </BottomModalContainer>
        )
      case 'quiz-modal':
        return (
          <BottomModalContainer>
            <QuizModal />
          </BottomModalContainer>
        )
      default:
        return null
    }
  }

  return <ModalLayout>{renderModal()}</ModalLayout>
}
