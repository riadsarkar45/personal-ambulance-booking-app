import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate()
    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                console.log(result);
                toast.success("Login Successful")
                navigate('/dashboard')
            })
            .catch(error => {
                toast.error(error.message);
            })
    }
    return (
        <div className="flex items-center justify-center h-[100vh] font-serif bg-white bg-opacity-20 text-white">
            <button onClick={handleGoogleLogin} className="border border-gray-500 p-2 w-[15rem] text-2xl">Google Sign In</button>
        </div>
    );
};

export default Login;