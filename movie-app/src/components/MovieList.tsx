import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Youtube } from 'lucide-react';

interface Movie {
    id: number;
    title: string;
    original_title: string;
    poster_path: string;
}

interface MovieListProps {
    title: string;
    data: Movie[];
}

export const MovieList: React.FC<MovieListProps> = ({ title, data }) => {
    const [trailerKey, setTrailerKey] = useState<string | null>(null);

    const handleTrailer = async (id: number) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                },
            });
            const data = await response.json();
            const trailer = data.results[0]?.key;
            if (trailer) {
                setTrailerKey(trailer);
            } else {
                console.error('No trailer found');
            }
        } catch (error) {
            console.error('Error fetching trailer:', error);
        }
    };

    const closeModal = () => {
        setTrailerKey(null);
    };

    return (
        <>
            <div className="text-white mt-8 bg-[#2d2e37] p-3 mb-4 relative">
                <h2 className="uppercase text-2xl">{title}</h2>
            </div>

            <Swiper className="relative"
                spaceBetween={20}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                breakpoints={{
                    300: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    400: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }}
            >
                {data.length > 0 && data.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="w-full h-[300px] relative group" onClick={() => handleTrailer(item.id)}>
                            <div className="group-hover:scale-110 transition-transform duration-500 ease-in-out w-full h-full cursor-pointer">
                                <div className="absolute top-0 left-0 w-full h-full bg-black/40 group-hover:bg-black/70 transition-all duration-500 ease-in-out" />
                                <img src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                                    alt={item.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                    <Youtube className="text-red-600" />
                                </div>
                                <div className="absolute bottom-2 left-2 p-2">
                                    <h2 className="text-xl font-bold text-white">{item.title || item.original_title}</h2>
                                    <p className="uppercase text-xs text-green-500 font-semibold pt-3">Action</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {trailerKey && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative w-full max-w-4xl">
                        <button className="absolute top-2 right-2 text-white text-2xl" onClick={closeModal}>&times;</button>
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src={`https://www.youtube.com/embed/${trailerKey}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
