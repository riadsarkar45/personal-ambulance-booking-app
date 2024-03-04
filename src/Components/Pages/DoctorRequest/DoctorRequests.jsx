import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Auth/AuthProvider/AuthProvider";
import Req from "./Req";
import { v4 as uuidv4 } from 'uuid';
const DoctorRequests = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const [open, setOpen] = useState(false);
    const [meetLink, setMeetLink] = useState('')
    const [meetingDate, setMeetingDate] = useState('')
    const [meetingTime, setMeetingTime] = useState('')
    const [request, setRequest] = useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { data: doctorReq = [], refetch} = useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            if (!user) return;
            const res = await axiosSecure.get(`/api/doctor/request/${user?.email}`);
            setRequest(res.data)
            return res.data;
        },
        enabled: !!user,
    });

    const createUniqIdWithLink = () => {
        const uniqLink = uuidv4();
        setMeetLink(`https://personal-eccomerce.web.app/dashboard/room/${uniqLink}`)
    }

    const getDate = (date) => {
        setMeetingDate(date);
    }

    const getTime = (time) => {
        setMeetingTime(time)
    }

    const confirmRequest = (confirmationEmailReceiver, _id, requesterName) => {
        const dataToUpdate = {
            meetingDate: meetingDate,
            meetingTime: meetingTime,
            meetLink: meetLink,
            id: _id,
            confirmationEmailReceiver: confirmationEmailReceiver,
            requesterName: requesterName,
            status: "confirmed"
        }
        axiosSecure.put('/api/update/request/status', dataToUpdate).then(() => handleClose(), refetch())
    }
    return (
        <div>
            <div className="h-[4rem] mb-6 text-white bg-opacity-20 rounded-md bg-white flex items-center p-2 text-2xl">
                <h2>Patient Requests</h2>
            </div>
            <div>
                {
                    request?.map((req, i) =>
                        <Req
                            createUniqIdWithLink={createUniqIdWithLink}
                            confirmRequest={confirmRequest}
                            open={open}
                            handleClose={handleClose}
                            handleOpen={handleOpen}
                            meetLink={meetLink}
                            key={i}
                            index={i}
                            req={req}
                            getDate={getDate}
                            getTime={getTime}
                        />
                    )
                }
            </div>

        </div>
    );
};

export default DoctorRequests;