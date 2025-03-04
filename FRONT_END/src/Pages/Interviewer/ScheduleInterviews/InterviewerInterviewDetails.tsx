import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../../../components/Interviewer/Sidebar";
import { useEffect, useState } from "react";
import { getCandidateDetails } from "../../../Services/interviewerService";
import backgroundImage from "../../../assets/interivewsDetails background image.jpeg";


const InterviewerInterviewDetails = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [detailsData, setDetailsData] = useState<any>(null);

    useEffect(() => {

        if (!location.state || !location.state.detailsData) {
            console.error("Location state is missing interview details");
            return;
        }

        const { detailsData } = location.state;
        const candidateId = location.state.detailsData.candidateId;

        if (!candidateId) {
            console.error("candidateId ID is missing");
            return;
        }

        const fetchCandidateDetails = async () => {
            try {
                const response: any = await getCandidateDetails(candidateId);
                // console.log(response.candidateData, 'this is for the candidat data');
                if (response.success) {
                    const formattedData = {
                        slotData: detailsData,
                        candidateData: response.candidateData
                    }
                    console.log(formattedData, 'this is for the candidat data');
                    setDetailsData(formattedData);
                } else {
                    console.log("not ok not ok")
                }
            } catch (error: any) {
                console.log("error occur in fetch candidateData", error.message);
            }
        }
        fetchCandidateDetails()
    }, []);


    const handleToJoin = () => {
        navigate('/interviewer/video-call');
    }

    return (
        <>
            <SideBar heading="Interview Details">
                <div className="bg-[#30323A] ml-1 p-3 rounded-b-lg shadow-md h-[73vh] ">
                    {detailsData && (
                        <div className="bg-white p-8 mt-1 rounded-2xl">
                            {/* Grid Layout for Proper Alignment */}
                            <div className="grid grid-cols-3 gap-10 items-start">

                                {/* Left Section: Interviewer Details */}
                                <div className="flex flex-col items-center text-center">
                                    <img src={detailsData.candidateData.profileURL} alt="" className="w-20 h-20 rounded-full" />
                                    <p className="font-serif mt-2 text-lg font-bold">{detailsData.candidateData.name}</p>
                                    <p className="font-serif mt-2 text-sm">
                                        Experience: <span className="font-bold">{detailsData.candidateData.yearOfExperience} year</span>
                                    </p>
                                    <p className="font-serif mt-2 text-sm">
                                        Designation: <span className="font-bold">{detailsData.candidateData.currentDesignation}</span>
                                    </p>
                                    <p className="font-serif mt-2 text-sm">
                                        Organization: <span className="font-bold">{detailsData.candidateData.organization}</span>
                                    </p>
                                </div>


                                {/* Middle Section: Slot Details */}
                                <div className="flex flex-col space-y-3">
                                    <div className="flex flex-col items-center text-center mt-28">
                                        <p className="font-serif mt-2 text-sm">
                                            Stack: <span className="font-bold">{detailsData.slotData.stack}</span>
                                        </p>
                                        <p className="font-serif mt-2 text-sm">
                                            Technology: <span className="font-bold">{detailsData.slotData.technology}</span>
                                        </p>
                                        <p className="font-serif mt-2 text-sm">
                                            Status: <span className={`font-bold ${detailsData.slotData.status === "pending" ? "text-red-600" : "text-green-600"}`}>{detailsData.slotData.status}</span>
                                        </p>
                                    </div>
                                </div>


                                {/* Right Section: Background Image */}
                                <div className="flex justify-center">
                                    <img src={backgroundImage} alt="" className="w-80 rounded-lg " />
                                </div>

                            </div>
                            <div>
                                <button className="bg-[#4B4F60] p-2 px-40 rounded-2xl ml-36" onClick={() => handleToJoin()}>JOIN</button>
                            </div>


                        </div>
                    )}
                </div>
            </SideBar>
        </>
    )
}

export default InterviewerInterviewDetails;
