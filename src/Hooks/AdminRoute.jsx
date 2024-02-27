import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider/AuthProvider";
import useAdmin from "./useAdmin";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin();
    if(isLoading || isAdminLoading){
        return <p>Loading...</p>
    }
    if(user && isAdmin){
        return children
    }

    <Navigate to="/login"></Navigate>
};

export default AdminRoute;