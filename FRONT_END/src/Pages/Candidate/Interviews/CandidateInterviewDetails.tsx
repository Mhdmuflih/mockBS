import { useEffect, useState } from "react";
import SideBar from "../../../components/Candidate/SideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { getInterviewerDetails } from "../../../Services/candidateService";
import backgroundImage from "../../../assets/interivewsDetails background image.jpeg";
// import PageLoading from "../../../components/PageLoading";

const CandidateInterviewDetails = () => {
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [detailsData, setDetailsData] = useState<any>(null);
    const [isModal, setIsModal] = useState(false);

    useEffect(() => {
        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 2000);

        if (!location.state || !location.state.detailsData) {
            console.error("Location state is missing interview details");
            return;
        }

        const { detailsData } = location.state;
        const interviewerId = detailsData.interviewerId;

        if (!interviewerId) {
            console.error("Interviewer ID is missing");
            return;
        }

        const fetchInterviewerDetails = async () => {
            try {
                const response: any = await getInterviewerDetails(interviewerId);
                if (response.success) {
                    setDetailsData({
                        slotData: detailsData,
                        interviewerData: response.interviewerData
                    });
                }
            } catch (error: any) {
                console.error("Error fetching interviewer details", error.message);
            }
        };
        fetchInterviewerDetails();
    }, []);

    // if (isLoading) {
    //     return <PageLoading />;
    // }

    const handleToJoin = (scheduleId: string) => {
        navigate(`/candidate/video-call/${scheduleId}`);
    };

    const handleToAddFeedback = () => {
        setIsModal(true);
    }

    const handleCloseModal = () => {
        setIsModal(false);
    }


    return (
        <SideBar heading="Interview Details">
            <div className="bg-gray-200 p-4 shadow-md min-h-screen flex justify-center">
                {detailsData && (
                    <div className="bg-white p-6 mt-3 rounded-2xl w-full max-w-4xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
                            {/* Interviewer Details */}
                            <div className="flex flex-col items-center">
                                <img src={detailsData.interviewerData.profileURL} alt="" className="w-20 h-20 rounded-full" />
                                <p className="font-serif mt-2 text-lg font-bold">{detailsData.interviewerData.name}</p>
                                <p className="text-sm">Experience: <span className="font-bold">{detailsData.interviewerData.yearOfExperience} years</span></p>
                                <p className="text-sm">Designation: <span className="font-bold">{detailsData.interviewerData.currentDesignation}</span></p>
                                <p className="text-sm">Organization: <span className="font-bold">{detailsData.interviewerData.organization}</span></p>
                                <div className="mt-5">
                                    <button className="bg-gray-800 text-white py-2 px-4 rounded-2xl" onClick={handleToAddFeedback}>add feedback</button>
                                </div>
                            </div>

                            {/* Slot Details */}
                            <div className="flex flex-col items-center">
                                <p className="text-sm">Stack: <span className="font-bold">{detailsData.slotData.scheduledSlot.stack}</span></p>
                                <p className="text-sm">Technology: <span className="font-bold">{detailsData.slotData.scheduledSlot.technology}</span></p>
                                <p className="text-sm">Status: <span className={`font-bold ${detailsData.slotData.status === "pending" ? "text-red-600" : "text-green-600"}`}>{detailsData.slotData.status}</span></p>
                            </div>

                            {/* Background Image */}
                            <div className="flex justify-center">
                                <img src={backgroundImage} alt="" className="w-60 md:w-80 rounded-lg" />
                            </div>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button className="bg-[#4B4F60] text-white py-2 px-10 rounded-2xl" onClick={() => handleToJoin(detailsData.slotData.scheduleId)}>JOIN</button>
                        </div>
                    </div>
                )}
            </div>

            {isModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl text-black">
                            <h2 className="text-xl font-semibold mb-4 text-center">Interview Feedback</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Technical Skill */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Technical Skill</h3>

                                    <h3 className="text-lg font-semibold mb-2">Problem Solving</h3>
                                    <h3 className="text-lg font-semibold mb-2">Communication Skill</h3>
                                </div>
                            </div>

                            {/* Additional Comments */}
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-2">Additional Comments</h3>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end mt-6 gap-4">
                                <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

        </SideBar>
    );
};

export default CandidateInterviewDetails;
