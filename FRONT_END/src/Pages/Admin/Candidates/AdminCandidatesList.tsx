import { useEffect, useState } from "react";
import SideBar from "../../../components/Admin/SideBar";
import { fetchCandidateData, TakeActionCandidate } from "../../../Services/adminService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../Store/Slice/CandidateSlice";
import profileImage from "../../../assets/profile image.jpg";
import Table from "../../../components/Admin/Table";

import toast from "react-hot-toast"
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import AdminSideLoading from "../../../components/Admin/AdminSideLoading";


const AdminCandidatesList = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [approvalData, setApprovalData] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        const takeApprovalDetails = async () => {
            try {
                const response: any = await fetchCandidateData(currentPage, limit, searchQuery);
                if (response.success) {
                    console.log(response.candidateData, "Approval data fetched successfully");
                    setApprovalData(response.candidateData.candidatesData);
                    setTotalPages(response.candidateData.totalPages);
                } else {
                    console.log("Failed to fetch approval data");
                }
            } catch (error: any) {
                console.log("Error fetching data:", error.message);
            }
        };
        takeApprovalDetails();
    }, [searchQuery, currentPage]);

    if (isLoading) {
        return <div><AdminSideLoading /></div>
    }

    const handleToDetails = (id: string) => {
        navigate(`/admin/candidate/${id}`);
    };

    const handleToAction = async (id: string, isBlocked: boolean) => {
        try {
            const actionText = isBlocked ? "Unblock" : "Block"; // Dynamic text for action
            const confirmText = isBlocked ? "Yes, Unblock!" : "Yes, Block!";
            const successMessage = isBlocked ? "Candidate Unblocked Successfully!" : "Candidate Blocked Successfully!";

            // First, ask for confirmation before proceeding
            const result = await Swal.fire({
                title: `Confirm ${actionText} Candidate`,
                text: `Are you sure you want to ${actionText.toLowerCase()} this candidate?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: confirmText,
                cancelButtonText: "Cancel",
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
            });

            if (result.isConfirmed) {
                const response: any = await TakeActionCandidate(id);

                if (response.success) {
                    setApprovalData((prevData) =>
                        prevData.map((candidate) =>
                            candidate._id === id ? { ...candidate, isBlocked: !candidate.isBlocked } : candidate
                        )
                    );

                    toast.success(successMessage);

                    if (response.candidateData.isBlocked) {
                        dispatch(logout());
                    }

                    // Show confirmation alert
                    // Swal.fire(`${actionText}ed!`, `The candidate has been ${actionText.toLowerCase()}ed successfully.`, "success");
                } else {
                    toast.error(response.message);
                }
            }
        } catch (error: any) {
            console.error(error.message);
            toast.error(error?.message || "An unexpected error occurred. Please try again later.");
        }
    };

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
                <Table
                    columns={candidateColumns}
                    handleChange={handleChange}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    data={approvalData.map((data, index) => ({
                        serial: (currentPage - 1) * limit + index + 1,
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
                                className={`px-4 py-1 mt-1 rounded-full ${data.isBlocked
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
                                className="bg-[#32ADE6] text-white px-3 mt-1 py-1 rounded-full hover:text-white hover:bg-[#999999] duration-500"                            >
                                Details
                            </button>
                        ),
                    }))}
                />
            </SideBar>
        </div>
    );
};

export default AdminCandidatesList;
