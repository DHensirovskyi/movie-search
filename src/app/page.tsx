import NowPlaying from './Components/Categories/NowPlaying';
import Popular from './Components/Categories/Popular'
import TopRated from './Components/Categories/TopRated';
import Upcoming from './Components/Categories/Upcoming'
import HomePageSearch from './Components/HomePageSearch';

export default async function HomePage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
    const resolvedSearchParams =  await searchParams
    const query = resolvedSearchParams.query || ''

    return (
      <>
      <HomePageSearch />
      <div>  
          {!query && <Popular/>}
          {!query && <TopRated/>}
          {!query && <Upcoming/>}
          <NowPlaying searchParams={{ query: query }} />
      </div>
      </>
    );
}
