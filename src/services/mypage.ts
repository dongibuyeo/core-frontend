import { instance } from '@/services/config/axios'
import { UserProfile } from '@/types/UserProfile'
import { ChallengeStatus, ChallengeStatusCounts } from '@/types/ChallengeStatus'

// 특정 회원 정보를 ID로 조회하는 함수
export const getUserById = async (memberId: string) => {
  const response = await instance.get<UserProfile>(`/members/${memberId}`)
  return response.data
}

// 특정 회원 정보를 이메일로 조회하는 함수
export const getUserProfileByEmail = async () => {
  const email = localStorage.getItem('email') as string
  const response = await instance.get<UserProfile>(`/members/email/${email}`, {
    params: { email },
  })
  return response.data
}

// 회원 정보 수정 함수
export const updateUserProfile = async (profileData: {
  nickname: string
  profileImage: string
}) => {
  const userProfile = await getUserProfileByEmail()

  const response = await instance.patch<UserProfile>('/members/change', {
    memberId: userProfile.memberId,
    ...profileData,
  })
  return response.data
}

// 특정 회원의 챌린지 참여 현황 조회 - 챌린지 상태별 참여 개수 조회 함수
export const getChallengeStatusCount = async (memberId: string) => {
  const response = await instance.get<
    { status: ChallengeStatus; count: number }[]
  >(`/challenges/member/status-count`, {
    params: { memberId },
  })

  // ChallengeStatusCounts 객체 초기화
  const challengeStatusCounts: ChallengeStatusCounts = {
    SCHEDULED: 0,
    IN_PROGRESS: 0,
    COMPLETED: 0,
  }

  // 응답 데이터를 ChallengeStatusCounts 타입으로 변환
  response.data.forEach((item) => {
    challengeStatusCounts[item.status] = item.count
  })

  return challengeStatusCounts
}

// 특정 회원의 챌린지 참여 현황 조회 - 챌린지 상태별 챌린지 목록 상세 조회 함수
export const getChallengeStatusDetails = async (
  memberId: string,
  status: ChallengeStatus,
) => {
  const response = await instance.get(`/challenges/member/status`, {
    params: { memberId, status },
  })
  return response.data
}

// 특정 회원의 챌린지 계좌 정보 조회 함수
export const getChallengeAccountInfo = async (memberId: string) => {
  const response = await instance.get(`/account/challenge/${memberId}`)
  return response.data
}
