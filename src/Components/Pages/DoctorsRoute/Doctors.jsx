import { useQuery } from "@tanstack/react-query";
import Doctor from "./Doctor";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import { useContext, useState } from "react";
import { AuthContext } from "../../../Auth/AuthProvider/AuthProvider";
import { Box, LinearProgress } from "@mui/material";
const Doctors = () => {
    const axiosSecure = useAxiosSecure()
    const [isLoading, setLoading] = useState(true)
    const { user } = useContext(AuthContext)

    const { data: doctors = [], refetch } = useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            if (!user) return;
            const res = await axiosSecure.get(`/api/get/all/doctors/${user?.email}`);
            setLoading(false)
            return res.data;
        },
        enabled: !!user,
    });


    const handleRequestDoctor = (requestTo, requestToId, requesterName, requesterEmail, email) => {
        const dataToInsert = {
            requestTo,                  // request receiver name
            requestToId,                // request receiver name
            requesterName,              // request sender name
            requesterEmail,
            status: "pending",             // request sender email
            email                       //  request receiver email
        }
        axiosSecure.post('/api/create/new/request/to/doctor', dataToInsert)
            .then(() => toast.success("Request Sent"), refetch())
    }

    return (
        <div>
            <div className="bg-white bg-opacity-20 h-[4rem] flex items-center p-3 rounded-md">
                <h2 className="text-2xl text-white">Request our qualified doctors for any guidance</h2>
            </div>
            {
                isLoading ? (
                    <div className="h-[20rem] flex justify-center items-center">
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-4 grid-cols-1 w-full mt-9">
                        {
                            doctors?.result?.map((doc, i) => <Doctor requesterEmails={doctors?.requesterEmails} handleRequestDoctor={handleRequestDoctor} key={i} doc={doc}></Doctor>)
                        }
                    </div>
                )
            }
        </div>
    );
};



export default Doctors;