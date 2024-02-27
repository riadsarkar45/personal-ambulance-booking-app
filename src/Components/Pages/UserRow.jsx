
const UserRow = ({ rows, i, handleInlineEdit, index, handleGetOnchangeText, changedText }) => {
    const { name, role, email } = rows;
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
            <td className="px-6 py-4 whitespace-nowrap">{name}</td>
            {
                i === index ? (
                    <td className="p-1 py-4 whitespace-nowrap"><input defaultValue={changedText} onChange={handleGetOnchangeText(changedText)} autoFocus className="w-full p-2 border border-gray-500" type="text" /></td>
                ) : <td onDoubleClick={() => handleInlineEdit(i, email)} className="px-6 py-4 whitespace-nowrap">{email}</td>
            }
            <td className="px-6 py-4 whitespace-nowrap">Approved</td>
            <td className="px-6 py-4 whitespace-nowrap">{role}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                {
                    i === index ? (
                        <>
                            <button className="bg-green-500 bg-opacity-20 border-green-500 border p-1 rounded-md">Save</button>
                            |
                            <button onClick={() => handleInlineEdit(false)} className="bg-red-500 bg-opacity-20 border-red-500 border p-1 rounded-md">Cancel</button> 
                        </>
                    ) : (
                        <>
                            <button className="bg-red-500 bg-opacity-20 border-red-500 border p-1 rounded-md">Delete</button> |
                            <button className="bg-green-500 bg-opacity-20 border-green-500 border p-1 rounded-md">Approve</button>
                        </>
                    )
                }
            </td>
        </tr>
    );
};

export default UserRow;