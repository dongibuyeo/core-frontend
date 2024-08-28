import { instance } from '@/services/config/axios'

export const getUser = async () => {
  const email = localStorage.getItem('email') as string
  const response = await instance.get(`/members/login`, {
    params: { email },
  })
  return response
}

export const checkEmailDuplicate = async (debouncedEmail: string) => {
  const response = await instance.get(`/members/duplicate/${debouncedEmail}`)
  return response.data
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
