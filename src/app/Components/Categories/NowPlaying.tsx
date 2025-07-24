import { Title } from "@mantine/core";
import Movies from "../Movies/Movies";

export default async function NowPlaying({searchParams} : {searchParams: {query: string}}) {
  const API_TOKEN = process.env.API_TOKEN;
  const query = searchParams.query || ''
  const url = query ? `https://api.themoviedb.org/3/search/movie?query=${query}` : 'https://api.themoviedb.org/3/movie/now_playing';

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    }
  };

  try{
    const res = await fetch(url, options)
    const data = await res.json()
    const movies = await data.results;
    
    
    return (
      <>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.5rem 2rem'}}>
            <Title style={{color: 'white', fontSize: '1.5rem', margin: '18px 0px'}}>  {query ? query.charAt(0).toUpperCase() + query.slice(1) : 'Now Playing'}</Title>
            {movies && movies.length > 0 ? (<Movies movies={query ? movies : movies.slice(0,4)} />)
            : (<p style={{ color: 'white', fontSize: '20px', textAlign: 'center', marginTop: '2rem' }}>No Result</p>)}
          </div>
      </>
    );
  }catch(error){
    console.log('Error', error);
  }
}
