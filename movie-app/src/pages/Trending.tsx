import React, { useEffect, useState } from "react";
import axios from "axios";
import FilterBar from "../components/popular/FilterBar";
import MovieGrid from "../components/popular/MovieGird";
import { Pagination } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export const Trending: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]); // Danh sách phim
    const [loading, setLoading] = useState(true); // Trạng thái tải
    const [filters, setFilters] = useState<{ genres: number[]; rating: number; releaseYear: string }>({ genres: [], rating: 0, releaseYear: "" }); // Bộ lọc
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang

    const pageSize = 10; // Số lượng phim mỗi trang

    const fetchMovies = async (filters: any, page: number) => {
        setLoading(true);
        try {
            const { genres, rating, releaseYear } = filters;
            const response = await axios.get(
                "https://api.themoviedb.org/3/discover/movie",
                {
                    params: {
                        language: "en-US",
                        with_genres: genres.join(","),
                        "vote_average.gte": rating,
                        "primary_release_year": releaseYear,
                        page: page, // Truyền số trang
                    },
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                    },
                }
            );
            setMovies(response.data.results); // Dữ liệu phim
            setTotalPages(response.data.total_pages); // Tổng số trang từ API
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(filters, currentPage); // Gọi lại API khi thay đổi bộ lọc hoặc trang
    }, [filters, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page); // Cập nhật số trang khi người dùng thay đổi
    };

    return (
        <div className="flex space-x-8 p-24 pt-28">
            {/* Filter Bar */}
            <FilterBar onFilterChange={setFilters} />

            {/* Movie Grid */}
            <div className="flex-1">
                {loading ? (
                    // Skeleton loading state
                    <div className="grid grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="animate-pulse">
                                {/* Khung ảnh trống */}
                                <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                                {/* Khung tiêu đề */}
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                {/* Khung ngày phát hành */}
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <MovieGrid movies={movies} />
                        {/* Pagination */}
                        <div className="mt-4 flex justify-center bg-white p-4  rounded-lg font-semibold">
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={totalPages * pageSize} // Tổng số items
                                onChange={handlePageChange}
                                showSizeChanger={false} // Tắt thay đổi số lượng phim trên mỗi trang
                                showQuickJumper // Cho phép nhảy đến trang
                                prevIcon={<LeftOutlined className="text-white" />}
                                nextIcon={<RightOutlined className="text-white" />}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
