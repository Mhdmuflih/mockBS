import { useDispatch } from "react-redux";
import SideBar from "../../../components/Interviewer/Sidebar";
import { logout } from "../../../Store/Slice/InterviewerSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchInterviewerProfileData } from "../../../Services/interviewerService";

const InterviewerProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [interviewer, setInterviewer] = useState<any>(null);

    useEffect(() => {
        const takeProfileData = async () => {
            try {
                const response: any = await fetchInterviewerProfileData();
                if (response.success) {
                    setInterviewer(response.interviewerData); // Update state with fetched data
                } else {
                    console.log("Failed to fetch candidate profile data.");
                }
            } catch (error: any) {
                console.log("Error fetching data:", error.message);
            }
        };
        takeProfileData();
    }, []);

    const handleToLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    // Ensure interviewer data is not null before accessing properties
    if (!interviewer) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <SideBar handleToLogout={handleToLogout} heading="Profile">
                <div className="bg-[#30323A] ml-1 p-3 rounded-b-lg shadow-md max-h-[73vh] overflow-y-auto">
                    {!interviewer.isApproved ? (
                        <div>
                            <h1 className="text-[#FF0000] font-extrabold text-lg">
                                Access to the website is only granted upon approval by the administrator! Please Wait..
                            </h1>
                        </div>
                    ) : (
                        <div className="flex flex-col ml-7 mt-4 space-y-4">
                            {/* Profile Image and Info aligned */}
                            <div className="flex items-start space-x-4">
                                {/* Profile Picture */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={interviewer?.profilePicture || "/default-profile.jpg"}
                                        alt="Profile"
                                        className="rounded-full w-20 h-20 object-cover"
                                    />
                                </div>

                                {/* Profile Info */}
                                <div className="flex flex-col justify-start space-y-2">
                                    {/* Name */}
                                    <div>
                                        <h2 className="font-medium  text-sm">Full Name:</h2>
                                        <h1 className="font-semibold mt-1 text-gray-300 text-sm">
                                            {interviewer?.name || "Loading..."}
                                        </h1>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <h2 className="font-medium text-sm">Email:</h2>
                                        <h1 className="font-semibold mt-1 text-gray-300 text-sm">
                                            {interviewer?.email || "Loading..."}
                                        </h1>
                                    </div>

                                    {/* Mobile */}
                                    <div>
                                        <h2 className="font-medium text-sm">Mobile:</h2>
                                        <h1 className="font-semibold mt-1 text-gray-300 text-sm">
                                            {interviewer?.mobile || "Loading..."}
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            {/* Current Designation */}
                            <div>
                                <h2 className="font-medium text-sm">Current Designation:</h2>
                                <p className="font-semibold mt-1 text-gray-300 text-sm">
                                    {interviewer?.currentDesignation || "Not Provided"}
                                </p>
                            </div>

                            {/* Introduction */}
                            <div>
                                <h2 className="font-medium text-sm">Introduction:</h2>
                                <p className="font-semibold mt-1 text-gray-300 text-sm">
                                    {interviewer?.introduction || "No introduction provided."}
                                </p>
                            </div>

                            {/* Year of Experience */}
                            <div>
                                <h2 className="font-medium text-sm">Year of Experience:</h2>
                                <p className="font-semibold mt-1 text-gray-300 text-sm">
                                    {interviewer?.yearOfExperience || "Not Provided"}
                                </p>
                            </div>

                            {/* Additional Information */}
                            <div>
                                <h2 className="font-medium  text-sm">University:</h2>
                                <p className="font-semibold mt-1 text-gray-300 text-sm">
                                    {interviewer?.university || "Not Provided"}
                                </p>
                            </div>

                            <div>
                                <h2 className="font-medium  text-sm">Organization:</h2>
                                <p className="font-semibold mt-1 text-gray-300 text-sm">
                                    {interviewer?.organization || "Not Provided"}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </SideBar>
        </>
    );
}

export default InterviewerProfile;
