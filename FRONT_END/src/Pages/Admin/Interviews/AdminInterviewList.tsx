import { useEffect, useState } from "react";
import SideBar from "../../../components/Admin/SideBar";
import Table from "../../../components/Admin/Table";
import { fetchInterviewList } from "../../../Services/adminService";
import { useNavigate } from "react-router-dom";
import AdminSideLoading from "../../../components/Admin/AdminSideLoading";

const AdminInterviewList = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const [interviewData, setInterviewData] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        const fetchInterviewsData = async () => {
            try {
                const response: any = await fetchInterviewList(currentPage, limit, searchQuery);
                if (response.success) {
                    console.log("interview's data fetched successfully");
                    console.log(response.interviewData, 'tbis is for the interviewData');
                    console.log(response.interviewData.totalPages, 'tbis is for the interviewData');

                    const formattedData = response.interviewData.interviews.map((item: any, index: number) => ({
                        serial: (currentPage - 1) * limit + index + 1,
                        technology: item.scheduledSlot.technology || "N/A",
                        date: item.scheduledSlot?.date || "N/A", // Corrected date from scheduledSlot.date
                        time: item.scheduledSlot ? `${item.scheduledSlot.from} - ${item.scheduledSlot.to}` : "N/A", // Concatenating from and to
                        details: item.description || "N/A",
                        scheduleId: item.scheduleId,
                        interviewerId: item.interviewerId,
                        candidateId: item.candidateId
                    }));
                    setInterviewData(formattedData);
                    setTotalPages(response.interviewData.totalPages)
                } else {
                    console.log("Failed to fetch interveiw data");
                }
            } catch (error: any) {
                console.log("Error fetching data:", error.message);
            }
        }
        fetchInterviewsData();
    }, [searchQuery, currentPage]);

    if (isLoading) {
        return <div><AdminSideLoading /></div>
    }

    const handleToDetails = (scheduleId: string, candidateId: string, interviewerId: string) => {
        navigate(`/admin/interviews/${scheduleId}`, { state: { candidateId: candidateId, interviewerId: interviewerId } })
    }

    const handleChange = (_: unknown, value: number) => {
        setCurrentPage(value);
    };

    const interviewColumns = [
        { key: "serial", label: "SlNo" },
        { key: "technology", label: "Roll Name" },
        { key: "date", label: "Creates On" },
        { key: "time", label: "Schedule On" },
        { key: "details", label: "Details" },

    ];

    return (
        <>
            <div className="flex">

                <SideBar heading="Interviews" >
                    <div className="bg-[#30323A] ml-1 p-4 shadow-md mt-2 h-[476px]">

                        <Table
                            columns={interviewColumns}
                            handleChange={handleChange}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            data={interviewData.map((data) => ({
                                serial: data.serial,
                                technology: data.technology || "N/A",
                                date: data.date,
                                time: data.time,
                                details: (
                                    <button
                                        onClick={() => handleToDetails(data.scheduleId, data.candidateId, data.interviewerId)}
                                        className="bg-[#32ADE6] text-white px-3 py-1 rounded-full hover:text-white hover:bg-[#999999] duration-500"                                    >
                                        Details
                                    </button>
                                ),
                            }))}
                        />
                    </div>
                </SideBar>
            </div>
        </>
    )
}

export default AdminInterviewList;
