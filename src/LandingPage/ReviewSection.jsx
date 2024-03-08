import Marquee from "react-fast-marquee";

const ReviewSection = () => {
    return (
        <div className="w-[78%] m-auto mt-10 bg-[#d9d8df] p-2">
            <div className="p-2 text-2xl">
                <h2>Reviews</h2>
            </div>
            <Marquee pauseOnHover={false}>
                <div className="bg-teal-400 bg-opacity-50 h-[10rem] w-[16rem] ml-4">
                    <div className="flex gap-2 items-center">
                        <div className="bg-red-500 h-[3rem] w-[4rem] rounded-md p-2"></div>
                        <div>
                            <h2>Head Shot</h2>
                            <div className="rating">
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            </div>
                        </div>

                    </div>
                    <div className="p-1">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing adipisicing adipisicing adipisicing</p>
                    </div>
                </div>
                <div className="bg-teal-400 bg-opacity-50 h-[10rem] w-[16rem] ml-4">
                    <div className="flex gap-2 items-center">
                        <div className="bg-red-500 h-[3rem] w-[4rem] rounded-md p-2"></div>
                        <div>
                            <h2>Head Shot</h2>
                            <div className="rating">
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            </div>
                        </div>

                    </div>
                    <div className="p-1">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing adipisicing adipisicing adipisicing</p>
                    </div>
                </div>
                <div className="bg-teal-400 bg-opacity-50 h-[10rem] w-[16rem] ml-4">
                    <div className="flex gap-2 items-center">
                        <div className="bg-red-500 h-[3rem] w-[4rem] rounded-md p-2"></div>
                        <div>
                            <h2>Head Shot</h2>
                            <div className="rating">
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            </div>
                        </div>

                    </div>
                    <div className="p-1">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing adipisicing adipisicing adipisicing</p>
                    </div>
                </div>
                <div className="bg-teal-400 bg-opacity-50 h-[10rem] w-[16rem] ml-4">
                    <div className="flex gap-2 items-center">
                        <div className="bg-red-500 h-[3rem] w-[4rem] rounded-md p-2"></div>
                        <div>
                            <h2>Head Shot</h2>
                            <div className="rating">
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            </div>
                        </div>

                    </div>
                    <div className="p-1">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing adipisicing adipisicing adipisicing</p>
                    </div>
                </div>
            </Marquee>
        </div>
    );
};

export default ReviewSection;