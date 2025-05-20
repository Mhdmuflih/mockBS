import { useCallback, useEffect, useState } from "react";
import SideBar from "../../../components/Admin/SideBar";
import { fetchApprovalData } from "../../../Services/adminService";
import { useNavigate } from "react-router-dom";
import profileImage from "../../../assets/profile image.jpg";
import Pagination from '@mui/material/Pagination';
import { debounce } from "lodash";

const AdminApproval = () => {

    const navigate = useNavigate();
    
    const [approvalData, setApprovalData] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [rawSearchQuery, setRawSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            setSearchQuery(query);
        }, 500),
        []
    )

    useEffect(() => {
        setRawSearchQuery(rawSearchQuery);
        return () => {
            debouncedSearch.cancel();
        }
    },[rawSearchQuery]);
    

    useEffect(() => {

        const takeApprovalDetails = async () => {
            try {
                const response: any = await fetchApprovalData(currentPage, limit, searchQuery);
                if (response.success) {
                    // console.log("Approval data fetched successfully");
                    // console.log(response.approvalData.approvalData, "This is the approval data");
                    // console.log(response.approvalData.totalPages, 'this is total pages')
                    setApprovalData(response.approvalData.approvalData);
                    setTotalPages(response.approvalData.totalPages || 1);
                } else {
                    console.log("Failed to fetch approval data");
                }

                console.log(approvalData, 'this is that')
            } catch (error: any) {
                console.log("Error fetching data:", error.message);
            }
        };
        takeApprovalDetails();
    }, [searchQuery, currentPage]);


    const handleToDetails = (id: string) => {
        try {
            navigate(`/admin/approval-details/${id}`); // Navigate to details page with ID
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const filteredData = approvalData.filter((data) =>
        data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.mobile.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChange = (_: unknown, value: number) => {
        setCurrentPage(value);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <SideBar heading="Approval">
                <div className="bg-[#30323A] p-2 shadow-md min-h-screen flex flex-col justify-between">
                    {/* Search and Data List */}
                    <div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-3 py-2 rounded-md w-full bg-black text-white"
                            value={rawSearchQuery}
                            onChange={(event) => {
                                setRawSearchQuery(event.target.value)
                                setCurrentPage(1)
                            }}
                        />

                        <div className="mt-2 grid grid-cols-[1fr_2fr_2fr_1fr] gap-x-6 bg-black text-white p-4 rounded-md">
                            <div className="text-sm font-thin ml-2">Name</div>
                            <div className="text-sm font-thin text-center">Email</div>
                            <div className="text-sm font-thin text-center">Mobile</div>
                            <div className="text-sm font-thin text-right">Details</div>
                        </div>

                        {/* Table Rows */}
                        <div className="mt-1 space-y-2 flex-grow ">
                            {approvalData.length > 0 ? (
                                filteredData.map((data) => (
                                    <div key={data._id} className="grid grid-cols-[1fr_2fr_2fr_1fr] gap-x-6 bg-black text-gray-300 p-2 rounded-md">
                                        <div className="text-sm text-left flex items-center">
                                            <img src={data.profileURL || profileImage} alt="Profile" className="rounded-full ml-3 w-8 h-8 object-cover" />
                                            <h1 className="ml-4 font-semibold">{data.name || "N/A"}</h1>
                                        </div>
                                        <div className="text-sm text-center mt-2">{data.email || "N/A"}</div>
                                        <div className="text-sm text-center mt-2">{data.mobile || "N/A"}</div>
                                        <div className="flex justify-end items-center">
                                            <button
                                                onClick={() => handleToDetails(data._id)}
                                                className="bg-[#32ADE6] text-white px-3 py-1 rounded-full hover:text-white hover:bg-[#999999]"
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-white text-center">No data available</div>
                            )}
                        </div>
                    </div>

                    {/* Fixed Pagination */}
                    <div className="flex justify-center items-center mb-32">
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handleChange}
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    color: "#FFCC00",  // Text color
                                },
                                "& .MuiPaginationItem-root.Mui-selected": {
                                    backgroundColor: "#FFCC00", // Selected page background color
                                    color: "#000",  // Selected page text color
                                },
                                "& .MuiPaginationItem-root:hover": {
                                    backgroundColor: "#FFD633", // Lighter yellow on hover
                                    color: "#000"
                                }
                            }}
                        />
                    </div>
                </div>
            </SideBar >
        </div >
    );
};

export default AdminApproval;
