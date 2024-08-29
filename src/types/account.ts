export type Account = {
  bankCode: string
  bankName: string
  userName: string
  accountNo: string
  accountName: string
  accountTypeCode: string
  accountTypeName: string
  accountCreatedDate: string
  accountExpiryDate: string
  dailyTransferLimit: string
  oneTimeTransferLimit: string
  accountBalance: string | number
  lastTransactionDate: string
  currency: string
  totalBalance?: number
}

export type TransferReq = {
  memberId: string
  depositAccountNo: string
  withdrawalAccountNo: string
  transactionBalance: number
  transferType: 'CHALLENGE'
}

export type TransferRes = {
  transactionUniqueNo: string
  accountNo: string
  transactionDate: string
  transactionType: string
  transactionTypeName: string
  transactionAccountNo: string
}
