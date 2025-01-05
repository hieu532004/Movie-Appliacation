import React from "react";
import { Menu } from "@headlessui/react";
import { BookmarkIcon, ChevronDownIcon, HeartIcon, StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
    id: number; // ID của phim để điều hướng
    title: string;
    releaseDate: string;
    posterPath: string;
    rating: number; // Rating từ 0 đến 100
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, releaseDate, posterPath, rating }) => {
    const navigate = useNavigate();

    // Điều hướng đến trang chi tiết phim
    const handleNavigate = () => {
        navigate(`/movie/${id}`);
    };

    return (
        <div
            className="relative w-full sm:w-48 bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
            onClick={handleNavigate} // Khi nhấn vào card, điều hướng đến trang chi tiết
        >
            {/* Poster */}
            <img src={posterPath} alt={title} className="w-full h-64 object-cover" />

            {/* Rating Badge */}
            <div className="absolute bottom-20 left-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white font-semibold">
                    {rating}%
                </div>
            </div>

            {/* Menu Button */}
            <Menu as="div" className="absolute top-2 right-2">
                <Menu.Button
                    className="w-7 h-7 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-700"
                    onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện lan truyền
                >
                    ...
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-10">
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                className={`flex items-center w-full px-4 py-2 text-sm ${active ? "bg-gray-100" : ""
                                    }`}
                            >
                                <ChevronDownIcon className="w-5 h-5 mr-2" />
                                Add to list
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                className={`flex items-center w-full px-4 py-2 text-sm ${active ? "bg-gray-100" : ""
                                    }`}
                            >
                                <HeartIcon className="w-5 h-5 mr-2 text-red-500" />
                                Favorite
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                className={`flex items-center w-full px-4 py-2 text-sm ${active ? "bg-gray-100" : ""
                                    }`}
                            >
                                <BookmarkIcon className="w-5 h-5 mr-2 text-blue-500" />
                                Watchlist
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                className={`flex items-center w-full px-4 py-2 text-sm ${active ? "bg-gray-100" : ""
                                    }`}
                            >
                                <StarIcon className="w-5 h-5 mr-2 text-yellow-500" />
                                Your rating
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Menu>

            {/* Movie Info */}
            <div className="p-4">
                <h3 className="text-md font-bold text-gray-900 truncate">{title}</h3>
                <p className="text-sm text-gray-500">{releaseDate}</p>
            </div>
        </div>
    );
};

export default MovieCard;
