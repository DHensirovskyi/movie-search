import type { MovieType } from '@/app/types/types';

export async function getMovieDetailsById(id: number): Promise<MovieType | null> {
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
  const url = `https://api.themoviedb.org/3/movie/${id}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    }
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch movie ${id}`, error);
    return null;
  }
}


export async function getPopularMovies(): Promise<MovieType[]> {
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
  const url = 'https://api.themoviedb.org/3/movie/popular';

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
    next: { revalidate: 3600 }
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error('Failed to fetch popular movies');
    }
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
}


export async function getTopRatedMovies(): Promise<MovieType[]> {
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
  const url = 'https://api.themoviedb.org/3/movie/top_rated';

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
    next: { revalidate: 3600 }
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error('Failed to fetch Top Rated movies');
    }
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
}

export async function getUpcomingMovies(): Promise<MovieType[]> {
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
  const url = 'https://api.themoviedb.org/3/movie/upcoming';

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
    next: { revalidate: 3600 }
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error('Failed to fetch Upcoming movies');
    }
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return [];
  }
}