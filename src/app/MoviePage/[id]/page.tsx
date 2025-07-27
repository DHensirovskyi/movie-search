import { Container } from "@mantine/core";
import { FaCalendarAlt, FaStar } from "react-icons/fa";
import { LuTimer } from "react-icons/lu";
import { MdNoAdultContent } from "react-icons/md";
import Image from 'next/image'
import './globals.css';
import { MotionDiv } from "@/app/Components/Motion";
import Link from "next/link";


interface IGenre {
    id: number,
    name: string
}

interface IActor {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params

    const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
    const url = `https://api.themoviedb.org/3/movie/${resolvedParams.id}`;
    const actorUrl = `https://api.themoviedb.org/3/movie/${resolvedParams.id}/credits`;

    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`
        }
    };

    try{
        const [movieRes, actorRes] = await Promise.all([
            fetch(url, options),
            fetch(actorUrl, options)
        ]);

        if (!movieRes.ok || !actorRes.ok) {
            throw new Error('Could not load movie info');
        }

        const movie = await movieRes.json();
        const actorInfo = await actorRes.json();
        const cast: IActor[] = actorInfo.cast; 

        const formattedDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }) : 'Unknown'

        const formatRuntime = (runtime: number) => {
            const hours = Math.floor(runtime / 60);
            const minutes = runtime % 60;
            return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
        };

        return(
            <Container style={{maxWidth:'1200px', padding: '0rem 2rem', margin: '0 auto', color:'white'}}>
                <div className="movie-flex-row">
                    <div className="movie-img-block">
                        <Image width={280} height={500} alt={movie.title} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/noImg.svg'} style={{width:'100%', aspectRatio: '2/3.5', objectFit:'cover', borderRadius: '10px'}} />
                    </div>
                    <div className="movie-text-block">

                        <p style={{fontWeight: '700', fontSize: '2.125rem', marginTop: '-10px'}}>{movie.title}</p>

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
                        {movie.overview && <p className="description-text">{movie.overview}</p>}

                        <div className="movie-about-block">
                            {movie.adult && <b><p style={{color: '#FF0000'}}>Adult Content</p></b>}
                            {movie.production_countries.length > 0 && <p><b> Country: </b>{movie.production_countries && movie.production_countries.length > 0 ? movie.production_countries[0].name : 'Unknown'}</p>}
                            {movie.genres.length > 0 && <p><b>Genres: </b>{movie.genres.map((genre: IGenre) => genre.name).join(', ')}</p>}
                            {movie.release_date && <p><b>Release Date: </b>{formattedDate}</p>}
                            {movie.production_companies.length > 0 && <p><b>Companies: </b>{movie.production_companies.map((company: {name: string}) => company.name).join(', ')}</p>}
                        </div>
                    </div>
                </div>
                
                <div style={{ marginTop: '40px' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '20px' }}>Cast</h2>
                    <div className='grid'>
                        {cast && cast.slice(0, 10).map((person) => (
                            <Link href={`actor/${person.id}`} style={{ textDecoration: 'none' }} key={person.id}>
                            <MotionDiv
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.98 }} >
                                    <Image
                                        width={140}
                                        height={210}
                                        alt={person.name}
                                        src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : '/noImg.svg'}
                                        style={{ width: '100%', aspectRatio: '1/1.5', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
                                    />
                                    <p style={{ marginTop: '8px', fontWeight: '600', color: 'white'}}>{person.name}</p>
                                    <p style={{ fontSize: '0.875rem', color: '#aaa', marginTop: '-10px' }}>{person.character}</p>
                            </MotionDiv>
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        )}
    catch(error){
        console.log('Error', error);
        return <div style={{color: 'white', padding: '2rem'}}>Could not load movie info</div>;
    }
}