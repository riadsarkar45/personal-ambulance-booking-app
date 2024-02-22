import { useQuery } from "@tanstack/react-query";
import Doctor from "./Doctor";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import { useContext } from "react";
import { AuthContext } from "../../../Auth/AuthProvider/AuthProvider";
const Doctors = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useContext(AuthContext)
    
    const { data: doctors = [], refetch } = useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            if (!user) return;
            const res = await axiosSecure.get(`/api/get/all/doctors/${user?.email}`);
            return res.data;
        },
        enabled: !!user,
    });


    const handleRequestDoctor = (requestTo, requestToId, requesterName, requesterEmail) => {
        const dataToInsert = {
            requestTo,  // request receiver name
            requestToId, // request receiver name
            requesterName, // request sender name
            requesterEmail // request sender email
        }
        axiosSecure.post('/api/create/new/request/to/doctor', dataToInsert)
        .then(() => toast.success("Request Sent"), refetch())
    }

    return (
        <div>
            <div className="bg-white bg-opacity-20 h-[4rem] flex items-center p-3 rounded-md">
                <h2 className="text-2xl text-white">Request our qualified doctors for any guidance</h2>
            </div>
            <div className="grid grid-cols-4 mt-9">
                {
                    doctors?.result?.map((doc, i) => <Doctor requesterEmails={doctors?.requesterEmails} handleRequestDoctor={handleRequestDoctor} key={i} doc={doc}></Doctor>)
                }
            </div>
        </div>
    );
};



export default Doctors;