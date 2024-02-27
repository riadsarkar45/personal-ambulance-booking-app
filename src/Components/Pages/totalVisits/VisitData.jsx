import PropTypes from 'prop-types';

const VisitData = ({ visits }) => {
    return (
        <div>
            <div className='flex gap-2'>
                {
                    visits?.map(visitors => (
                        <div key={visitors._id}>
                            <div
                                className={`rounded-md flex gap-3 items-center justify-center bg-opacity-70 h-[5rem] w-[4.6rem] p-2 ${visitors.count > 40 ? 'border border-green-500 bg-green-500' : visitors.count > 20 ? 'border border-yellow-500 bg-yellow-500' : 'bg-red-600 border border-red-600'
                                    }`}
                                style={{ height: `${visitors.count}px` }}
                            >
                                <div className='grid grid-cols-1'>
                                    {visitors.count}
                                    {visitors.date}
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>

            
        </div>
    );
};

VisitData.propTypes = {
    visits: PropTypes.array,
};

export default VisitData;