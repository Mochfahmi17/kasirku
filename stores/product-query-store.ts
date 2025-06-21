import { create } from "zustand";

type ProductQueryStore = {
  key: string;
  setKey: (key: string) => void;
};

export const useProductQueryStore = create<ProductQueryStore>((set) => ({
  key: "",
  setKey: (key) => set({ key }),
}));
