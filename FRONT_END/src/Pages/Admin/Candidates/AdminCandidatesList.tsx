// import { useEffect, useState } from "react";
// import SideBar from "../../../components/Admin/SideBar";
// import { fetchCandidateData, TakeAction } from "../../../Services/adminService";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout } from "../../../Store/Slice/CandidateSlice";
// import profileImage from "../../../assets/profile image.jpg";


// const AdminCandidatesList = () => {

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [approvalData, setApprovalData] = useState<any[]>([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 4;

//     useEffect(() => {
//         const takeApprovalDetails = async () => {
//             try {
//                 const response: any = await fetchCandidateData();
//                 if (response.success) {
//                     console.log("Approval data fetched successfully");
//                     setApprovalData(response.candidateData);
//                 } else {
//                     console.log("Failed to fetch approval data");
//                 }
//             } catch (error: any) {
//                 console.log("Error fetching data:", error.message);
//             }
//         };
//         takeApprovalDetails();
//     }, []);

//     // Pagination logic
//     const totalPages = Math.ceil(approvalData.length / itemsPerPage);
//     const paginatedData = approvalData.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );

//     const handleNextPage = () => {
//         if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//     };

//     const handlePreviousPage = () => {
//         if (currentPage > 1) setCurrentPage(currentPage - 1);
//     };

//     const handleToDetails = (id: string) => {
//         try {
//             navigate(`/admin/candidate/${id}`); // Navigate to details page with ID
//         } catch (error: any) {
//             console.log(error.message);
//         }
//     }

//     const handleToAction = async (id: string) => {
//         try {
//             console.log("hloo hlooo")
//             const response: any = await TakeAction(id);
//             if (response.success) {
//                 console.log("okokokoko");
//                 setApprovalData((prevData) =>
//                     prevData.map((candidate) =>
//                         candidate._id === id ? { ...candidate, isBlocked: !candidate.isBlocked } : candidate
//                     )
//                 );
//                 const updatedCandidate = response.candidateData;
//                 if(updatedCandidate.isBlocked) {
//                     console.log("Logged-in candidate is blocked, logging out...");
//                     dispatch(logout())
//                 }
//             } else {
//                 console.log("faled");
//             }
//         } catch (error: any) {
//             console.log(error.message);
//         }
//     }

//     return (
//         <div className="flex">
//             {/* Sidebar */}
//             <SideBar heading="Candidates">
//                 <div className="bg-[#30323A] ml-1 p-4 shadow-md mt-2 max-h-[80vh] overflow-auto">
//                     <div className="grid grid-cols-5 gap-4 bg-black text-white p-4 rounded-md">
//                         <div className="text-sm font-medium">SlNo</div>
//                         <div className="text-sm font-medium">Name</div>
//                         <div className="text-sm font-medium">Email</div>
//                         <div className="text-sm font-medium">Action</div>
//                         <div className="text-sm font-medium">Details</div>
//                     </div>

//                     <div className="mt-4 space-y-4">
//                         {paginatedData.length > 0 ? (
//                             paginatedData.map((data, index) => (
//                                 <div
//                                     key={index}
//                                     className="grid grid-cols-5 gap-4 bg-black text-gray-300 p-3 rounded-md hover:bg-[#60646F]"
//                                 >
//                                     <div className="text-sm">{(currentPage - 1) * itemsPerPage + index + 1}</div> {/* Add serial number */}
//                                     <div className="text-sm">
//                                         <div className="flex items-center">
//                                             <img
//                                                 src={data.profileURL || profileImage}
//                                                 alt="Profile"
//                                                 className="rounded-full w-10 h-10 object-cover"
//                                             />
//                                             <h1 className="ml-4">{data.name || "N/A"}</h1>
//                                         </div>
//                                     </div>
//                                     <div className="text-sm">{data.email || "N/A"}</div>
//                                     {data.isBlocked ? (
//                                         <div>
//                                             <button
//                                                 onClick={() => handleToAction(data._id)}
//                                                 className="bg-[#999999] text-[#FF3B30] px-4 py-1 rounded hover:bg-[#FF3B30] hover:text-white">
//                                                 UnBlock
//                                             </button>
//                                         </div>
//                                     ) : (
//                                         <div>
//                                             <button
//                                                 onClick={() => handleToAction(data._id)}
//                                                 className="bg-[#999999] text-[#34C759] px-4 py-1 rounded hover:bg-[#34C759] hover:text-white">
//                                                 Block
//                                             </button>
//                                         </div>
//                                     )}
//                                     <div>
//                                         <button
//                                             onClick={() => handleToDetails(data._id)}
//                                             className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
//                                             Details
//                                         </button>
//                                     </div>


//                                 </div>
//                             ))
//                         ) : (
//                             <div className="text-white text-center">No data available</div>
//                         )}
//                     </div>


//                     {/* Pagination Controls */}
//                     <div className="flex justify-center items-center mt-4">
//                         <button
//                             className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 mr-2 disabled:opacity-50"
//                             onClick={handlePreviousPage}
//                             disabled={currentPage === 1}
//                         >
//                             Previous
//                         </button>
//                         <span className="text-black">
//                             Page {currentPage} of {totalPages}
//                         </span>
//                         <button
//                             className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 ml-2 disabled:opacity-50"
//                             onClick={handleNextPage}
//                             disabled={currentPage === totalPages}
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </div>
//             </SideBar>
//         </div>
//     );
// };

// export default AdminCandidatesList;



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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {

        setTimeout(()=> {
            setIsLoading(false);
        },2000);

        const takeApprovalDetails = async () => {
            try {
                const response: any = await fetchCandidateData();
                if (response.success) {
                    console.log("Approval data fetched successfully");
                    setApprovalData(response.candidateData);
                } else {
                    console.log("Failed to fetch approval data");
                }
            } catch (error: any) {
                console.log("Error fetching data:", error.message);
            }
        };
        takeApprovalDetails();
    }, []);

    if(isLoading) {
        return <div><AdminSideLoading /></div>
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
                    data={paginatedData.map((data, index) => ({
                        serial: (currentPage - 1) * itemsPerPage + index + 1,
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
};

export default AdminCandidatesList;
