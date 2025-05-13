import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../../../components/Interviewer/Sidebar";
import { useEffect, useState } from "react";
import { addFeedback, fetchReviewRating, getCandidateDetails } from "../../../Services/interviewerService";
import backgroundImage from "../../../assets/interivewsDetails background image.jpeg";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const InterviewerInterviewDetails = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [detailsData, setDetailsData] = useState<any>(null);

    const [isModal, setIsModal] = useState(false);
    const [feedbackData, setFeedbackData] = useState({
        tech: "",
        problem: "",
        communication: "",
        comments: "",
    });

    const [isViewModal, setIsViewModal] = useState<boolean>(false);
    const [ratingData, setRatingData] = useState<any>(null);
    const [isFetchingData, setIsFetchingData] = useState(false);


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
                // console.log(response, 'this is for the candidat data');
                if (response.success) {
                    const formattedData = {
                        slotData: detailsData,
                        candidateData: response.candidateData
                    }
                    console.log(formattedData, 'this is for the formatted data');
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFeedbackData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleToJoin = (scheduleId: string) => {
        console.log(scheduleId, 'this is scheduled Id')
        navigate(`/interviewer/video-call/${scheduleId}`);
    }

    // add feedback
    // =============================================================================
    const handleToAddFeedback = () => {
        setIsModal(true);
    }

    const handleCloseModal = () => {
        setIsModal(false)
    }

    const handleFeedbackSubmit = async () => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Do you want to submit the feedback?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, submit it!",
                cancelButtonText: "No, cancel",
            });
            if (result.isConfirmed) {
                const response: any = await addFeedback(feedbackData, detailsData);
                if (response.success) {
                    setIsModal(false)
                    toast.success(response.message)
                } else {
                    setIsModal(false);
                    toast.error(response.message);
                }
            }
        } catch (error: any) {
            toast.error(error?.message || "An unexpected error occurred. Please try again later.");
        }
    }
    // =============================================================================

    const handleToViewFeedback = async () => {
        setIsViewModal(true);
        setIsFetchingData(true);
        try {
            console.log(detailsData)
            const slotId = detailsData?.slotData?._id; // Ensure slotId is extracted properly
            const scheduledId = detailsData.slotData.scheduledId; // Ensure scheduledId is extracted properly

            if (!slotId || !scheduledId) {
                console.error("Missing slotId or scheduledId");
                return;
            }
            const response: any = await fetchReviewRating(slotId, scheduledId);
            if (response.success) {
                console.log(response.reviewRating, 'this is response of tghe review rating');
                setRatingData(response.reviewRating)
                setIsViewModal(true);
            } else {
                console.log("Failed to fetch feedback");
            }
        } catch (error: any) {
            console.error("Error fetching feedback", error.message);
        } finally {
            setIsFetchingData(false);
        }
    }

    const handleClose = () => {
        setIsViewModal(false);
    }

    return (
        <>
            <SideBar heading="Interview Details">
                <Toaster position="top-right" />

                {detailsData?.slotData?.status === "cancelled" ? (
                    <>
                        <div className="bg-gray-200 p-4 shadow-md min-h-screen flex justify-center">
                            <div className="bg-white p-6 mt-3 rounded-2xl w-full max-w-4xl text-center">
                                <p className="text-red-500 text-xl font-semibold">This interview has been cancelled.</p>
                                <h1 className="mt-4 text-lg font-medium">
                                    Reason: <span className="font-normal">{detailsData?.slotData?.cancelReason || "No reason provided."}</span>
                                </h1>
                            </div>
                        </div>
                    </>

                ) : (

                    <div className={`bg-[#30323A] p-4 shadow-md min-h-screen flex justify-center transition-all duration-300 ${isModal ? "blur-sm" : ""}`}>
                        {detailsData && (
                            <div className="bg-white p-6 mt-3 rounded-2xl w-full h-[450px] md:max-w-2xl ">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
                                    {/* Interviewer Details */}
                                    <div className="flex flex-col items-center">
                                        <img src={detailsData.candidateData.profileURL} alt="" className="w-20 h-20 rounded-full" />
                                        <p className="font-serif mt-2 text-lg font-bold">{detailsData.candidateData.name}</p>
                                        <p className="text-sm">Email: <span className="font-bold">{detailsData.candidateData.email}</span></p>
                                        <p className="text-sm">Mobile: <span className="font-bold">{detailsData.candidateData.mobile}</span></p>
                                        <div className="mt-5">
                                            <button className="bg-gray-800 text-white py-2 px-4 rounded-2xl" onClick={handleToAddFeedback}>add feedback</button>
                                            <button className="bg-gray-800 text-white py-2 px-4 rounded-2xl" onClick={handleToViewFeedback}>view</button>
                                        </div>
                                    </div>

                                    {/* Slot Details */}
                                    <div className="flex flex-col items-center">
                                        <p className="text-sm">Stack: <span className="font-bold">{detailsData.slotData.stack}</span></p>
                                        <p className="text-sm">Technology: <span className="font-bold">{detailsData.slotData.technology}</span></p>
                                        <p className="text-sm">Status: <span className={`font-bold ${detailsData.slotData.status === "pending" ? "text-red-600" : "text-green-600"}`}>{detailsData.slotData.status}</span></p>
                                    </div>

                                    {/* Background Image */}
                                    <div className="flex justify-center">
                                        <img src={backgroundImage} alt="" className="w-32 md:w-80 rounded-lg" />
                                    </div>
                                </div>

                                <div className="flex justify-center md:mt-10">
                                    <button className="bg-[#4B4F60] text-white py-2 px-32 rounded-2xl" onClick={() => handleToJoin(detailsData.slotData.scheduledId)}>JOIN</button>
                                </div>


                            </div>
                        )}
                    </div>
                )} 

                {isModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl text-black">
                            <h2 className="text-xl font-semibold mb-4 text-center">Interview Feedback</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Technical Skill */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Technical Skill</h3>
                                    <div className="flex justify-between">
                                        <label className="cursor-pointer"><input type="radio" name="tech" value="Poor" onChange={handleChange} /> Poor</label>
                                        <label className="cursor-pointer"><input type="radio" name="tech" value="Fair" onChange={handleChange} /> Fair</label>
                                        <label className="cursor-pointer"><input type="radio" name="tech" value="Average" onChange={handleChange} /> Average</label>
                                        <label className="cursor-pointer"><input type="radio" name="tech" value="Good" onChange={handleChange} /> Good</label>
                                    </div>
                                </div>

                                {/* Problem Solving */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Problem Solving</h3>
                                    <div className="flex justify-between">
                                        <label className="cursor-pointer"><input type="radio" name="problem" value="Poor" onChange={handleChange} /> Poor</label>
                                        <label className="cursor-pointer"><input type="radio" name="problem" value="Fair" onChange={handleChange} /> Fair</label>
                                        <label className="cursor-pointer"><input type="radio" name="problem" value="Average" onChange={handleChange} /> Average</label>
                                        <label className="cursor-pointer"><input type="radio" name="problem" value="Good" onChange={handleChange} /> Good</label>
                                    </div>
                                </div>

                                {/* Communication Skill */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Communication Skill</h3>
                                    <div className="flex justify-between">
                                        <label className="cursor-pointer"><input type="radio" name="communication" value="Poor" onChange={handleChange} /> Poor</label>
                                        <label className="cursor-pointer"><input type="radio" name="communication" value="Fair" onChange={handleChange} /> Fair</label>
                                        <label className="cursor-pointer"><input type="radio" name="communication" value="Average" onChange={handleChange} /> Average</label>
                                        <label className="cursor-pointer"><input type="radio" name="communication" value="Good" onChange={handleChange} /> Good</label>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Comments */}
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-2">Additional Comments</h3>
                                <textarea className="w-full border p-2 rounded-md resize-none" rows={4} name="comments" onChange={handleChange} placeholder="Write your feedback here..." ></textarea>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end mt-6 gap-4">
                                <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handleFeedbackSubmit}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {isViewModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl transform transition-all duration-300">
                            {isFetchingData ? (
                                <p className="text-center text-gray-600 animate-pulse">Loading feedback...</p>

                            ) : (
                                <>
                                    {/* Interviewer’s Rating */}
                                    <div className="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-300">
                                        <h3 className="text-lg font-semibold text-yellow-700">Rating</h3>
                                        <div className="flex items-center mt-2">
                                            {ratingData?.ratings ? (
                                                [...Array(5)].map((_, i) => (
                                                    <span key={i} className={`text-2xl ${i < ratingData?.ratings ? 'text-yellow-500' : 'text-gray-300'}`}>
                                                        ★
                                                    </span>
                                                ))
                                            ) : (
                                                <p className="text-gray-700">No rating provided</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Interviewer’s Feedback */}
                                    <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-300">
                                        <h3 className="text-lg font-semibold text-blue-700">Interviewer’s Feedback</h3>
                                        <p className="text-gray-700 italic mt-2">
                                            {ratingData?.comment || "No comments provided"}
                                        </p>
                                    </div>
                                </>
                            )}


                            {/* Action Buttons */}
                            <div className="flex justify-end mt-6 gap-4">
                                <button
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg transition duration-200"
                                    onClick={handleClose}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>

                )}

            </SideBar>
        </>
    )
}

export default InterviewerInterviewDetails;
