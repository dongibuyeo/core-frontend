import ExampleModal from '@/components/modals/ExampleModal'
import TransferAccountListModal from '@/components/modals/TransferAccountListModal'

export default function Modal({ params }: { params: { type: string } }) {
  const renderModal = () => {
    switch (params.type) {
      case 'example':
        return <ExampleModal />
      case 'transfer':
        return <TransferAccountListModal />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      {renderModal()}
    </div>
  )
}
