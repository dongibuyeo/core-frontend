import axios from 'axios'
import { ROOT_API_URL } from './requestUrl'

export const privateApi = axios.create({
  baseURL: ROOT_API_URL,
  headers: {
    ContentType: 'application/json',
  },
  withCredentials: true,
})

privateApi.interceptors.request.use(
  (config) => {
    const authHeader = config.headers['x-auth-not-required']
    if (authHeader) return config

    const token = localStorage.getItem('token')
    if (!token) return config
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`

    return config
  },
  (error) => Promise.reject(error),
)

privateApi.defaults.timeout = 5000
