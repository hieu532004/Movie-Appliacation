import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { Home } from "./pages/Home";
import { Trending } from "./pages/Trending";
import { Explore } from "./pages/Explore";
import { Movies } from "./pages/Movies";
import { Favorite } from "./pages/Favorite";
import { NoPage } from "./pages/NoPage";
import Navbar from "./components/Navbar";
import MovieDetail from "./components/popular/MovieDetail";
import MovieSearch from "./components/MovieSearch";
import axios from "axios";

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async (query: string) => {
    if (!query) return;
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: { query, language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  return (
    <Router>
      <Header onSearch={handleSearch} />
      <MovieSearch onSearch={handleSearch} />
      {searchResults.length > 0 && (
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map((movie) => (
              <div key={movie.id} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg mb-2"
                />
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="text-gray-500">{movie.release_date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Navbar />
    </Router>
  );
};

export default App;
