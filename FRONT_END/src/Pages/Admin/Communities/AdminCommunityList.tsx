import { useEffect, useState } from "react";
import SideBar from "../../../components/Admin/SideBar";
import { fetchCommunityList } from "../../../Services/adminService";

const AdminCommunityList = () => {

    const [communityData, setCommunityData] = useState<any>(null)

    useEffect(() => {
        const fetchCommunityData = async () => {
            const response: any = await fetchCommunityList()
            if (response.success) {
                console.log(response.communityData)
                setCommunityData(response.communityData);
                console.log("okokokokok");
            } else {
                console.log("not ok not ok not ok");
            }
        }
        fetchCommunityData();
    }, []);


    return (
        <>
            <div className="flex">
                <SideBar heading="Communities">
                    <div className="bg-[#30323A] p-4 shadow-md h-screen text-white">
                        <h2 className="text-lg font-bold mb-4">Community List</h2>
                        {communityData && communityData.length > 0 ? ( // Check if communityData is not null
                            <ul>
                                {communityData.map((community: any, index: number) => (
                                    <li key={index} className="p-2 border-b border-gray-600">
                                        <span className="font-semibold">{community.name}</span> - {community.members.length}Members
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No communities found.</p>
                        )}
                    </div>
                </SideBar>
            </div>
        </>
    )
}

export default AdminCommunityList;
