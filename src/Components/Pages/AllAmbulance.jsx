import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import AllAmbulanceCard from './AllAmbulanceCard';
import toast from 'react-hot-toast';

const AllAmbulance = () => {
    const axiosSecure = useAxiosSecure()
    const [ambulance, setAmbulance] = useState([])
    const [ambulanceId, setAmbulanceId] = useState('')
    const [hospitalName, setHospitalName] = useState('')
    const [location, setLocation] = useState('')
    const [driverName, setDriverName] = useState('')
    const [type, setType] = useState('')
    const [index, setIndex] = useState('')

    const {data:amb = [], refetch } = useQuery({
        queryKey: ["data"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-users`);
            setAmbulance(res.data);
            return res.data;
        },
    });


    const getIndexNumber = (index, hospitalName, location, driverName, type, ambulanceId) => {
        setAmbulanceId(ambulanceId)
        setHospitalName(hospitalName)
        setLocation(location)
        setDriverName(driverName)
        setType(type)
        setIndex(index)
    }

    const getAmbulanceId = (id) => {
        setAmbulanceId(id);
    }

    const getHospitalName = (hosName) => {
        setHospitalName(hosName);
    }

    const getLocation = (loc) => {
        setLocation(loc);
    }

    const getDriverName = (name) => {
        setDriverName(name);
    }

    const getType = (type) => {
        setType(type);
    }


    const handleUpdateAmbulance = (id) => {
        const dataToUpdate = {
            ambulanceId,
            location,
            type,
            hospitalName,
            driverName,
            id
        }
        axiosSecure.patch('/api/update/ambulance', dataToUpdate).then(() => refetch(),toast.success("Changes Saved"),setIndex(false) )
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ambulance ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            ambulance?.map((rows, i) =>
                                <AllAmbulanceCard key={i}
                                    rows={rows}
                                    i={i}
                                    getIndexNumber={getIndexNumber}
                                    ambulanceId={ambulanceId}
                                    hospitalName1={hospitalName}
                                    locations={location}
                                    driverName={driverName}
                                    types={type}
                                    index={index}
                                    handleUpdateAmbulance={handleUpdateAmbulance}
                                    getAmbulanceId={getAmbulanceId}
                                    getDriverName={getDriverName}
                                    getLocation={getLocation}
                                    getHospitalName={getHospitalName}
                                    getType={getType}
                                    setIndex={setIndex}
                                />
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllAmbulance;