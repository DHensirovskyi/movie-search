"use client";

import React from "react";
import { Grid } from '@mantine/core';
import { useFavorites } from "@/app/hooks/useFavourite";
import { MovieCard } from './MovieCard';
import type { MovieType } from "@/app/types/types";

type MovieListProps = {
  movies: MovieType[];
};

export default function MovieList({ movies }: MovieListProps) {
  const { favoriteIds, addFavorite, removeFavorite } = useFavorites();

  return (
    <Grid>
      {movies.map((movie) => {
        const isFavorite = favoriteIds.includes(movie.id);

        const handleToggleFavorite = (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (isFavorite) {
                removeFavorite(movie.id);
            } else {
                addFavorite(movie.id);
            }
        };

        return (
          <Grid.Col key={movie.id} span={{ base: 6, sm: 4, md: 3 }}>
            <MovieCard
              movie={movie}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
            />
          </Grid.Col>
        );
      })}
    </Grid>
  );
}