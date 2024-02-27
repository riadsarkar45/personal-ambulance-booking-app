import { useContext } from "react";
import Header from "../../../src/Components/Pages/Shared/Header"
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SuccessStatus from "./Shared/SuccessStatus";
import { AuthContext } from "../../Auth/AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/BaseUrl/useAxiosPublic";
import toast from "react-hot-toast";
const AddNewDriver = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const handleAddNewDriver = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const hospitalName = e.target.hospitalName.value;
        const location = e.target.location.value;
        const ambulanceId = e.target.ambulanceId.value;
        const driverName = e.target.driverName.value;
        const type = e.target.type.value;
        formData.get('image')
        try {
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            const imgUrl = res.data.data.display_url;
            const dataToInsert = {
                hospitalName,
                ambulanceNumber: ambulanceId,
                driverName,
                type,
                img: imgUrl,
                location,
                email: user?.email
            }
            axiosSecure.post('/api/add-new/ambulance', dataToInsert).then(() => toast.success("Information Saved"))
        } catch (error) {
            console.log(error)
        }


    }
    return (
        <div>
            <Header title="Add new Driver"></Header>
            <div className="bg-white bg-opacity-20 mt-6">
                <form onSubmit={handleAddNewDriver}>
                    <div className="lg:grid lg:grid-cols-2 p-2 ">
                        <div>
                            <h2 className="text-white">Hospital Name</h2>
                            <input name="hospitalName" autoFocus className="lg:w-[30rem] w-full p-3 rounded-md mt-2" type="text" placeholder="Hospital Name" />
                        </div>
                        <div>
                            <h2 className="text-white">Location</h2>
                            <input name="location" className="lg:w-[30rem] w-full p-3 rounded-md mt-2" type="text" placeholder="Location" />
                        </div>
                        <div>
                            <h2 className="text-white">Ambulance Id</h2>
                            <input name="ambulanceId" className="lg:w-[30rem] w-full p-3 rounded-md mt-2" type="text" placeholder="Ambulance Id" />
                        </div>
                        <div>
                            <h2 className="text-white">Driver Name</h2>
                            <input name="driverName" className="lg:w-[30rem] w-full p-3 rounded-md mt-2" type="text" placeholder="Driver Name" />
                        </div>
                        <div>
                            <h2 className="text-white">Ambulance Type</h2>
                            <input name="type" className="lg:w-[30rem] w-full p-3 rounded-md mt-2" type="text" placeholder="Driver Name" />
                        </div>
                        <div className="">
                            <h2 className="text-white">Ambulance Photo</h2>
                            <input name="image" className="lg:w-[30rem] w-full bg-white p-3 rounded-md mt-2" type="file" placeholder="Ac" />
                        </div>

                    </div>
                    <div className="text-center mt-4 mb-3">
                        <SuccessStatus title="Submit"></SuccessStatus>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewDriver;