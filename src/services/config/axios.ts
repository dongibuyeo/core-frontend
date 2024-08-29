import axios from 'axios'
import { ROOT_API_URL } from './requestUrl'

export const instance = axios.create({
  baseURL: ROOT_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.defaults.timeout = 5000
