import { Account } from '@/types/account'
import { create } from 'zustand'

type TransferAccountState = {
  selectedAccount: Account | null
  setSelectedAccount: (account: Account) => void
  clearSelectedAccount: () => void
}

const useTransferAccountStore = create<TransferAccountState>((set) => ({
  selectedAccount: null,
  setSelectedAccount: (account) => set({ selectedAccount: account }),
  clearSelectedAccount: () => set({ selectedAccount: null }),
}))

export default useTransferAccountStore
