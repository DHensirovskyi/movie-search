import { Container } from "@mantine/core";
import { FaCalendarAlt, FaStar } from "react-icons/fa";
import { LuTimer } from "react-icons/lu";
import { MdNoAdultContent } from "react-icons/md";
import Image from 'next/image'
import './globals.css';


interface IGenre {
    id: number,
    name: string
}


export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params

    const API_TOKEN = process.env.API_TOKEN;
    const url = `https://api.themoviedb.org/3/movie/${resolvedParams.id}`;

    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`
        }
    };

    try{
        const res = await fetch(url,options)
        const movie = await res.json()
        console.log(movie);

        const formattedDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }) : 'Unknown'

        const formatRuntime = (runtime: number) => {
            const hours = Math.floor(runtime / 60);
            const minutes = runtime % 60;
            return `${hours}:${minutes.toString().padStart(2, '0')}`;
        };

        return(
            <Container style={{maxWidth:'1200px', padding: '0rem 2rem', margin: '0 auto', color:'white'}}>
                <div className="movie-flex-row">
                    <div className="movie-img-block">
                        <Image width={280} height={500} alt={movie.title} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/noImg.svg'} style={{width:'100%', aspectRatio: '2/3.5', objectFit:'cover', borderRadius: '10px'}} />
                    </div>
                    <div className="movie-text-block">

                        <h3>{movie.title}</h3>

                        <div className="movie-info-block">
                            {movie.genres && movie.genres.map((genre: IGenre) => (
                            <span key={genre.id} style={{background: 'white', color: 'black', borderRadius: '10px', padding: '0.5rem 1rem', fontWeight: '700', whiteSpace: 'nowrap',}}>{genre.name}</span>
                            ))}
                            {movie.release_date && <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                <FaCalendarAlt />
                                <p>{new Date(movie.release_date).getFullYear()}</p>
                            </div>}
                            {movie.runtime && <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                <LuTimer />
                                <p>{formatRuntime(movie.runtime)}</p>
                            </div>}
                            {movie.vote_average && <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                <FaStar/>
                                <p>{movie.vote_average.toFixed(1)}</p>
                            </div>}
                            {movie.adult && <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                <MdNoAdultContent />
                            </div>}
                        </div>
                        {movie.overview && <p>{movie.overview}</p>}

                        <div className="movie-about-block">
                            {movie.adult && <b><p style={{color: '#FF0000'}}>Adult Content</p></b>}
                            {movie.production_countries.length > 0 && <p><b> Country: </b>{movie.production_countries && movie.production_countries.length > 0 ? movie.production_countries[0].name : 'Unknown'}</p>}
                            {movie.genres.length > 0 && <p><b>Genres: </b>{movie.genres.map((genre: IGenre) => genre.name).join(', ')}</p>}
                            {movie.release_date && <p><b>Release Date: </b>{formattedDate}</p>}
                            {movie.production_companies.length > 0 && <p><b>Companies: </b>{movie.production_companies.map((company: {name: string}) => company.name).join(', ')}</p>}
                        </div>
                    </div>
                </div>
            </Container>
        )}
    catch(error){
        console.log('Error', error);
        return <div style={{color: 'white', padding: '2rem'}}>Could not load movie info</div>;
    }
}