import { instance } from '@/services/config/axios'
import { ChallengeRanking, ChallengeResult } from '@/types/Challenge'

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

export const getMyChallengeList = async (memberId: string) => {
  const response = await instance.get(`/challenges/member`, {
    params: { memberId },
  })
  return response.data
}
