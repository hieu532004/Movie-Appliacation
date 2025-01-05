import React from "react";
import { NavLink } from "react-router-dom";
import { House, Heart, Compass, Flame, TvMinimalPlay } from 'lucide-react';

const Navbar: React.FC = () => {
    return (
        <nav className="flex flex-row justify-center bg-[#1e1e2a] text-white text-[13px] fixed bottom-0 left-0 w-full space-x-2 lg:flex-col lg:justify-center lg:items-center lg:space-y-2 lg:space-x-0 lg:left-3 lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:w-auto z-50">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `flex flex-col items-center px-2 py-2 ${isActive ? "text-yellow-500" : "text-white"} hover:text-yellow-500`
                }
            >
                <House size={22} className="mb-2" />
                Home
            </NavLink>
            <NavLink
                to="/trending"
                className={({ isActive }) =>
                    `flex flex-col items-center px-2 py-2 ${isActive ? "text-yellow-500" : "text-white"} hover:text-yellow-500`
                }
            >
                <Flame size={22} className="mb-2" />
                Trending
            </NavLink>
            <NavLink
                to="/explore"
                className={({ isActive }) =>
                    `flex flex-col items-center px-2 py-2 ${isActive ? "text-yellow-500" : "text-white"} hover:text-yellow-500`
                }
            >
                <Compass size={22} className="mb-2" />
                Explore
            </NavLink>
            <NavLink
                to="/movies"
                className={({ isActive }) =>
                    `flex flex-col items-center px-2 py-2 ${isActive ? "text-yellow-500" : "text-white"} hover:text-yellow-500`
                }
            >
                <TvMinimalPlay size={22} className="mb-2" />
                Movies
            </NavLink>
            <NavLink
                to="/favorite"
                className={({ isActive }) =>
                    `flex flex-col items-center px-2 py-2 ${isActive ? "text-yellow-500" : "text-white"} hover:text-yellow-500`
                }
            >
                <Heart size={22} className="mb-2" />
                Favorite
            </NavLink>
        </nav>
    );
};

export default Navbar;
