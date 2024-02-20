import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GetRoomId = () => {
    const [value, setValue] = useState();
    const navigate = useNavigate()

    const handleRoomJoin = useCallback(() => {
        const trimmedValue = value && value.trim();

        if (!trimmedValue) {
            toast.error('Please enter a room ID.');
            return;
        }
        navigate(`/room/${value}`)
    }, [navigate, value])
    return (
        <div className='bg-white bg-opacity-20 h-[80.25vh] flex flex-col justify-center items-center'>
            <input className="w-[40rem] p-3 rounded-md" value={value} onChange={e => setValue(e.target.value)} type="text" placeholder="Enter Room Id" />
            <button onClick={handleRoomJoin} className='bg-white bg-opacity-50 mt-4 p-3 w-[15rem] text-2xl text-black font-bold'>Join</button>
        </div>

    );
};

export default GetRoomId;