import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure"
import { AuthContext } from "../Auth/AuthProvider/AuthProvider";

const useAdmin = () => {
    const { user, isLoading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !isLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;