import React from "react";
import type { MovieType } from './Movies';
import Link from "next/link";
import Image from 'next/image'

type MovieProps = {
  moviesList: MovieType[];
};

export default function Movie({ moviesList }: MovieProps) {
  return (
    <div style={{display: 'grid',  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px', overflow: 'hidden'}}>
      {moviesList.map((movie) => (
        <Link href={`/MoviePage/${movie.id}`}  style={{textDecoration: 'none'}} key={movie.id}>
        <div>
          <div>
            <Image width={256} height={344} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/noImg.svg'} style={{width:'100%', aspectRatio: '2/3', objectFit:'cover', borderRadius: '10px'}} alt={movie.title}/>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <p key={movie.id} style={{color: 'white', fontSize: '16px', fontWeight:'500', maxWidth: '210px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
              {movie.title}
            </p>
            <div style={{background: '#FF0000', width: '30px', height: '32px', marginLeft: 'auto', borderRadius: '5px', display:'flex', alignItems: 'center'}}>
              <p style={{color: 'white', fontSize: '16px', fontWeight:'500', margin:'0 auto'}}>{movie.vote_average.toFixed(1)}</p>
            </div>
          </div>
        </div>
        </div>
        </Link>
      ))}
    </div>
  );
}