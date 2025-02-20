import { useEffect, useState } from "react";
import SideBar from "../../../components/Admin/SideBar";
import { fetchApprovalData } from "../../../Services/adminService";
import { useNavigate } from "react-router-dom";
import profileImage from "../../../assets/profile image.jpg";

const AdminApproval = () => {

    const navigate = useNavigate();
    const [approvalData, setApprovalData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        const takeApprovalDetails = async () => {
            try {
                const response: any = await fetchApprovalData();
                if (response.success) {
                    console.log("Approval data fetched successfully");
                    console.log(response.approvalData, "This is the approval data");
                    setApprovalData(response.approvalData);
                } else {
                    console.log("Failed to fetch approval data");
                }
            } catch (error: any) {
                console.log("Error fetching data:", error.message);
            }
        };
        takeApprovalDetails();
    }, []);

    const handleToDetails = (id: string) => {
        try {
            navigate(`/admin/approval-details/${id}`); // Navigate to details page with ID
        } catch (error: any) {
            console.log(error.message);
        }
    }

    // Pagination logic
    const totalPages = Math.ceil(approvalData.length / itemsPerPage);
    const paginatedData = approvalData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <SideBar heading="Approval">
                <div className="bg-[#30323A] ml-1 p-4 shadow-md mt-2 h-[476px]">
                    {/* Table Headings */}
                    <div className="grid grid-cols-4 gap-4 bg-black text-white p-4 rounded-md">
                        <div className="text-sm font-medium">Name</div>
                        <div className="text-sm font-medium">Email</div>
                        <div className="text-sm font-medium">Mobile</div>
                        <div className="text-sm font-medium ml-3">Details</div>
                    </div>

                    {/* Table Rows */}
                    <div className="mt-4 space-y-4">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((data, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-4 gap-4 bg-black text-gray-300 p-3 rounded-md hover:bg-[#60646F]"
                                >
                                    <div className="text-sm">
                                        <div className="flex items-center">
                                            <img
                                                src={data.profileURL || profileImage}
                                                alt="Profile"
                                                className="rounded-full w-10 h-10 object-cover"
                                            />
                                            <h1 className="ml-4">{data.name || "N/A"}</h1>
                                        </div>
                                    </div>
                                    <div className="text-sm">{data.email || "N/A"}</div>
                                    <div className="text-sm">{data.mobile || "N/A"}</div>
                                    <div>
                                        <button
                                            onClick={() => handleToDetails(data._id)}
                                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-white text-center">No data available</div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center mt-4">
                        <button
                            className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 mr-2 disabled:opacity-50"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className="text-black">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 ml-2 disabled:opacity-50"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </SideBar>
        </div>
    );
};

export default AdminApproval;
