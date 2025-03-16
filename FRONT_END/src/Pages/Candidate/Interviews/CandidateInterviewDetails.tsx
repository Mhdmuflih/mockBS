import { useEffect, useState } from "react";
import SideBar from "../../../components/Candidate/SideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { getInterviewerDetails } from "../../../Services/candidateService";
import backgroundImage from "../../../assets/interivewsDetails background image.jpeg";

// import { v4 as uuidv4 } from "uuid";

const CandidateInterviewDetails = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [detailsData, setDetailsData] = useState<any>(null);

    useEffect(() => {

        if (!location.state || !location.state.detailsData) {
            console.error("Location state is missing interview details");
            return;
        }

        const { detailsData } = location.state;
        const interviewerId = detailsData.interviewerId
        // console.log(detailsData._id            , 'this is details data')

        if (!interviewerId) {
            console.error("Interviewer ID is missing");
            return;
        }

        const fetchInterviewerDetails = async () => {
            try {
                const response: any = await getInterviewerDetails(interviewerId);
                if (response.success) {
                    const formattedData = {
                        slotData: detailsData,
                        interviewerData: response.interviewerData
                    }
                    console.log(formattedData, 'this is formatted data')
                    setDetailsData(formattedData);
                } else {
                    console.log("not ok not ok");
                }
            } catch (error: any) {
                console.log("error occure in fetch interviewer details", error.message);
            }
        }
        fetchInterviewerDetails();
    }, []);


    const handleToJoin = (scheduleId: string) => {
        console.log(scheduleId)
        navigate(`/candidate/video-call/${scheduleId}`);

        // const roomId = uuidv4();
        // console.log(roomId ,' this is for the video room id');
        // navigate(`/candidate/video-call/${roomId}`);
    }

    return (
        <>
            <SideBar heading="Interview Details">
                <div className="bg-[#30323A] ml-1 p-4 rounded-b-lg shadow-md h-[439px]">
                    {detailsData && (
                        <div className="bg-white p-8 mt-3 rounded-2xl">
                            {/* Grid Layout for Proper Alignment */}
                            <div className="grid grid-cols-3 gap-10 items-start">

                                {/* Left Section: Interviewer Details */}
                                <div className="flex flex-col items-center text-center">
                                    <img src={detailsData.interviewerData.profileURL} alt="" className="w-20 h-20 rounded-full" />
                                    <p className="font-serif mt-2 text-lg font-bold">{detailsData.interviewerData.name}</p>
                                    <p className="font-serif mt-2 text-sm">
                                        Experience: <span className="font-bold">{detailsData.interviewerData.yearOfExperience} year</span>
                                    </p>
                                    <p className="font-serif mt-2 text-sm">
                                        Designation: <span className="font-bold">{detailsData.interviewerData.currentDesignation}</span>
                                    </p>
                                    <p className="font-serif mt-2 text-sm">
                                        Organization: <span className="font-bold">{detailsData.interviewerData.organization}</span>
                                    </p>
                                </div>


                                {/* Middle Section: Slot Details */}
                                <div className="flex flex-col space-y-3">
                                    <div className="flex flex-col items-center text-center mt-28">
                                        <p className="font-serif mt-2 text-sm">
                                            Stack: <span className="font-bold">{detailsData.slotData.scheduledSlot.stack}</span>
                                        </p>
                                        <p className="font-serif mt-2 text-sm">
                                            Technology: <span className="font-bold">{detailsData.slotData.scheduledSlot.technology}</span>
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
                                <button className="bg-[#4B4F60] p-2 px-40 rounded-2xl ml-36" onClick={() => handleToJoin(detailsData.slotData.scheduleId)}>JOIN</button>
                            </div>


                        </div>
                    )}
                </div>
            </SideBar>
        </>
    )
}

export default CandidateInterviewDetails;
