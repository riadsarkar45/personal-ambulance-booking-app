import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import VideoCallIcon from '@mui/icons-material/VideoCall';
const Services = () => {
    return (
        <div className="lg:w-[78%] lg:m-auto">
            <div className="lg:flex md:flex mt-4">
                <div className="bg-teal-500 lg:w-[25rem] w-full p-4 lg:h-[16rem] ">
                    <h2 className="text-4xl">Top Doctors</h2>
                    <p className="mt-9">
                        Cum sociis natoque penatibus et magnis dis parturient
                        montesmus. Pro vel nibh et elit mollis
                        commodo et nec augue tristique sed volutpat.
                    </p>
                </div>
                <div className="bg-teal-600 lg:w-[25rem] w-full p-4 lg:h-[16rem] ">
                    <h2 className="text-4xl">24 Hours Service</h2>
                    <p className="mt-9">
                        Cum sociis natoque penatibus et magnis dis parturient
                        montesmus. Pro vel nibh et elit mollis
                        commodo et nec augue tristique sed volutpat.
                    </p>
                </div>
                <div className="bg-teal-700 lg:w-[25rem] w-full p-4 lg:h-[16rem] ">
                    <h2 className="text-4xl">Opening Hours</h2>
                    <div className="mt-9">
                        <div className="flex justify-between">
                            <h2 className=" mb-2">Monday to Friday</h2>
                            <div>
                                <h2>8:00 - 17:00</h2>
                            </div>
                        </div>
                        <div className="border border-teal-600"></div>
                        <div className="flex justify-between mt-3">
                            <h2 className=" mb-2">Monday to Friday</h2>
                            <div>
                                <h2>8:00 - 17:00</h2>
                            </div>
                        </div>
                        <div className="border border-teal-600"></div>

                        <div className="flex justify-between mt-3">
                            <h2 className=" mb-2">Monday to Friday</h2>
                            <div>
                                <h2>8:00 - 17:00</h2>
                            </div>
                        </div>
                        <div className="border border-teal-600"></div>
                    </div>
                </div>
            </div>

            <div className="mt-9 text-black lg:flex gap-3">
                <div>
                    <h2 className='text-4xl text-center'>< VideoCallIcon /></h2>
                    <h2 className='text-center text-2xl'>On Camera Conversation</h2>
                    <p className='text-center'>
                        Cum sociis natoque penatibus
                        et magnis dis parturient montesmus.
                        Pro vel nibh et elit mollis commodo
                        et nec augueique
                    </p>
                </div>
                <div>
                    <h2 className='text-4xl text-center'>< AddToQueueIcon /></h2>
                    <h2 className='text-center text-2xl'>24/7 Ambulance Service</h2>
                    <p className='text-center'>
                        Cum sociis natoque penatibus
                        et magnis dis parturient montesmus.
                        Pro vel nibh et elit mollis commodo
                        et nec augueique
                    </p>
                </div>
                <div>
                    <h2 className='text-4xl text-center'>< AddToQueueIcon /></h2>
                    <h2 className='text-center text-2xl'>24/7 Ambulance Service</h2>
                    <p className='text-center'>
                        Cum sociis natoque penatibus
                        et magnis dis parturient montesmus.
                        Pro vel nibh et elit mollis commodo
                        et nec augueique
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Services;