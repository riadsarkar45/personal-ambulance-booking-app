import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider/AuthProvider";
import Headroom from "react-headroom";

const Header = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <Headroom>
                <nav className="bg-teal-500 border-b-red-200 border  bg-opacity-80">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                        <a
                            href="https://flowbite.com"
                            className="flex items-center space-x-3 rtl:space-x-reverse"
                        >
                            <img
                                src="https://flowbite.com/docs/images/logo.svg"
                                className="h-8"
                                alt="Flowbite Logo"
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                HealthCare
                            </span>
                        </a>
                        <div className="flex items-center space-x-6 rtl:space-x-reverse">
                            <a
                                href="tel:5541251234"
                                className="text-sm  text-gray-500 dark:text-white hover:underline"
                            >
                                (555) 412-1234
                            </a>
                            {
                                user ? (
                                    <Link className="text-sm  text-blue-600 dark:text-blue-500 hover:underline" to="/dashboard">

                                        Dashboard

                                    </Link>
                                ) : (
                                    <Link className="text-sm  text-blue-600 dark:text-blue-500 hover:underline" to="/login">

                                        Login

                                    </Link>
                                )
                            }
                        </div>
                    </div>
                </nav>
            </Headroom>

        </div>
    );
};

export default Header;