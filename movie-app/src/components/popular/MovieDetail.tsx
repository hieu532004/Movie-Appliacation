import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BookmarkIcon, HeartIcon, StarIcon } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

const MovieDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchlist, setIsWatchlist] = useState(false);
    const [userRating, setUserRating] = useState<number | null>(null);

    const apiKey = import.meta.env.VITE_API_KEY;

    const fetchMovieDetails = async (movieId: string) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                params: { language: "en-US" },
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
            });
            setMovie(response.data);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchMovieDetails(id);
    }, [id]);

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        toast(isFavorite ? "Removed from favorites" : "Added to favorites");
    };

    const handleWatchlistClick = () => {
        setIsWatchlist(!isWatchlist);
        toast(isWatchlist ? "Removed from watchlist" : "Added to watchlist");
    };

    const handleRatingClick = (rating: number) => {
        setUserRating(rating);
        toast(`Rated ${rating} star${rating > 1 ? "s" : ""}`);
    };

    if (loading) return <div className="text-center text-gray-500">Loading movie details...</div>;
    if (!movie) return <div className="text-center text-red-500">Movie not found!</div>;

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 sm:pt-32 pt-32">
            <Toaster />
            <div className="flex flex-col lg:flex-row lg:space-x-8">
                {/* Poster */}
                <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded-lg shadow-lg w-full"
                    />
                </div>

                {/* Movie Info */}
                <div className="flex-1">
                    <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-yellow-300">{movie.title}</h1>
                    <p className="text-gray-500 text-sm sm:text-lg mb-4">{movie.release_date}</p>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {movie.genres.map((genre: any) => (
                            <span
                                key={genre.id}
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs sm:text-sm"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-600 text-white font-semibold mr-4">
                            {movie.vote_average * 10}%
                        </div>
                        <span className="text-gray-700 text-sm sm:text-base">
                            {movie.vote_count} votes
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-4">
                        <button
                            className={`flex items-center px-4 py-2 rounded-lg ${isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
                                }`}
                            onClick={handleFavoriteClick}
                        >
                            <HeartIcon className="w-5 h-5 mr-2" />
                            Favorite
                        </button>
                        <button
                            className={`flex items-center px-4 py-2 rounded-lg ${isWatchlist ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                                }`}
                            onClick={handleWatchlistClick}
                        >
                            <BookmarkIcon className="w-5 h-5 mr-2" />
                            Watchlist
                        </button>
                        <div className="flex items-center space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${userRating && userRating >= star
                                        ? "bg-yellow-500 text-white"
                                        : "bg-gray-200 text-gray-800"
                                        }`}
                                    onClick={() => handleRatingClick(star)}
                                >
                                    <StarIcon className="w-5 h-5" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Overview */}
            <div className="mt-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-yellow-400">Overview</h2>
                <p className="text-gray-200 leading-relaxed">{movie.overview}</p>
            </div>

            {/* Additional Information */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-bold text-lg mb-2 text-yellow-400">Runtime</h3>
                    <p className="text-gray-200">{movie.runtime} minutes</p>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-2 text-yellow-400">Original Language</h3>
                    <p className="text-gray-200 px-20">{movie.original_language.toUpperCase()}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
