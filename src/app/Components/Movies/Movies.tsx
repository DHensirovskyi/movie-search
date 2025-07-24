import Movie from "./Movie";
import type { MovieType } from "@/app/types/types";

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