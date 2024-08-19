import axios from 'axios'
import { ROOT_API_URL } from './requestUrl'

export const publicApi = axios.create({
  baseURL: ROOT_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

publicApi.defaults.timeout = 5000
