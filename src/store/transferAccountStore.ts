import { TransferAccount } from '@/types/transfer'
import { create } from 'zustand'

type TransferAccountState = {
  selectedAccount: TransferAccount | null
  setSelectedAccount: (account: TransferAccount) => void
  clearSelectedAccount: () => void
}

const useTransferAccountStore = create<TransferAccountState>((set) => ({
  selectedAccount: null,
  setSelectedAccount: (account) => set({ selectedAccount: account }),
  clearSelectedAccount: () => set({ selectedAccount: null }),
}))

export default useTransferAccountStore
