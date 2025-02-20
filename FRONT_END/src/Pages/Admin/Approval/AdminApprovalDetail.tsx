import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../../../components/Admin/SideBar";
import { approveInterviewerData, fetchInterviewerDetails } from "../../../Services/adminService"; // Assuming you have a service to fetch details
import Swal from "sweetalert2";
import profileImage from "../../../assets/profile image.jpg";

import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";


const AdminApprovalDetail = () => {

    const navigate = useNavigate();
    const { id } = useParams(); // Access dynamic id from URL
    const [interviewerDetails, setInterviewerDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    if (!id) {
        return <div>Error: No interviewer's id provided.</div>;
    }

    useEffect(() => {
        const fetchDetails = async () => {
            if (!id) {
                console.log("No id provided");
                return; // Early return if id is undefined
            }
            try {
                const response: any = await fetchInterviewerDetails(id); // Fetch details using the id
                if (response.success) {
                    console.log(response.approvalData, "this is single data");
                    setInterviewerDetails(response.approvalData); // Fix: Use `approvalData` instead of `data`
                } else {
                    console.log("Failed to fetch details");
                }
            } catch (error: any) {
                console.log("Error fetching details:", error.message);
            } finally {
                setLoading(false); // Stop loading once data is fetched
            }
        };

        fetchDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while data is being fetched
    }

    if (!interviewerDetails) {
        return <div>No details found for the selected interviewer.</div>;
    }

    // Button handlers
    const handleApproval = async () => {
        try {
            const response: any = await approveInterviewerData(id);
            if (response.success) {
                Swal.fire({
                    title: "Success!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: 'OK'
                });
                navigate('/admin/approval')
            } else {
                toast.error(response.message);
            }
        } catch (error: any) {
            console.log(error.message);
            toast.error(error?.message || "An unexpected error occurred. Please try again later.");
        }
    };

    const handleDecline = () => {
        Swal.fire({
            title: "Success!",
            text: "Decline",
            icon: "success",
            confirmButtonText: 'OK'
        });
        navigate('/admin/approval')
    };

    return (
        <div className="flex">

            <Toaster position="top-right" reverseOrder={false} />

            {/* Sidebar */}
            <SideBar heading="Details">
                
                <div className="bg-[#30323A] ml-1 p-4 shadow-md mt-2 h-[476px]">
                    <h2 className="text-white text-xl font-semibold mb-4">Interviewer Details</h2>

                    {/* Displaying Interviewer Details */}
                    <div className="bg-black text-white p-4 rounded-md">
                        <div className="flex items-center mb-4">
                            <img
                                src={interviewerDetails.profileURL || profileImage} // Set a fallback image in case profilePicture is missing
                                alt="Profile"
                                className="rounded-full w-16 h-16 object-cover"
                            />
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold">{interviewerDetails.name || "N/A"}</h3>
                                <p>{interviewerDetails.email || "N/A"}</p>
                                <p>{interviewerDetails.mobile || "N/A"}</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium mt-16">Introduction:</h4>
                            <p className="text-gray-300">{interviewerDetails.introduction || "No details available"}</p>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium mt-7">Current Designation:</h4>
                            <p className="text-gray-300">{interviewerDetails.currentDesignation || "No details available"}</p>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium mt-7">Year of Experience:</h4>
                            <p className="text-gray-300">{interviewerDetails.yearOfExperience || "No details available"}</p>
                        </div>
                        {/* <div>
                            <button className="bg-white text-black py-2 px-4 rounded-md hover:bg-red-600" > View </button>
                        </div> */}

                        <div className="mt-2 flex justify-end space-x-4">
                            <button
                                onClick={handleDecline}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                            >
                                Decline
                            </button>
                            <button
                                onClick={handleApproval}
                                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                            >
                                Approve
                            </button>
                        </div>

                    </div>
                </div>
            </SideBar>
        </div>
    );
};

export default AdminApprovalDetail;
