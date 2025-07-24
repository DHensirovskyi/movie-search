import NowPlaying from './Components/Categories/NowPlaying';
import Popular from './Components/Categories/Popular'
import TopRated from './Components/Categories/TopRated';
import Upcoming from './Components/Categories/Upcoming'
import { Suspense } from 'react';
import { MovieRowSkeleton } from './Components/MovieRowSkeleton';
import HomePageSearch from './Components/HomePageSearch';

const box = {
    width: 100,
    height: 100,
    backgroundColor: "#ff0088",
    borderRadius: 5,
}

export default async function HomePage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
    const resolvedSearchParams =  await searchParams
    const query = resolvedSearchParams.query || ''

    return (
      <>
      <HomePageSearch />
      <div>
        <Suspense fallback={<MovieRowSkeleton />}>
          <NowPlaying searchParams={{ query: query }} />
        </Suspense>
        <Suspense fallback={<MovieRowSkeleton />}>
          {!query && <Popular/>}
        </Suspense>
        <Suspense fallback={<MovieRowSkeleton />}>
          {!query && <TopRated/>}
        </Suspense>
        <Suspense fallback={<MovieRowSkeleton />}>
          {!query && <Upcoming/>}
        </Suspense>
      </div>
      </>
    );
}
