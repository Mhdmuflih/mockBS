import { useEffect, useState } from "react";
import SideBar from "../../../components/Admin/SideBar";
import Table from "../../../components/Admin/Table";
import { fetchInterviewList } from "../../../Services/adminService";
import { useNavigate } from "react-router-dom";

const AdminInterviewList = () => {

    const [interviewData, setInterviewData] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInterviewsData = async () => {
            try {
                const response: any = await fetchInterviewList();
                if (response.success) {
                    console.log("interview's data fetched successfully");
                    console.log(response.interviewData, 'tbis is for the interviewData');

                    const formattedData = response.interviewData.map((item: any, index: number) => ({
                        serial: index + 1,
                        technology: item.scheduledSlot.technology || "N/A",
                        date: item.scheduledSlot?.date || "N/A", // Corrected date from scheduledSlot.date
                        time: item.scheduledSlot ? `${item.scheduledSlot.from} - ${item.scheduledSlot.to}` : "N/A", // Concatenating from and to
                        details: item.description || "N/A",
                    }));
                    setInterviewData(formattedData);
                } else {
                    console.log("Failed to fetch interveiw data");
                }
            } catch (error: any) {
                console.log("Error fetching data:", error.message);
            }
        }
        fetchInterviewsData();
    }, []);

    const handleToDetails = () => {
        navigate('')
    }


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
                            data={interviewData.map((data) => ({
                                serial: data.serial,
                                technology: data.technology || "N/A",
                                date: data.date,
                                time: data.time,
                                details: (
                                    <button
                                    onClick={() => handleToDetails()}
                                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                    >
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
