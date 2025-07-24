import { getUpcomingMovies } from "@/app/api/data/api";
import Movies from "../Movies/Movies";
import { Title, Text } from "@mantine/core";

export default async function TopRated() {
    const movies = await getUpcomingMovies();
    if (!movies || movies.length === 0) {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.5rem 2rem'}}>
            <Title order={2} style={{color: 'white'}}>Upcoming</Title>
            <Text mt="md" style={{color: 'white'}}>Failed to load movies. Please try again later.</Text>
        </div>
    );
    }

    
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.5rem 2rem', marginTop: '25px'}}>
        <Title order={2} mb="md" style={{color: 'white', fontSize: '1.5rem'}}>Upcoming</Title>
        <Movies movies={movies.slice(0, 4)}/>
      </div>
    );
}
