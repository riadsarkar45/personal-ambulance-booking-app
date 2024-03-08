import Services from "./Services";
import Staffs from "./Staffs";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Faq from "./Faq";
import ReviewSection from "./ReviewSection";
const Body = () => {
    return (
        <div className=" p-2 bg-opacity-20 rounded-md text-white">
            <div className="lg:flex md:flex justify-center gap-9">
                <div className="flex items-center text-2xl gap-2 text-black lg:w-[19rem] p-2">
                    <PhoneAndroidIcon />
                    <div>
                        <p className="text-gray-400 text-xl">Call Us</p>
                        <p>+8801700000</p>
                    </div>
                </div>
                <div className="flex items-center text-2xl gap-2 text-black lg:w-[19rem] p-2">
                    <EmailIcon />
                    <div>
                        <p className="text-gray-400 text-xl">Send Us a message</p>
                        <p>sarkarriad92@gmail.com</p>
                    </div>
                </div>
                <div className="flex items-center text-2xl gap-2 text-black lg:w-[19rem] p-2">
                    <LocationOnIcon />
                    <div>
                        <p className="text-gray-400 text-xl">Visit our Location</p>
                        <p>+8801700000</p>
                    </div>
                </div>
            </div>
            <Services></Services>
            <Staffs></Staffs>
            <ReviewSection></ReviewSection>
            <Faq></Faq>
        </div>
    );
};

export default Body;