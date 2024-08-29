export type TransferAccount = {
  bank: string
  accountName: string
  accountNumber: string
  balance: string
}

export type TransferType = 'fill' | 'send'
