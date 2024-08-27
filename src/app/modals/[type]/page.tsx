import ExampleModal from '@/components/modals/ExampleModal'

export default function Modal({ params }: { params: { type: string } }) {
  const renderModal = () => {
    switch (params.type) {
      case 'example':
        return <ExampleModal />
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
