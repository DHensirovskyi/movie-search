"use client";

import { useState, useEffect } from 'react';
import { useFavorites } from '../hooks/useFavourite';
import { getMovieDetailsById } from '../api/data/api';
import MovieList from '../Components/Movies/MovieList';
import { Center, Loader, Title, Text } from '@mantine/core';
import type { MovieType } from '../types/types';

export default function FavoritesPage() {
  const { favoriteIds, isLoading: isLoadingFavorites } = useFavorites();
  const [favoriteMovies, setFavoriteMovies] = useState<MovieType[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);

  useEffect(() => {
    if (isLoadingFavorites) return;

    if (favoriteIds.length === 0) {
      setIsLoadingMovies(false);
      setFavoriteMovies([]);
      return;
    }

    const fetchFavoriteMovies = async () => {
      setIsLoadingMovies(true);
      const moviesData = await Promise.all(
        favoriteIds.map(id => getMovieDetailsById(id))
      );
      setFavoriteMovies(moviesData.filter((movie): movie is MovieType => movie !== null));
      setIsLoadingMovies(false);
    };

    fetchFavoriteMovies();
  }, [favoriteIds, isLoadingFavorites]);

  if (isLoadingFavorites || isLoadingMovies) {
    return (
      <Center style={{ height: '80vh' }}>
        <Loader color="red" type="dots" />
      </Center>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 2rem' }}>
      <Title order={1} mb="xl" style={{color: 'white'}}>Мое избранное</Title>
      
      {favoriteMovies.length > 0 ? (
        <MovieList movies={favoriteMovies} />
      ) : (
        <Center style={{ height: '50vh', flexDirection: 'column' }}>
          <Title order={2} style={{color: 'white'}}>Список избранного пуст</Title>
          <Text c="dimmed">Добавьте фильмы, нажимая на сердечко ❤️</Text>
        </Center>
      )}
    </div>
  );
}