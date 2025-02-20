import { useEffect, useState } from "react";
import SideBar from "../../../components/Candidate/SideBar";
import { bookingInterviewer, interviewerSlotDetails } from "../../../Services/candidateService";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// import toast from "react-hot-toast"
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const SearchedInterviewerDetails = () => {

    const navigate = useNavigate();
    const { interviewerId } = useParams<{ interviewerId: string }>();
    const location = useLocation();
    const [slotData, setSlotData] = useState<any[]>([]);
    const [interviewer, setInterviewer] = useState<any | null>(null);

    const searchParams = new URLSearchParams(location.search);
    const selectedTech = searchParams.get("selectedTech") || "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!interviewerId || !selectedTech) return;

                const response: any = await interviewerSlotDetails(interviewerId, selectedTech);
                if (response.success) {

                    const formattedData = response.slotData
                        .map((slot: any) =>
                            slot.slots.flatMap((slotDetail: any) =>
                                slotDetail.schedules.map((schedule: any) => ({
                                    stack: slot.stack.stackName,
                                    technology: slot.stack.technologies,
                                    date: new Date(slotDetail.date).toISOString().split('T')[0],
                                    from: schedule.fromTime,   // Loop through each schedule
                                    to: schedule.toTime,
                                    title: schedule.title || "N/A",
                                    price: schedule.price || "N/A",
                                    description: schedule.description || "N/A",
                                    status: schedule.status,
                                    scheduleId: schedule._id,
                                    slotId: slotDetail._id
                                }))
                            )
                        ).flat();
                    setSlotData(formattedData);

                    console.log(response.slotData, "slotData");
                    console.log(response.interviewerData, 'this is interviewerData')
                    // if (
                    //     response.slotData &&
                    //     Array.isArray(response.slotData) &&
                    //     response.slotData.length > 0 &&
                    //     Array.isArray(response.slotData[0]) &&
                    //     response.slotData[0].length > 0
                    // ) {
                    //     const slotDetails = response.slotData[0][0].slots || [];
                    //     setSlotData(slotDetails);
                    // } else {
                    //     setSlotData([]); // No slots available
                    // }

                    // setSlotData(response.slotData[0]); // Ensure it's an array
                    setInterviewer(response.interviewerData); // Set interviewer details
                } else {
                    console.log("not ready not ready");
                }
            } catch (error: any) {
                console.log("Error fetching data:", error.message);
            }
        }
        fetchData();
    }, [interviewerId, selectedTech]);

    { console.log(slotData, 'this is slot data in state') }

    const handleToBooking = async (scheduledData: any) => {
        try {
            console.log(scheduledData, 'this is slot data ');
            console.log(interviewerId, ' this is interviewer Id');
            const slotData = {
                scheduledSlot: scheduledData,
                interviewerId: interviewerId
            }
            const response: any = await bookingInterviewer(slotData);

            if (response.success) {
                console.log('Booking successful');
                Swal.fire({
                    title: "Success!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate("/candidate/home"); // Navigate after clicking OK
                });
            } else {
                console.log("Booking failed");
                Swal.fire({
                    title: "Error!",
                    text: response.message,
                    icon: "error",
                    confirmButtonText: "Try Again",
                });
            }
        } catch (error: any) {
            console.log(error.message);
            Swal.fire({
                title: "Unexpected Error",
                text: error?.message || "An unexpected error occurred. Please try again later.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <SideBar heading="Book Your Slot">

            <Toaster position="top-right" reverseOrder={false} />

            <div className="bg-[#30323A] ml-1 p-4 rounded-b-lg shadow-md h-auto min-h-[426px]">
                <div className="flex flex-col lg:flex-row justify-between gap-4">

                    {/* Table Section */}
                    <div className="bg-white w-full lg:w-[700px] rounded-lg p-4 overflow-y-auto max-h-[380px]">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-200 sticky top-0">
                                <tr>
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Time (From & To)</th>
                                    <th className="px-4 py-2">Domain</th>
                                    <th className="px-4 py-2">Price</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {slotData.length > 0 ? (
                                    slotData.map((slot: any, index: number) => (
                                        <tr key={index} className="bg-gray-100">
                                            <td className="px-4 py-2">
                                                {slot?.date ? new Date(slot.date).toLocaleDateString() : "N/A"}
                                            </td>
                                            <td className="px-4 py-2">{slot.from} - {slot.to}</td>
                                            <td className="px-4 py-2">{slot.technology || "N/A"}</td>
                                            <td className="px-4 py-2">${slot.price || "N/A"}</td>
                                            {slot.status === "open" ? (
                                                <>
                                                    <td className="px-4 py-2 font-semibold text-green-600">Available</td>
                                                    <td>
                                                        <button onClick={() => handleToBooking(slot)} className="bg-black text-white px-2 py-1 rounded"> BookNow </button>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="px-4 py-2 font-semibold text-red-600">Unavailable</td>
                                                    <td>
                                                        <button disabled className="bg-gray-400 text-white px-2 py-1 rounded cursor-not-allowed"> Booked </button>
                                                    </td>
                                                </>
                                            )}

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-2 text-center">No interview slots available</td>
                                    </tr>
                                )}
                            </tbody>



                        </table>
                    </div>

                    {/* Profile Section */}
                    <div className="bg-white w-full lg:w-[300px] rounded-lg p-4 flex flex-col items-center text-center">
                        <img src={interviewer?.profileURL || ""} alt="profileImage" className="w-24 h-24 rounded-full" />
                        <h1 className="mt-2 text-lg font-semibold">{interviewer?.name || "N/A"}</h1>
                        <h2 className="text-gray-600">Designation: {interviewer?.currentDesignation || "N/A"}</h2>
                        <h2 className="text-gray-600">Organization: {interviewer?.organization || "N/A"}</h2>
                        <h2 className="text-gray-600">Experience: {interviewer?.yearOfExperience || 0} Years</h2>
                        <button className="bg-[#4B4F60] text-white p-3 w-full mt-4 hover:bg-black duration-300">
                            Expert in {selectedTech}
                        </button>
                    </div>

                </div>
            </div>
        </SideBar>
    );

};

export default SearchedInterviewerDetails;
