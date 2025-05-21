import { useCallback, useEffect, useState } from "react";
import SideBar from "../../../components/Interviewer/Sidebar";
import Table from "../../../components/Interviewer/Table";
import { getSlotData } from "../../../Services/interviewerService";
import { debounce } from "lodash";

const InterviewerSlots = () => {


    const [slotData, setSlotData] = useState<any[]>([]);  
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [rawSearchQuery, setRawSearchQuery] = useState("");
    const limit = 4;

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            setSearchQuery(query);
        }, 500),
        []
    );

    useEffect(() => {
        debouncedSearch(rawSearchQuery);
        return () => {
            debouncedSearch.cancel();
        }
    }, [rawSearchQuery]);

    useEffect(() => {

        const fetchSlotData = async () => {
            try {
                const response: any = await getSlotData(currentPage, limit, searchQuery);
                console.log(response.slotData, 'this is the response data in slot');
                console.log(response.slotData.totalPages, 'this is the response data in slot');
                if (response.success) {
                    const formattedData = response.slotData.getSlotData
                        .map((slot: any) =>
                            slot.slots.flatMap((slotDetail: any) =>
                                slotDetail.schedules.map((schedule: any) => ({
                                    stack: slot.stack.stackName,
                                    technology: slot.stack.technologies,
                                    date: new Date(slotDetail.date).toISOString().split('T')[0],
                                    from: schedule.fromTime,
                                    to: schedule.toTime,
                                    title: schedule.title || "N/A",
                                    price: schedule.price || "N/A",
                                    description: schedule.description || "N/A",
                                }))
                            )
                        )
                        .flat();


                    setSlotData(formattedData);
                    setTotalPages(response.slotData.totalPages)
                } else {
                    console.log("Failed to fetch interviewer slot data.");
                }
            } catch (error: any) {
                console.log("Error fetching data:", error.message);
            }
        }
        fetchSlotData();
    }, [searchQuery, currentPage]);


    const handleChange = (_: unknown, value: number) => {
        setCurrentPage(value);
    };

    const slotTable = [
        { key: "stack", label: "Stack Name" },
        { key: "technology", label: "Technology" },
        { key: "date", label: "Date" },
        { key: "from", label: "From" },
        { key: "to", label: "To" },
        { key: "title", label: "Title" },
        { key: "price", label: "Price" },
        { key: "description", label: "Discription" },
    ];

    return (
        <div>
            <SideBar heading="Slots List" addButton="Add Slot" subHeading="See information about all time slots" >

                <div>
                    <Table
                        columns={slotTable}
                        data={slotData}
                        handleChange={handleChange}
                        currentPage={currentPage}
                        totalPages={totalPage}
                        searchQuery={rawSearchQuery}
                        setSearchQuery={setRawSearchQuery}
                    />
                </div>


            </SideBar>
        </div>
    )
}

export default InterviewerSlots;
