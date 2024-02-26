import PropTypes from 'prop-types';

const SuccessStatus = ({title}) => {
    return (
        <div>
            <button  className='bg-green-500 text-white p-2 border border-green-500 rounded-md bg-opacity-20'>{title}</button>
        </div>
    );
};

SuccessStatus.propTypes = {
    title: PropTypes.string,
};

export default SuccessStatus;