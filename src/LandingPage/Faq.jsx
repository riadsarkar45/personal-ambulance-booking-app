
const Faq = () => {
    return (
        <div className="lg:w-[78%] m-auto lg:flex gap-6 justify-center mt-10 items-center">
            <div className="bg-teal-500 bg-opacity-50 rounded-md">
                <h2 className="text-center text-3xl">Contact us</h2>

                <div className="lg:flex   p-2">
                    <form action="">
                        <div className="lg:flex gap-2">
                            <div>
                                <h2>Your Name</h2>
                                <input className="lg:w-[17rem] w-full p-3" type="text" placeholder="Your Name" />
                            </div>
                            <div>
                                <h2>Your Email</h2>
                                <input className="lg:w-[17rem] w-full p-3" type="text" placeholder="Your Name" />
                            </div>
                        </div>

                        <div>
                            <h2>Your Message</h2>
                            <textarea className="w-full" name="" id="" rows="10"></textarea>
                        </div>

                        <div className="text-center mt-3">
                            <button className="btn hover:bg-white border border-gray-200 p-3 bg-white text-teal-500 bg-opacity-40 rounded-md">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="grid mt-4">
                <div className="collapse bg-base-200">
                    <input className="w-full" type="radio" name="my-accordion-1" defaultChecked />
                    <div className="collapse-title text-xl font-medium">
                        Click to open this one and close others
                    </div>
                    <div className="collapse-content">
                        <p>hello</p>
                    </div>
                </div>
                <div className="collapse bg-base-200 mt-4">
                    <input className="w-full" type="radio" name="my-accordion-1" />
                    <div className="collapse-title text-xl font-medium">
                        Click to open this one and close others
                    </div>
                    <div className="collapse-content">
                        <p>hello</p>
                    </div>
                </div>
                <div className="collapse bg-base-200 mt-4">
                    <input className="w-full" type="radio" name="my-accordion-1" />
                    <div className="collapse-title text-xl font-medium">
                        Click to open this one and close others
                    </div>
                    <div className="collapse-content">
                        <p>hello</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;