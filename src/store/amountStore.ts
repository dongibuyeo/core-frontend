import { create } from 'zustand'

type AmountState = {
  amount: number | null
  setAmount: (amount: number | null) => void
}

const useAmountStore = create<AmountState>((set) => ({
  amount: null,
  setAmount: (amount) => set({ amount }),
}))

export default useAmountStore
