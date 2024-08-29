import { instance } from '@/services/config/axios'
import { UserInfo } from '@/types/user'

export const getUserInfo = async () => {
  const email = localStorage.getItem('email') as string
  const response = await instance.get(`/members/email/${email}`)
  return response.data
}

export const getUserInfo: () => Promise<UserInfo> = async () => {
  const email = localStorage.getItem('email') as string
  const response = await instance.get(`/members/email/${email}`)
  return response.data
}

export const checkEmailDuplicate = async (debouncedEmail: string) => {
  const response = await instance.get(`/members/duplicate/${debouncedEmail}`)
  return response.data.isPresent
}

export const signupUser = async (
  email: string,
  username: string,
  nickname: string,
  token?: { current: string },
) => {
  const body = {
    email,
    name: username,
    nickname,
    ...(token && { deviceToken: token.current }),
  }

  const response = await instance.post('/members/save', body)
  return response.data
}
