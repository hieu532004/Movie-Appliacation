import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Banner } from '../components/Banner';
import { MovieList } from '../components/MovieList';

export const Home: React.FC = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [nowPlay, setTopNowPlay] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const popularResponse = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                    },
                });
                setPopularMovies(popularResponse.data.results);

                const topRatedResponse = await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                    },
                });
                setTopRatedMovies(topRatedResponse.data.results);

                const nowPlay = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                    },
                });
                setTopNowPlay(nowPlay.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className='container mx-auto p-8'>
            <Banner />
            {loading ? (
                <div className='text-red-700 font-bold'>Loading...</div>
            ) : (
                <>
                    <MovieList title={'Popular Movies'} data={popularMovies} />
                    <MovieList title={'Top Rated Movies'} data={topRatedMovies} />
                    <MovieList title={'Now Playing'} data={nowPlay} />
                </>
            )}
        </div>
    );
};
