import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useEffect, useState } from 'react';
import Card from './Card';
import useAxiosPublic from '../../Hooks/BaseUrl/useAxiosPublic';
import { Box, LinearProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
const AmbuCards = () => {
    const [data, setData] = useState([])
    const [searchedData, setSearchedData] = useState([])
    const [isSearched, setIsSearched] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get("/all-users")
            .then(res => {
                setData(res.data)
                setIsLoading(false)
            })
    }, [axiosPublic])


    const handleFilters = (e, filterType) => {
        setIsLoading(true)
        if (filterType === "Filter") {
            setIsLoading(false)
            setIsSearched(false)
        }
        const dataToFilter = { text: e, filterType: filterType };
        console.log(dataToFilter)
        if (e && filterType) {
            axiosPublic.post("/api/search/detail", dataToFilter)
                .then(res => {
                    setSearchedData(res.data)
                    setIsSearched(true)
                    setIsLoading(false)
                })
        } else {
            setIsSearched(false)
            setIsLoading(false)
        }

    }


    return (
        <div className='font-serif  dark:bg-gray-800 text-gray-900 p-3'>
            <div>
                {/* visible only on lg and md devices */}
                <div className='md:block hidden'>
                    <div className='lg:flex md:flex gap-3 mb-3 mt-4'>
                        <div>
                            <input onChange={(e) => handleFilters(e.target.value, "location")} className='border border-gray-500 p-2 lg:w-[15rem] w-full mt-2 rounded-sm' type="text" placeholder='Search By Location' />
                        </div>
                        <div>
                            <input onChange={(e) => handleFilters(e.target.value, "driverName")} className='border border-gray-500 p-2 lg:w-[15rem] w-full mt-2 rounded-sm' type="text" placeholder='Search By Driver Name' />
                        </div>
                        <div>
                            <input onChange={(e) => handleFilters(e.target.value, "ambuNumber")} className='border border-gray-500 p-2 lg:w-[15rem] w-full mt-2 rounded-sm' type="text" placeholder='Search By Ambulance Id' />
                        </div>
                        <div>
                            <select defaultValue="filter" onChange={(e) => handleFilters(e.target.value, "category")} className='border border-gray-500 p-2 lg:w-[9rem] w-full mt-2 rounded-sm' name="" id="">
                                <option defaultValue="Filter" >Filter</option>
                                <option value="AC">AC</option>
                                <option value="Non AC">Non AC</option>
                            </select>
                        </div>
                    </div>
                </div>


                <div className='block md:hidden lg:hidden xl:hidden w-full '>
                    <div className='flex justify-between'>
                        <button className='border border-blue-400 p-2 rounded-md'><FilterAltIcon /> {" "} Filter</button>

                        <div>
                            <select className='border border-gray-500 p-3 lg:w-[15rem] w-[10rem] mt-2 rounded-sm' name="" id="">
                                <option value="AC">AC</option>
                                <option value="Non AC">Non AC</option>
                            </select>
                        </div>
                    </div>
                </div>

                {
                    isSearched && searchedData.length <= 0 ? (
                        <div className=' h-[20rem] flex items-center justify-center'>
                            <div className='text-center text-4xl'>
                                <h2 className=' text-2xl'><SearchIcon /></h2>
                                <h2 className=' text-2xl'>No result found</h2>
                            </div>

                        </div>

                    ) : null
                }

                <div>

                    {

                        isLoading ? (
                            <div className=' h-[20rem] flex items-center justify-center'>
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgress />
                                </Box>

                            </div>
                        ) : (
                            isSearched ? (
                                searchedData?.map((card, index) => <Card key={index} card={card}></Card>)
                            ) : (
                                data?.map((card, index) => <Card key={index} card={card}></Card>)
                            )
                        )

                    }
                </div>
            </div>
        </div>
    );
};

export default AmbuCards;