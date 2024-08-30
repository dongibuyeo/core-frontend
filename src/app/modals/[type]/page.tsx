import EnrollConfirmModal from '@/components/modals/EnrollConfirmModal'
import ExampleModal from '@/components/modals/ExampleModal'
import TransferAccountListModal from '@/components/modals/TransferAccountListModal'

export default function Modal({ params }: { params: { type: string } }) {
  const renderModal = () => {
    switch (params.type) {
      case 'example':
        return <ExampleModal />
      case 'transfer':
        return <TransferAccountListModal />
      case 'enroll-confirm':
        return <EnrollConfirmModal />
      default:
        return null
    }
  }

  return (
    <div className="flex h-main-screen justify-center items-center">
      {renderModal()}
    </div>
  )
}
