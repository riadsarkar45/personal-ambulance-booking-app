import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/BaseUrl/useAxiosPublic";
import Request from "./Request";
import { useContext } from "react";
import { AuthContext } from "../../../Auth/AuthProvider/AuthProvider";

const MyRequest = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext)
    const { data: myRequest = [] } = useQuery({
        queryKey: ["myRequest"],
        queryFn: async () => {
            if (!user) return;
            const res = await axiosPublic.get(`/api/get/my-request/${user?.email}`);
            console.log(res.data)
            return res.data;
        },
        enabled: !!user,
    });
    return (
        <div>
            <div className="bg-white h-[4rem] bg-opacity-20 rounded-sm text-white flex items-center p-2 text-2xl mb-5">
                <h2>My Requests </h2>
            </div>
            {
                myRequest?.map((myReq, i) => <Request key={i} i={i} myReq={myReq}></Request>)
            }
        </div>
    );
};

export default MyRequest;