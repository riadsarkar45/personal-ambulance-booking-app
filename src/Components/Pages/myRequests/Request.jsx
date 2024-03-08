import React from 'react';

const Request = ({ myReq, i, handleDeleteReq }) => {
    const { requesterName, requesterEmail, requestToId, requestTo, status, _id } = myReq;
    return (
        <div className='bg-white bg-opacity-20 rounded-sm text-white text-xl h-[3rem] flex gap-1  items-center p-3 mt-2 justify-between'>
            <p className='lg:w-[30rem] w-full'>{i + 1}.{" "} {requesterName} requested to {requestTo}</p>
            <div>
                {
                    status === 'pending' ? (
                        <button className='bg-yellow-500 bg-opacity-10 lg:p-1 rounded-md border border-yellow-500 text-yellow-500'>Pending</button>
                    ) : (
                        <button className='bg-green-500 bg-opacity-10 lg:p-1 rounded-md border border-green-500 text-green-500'>Accepted</button>
                    )
                }
            </div>


            <div>
                <button onClick={() => handleDeleteReq(_id)} className='bg-red-500 bg-opacity-10 lg:p-1 rounded-md border border-red-500 text-red-500' >Delete</button>
            </div>
        </div>
    );
};

export default Request;