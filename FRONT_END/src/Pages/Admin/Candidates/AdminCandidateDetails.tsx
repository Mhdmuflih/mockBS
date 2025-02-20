import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCandidatesDetails } from "../../../Services/adminService";
import SideBar from "../../../components/Admin/SideBar";
import { TiArrowBack } from "react-icons/ti";

const AdminCandidateDetails = () => {

    const navigate = useNavigate();
    const { id } = useParams(); // Access dynamic id from URL
    const [candidateDetails, setCandidateDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!id) {
                console.log("No id provided");
                return; // Early return if id is undefined
            }
            try {
                console.log(id, "Fetching details");
                const response: any = await fetchCandidatesDetails(id);
                if (response.success) {
                    console.log(response.candidateData, "Candidate data fetched successfully");
                    setCandidateDetails(response.candidateData);
                } else {
                    console.log("Failed to fetch details");
                    setCandidateDetails(null); // Set to null if no data found
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

    if (!candidateDetails) {
        return <div>No details found for the selected candidate.</div>;
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <SideBar heading="Details">
                <div className="bg-[#30323A] ml-1 p-4 shadow-md mt-2 h-[476px]">
                <div>
                    <TiArrowBack className="text-white text-2xl cursor-pointer" onClick={() => navigate('/admin/candidates')} />
                </div>
                    <h2 className="text-white text-xl font-semibold mb-4">Candidate Details</h2>


                    {/* Displaying Candidate Details */}
                    <div className="bg-black text-white p-4 rounded-md">
                        <div className="flex items-center mb-4">
                            <img
                                src={candidateDetails.profileURL || "/default-profile.jpg"} // Set a fallback image in case profilePicture is missing
                                alt="Profile"
                                className="rounded-full w-16 h-16 object-cover"
                            />
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold">{candidateDetails.name || "N/A"}</h3>
                                <p>{candidateDetails.email || "N/A"}</p>
                                <p>{candidateDetails.mobile || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SideBar>
        </div>
    );
};

export default AdminCandidateDetails;
