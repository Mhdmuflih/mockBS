import { useEffect, useState } from "react";
import SideBar from "../../../components/Interviewer/Sidebar";
import Table from "../../../components/Interviewer/Table";
import { getInterviewerScheduledInterviews } from "../../../Services/interviewerService";
import { useNavigate } from "react-router-dom";
import PageLoading from "../../../components/PageLoading";

const InterviewerScheduled = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const [scheduledData, setScheduledData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const limit = 5;


    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

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

    if (isLoading) {
        return <div><PageLoading /></div>
    }

    const handleToDetails = (id: string, detailsData: any) => {
        navigate(`/interviewer/scheduled/${id}`, { state: { detailsData: detailsData } });
    }

    const handleChange = (_: unknown, value: number) => {
        setCurrentPage(value);
    };

    const scheduledTable = [
        { key: "stack", label: "Stack" },
        { key: "technology", label: "Technology" },
        { key: "date", label: "Date" },
        { key: "scheduled", label: "Scheduled On" },
        { key: "price", label: "Price" },
        { key: "status", label: "Status" },
        { key: "details", label: "Details" },
    ];

    return (
        <>
            <SideBar heading="Scheduled Interviews" subHeading="See information about all interviews">
                <div className="bg-[#30323A] ml-1 rounded-b-lg shadow-md h-[69vh] ">
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
                            status: (
                                data.status == "pending" ? (
                                    <div className="text-red-600">{data.status}</div>
                                ) : (
                                    <div className="text-red-600">{data.status}</div>
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

        </>
    )
}

export default InterviewerScheduled;
