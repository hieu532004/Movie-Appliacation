import React from "react";
import MovieCard from "./MovieCard";

const MovieGrid: React.FC<{ movies: any[] }> = ({ movies }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    rating={Math.round(movie.vote_average * 10)} // Convert rating to percentage
                />
            ))}
        </div>
    );
};

export default MovieGrid;
