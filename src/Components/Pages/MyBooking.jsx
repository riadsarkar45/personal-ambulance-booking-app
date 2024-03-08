import PropTypes from 'prop-types';
import DangerStatus from './Shared/DangerStatus';

const MyBooking = ({ booking, i, handleDeleteBookings }) => {
    const { location, reason, date, _id } = booking
    return (
        <div className='flex lg:justify-between text-xl h-[4rem] text-white items-center p-2 rounded-md bg-white bg-opacity-20 mt-5'>
            <div className='flex lg:gap-4  lg:w-[25rem]'>
                <h2>{i + 1}. {location}</h2>
                <h2>{reason}</h2>
                <h2>{date}</h2>
            </div>

            <div>
                <DangerStatus text="In Progress"></DangerStatus>

            </div>

            <div onClick={() => handleDeleteBookings(_id)}>
                <DangerStatus text="Delete"></DangerStatus>
            </div>
        </div>
    );
};

MyBooking.propTypes = {
    booking: PropTypes.object,
    i: PropTypes.object,
    handleDeleteBookings: PropTypes.func,
};

export default MyBooking;