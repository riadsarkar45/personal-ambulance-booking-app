
const Staffs = () => {
    return (
        <div className="mt-[5rem]">
            <div>
                <h2>Medical Staffs</h2>
            </div>
            <div className="lg:flex justify-between">
                <div className="lg:flex gap-2">
                    <div>
                        <img className="lg:w-[20rem] w-full" src="https://i.ibb.co/RbGdYVb/image23-1200x1200.jpg" alt="" />
                    </div>
                    <div>
                        <h2 className="uppercase mt-2 mb-4 text-xl">Cardiac Surgeon</h2>
                        <h2 className="mb-4">Dr . Charlie McChormick</h2>
                        <p className="lg:w-[21rem]">
                            Specialist is general and bariatric surgery,
                            all minimally invasive methods.
                            Senior general surgeon and head of bariatric surgery.
                        </p>
                    </div>
                </div>
                <div className="lg:flex gap-2">
                    <div>
                        <img className="lg:w-[20rem] w-full" src="https://i.ibb.co/Hz3hPvv/image24-1200x1200.jpg" alt="" />
                    </div>
                    <div>
                        <h2 className="uppercase mt-2 mb-4 text-2xl">Consulting Doctor</h2>
                        <h2 className="mb-4">Dr. Bettie Powell</h2>
                        <p className="lg:w-[21rem]">
                            Specialist is general and bariatric surgery,
                            all minimally invasive methods.
                            Senior general surgeon and head of bariatric surgery.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Staffs;