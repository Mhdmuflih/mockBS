import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Candidate/SideBar";
import { interviewerSlotDetails, paymentForBooking } from "../../../Services/candidateService";
import { useLocation, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ISlotInterviewerApiResponse } from "../../../Interface/candidateInterfaces/IApiResponce";
import { IInterviewer, ISchedule, ISlot, ISlotData } from "../../../Interface/candidateInterfaces/interface";

export interface IInterviewerSlotData {
    stack: string;
    technology: string[];
    date: string;
    from: string;
    to: string;
    title: string;
    price: string | number;
    description: string;
    status: string;
    scheduleId: unknown;
    slotId: unknown;
}

const SearchedInterviewerDetails: React.FC = () => {
    
    const { interviewerId } = useParams<{ interviewerId: string | undefined }>();
    const location = useLocation();
    const [slotData, setSlotData] = useState<IInterviewerSlotData[]>([]);
    const [interviewer, setInterviewer] = useState<IInterviewer | null>(null);
    const searchParams: URLSearchParams = new URLSearchParams(location.search);
    const selectedTech: string = searchParams.get("selectedTech") || "";

    useEffect(() => {

        const fetchData = async (): Promise<void> => {
            try {
                if (!interviewerId || !selectedTech) return;
                const response: ISlotInterviewerApiResponse = await interviewerSlotDetails(interviewerId, selectedTech);
                if (response.success) {
                    const formattedData = response.slotData
                        .map((slot: ISlotData) =>
                            slot.slots.flatMap((slotDetail: ISlot) =>
                                slotDetail.schedules.map((schedule: ISchedule) => ({
                                    stack: slot.stack.stackName,
                                    technology: slot.stack.technologies,
                                    date: new Date(slotDetail.date).toISOString().split('T')[0],
                                    from: schedule.fromTime,
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
                    setInterviewer(response.interviewerData);
                }
            } catch (error: unknown) {
                error instanceof Error ? console.log("Error fetching data:", error.message) : console.log("An unknown error occurred.");
            }
        };
        fetchData();
    }, [interviewerId, selectedTech]);

    const handleToBooking = async (scheduledData: IInterviewerSlotData) => {
        try {
            const data = {
                slotId: scheduledData.slotId,
                scheduleId: scheduledData.scheduleId,
                amount: scheduledData.price,
                interviewerId: interviewerId,
                interviewerName: interviewer?.name,
                scheduleData: scheduledData
            };
            const paymentResponse: any = await paymentForBooking(data);
            if (paymentResponse?.session?.url) {
                window.location.href = paymentResponse.session.url;
            } else {
                toast.error(paymentResponse.message);
            }
        } catch (error: unknown) {
            error instanceof Error ? console.log("Error fetching data:", error.message) : console.log("An unknown error occurred.");
        }
    };

    return (
        <SideBar heading="Book Your Slot">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="bg-gray-200 p-4 shadow-md min-h-screen flex flex-col lg:flex-row gap-6">

                {/* Table Section */}
                <div className="bg-white w-full lg:w-3/4 rounded-lg p-4 overflow-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-200 sticky top-0">
                            <tr>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Time</th>
                                <th className="px-4 py-2">Domain</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {slotData.length > 0 ? (
                                slotData.map((slot: IInterviewerSlotData, index: number) => (
                                    <tr key={index} className="bg-gray-100">
                                        <td className="px-4 py-2">{new Date(slot.date).toLocaleDateString()}</td>
                                        <td className="px-4 py-2">{slot.from} - {slot.to}</td>
                                        <td className="px-4 py-2">{slot.technology || "N/A"}</td>
                                        <td className="px-4 py-2">Rs: {slot.price || "N/A"}</td>
                                        <td className={`px-4 py-2 font-semibold ${slot.status === "open" ? "text-green-600" : slot.status === "expired" ? "text-gray-600" : "text-red-600"}`}>
                                            {slot.status === "open" ? "Available" : slot.status === "expired" ? "Expired" : "Booked"}
                                        </td>
                                        <td>
                                            {slot.status === "open" ? (
                                                <button onClick={() => handleToBooking(slot)} className="bg-black text-white px-2 py-1 rounded">
                                                    Book Now
                                                </button>
                                            ) : (
                                                <button disabled className="bg-gray-400 text-white px-2 py-1 rounded cursor-not-allowed">
                                                    {slot.status}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-4 py-2 text-center">No interview slots available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Profile Section */}
                <div className="bg-white w-full lg:w-1/4 rounded-lg p-4 flex flex-col items-center text-center">
                    <img src={interviewer?.profileURL || ""} alt="profileImage" className="w-24 h-24 rounded-full object-cover" />
                    <h1 className="mt-2 text-lg font-semibold">{interviewer?.name || "N/A"}</h1>
                    <h2 className="text-gray-600">Designation: {interviewer?.currentDesignation || "N/A"}</h2>
                    <h2 className="text-gray-600">Organization: {interviewer?.organization || "N/A"}</h2>
                    <h2 className="text-gray-600">Experience: {interviewer?.yearOfExperience || 0} Years</h2>
                    <button className="bg-[#4B4F60] text-white p-3 w-full mt-4 hover:bg-black duration-300">
                        Expert in {selectedTech}
                    </button>
                </div>
            </div>
        </SideBar>
    );
};

export default SearchedInterviewerDetails;
