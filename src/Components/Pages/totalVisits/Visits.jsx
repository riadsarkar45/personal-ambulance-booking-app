import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/BaseUrl/useAxiosPublic"
import VisitData from "./VisitData";
import ReviewsChar from "./ReviewsChar";
const Visits = () => {
    const axiosPublic = useAxiosPublic()
    const { data: visitorData = [] } = useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/get/visitor/data`);
            return res.data;
        },
    });
    return (
        <div>
            <div className="bg-white bg-opacity-20 h-[16rem] p-2 rounded-t-md overflow-hidden">
                <h2 className="text-white text-center p-2 mb-3 text-2xl">Monthly Visits</h2>
                <div className="h-full">
                    <VisitData visits={visitorData} />
                </div>



            </div>

            <div className="bg-white bg-opacity-20 mt-5">
                <h2 className="text-white text-center p-2 mb-3 text-2xl">Users Reviews</h2>
                <ReviewsChar/>
            </div>
        </div>
    );
};

export default Visits;