import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/BaseUrl/useAxiosPublic";
import Doctor from "./Doctor";

const Doctors = () => {
    const axiosPublic = useAxiosPublic()
    const { data: doctors = [] } = useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/get/all/doctors`);
            return res.data;
        },
    });

    return (
        <div>
            <div className="bg-white bg-opacity-20 h-[4rem] flex items-center p-3 rounded-md">
                <h2 className="text-2xl text-white">Request our qualified doctors to talk</h2>
            </div>
            <div className="grid grid-cols-4 mt-9">
                {
                    doctors?.map((doc, i) => <Doctor key={i} doc={doc}></Doctor>)
                }
            </div>
        </div>
    );
};



export default Doctors;