import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, Slider, DatePicker, Button } from "antd";
import dayjs from "dayjs";

interface Genre {
    id: number;
    name: string;
}

interface FilterProps {
    onFilterChange: (filters: { genres: number[]; rating: number; releaseYear: string }) => void;
}

const { Option } = Select;

const FilterBar: React.FC<FilterProps> = ({ onFilterChange }) => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [rating, setRating] = useState<number>(0);
    const [releaseYear, setReleaseYear] = useState<string>("");

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(
                    "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
                    {
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                        },
                    }
                );
                setGenres(response.data.genres);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        fetchGenres();
    }, []);

    const handleGenreChange = (value: number | number[]) => {
        if (Array.isArray(value)) {
            setSelectedGenres(value);
        } else {
            setSelectedGenres((prev) =>
                prev.includes(value) ? prev.filter((id) => id !== value) : [...prev, value]
            );
        }
    };

    const handleRatingChange = (value: number) => {
        setRating(value);
    };

    const handleDateChange = (_: any, dateString: string | string[]) => {
        setReleaseYear(Array.isArray(dateString) ? dateString[0] : dateString);
    };

    const applyFilters = () => {
        onFilterChange({ genres: selectedGenres, rating, releaseYear });
    };

    return (
        <div className="w-full md:w-64 bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            {/* Genres */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Genres</h3>
                <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Select genres"
                    value={selectedGenres}
                    onChange={handleGenreChange}
                >
                    {genres.map((genre) => (
                        <Option key={genre.id} value={genre.id}>
                            {genre.name}
                        </Option>
                    ))}
                </Select>
            </div>
            {/* Genres */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                        <button
                            key={genre.id}
                            className={`px-3 py-1 rounded-full border ${selectedGenres.includes(genre.id) ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
                            onClick={() => handleGenreChange(genre.id)}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>
            </div>
            {/* Rating */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Minimum Rating</h3>
                <Slider
                    min={0}
                    max={10}
                    value={rating}
                    onChange={handleRatingChange}
                    step={0.1}
                    tooltipVisible
                    marks={{ 0: "0", 10: "10" }}
                />
                <p className="text-gray-700 mt-2">Rating: {rating}</p>
            </div>

            {/* Release Year */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Release Year</h3>
                <DatePicker
                    picker="year"
                    value={releaseYear ? dayjs(releaseYear, "YYYY") : null}
                    onChange={handleDateChange}
                    style={{ width: "100%" }}
                />
            </div>

            {/* Apply Button */}
            <Button
                type="primary"
                block
                onClick={applyFilters}
            >
                Search Movies
            </Button>
        </div>
    );
};

export default FilterBar;
