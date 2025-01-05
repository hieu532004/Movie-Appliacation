import { useState } from 'react';
import { CirclePlay } from 'lucide-react';

export const Banner = () => {
    const [showVideo, setShowVideo] = useState(false);

    const handleButtonClick = () => {
        setShowVideo(true);
    };

    return (
        <div className='pt-16 rounded-2xl w-full relative'>
            <div className="absolute top-auto left-0 w-full h-auto bg-black/40" />
            <img src='https://images5.alphacoders.com/126/1261364.jpg' alt='Movie Banner' className='banner-image rounded-xl w-full h-auto object-cover' />
            <div className='banner-content absolute top-10 left-0 w-full h-full flex flex-col justify-center items-center text-white px-4'>
                <h1 className='banner-title text-2xl md:text-4xl font-bold text-center'>Hitman's Wife's Bodyguard</h1>
                <p className='banner-description text-sm md:text-lg mt-4 text-yellow-200 text-center'>Releasing 23 July</p>
                <button onClick={handleButtonClick} className='mt-6 px-4 py-2 md:px-6 md:py-3 bg-yellow-500 rounded-full flex items-center justify-center'>
                    <CirclePlay className='w-6 h-6 md:w-8 md:h-8' />
                </button>
                {showVideo && (
                    <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/80'>
                        <iframe
                            width="560"
                            height="315"
                            src="https://youtu.be/9C0l31YcahQ?si=egCeH3T5bT1Nc7EX"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className='w-full max-w-3xl h-64 md:h-96'
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
};