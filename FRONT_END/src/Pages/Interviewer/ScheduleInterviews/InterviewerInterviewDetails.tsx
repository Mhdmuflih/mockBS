import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../../../components/Interviewer/Sidebar";
import { useEffect, useState } from "react";
import { addFeedback, getCandidateDetails } from "../../../Services/interviewerService";
import backgroundImage from "../../../assets/interivewsDetails background image.jpeg";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
// // import PageLoading from "../../../components/PageLoading";


const InterviewerInterviewDetails = () => {

    // const [isLoading, setIsLoading] = useState<boolean>(true);
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


    useEffect(() => {

        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 2000);

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

    // if (isLoading) {
    //     return <div><PageLoading /></div>
    // }

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
                }else {
                    setIsModal(false);
                    toast.error(response.message);
                }
            }
        } catch (error: any) {
            toast.error(error?.message || "An unexpected error occurred. Please try again later.");
        }
    }

    return (
        <>
            <SideBar heading="Interview Details">
                <Toaster position="top-right" />

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

            </SideBar>
        </>
    )
}

export default InterviewerInterviewDetails;
