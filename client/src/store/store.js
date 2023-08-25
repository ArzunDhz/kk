import { create } from "zustand";

export const useStore = create((set) => ({
  searchUserId: "arjun",
  setSearchUserID: (id) => set((state) => ({ searchUserId: id })),
}));
