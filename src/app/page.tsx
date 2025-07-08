import SearchBar from './Components/SearchBar'
import NowPlaying from './Components/Categories/NowPlaying';
import Popular from './Components/Categories/Popular'
import TopRated from './Components/Categories/TopRated';
import Upcoming from './Components/Categories/Upcoming'

export default async function HomePage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
    const resolvedSearchParams =  await searchParams
    const query = resolvedSearchParams.query || ''

    return (
      <>
        <div
          style={{
            background: 'url(/bg.svg) no-repeat center top',
            backgroundSize: 'cover',
            height: '550px',
            lineHeight: '3rem',
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
          }}>
          <div style={{maxWidth:'1200px', padding: '11.35rem 2rem', margin: '0 auto'}}>
            <h1 style={{fontSize:'50px', fontWeight: '800'}}><span style={{color: '#FF0000'}}>Find</span> <span style={{color: 'white'}}>your movie</span></h1>
            <SearchBar />
          </div>
        </div>
        <div>
          <NowPlaying searchParams={{ query: query }} />
          {!query && <Popular searchParams={{ query: query }} />}
          {!query && <TopRated searchParams={{ query: query }} />}
          {!query && <Upcoming searchParams={{ query: query }} />}
        </div>
      </>
    );
}
