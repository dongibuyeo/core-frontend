import { instance } from '@/services/config/axios'
import {
  ChallengeJoinReq,
  ChallengeJoinRes,
  ChallengeRanking,
  ChallengeResult,
  EstimateRewardRes,
  SolvedQuizReq,
  SolvedQuizRes,
} from '@/types/Challenge'

export const getAllChallenge = async () => {
  const response = await instance.get('/challenges')
  return response.data
}

export const getChallenge = async (challengeId: string) => {
  const response = await instance.get(`/challenges/${challengeId}`)
  return response.data
}

export const getChallengeRanking = async (
  challengeId: string,
): Promise<ChallengeRanking> => {
  const response = await instance.get(`/challenges/rank/${challengeId}`)
  return response.data
}

export const getMyRanking = async (memberId: string, challengeId: string) => {
  const response = await instance.get(`/challenges/rank/my-challenge`, {
    params: { memberId, challengeId },
  })
  return response.data
}

export const getChallengeResult = async (
  challengeId: string,
): Promise<ChallengeResult> => {
  const response = await instance.get(`/challenges/result/${challengeId}`)
  return response.data
}

export const getMyChallengeResult = async (
  memberId: string,
  challengeId: string,
) => {
  const response = await instance.get(`/challenges/result/my-challenge`, {
    params: { memberId, challengeId },
  })
  return response.data
}

export const getEstimateReward: (
  challengeId: string,
) => Promise<EstimateRewardRes> = async (challengeId) => {
  const response = await instance.get('/challenges/estimate-reward', {
    params: {
      challengeId,
    },
  })
  return response.data
}

export const postChallengeJoin: (
  payload: ChallengeJoinReq,
) => Promise<ChallengeJoinRes> = async (payload) => {
  const response = await instance.post('/challenges/member/join', payload)
  return response.data
}

export const getMyChallengeList = async (memberId: string) => {
  const response = await instance.get(`/challenges/member`, {
    params: { memberId },
  })
  return response.data
}

export const getMyScores = async (
  memberId: string,
  challengeId: string,
  deposit: number,
) => {
  const response = await instance.post(`/challenges/member/score-details`, {
    memberId,
    challengeId,
    deposit,
  })
  return response.data.dailyScores
}

export const getCheckSolved = async (memberId: string) => {
  const response = await instance.get(`/quiz/aadelry /${memberId}`)
  return response.data
}

export const getRandomQuiz: (memberId: string) => Promise<{
  id: string
  question: string
  answer: boolean
  description: string
}> = async (memberId) => {
  const response = await instance.get(`/quiz/${memberId}`)
  return response.data
}

export const postSolvedQuiz: (
  payload: SolvedQuizReq,
) => Promise<SolvedQuizRes> = async (payload) => {
  const response = await instance.post('/quiz/solve', payload)
  return response.data
}
