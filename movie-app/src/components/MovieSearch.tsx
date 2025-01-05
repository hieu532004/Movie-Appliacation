import React, { useState } from 'react';

interface MovieSearchProps {
    onSearch: (query: string) => void;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center justify-center mb-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie..."
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
                type="submit"
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Search
            </button>
        </form>
    );
};

export default MovieSearch;