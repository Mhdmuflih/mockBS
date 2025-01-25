import { useEffect, useState } from "react";
import SideBar from "../../../components/Candidate/SideBar";
import { fetchCandidateProfileData } from "../../../Services/candidateService";

const CandidateProfile = () => {
    // State to store the candidate data
    const [candidateData, setCandidateData] = useState<any>(null);

    useEffect(() => {
        const takeProfileData = async () => {
            try {
                const response: any = await fetchCandidateProfileData();
                if (response.success) {
                    setCandidateData(response.candidateData); // Update state with fetched data
                } else {
                    console.log("Failed to fetch candidate profile data.");
                }
            } catch (error: any) {
                console.log("Error fetching data:", error.message);
            }
        };
        takeProfileData();
    }, []);

    return (
        <div>
            <SideBar heading="Profile">
                <div className="bg-[#30323A] ml-1 p-4 rounded-b-lg shadow-md h-[426px]">
                    {/* Profile content */}
                    <div className="flex space-x-28 ml-7 mt- w-[980px]">
                        <div className="">
                            <img src={candidateData?.profilePicture || ""} alt="Profile" className="rounded-full w-24 h-24 object-cover" />
                        </div>
                    </div>
                    
                    <div className="mt-10">
                        <h2 className="text-white font-medium">Full Name :</h2>
                        <h1 className="text-white font-semibold ml-14 mt-1">
                            {candidateData?.name || "Loading..."}
                        </h1>
                    </div>

                    <div className="mt-4">
                        <h2 className="text-white font-medium">Mobile :</h2>
                        <h1 className="text-white font-semibold ml-14 mt-1">
                            {candidateData?.mobile || "Loading..."}
                        </h1>
                    </div>

                    <div className="mt-4">
                        <h2 className="text-white font-medium">Email :</h2>
                        <h1 className="text-white font-semibold ml-14 mt-1">
                            {candidateData?.email || "Loading..."}
                        </h1>
                    </div>
                </div>
            </SideBar>
        </div>
    );
};

export default CandidateProfile;
