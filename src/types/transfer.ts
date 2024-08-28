export type TransferAccount = {
  id: number
  bank: string
  accountName: string
  accountNumber: number
  balance: number
}

export type TransferType = 'fill' | 'send'
