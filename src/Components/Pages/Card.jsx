import PropTypes from 'prop-types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
const Card = ({ card }) => {
    const { img, hospitalName, ambulanceNumber, driverName, _id, type, price, completedTour, lastTourDate, location } = card
    return (
        <div className=" text-white bg-white mt-3 bg-opacity-20 rounded-md shadow-md font-serif lg:h-[15rem] lg:flex p-2 gap-3">
            <div className=" h-[14rem] lg:w-[22rem] p-2 rounded-md">
                <img className='lg:w-full w-full h-full' src={img} alt="ambulance" />
            </div>
            <div className='w-full hidden md:block'>
                <h2 className='text-2xl'>{hospitalName}</h2>
                <p className='font-mono text-sm'>Drive by {driverName}</p>
                <ul className="mt-5 list-decimal ml-6 text-xl">
                    <li>Type: {type}</li>
                    <li>ID: {ambulanceNumber}</li>
                    <li>Driver Name: {driverName}</li>
                    <li>Location: {location}</li>
                </ul>
            </div>
            <div className="border border-gray-400 border-r"></div>
            <div className=" lg:w-[32rem]">
                <div className="text-right mt-4 mr-3">
                    <button className=''><FavoriteIcon></FavoriteIcon></button>
                    {" "} | {" "}
                    <button className=''><PlaylistAddIcon /></button>

                </div>
                <div className="text-center">
                    <div className="mt-4 text-center">
                        <h2 className="text-2xl text-center">$ {price}</h2>
                    </div>
                    <p className="text-center text-sm">{completedTour} completed tour</p>
                    <p className="text-center text-sm">Last tour in {lastTourDate}</p>
                    <span className='flex items-center justify-center text-yellow-500'>
                        <p className='text-center'><StarIcon /></p>
                        <p className='text-center'><StarIcon /></p>
                        <p className='text-center'><StarIcon /></p>
                        <p className='text-center'><StarIcon /></p>
                    </span>
                </div>
                <div className="flex gap-4 items-center justify-center mt-2">
                    <button className='border border-blue-400 p-2 rounded-md'>Book</button>
                    <Link to={`/dashboard/see-detail/${_id}`}>
                        <button className='border border-blue-400 p-2 rounded-md'>See Detail</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    card: PropTypes.object
};

export default Card;