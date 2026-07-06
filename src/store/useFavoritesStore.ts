import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/Products';

type FavoritesState = {
  fav: Product[];
  toggleFavorite: (product: Product) => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      fav: [],

      toggleFavorite: (product) =>
        set((state) => {
          const exists = state.fav.some((item) => item.itemId === product.itemId);

          if (exists) {
            return { fav: state.fav.filter((item) => item.itemId !== product.itemId) };
          }

          return { fav: [...state.fav, product] };
        }),
    }),
    { name: 'favorites' },
  ),
);
