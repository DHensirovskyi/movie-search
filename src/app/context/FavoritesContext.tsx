"use client";

import { createContext } from 'react';

interface FavoritesContextType {
  favoriteIds: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isLoading: boolean;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favoriteIds: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isLoading: true,
});