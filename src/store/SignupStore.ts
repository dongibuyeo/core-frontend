import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SignupStore = {
  email: string
  setEmail: (email: string) => void
  username: string
  setUsername: (username: string) => void
  nickname: string
  setNickname: (nickname: string) => void
}

const useSignupStore = create(
  persist<SignupStore>(
    (set) => ({
      email: '',
      setEmail: (email) => set({ email }),
      username: '',
      setUsername: (username) => set({ username }),
      nickname: '',
      setNickname: (nickname) => set({ nickname }),
    }),
    {
      name: 'signupState',
    },
  ),
)

export default useSignupStore
