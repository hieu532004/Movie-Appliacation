import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from 'lucide-react';

interface HeaderProps {
    onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    return (
        <header className="bg-[#1e1e2a] p-4 md:p-10 text-white fixed top-0 w-full z-10">
            <div className="container mx-auto flex items-center justify-between px-4 md:px-20">
                <div className="text-xl md:text-2xl font-bold">
                    <Link to="/">
                        MOVIE<span className="text-yellow-500">VENNIE</span>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Movie"
                            value={searchQuery}
                            onChange={handleSearch}
                            className={`p-3 pl-10 rounded-full bg-gray-700 text-sm outline-none transition-all duration-300 ease-in-out transform ${isSearchVisible ? 'scale-100 w-48' : 'scale-0 w-0'} md:scale-100 md:w-48`}
                        />
                        <Search
                            size={20}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 cursor-pointer"
                            onClick={toggleSearch}
                        />
                    </div>
                    <div className="w-8 h-8 bg-yellow-500 rounded-full">
                        <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" alt="" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
