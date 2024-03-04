import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UserRow from "./UserRow";
import toast from "react-hot-toast";

const AllUsers = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const [users, setUser] = useState([])
    const [index, setIndex] = useState('')
    const [changedText, setChangedText] = useState('')
    const { refetch } = useQuery({
        queryKey: ["data"],
        queryFn: async () => {
            const res = await axiosSecure.get(`api/get/all/users`);
            setUser(res.data);
            return res.data;
        },
    });

    const handleInlineEdit = (i, email) => {
        setIndex(i)
        setChangedText(email)
    }

    const handleGetOnchangeText = (email) => {
        setChangedText(email)
    }

    const handleDeleteUser = (id) => {
        const type = "user"
        axiosSecure.delete(`/api/delete/${id}/${type}`, { type }).then(() => refetch(), toast.success("Delete successfull"))
    }
    return (
        <div className="bg-white bg-opacity-20">
            <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            users?.map((rows, i) =>
                                <UserRow
                                    key={i} i={i}
                                    rows={rows}
                                    handleInlineEdit={handleInlineEdit}
                                    index={index}
                                    handleGetOnchangeText={handleGetOnchangeText}
                                    changedText={changedText}
                                    handleDeleteUser={handleDeleteUser}
                                />
                            )
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default AllUsers;