export interface RecommendationPageProps {
  challengeType:
    | 'CONSUMPTION_COFFEE'
    | 'CONSUMPTION_DRINK'
    | 'CONSUMPTION_DELIVERY'
  memberEmail: string
  accountNo: string
  startDate: string
  endDate: string
  transactionType: string
  orderByType: string
  accountTypeUniqueNo: string
}
