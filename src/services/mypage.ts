import { instance } from '@/services/config/axios'
import { UserProfile } from '@/types/UserProfile'
import { ChallengeStatus, ChallengeStatusCounts } from '@/types/ChallengeStatus'
import { getUserInfo } from './auth'

export const updateUserProfile = async (profileData: {
  nickname: string
  profileImage: string
}) => {
  const userProfile = await getUserInfo()

  const response = await instance.patch<UserProfile>('/members/change', {
    memberId: userProfile.memberId,
    ...profileData,
  })
  return response.data
}

export const getChallengeStatusCount = async (memberId: string) => {
  const response = await instance.get<{
    scheduledCount: number
    inProgressCount: number
    completedCount: number
  }>(`/challenges/member/status-count`, {
    params: { memberId },
  })

  const challengeStatusCounts: ChallengeStatusCounts = {
    SCHEDULED: response.data.scheduledCount,
    IN_PROGRESS: response.data.inProgressCount,
    COMPLETED: response.data.completedCount,
  }

  return challengeStatusCounts
}

export const getChallengeStatusDetails = async (
  memberId: string,
  status: ChallengeStatus,
) => {
  const response = await instance.get(`/challenges/member/status`, {
    params: { memberId, status },
  })
  return response.data
}
