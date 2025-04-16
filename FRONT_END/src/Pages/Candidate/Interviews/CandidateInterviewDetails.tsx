import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Candidate/SideBar";
import { Location, NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { addInterviewRating, fetchFeedBack, getInterviewerDetails } from "../../../Services/candidateService";
import backgroundImage from "../../../assets/interivewsDetails background image.jpeg";
import { FaStar } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { IInterviewer, IScheduled } from "../../../Interface/candidateInterfaces/interface";
import { ICandidateGetInterviewerDetails, ISuccess } from "../../../Interface/candidateInterfaces/IApiResponce";
import { Types } from "mongoose";

export interface IInterviewerDetails {
    slotData: IScheduled,
    interviewerData: IInterviewer
}


const CandidateInterviewDetails: React.FC = () => {

    const navigate: NavigateFunction = useNavigate();
    const location = useLocation();
    const [detailsData, setDetailsData] = useState<IInterviewerDetails | null>(null);
    const [isModal, setIsModal] = useState<boolean>(false);
    const [feedbackData, setFeedbackData] = useState<any>(null);
    const [isFetchingFeedback, setIsFetchingFeedback] = useState<boolean>(false);
    const [isAddRating, setIsAddRating] = useState<boolean>(false);

    useEffect(() => {
        if (!location.state) {
            console.error("Location state is missing interview details");
            return;
        }

        const detailsData = location.state.detailsData;
        const interviewerId = detailsData.interviewerId;

        if (!interviewerId) {
            console.error("Interviewer ID is missing");
            return;
        }


        const fetchInterviewerDetails = async (): Promise<void> => {
            try {
                console.log(detailsData, 'this is detials data')
                const response: ICandidateGetInterviewerDetails = await getInterviewerDetails(interviewerId);
                if (response.success) {

                    setDetailsData({
                        slotData: detailsData,
                        interviewerData: response.interviewerData
                    });
                }
            } catch (error: unknown) {
                error instanceof Error ? console.log("Error fetching data:", error.message) : console.log("An unknown error occurred.");
            }
        };
        fetchInterviewerDetails();
    }, []);

    const handleToJoin = (scheduleId: Types.ObjectId) => {
        navigate(`/candidate/video-call/${scheduleId}`);
    };


    // view Feedback
    // ======================================================================================
    const handleToViewFeedback = async () => {
        setIsFetchingFeedback(true);
        try {
            const slotId: string | undefined = detailsData?.slotData?._id.toString(); // Ensure slotId is extracted properly
            const scheduledId: string | undefined = detailsData?.slotData?.scheduleId?.toString();

            if (!slotId || !scheduledId) {
                console.error("Missing slotId or scheduledId");
                return;
            }
            const response: any = await fetchFeedBack(slotId, scheduledId);
            if (response.success) {
                setFeedbackData(response.feedbackData);
                setIsModal(true); // Show modal only after fetching data
            } else {
                console.log("Failed to fetch feedback");
            }
        } catch (error: any) {
            console.error("Error fetching feedback", error.message);
        } finally {
            setIsFetchingFeedback(false);
        }
    };


    const handleCloseModal = () => {
        setIsModal(false);
    }

    // Function to dynamically set color based on feedback value
    const getColor = (value: string | undefined) => {
        switch (value?.toLowerCase()) {
            case "poor":
                return "text-red-600";
            case "fair":
                return "text-yellow-600 ";
            case "average":
                return "text-blue-600";
            case "good":
                return "text-green-600 ";
            default:
                return "text-gray-600 ";
        }
    };
    // ======================================================================================

    const [ratings, setRatings] = useState<number>(0);
    const [comment, setComment] = useState<string>("");

    // Handle rating selection
    const handleRating = (starCount: number) => {
        setRatings(starCount);
    };

    // Handle form submission
    const handleSubmit = async (): Promise<void> => {
        try {
            const interviewerId: string = detailsData?.interviewerData?._id?.toString() || "";
            const scheduledId: string = detailsData?.slotData?.scheduleId?.toString() || "";
            const slotId: string = detailsData?.slotData?._id?.toString() || "";

            if (!interviewerId || !scheduledId || !slotId) {
                toast.error("Missing required review details.");
                return;
            }

            const reviewData: { interviewerId: string; scheduledId: string; slotId: string; ratings: number; comment: string; } = {
                interviewerId,
                scheduledId,
                slotId,
                ratings,
                comment
            }


            const response: ISuccess = await addInterviewRating(reviewData);
            console.log(response)
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
            setIsAddRating(false);
            setRatings(0);
            setComment("");
        } catch (error: unknown) {
            error instanceof Error ? toast.error(error.message) : toast.error("An unknown error occurred.");
            onClose();
        }

    };

    const onClose = (): void => {
        setIsAddRating(false);
        setRatings(0);
        setComment("");
    }

    const handleToAddRating = (): void => {
        setIsAddRating(true);
    }

    return (
        <SideBar heading="Interview Details">

            <Toaster position="top-right" reverseOrder={false} />


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
                                <div className="mt-5 space-x-4">
                                    <button className="bg-gray-800 text-white py-2 px-4 rounded-2xl" onClick={handleToViewFeedback}>view feedback</button>
                                    <button className="bg-gray-800 text-white py-2 px-4 rounded-2xl" onClick={handleToAddRating}>add rating</button>
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

                        {detailsData.slotData.status === "pending" && (
                            <div className="flex justify-center mt-6">
                                <button className="bg-[#4B4F60] text-white py-2 px-10 rounded-2xl" onClick={() => handleToJoin(detailsData.slotData.scheduleId)}>JOIN</button>
                            </div>
                        )}

                    </div>
                )}
            </div>

            {isModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 transition-opacity duration-300">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl text-black transform scale-100 transition-transform duration-300">
                        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Interview Feedback</h2>

                        {isFetchingFeedback ? (
                            <p className="text-center text-gray-600 animate-pulse">Loading feedback...</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div className="p-4 bg-gray-100 rounded-lg">
                                        <h3 className="text-lg  text-gray-700">Technical Skill</h3>
                                        <p className={`font-semibold ${getColor(feedbackData?.technology)}`}>
                                            {feedbackData?.technology || "N/A"}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-100 rounded-lg">
                                        <h3 className="text-lg  text-gray-700">Problem Solving</h3>
                                        <p className={`font-semibold ${getColor(feedbackData?.problemSolving)}`}>
                                            {feedbackData?.problemSolving || "N/A"}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="p-4 bg-gray-100 rounded-lg">
                                        <h3 className="text-lg text-gray-700">Communication Skill</h3>
                                        <p className={`font-semibold ${getColor(feedbackData?.communication)}`}>
                                            {feedbackData?.communication || "N/A"}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-100 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-700">Comments</h3>
                                        <p className="text-gray-900 ">{feedbackData?.commants || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end mt-6 gap-4">
                            <button
                                className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg transition duration-200"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isAddRating && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg transition-all duration-300">
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Submit Your Review</h2>

                        {/* Interview Rating Section */}
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Interview Rating</h3>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        className={`text-2xl cursor-pointer ${ratings >= star ? "text-yellow-400" : "text-gray-300"}`}
                                        onClick={() => handleRating(star)}
                                    />
                                ))}
                            </div>
                        </div>


                        {/* Comment Section */}
                        <textarea
                            className="w-full border rounded-lg p-3 mt-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows={4}
                            placeholder="Write your feedback here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        {/* Buttons */}
                        <div className="flex justify-end mt-6 gap-4">
                            <button
                                className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg transition duration-200"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition duration-200"
                                onClick={handleSubmit}
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </SideBar>
    );
};

export default CandidateInterviewDetails;
