"use client";

import { useState, useEffect } from 'react';
import { FavoritesContext } from './FavoritesContext';

// Этот компонент будет оборачивать наше приложение
export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // При первой загрузке считываем данные из localStorage
  useEffect(() => {
    try {
      const items = window.localStorage.getItem('favoriteMovies');
      if (items) {
        setFavoriteIds(JSON.parse(items));
      }
    } catch (error) {
      console.error("Failed to load favorites", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // При каждом изменении списка — сохраняем его в localStorage
  useEffect(() => {
    if (!isLoading) {
      window.localStorage.setItem('favoriteMovies', JSON.stringify(favoriteIds));
    }
  }, [favoriteIds, isLoading]);

  const addFavorite = (id: number) => {
    setFavoriteIds(prevIds => [...prevIds, id]);
  };

  const removeFavorite = (id: number) => {
    setFavoriteIds(prevIds => prevIds.filter(favId => favId !== id));
  };

  const value = {
    favoriteIds,
    addFavorite,
    removeFavorite,
    isLoading
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};