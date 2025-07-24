"use client"; // Обязательно для Mantine Grid и Framer Motion

import React from "react";
import Link from "next/link";
import Image from 'next/image';
import type { MovieType } from "@/app/types/types";
import { MotionDiv } from "../Motion";
import { Grid } from '@mantine/core'; // Импортируем Grid из Mantine

type MovieProps = {
  moviesList: MovieType[];
};

export default function Movie({ moviesList }: MovieProps) {
  return (
    <Grid>
      {moviesList.map((movie) => (
        <Grid.Col
          key={movie.id}
          span={{ base: 6, sm: 4, md: 3 }}
        >
          <Link href={`/MoviePage/${movie.id}`} style={{ textDecoration: 'none' }}>
            <div>
              <div>
                <MotionDiv
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image width={256} height={344} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/noImg.svg'} style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', borderRadius: '10px', height: '100%' }} alt={movie.title} />
                </MotionDiv>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ color: 'white', fontSize: '16px', fontWeight: '500', maxWidth: '210px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {movie.title}
                  </p>
                  <div style={{ background: '#FF0000', width: '30px', height: '32px', marginLeft: 'auto', borderRadius: '5px', display: 'flex', alignItems: 'center', flexShrink: 0}}>
                    <p style={{ color: 'white', fontSize: '16px', fontWeight: '500', margin: '0 auto' }}>{movie.vote_average.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </Grid.Col>
      ))}
    </Grid>
  );
}