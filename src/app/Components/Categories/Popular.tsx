import Movies from "../Movies/Movies";

export default async function Popular({searchParams} : {searchParams: {query: string}}) {
  const API_TOKEN = process.env.API_TOKEN;

  const query = searchParams.query || ''
  const url = 'https://api.themoviedb.org/3/movie/popular';

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
          <p style={{color: 'white', fontWeight: '800', fontSize: '24px'}}>  {query ? query.charAt(0).toUpperCase() + query.slice(1) : 'Popular'}</p>
            {movies && movies.length > 0 ? (<Movies movies={movies.slice(0, 4)} />)
            : (<p style={{ color: 'white', fontSize: '20px', textAlign: 'center', marginTop: '2rem' }}>No Result</p>)}
          </div>
      </>
    );
  }catch(error){
    console.log('Error', error);
  }
}
