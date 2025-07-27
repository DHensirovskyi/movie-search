import { Container } from "@mantine/core";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlinePlace } from "react-icons/md";
import Image from 'next/image'
import './globals.css';

export default async function ActorPage({ params }: { params: Promise<{ actorId: string }> }) {
    const resolvedParams = await params

    const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
    const url = `https://api.themoviedb.org/3/person/${resolvedParams.actorId}`;

    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`
        }
    };

    try{
        const res = await fetch(url, options);
        const actor = await res.json()
        if (!res.ok) return null;
        console.log(actor);

        const formattedDate = actor.birthday ? new Date(actor.birthday).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }) : 'Unknown'

        return(
            <Container style={{maxWidth:'1200px', padding: '0rem 2rem', margin: '0 auto', color:'white'}}>

                <div className="movie-flex-row">
                    <div className="movie-img-block">
                        <Image width={280} height={500} alt={actor.name} src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '/noImg.svg'} style={{width:'100%', aspectRatio: '2/3.5', objectFit:'cover', borderRadius: '10px'}} />
                    </div>
                    <div className="movie-text-block">
                        <p style={{fontWeight: '700', fontSize: '2.125rem', marginTop: '-10px'}}>{actor.name}</p>

                        <div className="movie-info-block">
                            {actor.birthday && <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                <FaCalendarAlt />
                                <p>{actor.birthday}</p>
                            </div>}
                            {actor.place_of_birth && <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                <MdOutlinePlace />
                                <p>{actor.place_of_birth}</p>
                            </div>}
                        </div>
                        {actor.biography && <p className="description-text">{actor.biography}</p>}

                        <div className="movie-about-block">
                            {actor.place_of_birth && <p><b>Place Of Birth: </b>{actor.place_of_birth}</p>}
                            {actor.birthday && <p><b>Birthday: </b>{formattedDate}</p>}
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
    catch(error){
        console.log('Error', error);
        return <div style={{color: 'white', padding: '2rem'}}>Could not load actor info</div>;
    }
}