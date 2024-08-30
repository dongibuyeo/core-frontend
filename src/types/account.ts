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
  accountBalance: string
  lastTransactionDate: string
  currency: string
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

export type AccountType = 'free' | 'saving'

export type CreateFreeAccountRes = {
  accountId: string
  accountNo: string
  accountType: 'CHALLENGE'
}

export type CreateSavingAccountReq = {
  challengeType: string
  startDate: string
  memberId: string
  withdrawalAccountNo: string
  depositBalance: number
}

export type CreateSavingAccountRes = {
  bankCode: string
  bankName: string
  accountNo: string
  accountName: string
  withdrawalBankCode: string
  withdrawalAccountNo: string
  subscriptionPeriod: string
  depositBalance: number
  interestRate: number
  accountCreateDate: string
  accountExpiryDate: string
}

export type SavingAccount = {
  bankCode: string
  bankName: string
  userName: string
  accountNo: string
  accountName: string
  accountDescription: string
  withdrawalBankCode: string
  withdrawalBankName: string
  withdrawalAccountNo: string
  subscriptionPeriod: string
  depositBalance: number
  interestRate: number
  installmentNumber: string
  totalBalance: number
  accountCreateDate: number
  accountExpiryDate: number
}
