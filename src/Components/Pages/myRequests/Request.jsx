import React from 'react';

const Request = ({ myReq, i }) => {
    const { requesterName, requesterEmail, requestToId, requestTo } = myReq;
    return (
        <div className='bg-white bg-opacity-20 text-white text-xl h-[3rem] flex items-center p-3 mt-2 justify-between'>
            <p className='w-[30rem] '>{i + 1}.{" "} {requesterName} requested to {requestTo}</p>
            <div>
                <button>Request Accepted</button>
            </div>

            <div>
                Scheduled on 20/20/2024
            </div>

            <div>
                Delete
            </div>
        </div>
    );
};

export default Request;