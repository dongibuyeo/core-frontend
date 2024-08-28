import TransferAccountItem from '@/containers/transfer/TransferAccountItem'

const dummy = [
  {
    id: 1,
    bank: '토스뱅크',
    accountName: '신한 주거래S20 통장',
    accountNumber: 110472000000,
    balance: 121344252,
  },
  {
    id: 1,
    bank: '토스뱅크',
    accountName: '신한 주거래S20 통장',
    accountNumber: 110472000000,
    balance: 121344252,
  },
  {
    id: 1,
    bank: '토스뱅크',
    accountName: '신한 주거래S20 통장',
    accountNumber: 110472000000,
    balance: 121344252,
  },
]

export default function TransferAccountListModal() {
  return (
    <div className="w-full h-full bg-white px-2 py-6 rounded-t-[2rem]">
      <h1 className="text-lg font-medium p-4 pt-0">가져올 계좌 선택하기</h1>
      <ul className="overflow-auto max-h-[50dvh] min-h-[12dvh]">
        {dummy.map((account) => (
          <TransferAccountItem
            key={account.id}
            bank={account.bank}
            accountName={account.accountName}
            accountNumber={account.accountNumber}
            balance={account.balance}
          />
        ))}
      </ul>
    </div>
  )
}
