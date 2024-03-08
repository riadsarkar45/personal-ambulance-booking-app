import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgba(200, 200, 235, 9)',
    boxShadow: 24,
    p: 4,
};

const Req = ({ req, index, handleOpen, handleClose, open, meetLink, createUniqIdWithLink, confirmRequest, getDate, getTime }) => {
    const { requesterName, _id, requesterEmail, status } = req;


    
    return (
        <div className='mt-2'>
            <div className='h-[4rem] justify-between bg-white bg-opacity-20 rounded-sm flex items-center p-2 text-white text-2xl'>
                <h2>{index + 1}. {requesterName} sent you a session request</h2>
                {
                    status === "confirmed" ? (
                        <button className='bg-green-500 p-2 border border-green-500 rounded-md bg-opacity-20'>Confirmed</button>
                    ) : (
                        <button onClick={() => handleOpen()} className='bg-green-500 p-2 border border-green-500 rounded-md bg-opacity-20'>Confirm</button>
                    )
                }
                <button className='bg-red-500 p-2 border border-red-500 rounded-md bg-opacity-20'>Delete</button>
            </div>

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className='lg:flex justify-between w-full mb-4'>
                            <input onChange={e => (getDate(e.target.value))} className='p-2 border rounded-md' type="date" />
                            <input onChange={e => (getTime(e.target.value))} className='p-2 border rounded-md' type="time" />
                        </div>
                        <div className='w-full mb-6 flex'>
                            <input value={meetLink} className='w-full p-2 border rounded-l-md' placeholder='Click create meeting link' readOnly />
                            {/* <button className='bg-blue-500 bg-opacity-20 p-2'>Copy</button> */}
                        </div>
                        <div className='flex justify-between gap-2 '>
                            <button onClick={() => confirmRequest(requesterEmail, _id, requesterName)} className='bg-blue-500 bg-opacity-20 border-blue-500 p-2 border rounded-md w-full'>Confirm</button>
                            <button onClick={createUniqIdWithLink} className='bg-green-500 bg-opacity-20 border-green-500 p-2 border rounded-md w-full'>Create Meeting Link</button>
                        </div>
                    </Box>
                </Modal>
            </div>


        </div>
    );
};

Req.propTypes = {
    req: PropTypes.object,
    index: PropTypes.number,
    handleOpen: PropTypes.func,
    handleClose: PropTypes.func,
    open: PropTypes.func,
    meetLink: PropTypes.string,
    createUniqIdWithLink: PropTypes.func,
    confirmRequest: PropTypes.func,
    getDate: PropTypes.func,
    getTime: PropTypes.func,
};

export default Req;