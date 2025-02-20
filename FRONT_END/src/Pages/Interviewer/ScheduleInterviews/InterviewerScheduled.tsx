import SideBar from "../../../components/Interviewer/Sidebar";
import Table from "../../../components/Interviewer/Table";

const InterviewerScheduled = () => {
    const scheduledTable = [
        { key: "date", label: "Date" },
        { key: "from", label: "From" },
        { key: "to", label: "To" },
        { key: "domain", label: "Domain" },
        { key: "status", label: "Status" },
        { key: "details", label: "Details" },
    ];


    return (
        <>
            <SideBar heading="Scheduled Interviews" subHeading="See information about all interviews">
                <div className="bg-[#30323A] ml-1 p-3 rounded-b-lg shadow-md h-[69vh] ">

                    <Table columns={scheduledTable} data={[]} />
                </div>
            </SideBar>

        </>
    )
}

export default InterviewerScheduled;
