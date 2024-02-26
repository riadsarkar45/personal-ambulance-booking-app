import PropTypes from 'prop-types';
import DangerStatus from './Shared/DangerStatus';

const MyBooking = ({ booking, i }) => {
    const { location, reason, date } = booking
    return (
        <div className='flex justify-between text-xl h-[4rem] text-white items-center p-2 rounded-md bg-white bg-opacity-20 mt-5'>
            <div className='flex gap-4  w-[25rem]'>
                <h2>{i + 1}. {location}</h2>
                <h2>{reason}</h2>
                <h2>{date}</h2>
            </div>

            <div>
                <DangerStatus text="In Progress"></DangerStatus>

            </div>

            <div>
                <DangerStatus text="Delete"></DangerStatus>

            </div>
        </div>
    );
};

MyBooking.propTypes = {
    booking: PropTypes.object,
    i: PropTypes.object,
};

export default MyBooking;