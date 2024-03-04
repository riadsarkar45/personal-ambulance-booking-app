
const AllAmbulanceCard = ({ handleDeleteAmbulance, getAmbulanceId, getDriverName, getLocation, getHospitalName, getType, rows, getIndexNumber, i, index, ambulanceId, hospitalName1, locations, types, handleUpdateAmbulance }) => {
    const { hospitalName, location, driverName, type, img, ambulanceNumber, _id } = rows
    return (

        i === index ? (
            <tr onDoubleClick={() => getIndexNumber(i, hospitalName, location, driverName, type, ambulanceNumber)}>
                <td className="px-6 py-4 whitespace-nowrap"><input autoFocus onChange={e => (getAmbulanceId(e.target.value))} defaultValue={ambulanceId} className="p-2 rounded-md w-full border border-gray-500" type="text" /></td>
                <td className="px-6 py-4 whitespace-nowrap"><input autoFocus onChange={e => getHospitalName(e.target.value)} defaultValue={hospitalName1} className="p-2 rounded-md w-full border border-gray-500" type="text" /></td>
                <td className="px-6 py-4 whitespace-nowrap"><input onChange={e => getLocation(e.target.value)} defaultValue={locations} className="p-2 rounded-md w-full border border-gray-500" type="text" /></td>
                <td className="px-6 py-4 whitespace-nowrap">{"photo"}</td>
                <td className="px-6 py-4 whitespace-nowrap"><input onChange={e => getDriverName(e.target.value)} defaultValue={driverName} className="p-2 rounded-md w-full border border-gray-500" type="text" /></td>
                <td className="px-6 py-4 whitespace-nowrap"><input onChange={e => getType(e.target.value)} defaultValue={types} className="p-2 rounded-md w-full border border-gray-500" type="text" /></td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => handleUpdateAmbulance(_id)} className="bg-green-500 bg-opacity-20 border-green-500 border p-1 rounded-md">Save</button>
                </td>
            </tr>
        ) : (
            <tr onDoubleClick={() => getIndexNumber(i, hospitalName, location, driverName, type, ambulanceNumber)}>
                <td className="px-6 py-4 whitespace-nowrap">{ambulanceNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{hospitalName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{"photo"}</td>
                <td className="px-6 py-4 whitespace-nowrap">{driverName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{type}</td>
                <td className="px-6 py-4 whitespace-nowrap">

                    <button onClick={() => handleDeleteAmbulance(_id)} className="bg-red-500 bg-opacity-20 border-red-500 border p-1 rounded-md">Delete</button>
                </td>
            </tr>
        )

    );
};

export default AllAmbulanceCard;