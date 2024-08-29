import { instance } from '@/services/config/axios'
import { UserProfile } from '@/types/UserProfile'

export const getUserProfile = async () => {
  const email = localStorage.getItem('email') as string
  const response = await instance.get<UserProfile>(`/members/email/${email}`, {
    params: { email },
  })
  const profileData = response.data

  if (!profileData.profileImage) {
    profileData.profileImage = 'Sol'
  }

  return profileData
}

export const updateUserProfile = async (profileData: {
  nickname: string
  profileImage: string
}) => {
  const response = await instance.put<UserProfile>(
    `/members/change`,
    profileData,
  )
  return response.data
}
