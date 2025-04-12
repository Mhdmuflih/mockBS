import React, { useEffect, useState } from "react"
import SideBar from "../../../components/Candidate/SideBar"
import { getCandidateScheduledInterviews } from "../../../Services/candidateService";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import { IScheduledApiResponse } from "../../../Interface/candidateInterfaces/IApiResponce";
import { IScheduled } from "../../../Interface/candidateInterfaces/interface";
import { Types } from "mongoose";

const CandidateInterviews: React.FC = () => {

    const navigate: NavigateFunction = useNavigate();
    const [scheduledData, setScheduledData] = useState<IScheduled[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const limit: number = 5;


    useEffect(() => {
        const fetchCandidateScheduledInterviews = async (): Promise<void> => {
            try {
                const response: IScheduledApiResponse = await getCandidateScheduledInterviews(currentPage, limit, searchQuery);
                if (response.success) {
                    setScheduledData(response.scheduledData.scheduledInterview);
                    setTotalPages(response.scheduledData.totalPages)
                } else {
                    console.log("Failed to fetch scheduled data.");
                }
            } catch (error: unknown) {
                error instanceof Error ? console.log("Error fetching data:", error.message) : console.log("An unknown error occurred.");
            }
        }
        fetchCandidateScheduledInterviews();
    }, [searchQuery, currentPage]);

    const handleToDetails = (id: Types.ObjectId, detailsData: IScheduled): void => {
        navigate(`/candidate/outsourced-interviews/${id}`, { state: { detailsData: detailsData } });
    }

    const handleChange = (_: unknown, value: number): void => {
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
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
                                    scheduledData.map((data: IScheduled, index: number) => (
                                        <div key={index} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-x-7 bg-black text-gray-300 p-2 rounded-md">
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
