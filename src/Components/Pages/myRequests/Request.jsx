import React from 'react';

const Request = ({ myReq, i }) => {
    const { requesterName, requesterEmail, requestToId, requestTo, status } = myReq;
    return (
        <div className='bg-white bg-opacity-20 rounded-sm text-white text-xl h-[3rem] flex items-center p-3 mt-2 justify-between'>
            <p className='w-[30rem] '>{i + 1}.{" "} {requesterName} requested to {requestTo}</p>
            <div>
                {
                    status === 'pending' ? (
                        <button className='bg-yellow-500 bg-opacity-10 p-1 rounded-md border border-yellow-500 text-yellow-500'>Pending</button>
                    ) : (
                        <button className='bg-green-500 bg-opacity-10 p-1 rounded-md border border-green-500 text-green-500'>Accepted</button>
                    )
                }
            </div>


            <div>
                <button className='bg-red-500 bg-opacity-10 p-1 rounded-md border border-red-500 text-red-500' >Delete</button>
            </div>
        </div>
    );
};

export default Request;