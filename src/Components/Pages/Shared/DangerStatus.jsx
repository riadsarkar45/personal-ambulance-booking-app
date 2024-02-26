import PropTypes from 'prop-types';

const DangerStatus = ({text}) => {
    return (
        <div>
            <button  className='bg-red-500 p-2 border border-red-500 rounded-md bg-opacity-20'>{text}</button>
        </div>
    );
};

DangerStatus.propTypes = {
    text: PropTypes.string,
};

export default DangerStatus;