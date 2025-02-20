import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchInterviewerDetails } from "../../../Services/adminService";
import SideBar from "../../../components/Admin/SideBar";
import { TiArrowBack } from "react-icons/ti";

const AdminInterviewerDetails = () => {

    const navigate = useNavigate();
    const { id } = useParams(); // Access dynamic id from URL
    const [interviewerDetails, setInterviewerDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!id) {
                console.log("No id provided");
                return; // Early return if id is undefined
            }
            try {
                const response: any = await fetchInterviewerDetails(id);
                if (response.success) {
                    setInterviewerDetails(response.approvalData);
                } else {
                    console.log("Failed to fetch details");
                    setInterviewerDetails(null); // Set to null if no data found
                }
            } catch (error: any) {
                console.log("Error fetching details:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while data is being fetched
    }

    if (!interviewerDetails) {
        return <div>No details found for the selected candidate.</div>;
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <SideBar heading="Details">
                <div className="bg-[#30323A] ml-1 p-4 shadow-md mt-2 h-[476px]">
                    <div>
                        <TiArrowBack className="text-white text-2xl cursor-pointer" onClick={() => navigate('/admin/interviewers')} />
                    </div>
                    <h2 className="text-white text-xl font-semibold mb-4">Candidate Details</h2>


                    {/* Displaying Candidate Details */}
                    <div className="bg-black text-white p-4 rounded-md">
                        <div className="flex items-center mb-4">
                            <img
                                src={interviewerDetails.profileURL || "/default-profile.jpg"} // Set a fallback image in case profilePicture is missing
                                alt="Profile"
                                className="rounded-full w-16 h-16 object-cover"
                            />
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold">{interviewerDetails.name || "N/A"}</h3>
                                <div className="flex space-x-8 mt-5">
                                    <label className="font-extralight">Email:</label>
                                    <p className="font-extralight">{interviewerDetails.email || "N/A"}</p>
                                </div>
                                <div className="flex space-x-5">
                                    <label className="font-extralight"> Mobile: </label>
                                    <p className="font-extralight">{interviewerDetails.mobile || "N/A"}</p>
                                </div>
                                <div className="flex space-x-5">
                                    <label className="font-extralight"> Year of Experience: </label>
                                    <p className="font-extralight">{interviewerDetails.yearOfExperience || "N/A"}</p>
                                </div>
                                <div className="flex space-x-5">
                                    <label className="font-extralight"> Current Designation: </label>
                                    <p className="font-extralight">{interviewerDetails.currentDesignation || "N/A"}</p>
                                </div>
                                <div className="flex space-x-5">
                                    <label className="font-extralight"> University: </label>
                                    <p className="font-extralight">{interviewerDetails.university || "N/A"}</p>
                                </div>
                                <div className="flex space-x-5">
                                    <label className="font-extralight"> Organization: </label>
                                    <p className="font-extralight">{interviewerDetails.organization || "N/A"}</p>
                                </div>
                                <div className="flex space-x-5">
                                    <label className="font-extralight"> Introduction: </label>
                                    <p className="font-extralight">{interviewerDetails.introduction || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SideBar>
        </div>
    );
}

export default AdminInterviewerDetails;
