import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Auth/AuthProvider/AuthProvider';

const Doctor = ({ doc, handleRequestDoctor, requesterEmails }) => {
    const { name, qualification, hospital, image, expertise, status, _id, email } = doc;
    const { user } = useContext(AuthContext)
    const hasSentRequest = requesterEmails.includes(_id);
    return (
        <div>
            <Link>
                <div className="bg-white text-white bg-opacity-20 h-[22rem] rounded-sm w-[15rem] mt-2 p-2">
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
                                <div className='flex justify-between gap-1' >
                                    <button className='bg-green-500 w-[8rem] text-center p-1 rounded-sm bg-opacity-35 border border-green-500'>Available</button>
                                </div>
                            ) : <div className='bg-red-500 text-center p-1 w-[8rem] bg-opacity-35 border border-red-500'><h2>Not Available</h2></div>
                        }

                        <div className="w-full mt-3">
                            {hasSentRequest ? (
                                <button className='bg-blue-500 p-1 bg-opacity-40 rounded-md w-full'>
                                    Request Sent
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleRequestDoctor(name, _id, user?.displayName, user?.email, email)}
                                    className='bg-green-500 p-1 bg-opacity-40 rounded-md w-full'
                                >
                                    Send Request
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </Link>
        </div>
    );
};

Doctor.propTypes = {
    doc: PropTypes.object,
    handleRequestDoctor: PropTypes.func,
    requesterEmails: PropTypes.array,
};

export default Doctor;