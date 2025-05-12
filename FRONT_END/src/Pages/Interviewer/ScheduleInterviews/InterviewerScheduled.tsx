import { useEffect, useState } from "react";
import SideBar from "../../../components/Interviewer/Sidebar";
import Table from "../../../components/Interviewer/Table";
import { cancelInterview, getInterviewerScheduledInterviews } from "../../../Services/interviewerService";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { sendMoneyToWallet } from "../../../Services/candidateService";

const InterviewerScheduled = () => {

    const navigate = useNavigate();

    const [scheduledData, setScheduledData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const limit = 5;

    const [isModal, setIsModal] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>("");
    const [cancelReason, setCancelReason] = useState<string>("");


    useEffect(() => {

        const fetchInterviewerScheduledInterviews = async () => {
            try {
                const response: any = await getInterviewerScheduledInterviews(currentPage, limit, searchQuery);
                if (response.success) {
                    console.log(response.sheduledData.totalPages, 'this is for the scheudled Data')
                    const formattedData = response.sheduledData.scheduledData.map((scheduled: any) => ({
                        stack: scheduled.scheduledSlot.stack,
                        technology: scheduled.scheduledSlot.technology,
                        date: scheduled.scheduledSlot.date,
                        scheduled: `${scheduled.scheduledSlot.from} - ${scheduled.scheduledSlot.to}`,
                        price: scheduled.scheduledSlot.price,
                        status: scheduled.status,
                        candidateId: scheduled.candidateId,
                        interviewerId: scheduled.interviewerId,
                        scheduledId: scheduled.scheduleId,
                        _id: scheduled._id
                    }));
                    setScheduledData(formattedData);
                    setTotalPages(response.sheduledData.totalPages)
                } else {
                    console.log("not ok not ok");
                }
            } catch (error: any) {
                console.log("error occur the fetch the interviewer shceduled interviews", error.message);
            }
        }
        fetchInterviewerScheduledInterviews();
    }, [searchQuery, currentPage]);

    const handleToDetails = (id: string, detailsData: any) => {
        navigate(`/interviewer/scheduled/${id}`, { state: { detailsData: detailsData } });
    }

    const handleChange = (_: unknown, value: number) => {
        setCurrentPage(value);
    };

    const handleToCancel = (id: string) => {
        setSelectedId(id)
        setIsModal(true);
    }

    const handleToSubmitCancel = async () => {
        try {
            console.log("Cancelling ID:", selectedId, "Reason:", cancelReason);
            const response: any = await cancelInterview({ selectedId, cancelReason });
            if (response.success) {
                console.log(response.cancelData.scheduleId, 'this is cancelData');
                toast.success(response.message);
                const walletResponse: any = await sendMoneyToWallet(response.cancelData.scheduleId);
                if (walletResponse.success) {
                    toast.success(response.message);
                } else {
                    toast.error(response.message);

                }
                console.log(walletResponse, 'this is wallet response')
                console.log("okokokokok");
            } else {
                toast.error(response.message);
                console.log("not ok not ok");
            }
            // Perform cancel API call here
            setIsModal(false);
            setCancelReason("");

        } catch (error: any) {
            console.log(error.message);
        }
    }

    const scheduledTable = [
        { key: "stack", label: "Stack" },
        { key: "technology", label: "Technology" },
        { key: "date", label: "Date" },
        { key: "scheduled", label: "Scheduled On" },
        { key: "price", label: "Price" },
        { key: "status", label: "Status" },
        { key: "action", label: "Action" },
        { key: "details", label: "Details" },
    ];

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <SideBar heading="Scheduled Interviews" subHeading="See information about all interviews">
                <div>
                    <Table
                        columns={scheduledTable}
                        handleChange={handleChange}
                        currentPage={currentPage}
                        totalPages={totalPage}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        data={scheduledData.map((data) => ({
                            stack: data.stack,
                            technology: data.technology,
                            date: data.date,
                            scheduled: data.scheduled,
                            price: data.price,
                            action: (
                                data.status !== "pending" ? (
                                    <div className="ml-4 mt-2">
                                        <button className={`rounded-full px-2 py-1 bg-gray-400 text-white cursor-not-allowed backdrop-blur-sm`}>cancel</button>
                                    </div>) : (
                                    <div className="ml-4 mt-2">
                                        <button
                                            onClick={() => handleToCancel(data._id)}
                                            className={`rounded-full px-2 py-1 bg-red-700 cursor-pointer`}
                                        >
                                            cancel
                                        </button>
                                    </div>)
                            ),
                            status: (
                                data.status == "pending" || data.status == "cancelled" ? (
                                    <div className="text-red-600">{data.status}</div>
                                ) : (
                                    <div className="text-green-600">{data.status}</div>
                                )
                            ),
                            details: (
                                <button
                                    onClick={() => handleToDetails(data._id, data)}
                                    className="bg-[#32ADE6] text-white px-3 py-1 rounded-full hover:text-white hover:bg-[#999999] duration-500"                            >
                                    Details
                                </button>
                            )
                        }))} />
                </div>
            </SideBar>

            {isModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-[400px]">
                        <h2 className="text-xl font-semibold mb-4">Cancel Interview</h2>
                        <textarea
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            placeholder="Enter reason for cancellation"
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                            rows={4}
                        ></textarea>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => {
                                    setIsModal(false);
                                    setCancelReason("");
                                }}
                                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    handleToSubmitCancel()
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-md"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default InterviewerScheduled;
