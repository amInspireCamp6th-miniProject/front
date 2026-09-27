import { create } from 'zustand'

const useScanStore = create((set) => ({
  scanResults: [],
  setScanResults: (results) => set({ scanResults: results }),
}))

export default useScanStore
