'use client'

import { getUpcomingMovies } from "@/app/api/data/api";
import { Title, Text, Button } from "@mantine/core";
import MovieList from "../Movies/MovieList";
import { FaArrowDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MovieType } from "@/app/types/types";

const MOVIES_TO_SHOW = 8;

export default function Upcoming() {
    const [visibleCount, setVisibleCount] = useState<number>(4)
    const [movies, setMovies] = useState<MovieType[]>()

    useEffect(() => {
      const loadMovies = async () => {
        const allMovies = await getUpcomingMovies();
        setMovies(allMovies || [])
        console.log(allMovies);
      }
      loadMovies()
    },[])
    
    function handleVisibleCount(){
      setVisibleCount((count) => count + MOVIES_TO_SHOW)
    }

    if (!movies || movies.length === 0) {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.5rem 2rem'}}>
            <Title order={2} style={{color: 'white'}}>Upcoming</Title>
            <Text mt="md" style={{color: 'white'}}>Failed to load movies. Please try again later.</Text>
        </div>
    );
    }

    
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.5rem 2rem',  marginTop: '25px'}}>
        <Title order={2} mb="md" style={{color: 'white', fontSize: '1.5rem'}}>Upcoming</Title>
        <MovieList movies={movies.slice(0, visibleCount)}/>
        <div style={{maxWidth: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
          {visibleCount < movies.length && <Button onClick={handleVisibleCount} style={{background: 'none', fontSize: '1rem'}}>More<FaArrowDown style={{marginLeft: '10px'}} /></Button>}
        </div>
      </div>
    );
}
