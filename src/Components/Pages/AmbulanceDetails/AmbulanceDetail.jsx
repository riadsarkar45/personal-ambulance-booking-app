import PropTypes from 'prop-types';
import { useState } from 'react';

const reasonsArray = [                        //situation array list
    {
        reason: "Accident",
    },
    {
        reason: "Heats Stroke",
    },
    {
        reason: "Heart Attack",
    },
    {
        reason: "Fighting",
    },
    {
        reason: "Bleeding",
    },
    {
        reason: "Emergency",
    },
    {
        reason: "Other",
    },
]
const AmbulanceDetail = ({ filteredData, handleBookingAmbulance, handleShowComments, isShowComments, comments, handleGetCommentText, repliesComment, handleReplyComment, replyId, handleNewComment }) => {
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
    const { ambulanceNumber, completedTour, driverName, hospitalName, img, lastTourDate, location, price, rating, type } = filteredData;
    return (
        <div className=''>
            <div className='flex justify-between mt-4 gap-2 dark:text-gray-400'>
                <div className=' p-2 flex justify-between w-[42rem] gap-2 h-[50vh]'>
                    <div>
                        <img className='w-[20rem]' src={img} alt="" />


                    </div>


                    <div className='dark:text-gray-400'>

                        <div className='text-sm'>
                            <p className='text-xl dark:text-gray-400'>Hospital Name: {hospitalName}</p>
                            <p>Driver Name: {driverName}</p>
                            <p>Location: {location}</p>
                            <p>Completed Tour: {completedTour}</p>
                            <p>Last Tour: {lastTourDate}</p>
                            <p>Id: {ambulanceNumber}</p>
                            <p>Type: {type}</p>
                            <p>Rating: {rating}</p>
                            <p>Price: {price}</p>
                            


                        </div>
                        <div className='flex gap-2 h-[3rem] w-full'>
                            <div className='w-full text-center mt-2 border-gray-500 p-2  border rounded-md'>
                                <button onClick={handleBookingAmbulance} >Book Now</button>
                            </div>
                            <div className='w-full text-center mt-2 border-gray-500 p-2  border rounded-md'>
                                <button onClick={handleShowComments} >Reviews</button>
                            </div>
                        </div>


                    </div>
                </div>

                <div className=' w-[22rem] p-2 bg-opacity-60'>
                    <input className='p-2 border-gray-500 rounded-md w-full' type="text" placeholder='Pick up location' />
                    <h2 className="text-sm mt-3">Reasons</h2>

                    <div className='mt-3 grid grid-cols-2 w-full gap-3'>
                        {
                            reasonsArray?.map((reason, index) => (
                                <div
                                    className={` p-2 ${selectedButtonIndex === index ? 'bg-blue-500' : 'border-gray-500 border text-black'} bg-opacity-55 rounded-md text-white`}
                                    key={index}
                                    onClick={() => setSelectedButtonIndex(index)}
                                >
                                    <button>{reason.reason}</button>
                                </div>
                            ))
                        }
                    </div>

                </div>

            </div>








            {
                isShowComments ? (
                    <>
                        <h2 className='p-2 text-2xl'>Reviews</h2>
                        <div className=' w-[25rem] p-2 '>

                            <div className='flex justify-start items-center w-full mb-3'>
                                <div className=''>
                                    <input onChange={(e) => handleGetCommentText(e.target.value)} className='border border-r-0 border-gray-500 p-2 w-[45.3rem]' name="" id="" cols="30" />
                                </div>
                                <div onClick={() => handleNewComment("singleComment")} className='p-2 border cursor-pointer border-gray-500 border-l-0'>Submit</div>
                            </div>


                            <div>
                                {
                                    comments?.map((parentComment, parentIndex) => (
                                        <div key={parentIndex} className=' border  border-gray-500 p-2 w-[50rem] rounded-lg mt-1'>
                                            <div className="items-center gap-6 ">
                                                <div>
                                                    <div className='flex gap-6 items-center border border-gray-500'>
                                                        <div className='h-14 rounded-lg w-[3.5rem] bg-yellow-500'>
                                                            <img className='w-[3.5rem] h-full rounded-md' src={img} alt="" />
                                                        </div>
                                                        <div>
                                                            <h2>{parentComment.userName}</h2>
                                                            <p>{parentComment.texts}</p>
                                                            <button onClick={() => handleReplyComment(parentComment._id)} className='text-blue-500 mt-2 mb-2'>Reply</button>
                                                        </div>
                                                    </div>
                                                    {
                                                        replyId === parentComment._id ? (
                                                            <div className='flex justify-start w-[40rem] items-end mt-2 mb-2'>
                                                                <div>
                                                                    <input onChange={(e) => handleGetCommentText(e.target.value)} className='border border-r-0 border-gray-500 p-2 w-[40rem] m-auto' name="" id="" cols="30" />
                                                                </div>
                                                                <div onClick={() => handleNewComment("reply", parentComment._id, parentComment.ml, parentComment.userName)} className='p-2 border cursor-pointer border-gray-500 border-l-0'>Submit</div>
                                                            </div>
                                                        ) : null
                                                    }
                                                </div>








                                                <div>
                                                    {
                                                        repliesComment?.map((reply, i) => (
                                                            reply.parent_Id === parentComment._id ? (
                                                                <div style={{ marginLeft: reply.ml }} className='mt-2' key={i}>
                                                                    <div className='flex gap-6 items-center border border-gray-500'>
                                                                        <div className='h-14 rounded-lg w-[3.5rem] bg-yellow-500'>
                                                                            <img className='w-[3.5rem] h-full rounded-md' src={img} alt="" />
                                                                        </div>
                                                                        <div>
                                                                            <h2>{reply.repliedName} Replied to  {reply.repliedUserName}</h2>
                                                                            <p>{reply.texts}</p>
                                                                            <button onClick={() => handleReplyComment(reply._id)} className='text-blue-500 mt-2 mb-2'>Reply</button>
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        replyId === reply._id ? (
                                                                            <div className='flex justify-start w-[40rem] items-end mt-2 mb-2'>
                                                                                <div>
                                                                                    <input onChange={(e) => handleGetCommentText(e.target.value)} className='border border-r-0 border-gray-500 p-2 w-[40rem] m-auto' name="" id="" cols="30" />
                                                                                </div>
                                                                                <div onClick={() => handleNewComment("reply", reply.parent_Id, reply.ml, reply.repliedName)} className='p-2 border cursor-pointer border-gray-500 border-l-0'>Submit</div>
                                                                            </div>
                                                                        ) : null
                                                                    }
                                                                </div>
                                                            ) : null
                                                        ))
                                                    }



                                                </div>

                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </>
                ) : null
            }

        </div>
    );
};

AmbulanceDetail.propTypes = {
    filteredData: PropTypes.object,
    handleBookingAmbulance: PropTypes.func,
    comments: PropTypes.array,
    handleShowComments: PropTypes.func,
    isShowComments: PropTypes.cl,
    handleGetCommentText: PropTypes.func,
    handleSubmitComment: PropTypes.func,
    handleReplyComment: PropTypes.func,
    replyId: PropTypes.string,
    handleNewComment: PropTypes.func,
    repliesComment: PropTypes.array,
};

export default AmbulanceDetail;









{/* {commentReply
                    .filter(reply => reply.id === parentComment._id)
                    .map((reply, replyIndex) => (
                        <div key={replyIndex} className='flex items-center gap-3 border border-gray-500 p-2 rounded-lg mt-1'>
                            <div className='h-14 rounded-lg w-[10rem] bg-yellow-500'>
                                <h2 className='text-sm'>Reply Section</h2>
                            </div>
                            <div>
                                <p>{reply.text}</p>
                            </div>
                        </div>
                    ))} */}