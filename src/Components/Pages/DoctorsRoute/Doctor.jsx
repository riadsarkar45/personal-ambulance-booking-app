import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Doctor = ({ doc }) => {
    const { name, qualification, hospital, image, expertise, status } = doc;
    console.log(name);
    return (
        <div>
            <Link>
                <div className="bg-white text-white bg-opacity-20 h-[19rem] rounded-sm w-[15rem] mt-2 p-2">
                    <div className="bg-blue-500 bg-opacity-10 h-[10rem] p-2">
                        <img className='w-full h-full' src={image} alt="" />
                    </div>
                    <div className=''>
                        <h2>{name}</h2>
                        <h2>({qualification})</h2>
                        <h2>{hospital}</h2>
                        <h2>{expertise}</h2>
                        {
                            status === "Available" ? (
                                <div className='bg-green-500 text-center p-1 bg-opacity-35 border border-green-500'><h2>Available</h2></div>
                            ) : <div className='bg-red-500 text-center p-1 bg-opacity-35 border border-red-500'><h2>Not Available</h2></div>
                        }
                    </div>
                </div>
            </Link>
        </div>
    );
};

Doctor.propTypes = {
    doc: PropTypes.object,
};

export default Doctor;