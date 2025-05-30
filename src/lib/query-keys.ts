import { createQueryKeyStore } from '@lukemorales/query-key-factory'

export const queries = createQueryKeyStore({
  // User-related queries
  user: {
    all: null,
    info: null,
    profile: null,
  },

  // Challenge-related queries
  challenge: {
    all: null,
    list: null,
    detail: (challengeId: string) => [challengeId],
    my: null,
    status: null,
    result: (challengeId: string) => [challengeId],
    ranking: (challengeId: string) => [challengeId],
  },

  // Account-related queries
  account: {
    challenge: null,
    savingsSeven: null,
    all: null,
    no: null,
  },

  // Financial data queries
  finance: {
    spentMoney: (type?: string) => (type ? [type] : [type || 'default']),
    estimateReward: null,
    totalConsumption: null,
  },

  // User performance queries
  performance: {
    myRanking: null,
    myScores: (challengeId: string) => [challengeId],
    myChallengeResult: (challengeId?: string) => [challengeId || 'all'],
  },

  // Validation queries
  validation: {
    emailCheck: (email: string) => [email],
    checkSolved: null,
  },

  // Content queries
  content: {
    todayQuiz: null,
    historyData: null,
  },

  // Chat queries
  chat: {
    history: (roomName: string) => [roomName],
  },
})

export type QueryKeys = typeof queries
