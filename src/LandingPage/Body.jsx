import { Link } from "react-router-dom";
import Services from "./Services";
import Staffs from "./Staffs";

const Body = () => {
    return (
        <div className="bg-gray-500 p-2 bg-opacity-20 rounded-md text-white">
            <div className="lg:flex">
                <div>
                    <h2 className="text-2xl">One to one Conversation with professional doctor</h2>
                    <h2 className=" text-xl mt-4 mb-5">
                        We offer extensive medical procedures to outbound and
                        inbound patients
                    </h2>
                    <p className="lg:w-[35rem]">
                        Our major areas of specialization include oncology,
                        orthopedics, cardiology, IVF Treatment, urology,
                        neurosurgery, gastroenterology, plastic surgery and
                        many other departments. Our proficient physicians consist
                        of Heads of Departments in major hospitals,
                        collaborating their extensive expertise in all
                        fields of medicine.
                    </p>

                    <div className="grid grid-cols-3 gap-2 text-center w-full">
                        <Link to="/login"><div className="bg-blue-500 w-full  p-2 rounded-md bg-opacity-30 text-white border-blue-500 border">Login</div></Link>
                    </div>
                </div>
                <div>
                    <img className="w-full" src="https://i.ibb.co/nPtBfCb/Screenshot-2024-02-27-110024.png" alt="" />
                </div>
            </div>

            <div className="lg:flex gap-4 mt-[3rem]">
                <div>
                    <img className="rounded-md shadow-md lg:w-[35rem] w-full" src="https://i.ibb.co/hyHLYrm/emergency-ambulance-on-white-background-free-vector.jpg" alt="" />
                </div>
                <div>
                    <h2 className="text-3xl">We Provide ambulance booking service</h2>
                    <div>
                        <div>
                            <ul className="list-disc text-xl ml-10 mt-3">
                                <li>Share pick up location</li>
                                <li>Booking reason</li>
                                <li>Destination </li>
                            </ul>
                        </div>
                        <p className="lg:w-[35rem] w-full text-sm mt-[3rem]">If you do not have health insurance or cannot pay the fee, you can still
                            get services. Health insurance and billing practices vary by clinic type
                            and may depend on the patient’s age, family size and income.
                        </p>
                        <Link to="/login">
                            <div className="bg-blue-500 text-center w-[10rem] mt-2  p-2 rounded-md bg-opacity-30 text-white border-blue-500 border">Explore More</div>
                        </Link>
                    </div>
                </div>
            </div>
            <Services></Services>
            <Staffs></Staffs>
        </div>
    );
};

export default Body;