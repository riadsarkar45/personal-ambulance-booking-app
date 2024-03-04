import Header from "./Header";

const Banner = () => {
    return (
        <div style={{ backgroundImage: `url(https://i.ibb.co/pRKrZCy/bg-1.jpg)`, backgroundSize: 'cover', width: '100%' }}>
            <Header></Header>
            <div className="h-[25rem] flex items-center">
                
                <div className=" w-full text-white p-3 ">
                    <h2 className="text-xl ">
                        Entrust your health our doctors
                    </h2>
                    <p className="text-2xl">
                        Medical services that
                        you can trust
                    </p>

                    <div className="mt-4 flex gap-3">
                        <button className="border border-white text-white p-2 rounded-sm">Make Appointment</button>
                        <button className="border border-white text-white p-2 rounded-sm">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;