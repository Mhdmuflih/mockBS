import { useEffect, useState } from "react";
import SideBar from "../../../components/Interviewer/Sidebar";
import Table from "../../../components/Interviewer/Table";
import { getSlotData } from "../../../Services/interviewerService";
import PageLoading from "../../../components/PageLoading";

const InterviewerSlots = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

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

    const [slotData, setSlotData] = useState<any[]>([]);  // Change state to hold an array


    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        const fetchSlotData = async () => {
            try {
                const response: any = await getSlotData();
                console.log(response.slotData, 'this is the response data in slot');
                if (response.success) {
                    const formattedData = response.slotData
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

                } else {
                    console.log("Failed to fetch interviewer slot data.");
                }
            } catch (error: any) {
                console.log("Error fetching data:", error.message);
            }
        }
        fetchSlotData();
    }, []);

    if (isLoading) {
        return <div><PageLoading /></div>
    }


    return (
        <div>
            <SideBar heading="Slots List" addButton="Add Slot" subHeading="See information about all time slots" >

                <div className="bg-[#30323A] ml-1 p-3 rounded-b-lg shadow-md h-[69vh] ">
                    <Table columns={slotTable} data={slotData} />
                </div>


            </SideBar>
        </div>
    )
}

export default InterviewerSlots;
