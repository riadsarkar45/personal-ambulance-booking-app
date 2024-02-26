import StarIcon from '@mui/icons-material/Star';
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import { useState } from 'react';
const ReviewsChar = () => {
    const [percentage, setPercentage] = useState({ percentage: 0 })
    const [isLoading, setIsLoading] = useState(null)
    const axiosSecure = useAxiosSecure();
    const handleGetUserRatings = (rating) => {
        setIsLoading(true)
        axiosSecure.post('/api/get/user/reviews', { rating }).then(res => setPercentage(res.data), setIsLoading(false))
    }
    return (
        <main className="grid w-full text-gray-100 ">
            <section className="p-6 space-y-6  rounded-xl md:grid md:grid-cols-2 md:gap-4 sm:space-y-0">
                <div className="grid grid-cols-2 gap-6">
                    <button onClick={() => handleGetUserRatings("5")} className="px-4 py-2 text-xl text-gray-100 border-0 transition bg-blue-600 rounded-md h-14 w-44 hover:bg-blue-700 font-bold ring-2">
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                    </button>
                    <button onClick={() => handleGetUserRatings("4")} className="px-4 py-2 text-xl text-gray-100 border-0 transition bg-blue-600 rounded-md h-14 w-44 hover:bg-blue-700 font-bold ring-2">
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                    </button>
                    <button onClick={() => handleGetUserRatings("3")} className="px-4 py-2 text-xl text-gray-100 border-0 transition bg-blue-600 rounded-md h-14 w-44 hover:bg-blue-700 font-bold ring-2">
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                    </button>
                    <button onClick={() => handleGetUserRatings("2")} className="px-4 py-2 text-xl text-gray-100 border-0 transition bg-blue-600 rounded-md h-14 w-44 hover:bg-blue-700 font-bold ring-2">
                        <StarIcon />
                        <StarIcon />
                    </button>

                </div>
                <div className="flex items-center justify-center">
                    <svg className="transform -rotate-90 w-72 h-72">
                        <circle cx="145" cy="145" r="120" stroke="currentColor" strokeWidth="30" fill="transparent" className="text-gray-700" />
                        <circle
                            cx="145"
                            cy="145"
                            r="120"
                            stroke="currentColor"
                            strokeWidth="30"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 120}
                            strokeDashoffset={(2 * Math.PI * 120) * (1 - percentage?.percentage / 100)}
                            className="text-blue-500"
                        />
                    </svg>
                    {
                        isLoading ? (
                            <span className="absolute text-5xl"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></span>
                        ) : <span className="absolute text-5xl">{percentage?.percentage}%</span>

                    }
                </div>
            </section>
            
        </main>
    );
};

export default ReviewsChar;
