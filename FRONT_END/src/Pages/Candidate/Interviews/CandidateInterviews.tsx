import { useCallback, useEffect, useState } from "react"
import SideBar from "../../../components/Candidate/SideBar"
import { cancelInterview, getCandidateScheduledInterviews, sendMoneyToWallet } from "../../../Services/candidateService";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { debounce } from "lodash";

const CandidateInterviews = () => {

    const navigate = useNavigate();

    const [scheduledData, setScheduledData] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [rawSearchQuery, setRawSearchQuery] = useState("");
    const limit = 5;

    const [isModal, setIsModal] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>("");
    const [cancelReason, setCancelReason] = useState<string>("");


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

    const fetchCandidateScheduledInterviews = async () => {
        try {
            const response: any = await getCandidateScheduledInterviews(currentPage, limit, searchQuery);
            if (response.success) {
                setScheduledData(response.scheduledData.scheduledInterview);
                setTotalPages(response.scheduledData.totalPages)
            } else {
                console.log("Not OK");
            }
        } catch (error: any) {
            console.log("Error fetching scheduled interviews", error.message);
        }
    };


    useEffect(() => {
        fetchCandidateScheduledInterviews();
    }, [searchQuery, currentPage]);

    const handleToDetails = (id: string, detailsData: any) => {
        navigate(`/candidate/outsourced-interviews/${id}`, { state: { detailsData: detailsData } });
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
                }
                console.log(walletResponse, 'this is wallet response')
                console.log("okokokokok");
            } else {
                console.log("not ok not ok");
            }
            // Perform cancel API call here
            setIsModal(false);
            setCancelReason("");

            fetchCandidateScheduledInterviews();

        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <SideBar heading="Outsourced Interviews" subHeading="Find expert interviewers to take interviews on your behalf" >

                <div className="bg-gray-200 p-4 shadow-md h-screen">
                    <div className="ml-7 w-[990px]">
                        {/* Search and Data List */}
                        <div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-3 py-2 rounded-md w-full bg-white text-black"
                                value={rawSearchQuery}
                                onChange={(event) => {
                                    setRawSearchQuery(event.target.value);
                                    setCurrentPage(1);
                                }}
                            />

                            <div className="mt-2 grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-x-7 bg-white text-black p-4 rounded-md">
                                <div className="text-sm font-thin ml-2">Stack</div>
                                <div className="text-sm font-thin ml-2">Technology</div>
                                <div className="text-sm font-thin ml-2">Date</div>
                                <div className="text-sm font-thin text-center">Scheduled On</div>
                                <div className="text-sm font-thin text-center">Price</div>
                                <div className="text-sm font-thin text-center">Status</div>
                                <div className="text-sm font-thin text-center">Action</div>
                                <div className="text-sm font-thin text-right">Details</div>
                            </div>

                            {/* Table Rows */}
                            <div className="mt-1 space-y-2 flex-grow ">
                                {scheduledData.length > 0 ? (
                                    [...scheduledData].reverse().map((data) => (
                                        <>
                                            <div key={data._id} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-x-7 bg-black text-gray-300 p-2 rounded-md">

                                                <div className="text-sm text-center mt-2">{data.scheduledSlot.stack || "N/A"}</div>
                                                <div className="text-sm text-center mt-2">{data.scheduledSlot.technology || "N/A"}</div>
                                                <div className="text-sm text-center mt-2">{data.scheduledSlot.date || "N/A"}</div>
                                                <div className="text-sm text-center mt-2">{`${data.scheduledSlot.from} - ${data.scheduledSlot.to}` || "N/A"}</div>
                                                <div className="text-sm text-center mt-2">{data.scheduledSlot.price || "N/A"}</div>
                                                {data.status == "pending" || data.status == "cancelled" ? (
                                                    <div className="text-sm text-center mt-2 text-red-600">{data.status || "N/A"}</div>
                                                ) : (
                                                    <div className="text-sm text-center mt-2 text-green-600">{data.status || "N/A"}</div>
                                                )}

                                                {data.status !== "pending" ? (
                                                    <div className="ml-4 mt-2">
                                                        <button className={`rounded-full px-2 py-1 bg-gray-400 text-white cursor-not-allowed backdrop-blur-sm`}>cancel</button>
                                                    </div>
                                                ) : (
                                                    <div className="ml-4 mt-2">
                                                        <button
                                                            onClick={() => handleToCancel(data._id)}
                                                            className={`rounded-full px-2 py-1 bg-red-700 cursor-pointer`}
                                                        >
                                                            cancel
                                                        </button>
                                                    </div>
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

export default CandidateInterviews
