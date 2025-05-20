import { useCallback, useEffect, useState } from "react";
import SideBar from "../../../components/Admin/SideBar";
import Table from "../../../components/Admin/Table";
import { fetchInterviewList } from "../../../Services/adminService";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const AdminInterviewList = () => {

    const navigate = useNavigate();

    const [interviewData, setInterviewData] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [rawSearchQuery, setRawSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    const debouncedSearch = useCallback(
        debounce((query:string) => {
            setSearchQuery(query);
        }, 500),
        []
    )

    useEffect(() => {
        debouncedSearch(rawSearchQuery);
        return () => {
            debouncedSearch.cancel();
        }
    }, [rawSearchQuery]);

    useEffect(() => {

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
                        candidateId: item.candidateId,
                        status: item.status,
                        cancelReason: item.cancelReason
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

    const handleToDetails = (scheduleId: string, candidateId: string, interviewerId: string, interviewData: any) => {
        navigate(`/admin/interviews/${scheduleId}`, { state: { candidateId: candidateId, interviewerId: interviewerId, interviewData: interviewData } })
    }

    const handleChange = (_: unknown, value: number) => {
        setCurrentPage(value);
    };

    const interviewColumns = [
        { key: "serial", label: "SlNo" },
        { key: "technology", label: "Roll Name" },
        { key: "date", label: "Creates On" },
        { key: "time", label: "Schedule On" },
        { key: "status", label: "Status" },
        { key: "details", label: "Details" },

    ];

    return (
        <>
            <div className="flex">

                <SideBar heading="Interviews" >

                    <Table
                        columns={interviewColumns}
                        handleChange={handleChange}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        searchQuery={rawSearchQuery}
                        setSearchQuery={setRawSearchQuery}
                        data={interviewData.map((data) => ({
                            serial: data.serial,
                            technology: data.technology || "N/A",
                            date: data.date,
                            time: data.time,
                            status: (
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${data.status.toLowerCase() === "completed"
                                        ? "text-green-600 bg-green-100"
                                        : data.status.toLowerCase() === "pending"
                                            ? "text-yellow-700 bg-yellow-100 px-5"
                                            : "text-red-600 bg-red-100 px-4"
                                        }`}
                                >
                                    {data.status}
                                </span>
                            ),
                            details: (
                                <button
                                    onClick={() => handleToDetails(data.scheduleId, data.candidateId, data.interviewerId, data)}
                                    className="bg-[#32ADE6] text-white px-3 py-1 rounded-full hover:text-white hover:bg-[#999999] duration-500"                                    >
                                    Details
                                </button>
                            ),
                        }))}
                    />
                </SideBar>
            </div>
        </>
    )
}

export default AdminInterviewList;
