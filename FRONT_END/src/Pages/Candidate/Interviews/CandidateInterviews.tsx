import { useEffect, useState } from "react"
import SideBar from "../../../components/Candidate/SideBar"
import { getCandidateScheduledInterviews } from "../../../Services/candidateService";
import { useNavigate } from "react-router-dom";
// import PageLoading from "../../../components/PageLoading";
import { Pagination } from "@mui/material";

const CandidateInterviews = () => {

    // const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const [scheduledData, setScheduledData] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const limit = 5;


    useEffect(() => {

        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 2000);

        const fetchCandidateScheduledInterviews = async () => {
            try {
                const response: any = await getCandidateScheduledInterviews(currentPage, limit, searchQuery);
                if (response.success) {
                    // console.log(response.scheduledData, ' this is for the scheduled data for the interviewer');
                    // console.log(response.scheduledData.totalPages
                    //     , ' this is for the scheduled data for the interviewer');

                    setScheduledData(response.scheduledData.scheduledInterview);
                    setTotalPages(response.scheduledData.totalPages)
                } else {
                    console.log("not ok not ok")
                }
            } catch (error: any) {
                console.log("error occure for the fetch the shceduled interviews", error.message);
            }
        }
        fetchCandidateScheduledInterviews();
    }, [searchQuery, currentPage]);

    // if (isLoading) {
    //     return <div><PageLoading /></div>
    // }

    const handleToDetails = (id: string, detailsData: any) => {
        navigate(`/candidate/outsourced-interviews/${id}`, { state: { detailsData: detailsData } });
    }

    const handleChange = (_: unknown, value: number) => {
        setCurrentPage(value);
    };

    return (
        <>
            <SideBar heading="Outsourced Interviews" subHeading="Find expert interviewers to take interviews on your behalf" >
                <div className="bg-gray-200 p-4 shadow-md h-screen">
                    <div className="ml-7 w-[990px]">
                        {/* Search and Data List */}
                        <div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-3 py-2 rounded-md w-full bg-white text-black"
                                value={searchQuery}
                                onChange={(event) => {
                                    setSearchQuery(event.target.value);
                                    setCurrentPage(1);
                                }}
                            />

                            <div className="mt-2 grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-x-7 bg-white text-black p-4 rounded-md">
                                <div className="text-sm font-thin ml-2">Stack</div>
                                <div className="text-sm font-thin ml-2">Technology</div>
                                <div className="text-sm font-thin ml-2">Date</div>
                                <div className="text-sm font-thin text-center">Scheduled On</div>
                                <div className="text-sm font-thin text-center">Price</div>
                                <div className="text-sm font-thin text-center">Status</div>
                                <div className="text-sm font-thin text-right">Details</div>
                            </div>

                            {/* Table Rows */}
                            <div className="mt-1 space-y-2 flex-grow ">
                                {scheduledData.length > 0 ? (
                                    scheduledData.map((data) => (
                                        <>
                                            <div key={data._id} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-x-7 bg-black text-gray-300 p-2 rounded-md">

                                                <div className="text-sm text-center mt-2">{data.scheduledSlot.stack || "N/A"}</div>
                                                <div className="text-sm text-center mt-2">{data.scheduledSlot.technology || "N/A"}</div>
                                                <div className="text-sm text-center mt-2">{data.scheduledSlot.date || "N/A"}</div>
                                                <div className="text-sm text-center mt-2">{`${data.scheduledSlot.from} - ${data.scheduledSlot.to}` || "N/A"}</div>
                                                <div className="text-sm text-center mt-2">{data.scheduledSlot.price || "N/A"}</div>
                                                {data.status == "pending" ? (
                                                    <div className="text-sm text-center mt-2 text-red-600">{data.status || "N/A"}</div>
                                                ) : (
                                                    <div className="text-sm text-center mt-2 text-green-600">{data.status || "N/A"}</div>
                                                )}
                                                <div className="flex justify-end items-center">
                                                    <button
                                                        onClick={() => handleToDetails(data._id, data)}
                                                        className="bg-[#32ADE6] text-white px-3 py-1 rounded-full hover:text-white hover:bg-[#999999]"
                                                    >
                                                        Details
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ))
                                ) : (
                                    <div className="text-white text-center">No data available</div>
                                )}
                            </div>

                        </div>
                    </div>
                    {/* Fixed Pagination */}
                    <div className="flex justify-center items-center mt-4 pb-2">
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handleChange}
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    color: "#FFCC00",  // Text color
                                },
                                "& .MuiPaginationItem-root.Mui-selected": {
                                    backgroundColor: "#FFCC00", // Selected page background color
                                    color: "#000",  // Selected page text color
                                },
                                "& .MuiPaginationItem-root:hover": {
                                    backgroundColor: "#FFD633", // Lighter yellow on hover
                                    color: "#000"
                                }
                            }}
                        />
                    </div>
                </div>
            </SideBar>

        </>
    )
}

export default CandidateInterviews
