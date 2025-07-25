"use client";

import { createContext } from 'react';

// Определяем, какую форму будут иметь данные в нашем контексте
interface FavoritesContextType {
  favoriteIds: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isLoading: boolean;
}

// Создаем контекст с начальными "пустыми" значениями
export const FavoritesContext = createContext<FavoritesContextType>({
  favoriteIds: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isLoading: true,
});