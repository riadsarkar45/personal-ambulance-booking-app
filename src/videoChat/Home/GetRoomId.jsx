import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const GetRoomId = () => {
    const [value, setValue] = useState();
    const navigate = useNavigate()
    
    const handleRoomJoin = useCallback(() => {
        navigate(`/room/${value}`)
    }, [navigate, value])
    return (
        <div className='bg-white'>
            <h2>Get Room Id</h2>
            <input value={value} onChange={e => setValue(e.target.value)} type="text" placeholder="Enter Room Id" />
            <button onClick={handleRoomJoin} className='bg-red-500'>Join</button>
        </div>
    );
};

export default GetRoomId;