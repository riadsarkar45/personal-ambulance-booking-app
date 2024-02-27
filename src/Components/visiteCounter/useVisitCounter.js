import moment from "moment";
import { useEffect } from "react";
import useAxiosPublic from "../../Hooks/BaseUrl/useAxiosPublic";

const useVisitCounter = () => {
    const axiosPublic = useAxiosPublic();
    const currentMonth = moment().format("MMM");

    useEffect(() => {
        const updateVisits = async () => {
            try {
                // Add a delay of 1 second before sending the request
                await new Promise(resolve => setTimeout(resolve, 1000));

                const response = await axiosPublic.post('/api/insert/visitor', { date: currentMonth });
                console.log(response.data);
            } catch (error) {
                console.error("Error occurred while updating visits:", error);
            }
        };

        updateVisits();
    }, [axiosPublic, currentMonth]);

};

export default useVisitCounter;
