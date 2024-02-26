import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddNewDoc = () => {
    const axiosSecure = useAxiosSecure();
    const handleAddNewDocs = (e) => {
        e.preventDefault();
        const name = e.target.doctorName.value;
        const expertise = e.target.expertise.value;
        const hospitalName = e.target.hospitalName.value;
        const qualification = e.target.qualification.value;
        const email = e.target.email.value;
        const none = e.target.none.value;
        const dataToInsert = {
            name,
            hospitalName,
            expertise, 
            qualification,
            email, 
            none,
            status: "active"
        }

        axiosSecure.post('/api/add/new/doctor', dataToInsert).then(() => toast.success("Doctor Added") )
        
    }
    return (
        <div className="bg-white bg-opacity-20">
            <form onSubmit={handleAddNewDocs}>
                <div className=" lg:grid lg:grid-cols-2 p-2">
                    <div className="mt-2">
                        <h2 className="text-white">Doctor Name</h2>
                        <input autoFocus name="doctorName" className="lg:w-[30.3rem] w-full p-2 h-[3rem] rounded-md" placeholder="Doctor Name" type="text" />
                    </div>
                    <div className="mt-2">
                    <h2 className="text-white">Doctor Expertise</h2>

                        <input name="expertise" className="lg:w-[30.3rem] w-full p-2 h-[3rem] rounded-md" placeholder="Expertise" type="text" />
                    </div>
                    <div className="mt-2">
                    <h2 className="text-white">Hospital Name</h2>

                        <input name="hospitalName" className="lg:w-[30.3rem] w-full p-2 h-[3rem] rounded-md" placeholder="Hospital Name" type="text" />
                    </div>
                    <div className="mt-2">
                    <h2 className="text-white">Doctor Qualification</h2>

                        <input name="qualification" className="lg:w-[30.3rem] w-full p-2 h-[3rem] rounded-md" placeholder="Qualification Name" type="text" />
                    </div>
                    <div className="mt-2">
                    <h2 className="text-white">Doctor Email</h2>

                        <input name="email" className="lg:w-[30.3rem] w-full p-2 h-[3rem] rounded-md" placeholder="Doctor Email" type="text" />
                    </div>
                    <div className="mt-[9px]">
                    <h2 className="text-white">Doctor Image</h2>

                        <input name="none" className="lg:w-[30.3rem] w-full p-1 rounded-md h-[3rem] bg-white" placeholder="Doctor Name" type="file" />
                    </div>
                </div>
                <div className="text-center mt-4">
                    <button className="bg-green-500 p-3 w-[14rem] rounded-lg mb-6 bg-opacity-50 text-white border border-green-500 text-2xl">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddNewDoc;