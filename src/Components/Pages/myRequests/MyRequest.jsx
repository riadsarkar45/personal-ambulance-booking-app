import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/BaseUrl/useAxiosPublic";
import Request from "./Request";
import { useContext } from "react";
import { AuthContext } from "../../../Auth/AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const MyRequest = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext)
    const { data: myRequest = [], refetch } = useQuery({
        queryKey: ["myRequest"],
        queryFn: async () => {
            if (!user) return;
            const res = await axiosPublic.get(`/api/get/my-request/${user?.email}`);
            return res.data;
        },
        enabled: !!user,
    });

    const handleDeleteReq = (id) => {
        const type = "request"
        axiosPublic.delete(`/api/delete/${id}/${type}`, { type }).then(() => refetch(), toast.success("Delete successful"))
    }
    return (
        <div>
            <div className="bg-white h-[4rem] bg-opacity-20 rounded-sm text-white flex items-center p-2 text-2xl mb-5">
                <h2>My Requests </h2>
            </div>
            {
                myRequest?.map((myReq, i) => <Request handleDeleteReq={handleDeleteReq} key={i} i={i} myReq={myReq}></Request>)
            }
        </div>
    );
};

export default MyRequest;