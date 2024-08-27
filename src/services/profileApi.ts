import axios from 'axios'

// 프로필 데이터 가져오기
export const fetchProfile = async () => {
  const response = await axios.get('/api/profile')
  return response.data
}

// 프로필 데이터 업데이트
export const updateProfile = async (profile: {
  nickname: string
  image: string
}) => {
  const response = await axios.post('/api/profile', profile)
  return response.data
}
