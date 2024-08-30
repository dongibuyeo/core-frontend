export type MemberChallengeDetail = {
  challengeId: string
  type: string
  status: string
  accountNo: string
  startDate: string
  endDate: string
  title: string
  description: string
  image: string
  totalDeposit: number
  participants: number
  memberStatus: string
  isSuccess: boolean
  memberDeposit: number
  baseReward: number
  additionalReward: number
  totalScore: number
}

export type MyChallengeList = {
  totalCalculatedNum: number
  memberChallengeDetails: MemberChallengeDetail[]
}
