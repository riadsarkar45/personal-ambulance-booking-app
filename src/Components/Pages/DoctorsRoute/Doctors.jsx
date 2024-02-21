import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/BaseUrl/useAxiosPublic";
import Doctor from "./Doctor";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
const Doctors = () => {
    const axiosSecure = useAxiosSecure()
    const { data: doctors = [] } = useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/get/all/doctors`);
            return res.data;
        },
    });

    const handleRequestDoctor = (requestTo, requestToId, requesterName, requesterEmail) => {
        console.log("requestTo", requestTo, "requesterName", requesterName);
        const dataToInsert = {
            requestTo,  // request receiver name
            requestToId, // request receiver name
            requesterName, // request sender name
            requesterEmail // request sender email
        }
        axiosSecure.post('/api/create/new/request/to/doctor', dataToInsert)
        .then(res => console.log(res.data), toast.success("Request Sent"))
    }

    return (
        <div>
            <div className="bg-white bg-opacity-20 h-[4rem] flex items-center p-3 rounded-md">
                <h2 className="text-2xl text-white">Request our qualified doctors for any guidance</h2>
            </div>
            <div className="grid grid-cols-4 mt-9">
                {
                    doctors?.map((doc, i) => <Doctor handleRequestDoctor={handleRequestDoctor} key={i} doc={doc}></Doctor>)
                }
            </div>
        </div>
    );
};



export default Doctors;