"use client";

import React from "react";
import Link from "next/link";
import Image from 'next/image';
import { motion } from "framer-motion";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import type { MovieType } from "@/app/types/types";

type MovieCardProps = {
  movie: MovieType;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
};

export function MovieCard({ movie, isFavorite, onToggleFavorite }: MovieCardProps) {
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <button
        onClick={onToggleFavorite}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          zIndex: 10,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: 'white',
        }}
        aria-label="Toggle Favorite"
      >
        {isFavorite 
          ? <MdFavorite size="2.2rem" color="#ff0000" />
          : <MdOutlineFavoriteBorder size="2.2rem" style={{ filter: 'drop-shadow(0 0 3px black)' }} />
        }
      </button>

      <Link href={`/MoviePage/${movie.id}`} style={{ textDecoration: 'none' }}>
        <div>
          <div>
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image width={256} height={344} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/noImg.svg'} style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', borderRadius: '10px', height: '100%' }} alt={movie.title} />
            </motion.div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ color: 'white', fontSize: '16px', fontWeight: '500', maxWidth: '210px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {movie.title}
              </p>
              <div style={{ background: '#FF0000', width: '30px', height: '32px', marginLeft: 'auto', borderRadius: '5px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <p style={{ color: 'white', fontSize: '16px', fontWeight: '500', margin: '0 auto' }}>{movie.vote_average.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}