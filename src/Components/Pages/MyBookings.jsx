import { useQuery } from '@tanstack/react-query';
import Header from './Shared/Header';
import useAxiosSecure from "../../Hooks/useAxiosSecure"
import { useContext, useState } from 'react';
import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';
import MyBooking from './MyBooking';
const MyBookings = () => {
    const axiosSecure = useAxiosSecure();
    const [bookings, setBookings] = useState([])
    const { user } = useContext(AuthContext)
    const { refetch } = useQuery({
        queryKey: ["data"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/get/myBookings/${user?.email}`);
            setBookings(res.data)
            return res.data;
        },
    });
    return (
        <div>
            <Header title="My Bookings"></Header>
            <div className='mt-6'>
                {
                    bookings?.map((booking, i) => <MyBooking key={booking._id} booking={booking} i={i}></MyBooking>)
                }
            </div>
        </div>
    );
};




export default MyBookings;