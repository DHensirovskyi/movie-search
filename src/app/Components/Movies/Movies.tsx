import Movie from "./Movie";

export type MovieType = {
  poster_path: string;
  id: number;
  title: string;
  vote_average: number;
};

type MovieProps = {
  movies: MovieType[];
};

export default function Movies({ movies }: MovieProps) {
  return (
    <div>
        <Movie moviesList={movies} />
    </div>
  );
}