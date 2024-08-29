export type Challenge = {
  challengeId: string
  type?: string
  status?: string
  accountNo?: string
  startDate: string
  endDate: string
  title: string
  description?: string
  totalDeposit: number
  participants: string
  image: string
}

export type ChallengeType =
  | 'CONSUMPTION_COFFEE'
  | 'CONSUMPTION_DRINK'
  | 'CONSUMPTION_DELIVERY'
  | 'SAVINGS_SEVEN'
  | 'QUIZ_SOLBEING'

export type Member = {
  nickname: string
  email: string
  profileImage: string
  score: number
}

export type ChallengeRanking = {
  challengeId: string
  top10PercentCutoff: number
  top5Members: Member[]
}

export type ChallengeResult = {
  challengeId: string
  type: string
  status: string
  startDate: string
  endDate: string
  title: string
  description: string
  image: string
  totalDeposit: number
  participants: number
  totalReward: number
  interestEarned: number
  remainDeposit: number
  top10PercentRewardPerUnit: number
  lower90PercentRewardPerUnit: number
  top10PercentMemberNum: number
  lower90PercentMemberNum: number
  successRate: number
  successNum: number
}

export type EstimateRewardRes = {
  totalReward: number
  interestEarned: number
  remainDeposit: number
  top10PercentRewardPerUnit: number
  lower90PercentRewardPerUnit: number
  top10PercentMemberNum: number
  lower90PercentMemberNum: number
}
