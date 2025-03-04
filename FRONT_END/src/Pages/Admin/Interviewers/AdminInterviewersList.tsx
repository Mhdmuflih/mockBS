import { useEffect, useState } from "react";
import SideBar from "../../../components/Admin/SideBar";
import Table from "../../../components/Admin/Table";
import { logout } from "../../../Store/Slice/InterviewerSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInterviewerData, takeActionInterviewer } from "../../../Services/adminService";
import profileImage from "../../../assets/profile image.jpg";

import toast from "react-hot-toast"
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

// import Pagination from '@mui/material/Pagination';



const AdminInterviewersList = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [approvalData, setApprovalData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        const takeApprovalDetails = async () => {
            try {
                const response: any = await fetchInterviewerData();
                if (response.success) {
                    console.log("Approval data fetched successfully");
                    setApprovalData(response.interviewerData);
                } else {
                    console.log("Failed to fetch approval data");
                }
            } catch (error: any) {
                console.log("Error fetching data:", error.message);
            }
        };
        takeApprovalDetails();
    }, []);

    // Pagination logic
    const totalPages = Math.ceil(approvalData.length / itemsPerPage);
    // const paginatedData = approvalData.slice(
    //     (currentPage - 1) * itemsPerPage,
    //     currentPage * itemsPerPage
    // );

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleToDetails = (id: string) => {
        navigate(`/admin/interviewer/${id}`);
    };

    const handleToAction = async (id: string, isBlocked: boolean) => {
        try {

            const actionText = isBlocked ? "Unblock" : "Block"; // Dynamic text for action
            const confirmText = isBlocked ? "Yes, Unblock!" : "Yes, Block!";
            const successMessage = isBlocked ? "Interviewer Unblocked Successfully!" : "Interviewer Blocked Successfully!";

            // First, ask for confirmation before proceeding
            const result = await Swal.fire({
                title: `Confirm ${actionText} Interviewer`,
                text: `Are you sure you want to ${actionText.toLowerCase()} this Interviewer?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: confirmText,
                cancelButtonText: "Cancel",
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
            });

            if (result.isConfirmed) {
                const response: any = await takeActionInterviewer(id);
                if (response.success) {
                    setApprovalData((prevData) =>
                        prevData.map((interviewer) =>
                            interviewer._id === id ? { ...interviewer, isBlocked: !interviewer.isBlocked } : interviewer
                        )
                    );

                    toast.success(successMessage);
                    if (response.interviewerData.isBlocked) {
                        dispatch(logout());
                    }
                } else {
                    toast.error(response.message)

                }
            }
        } catch (error: any) {
            console.log(error.message);
            toast.error(error?.message || "An unexpected error occurred. Please try again later.");
        }
    };

    // const handleSearch = (e: any) => {
    //     const query = e.target.value;
    //     setSearchQuery(query);
    // };

    const handleChange = (_: unknown, value: number) => {
        setCurrentPage(value);
    };


    // Define Columns for Candidates
    const candidateColumns = [
        { key: "serial", label: "SlNo" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "action", label: "Action" },
        { key: "details", label: "Details" },
    ];

    return (
        <div className="flex">
            <SideBar heading="Candidates">

                <Toaster position="top-right" reverseOrder={false} />


                {/* <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-2 rounded-md w-full bg-black text-white"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e)}
                /> */}
                <div>

                    <Table
                        columns={candidateColumns}
                        handleChange={handleChange}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        data={approvalData.map((data, index) => ({
                            serial: (
                                <h2 className="mr-3">{index + 1}</h2>
                            ),
                            name: (

                                <div className="flex items-center">
                                    <img
                                        src={data.profileURL || profileImage}
                                        alt="Profile"
                                        className="rounded-full w-10 h-10 object-cover"
                                    />
                                    <h1 className="ml-4">{data.name || "N/A"}</h1>
                                </div>
                            ),
                            email: (

                                <div className="mt-2">
                                    {data.email || "N/A"}
                                </div>
                            ),
                            action: (
                                <button
                                    onClick={() => handleToAction(data._id, data.isBlocked)}
                                    className={`px-4 py-1 rounded-full mt-1 ${data.isBlocked
                                        ? "bg-[#999999] bg-opacity-50 text-[#FF3B30] hover:bg-[#FF3B30] hover:text-white duration-500"
                                        : "bg-[#999999] bg-opacity-50 text-[#34C759] hover:bg-[#34C759] hover:text-white duration-500"
                                        }`}
                                >
                                    {data.isBlocked ? "UnBlock" : "Block"}
                                </button>
                            ),
                            details: (
                                <button
                                    onClick={() => handleToDetails(data._id)}
                                    className="bg-[#32ADE6] text-white px-3 py-1 mt-1 rounded-full hover:text-white hover:bg-[#999999] duration-500"
                                >
                                    Details
                                </button>
                            ),
                        }))}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />

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
                    <span className="text-white">
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
            </SideBar>
        </div>
    );
}

export default AdminInterviewersList;
