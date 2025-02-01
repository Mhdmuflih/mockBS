import SideBar from "../../../components/Interviewer/Sidebar";
import Table from "../../../components/Interviewer/Table";

const InterviewerSlots = () => {

    const slotTable = [
        { key: "date", label: "Date" },
        { key: "from", label: "From" },
        { key: "to", label: "To" },
        { key: "title", label: "Title" },
        { key: "price", label: "Price" },
        { key: "discription", label: "Discription" },
    ];


    return (
        <div>
            <SideBar heading="Slots List" addButton="Add Slot" >
                
                <Table columns={slotTable} data={[]} />

            </SideBar>
        </div>
    )
}

export default InterviewerSlots;
