import { instance } from '@/services/config/axios'
import {
  ChallengeRanking,
  ChallengeResult,
  EstimateRewardRes,
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

export const getChallengeResult = async (
  challengeId: string,
): Promise<ChallengeResult> => {
  const response = await instance.get(`/challenges/result/${challengeId}`)
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
