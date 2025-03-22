import { useEffect, useState } from "react";
import SideBar from "../../../components/Admin/SideBar";
import { interviewerPayment, PayToInterviewer } from "../../../Services/adminService";
import { Pagination } from "@mui/material";
import toast from "react-hot-toast"
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const AdminPaymentDetails = () => {

    const [paymentData, setPaymentData] = useState<[] | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;


    useEffect(() => {
        const InterviewerPaymentDetails = async () => {
            try {
                const response: any = await interviewerPayment(currentPage, limit, searchQuery)
                if (response.success) {
                    // console.log(response.interviewerPaymentData.interviewerPaymentData)
                    setPaymentData(response.interviewerPaymentData.interviewerPaymentData);
                    setTotalPages(response.interviewerPaymentData.totalPages)
                } else {
                    console.log("not ok not ok not ok");
                }
            } catch (error: any) {
                console.log(error.message);
            }
        }
        InterviewerPaymentDetails();
    }, [searchQuery, currentPage]);


    const handleToPay = async (id: string) => {
        try {

            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You are about to make this payment!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#34C759",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, pay now!",
            });

            if (result.isConfirmed) {
                const response: any = await PayToInterviewer(id);
                console.log(response, 'this is response of send money');
                if (response.success) {
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            }
        } catch (error: any) {
            console.log(error.message);
            toast.error(error?.message || "An unexpected error occurred. Please try again later.");
        }
    }


    const handleChange = (_: unknown, value: number) => {
        setCurrentPage(value);
    };


    return (
        <div className="flex">
            <SideBar heading="Payment Details">

                <Toaster position="top-right" reverseOrder={false} />


                <div className="bg-[#30323A] ml-1 p-4 shadow-md mt-2 h-[476px]">

                    <div className="space-x-6 flex">
                        <button className="px-4 py-1 rounded-full mt-1 bg-[#999999] bg-opacity-50 text-[#FF3B30] hover:bg-[#FF3B30] hover:text-white duration-500">Pending</button>
                        <button className="px-4 py-1 rounded-full mt-1 bg-[#999999] bg-opacity-50 text-[#34C759] hover:bg-[#34C759] hover:text-white duration-500">paied</button>
                        <button className="px-4 py-1 rounded-full mt-1 bg-[#999999] bg-opacity-50 text-[#32ADE6] hover:bg-[#32ADE6] hover:text-white duration-500">earn</button>
                        {/* Search Bar */}
                        <div className="mb-1 flex justify-end">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-3 py-2 rounded-md bg-black text-white w-64"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)} // Ensure setSearchQuery is used
                            />

                        </div>
                    </div>


                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Stack</th>
                                    <th>Technology</th>
                                    <th>Interviewer</th>
                                    <th>Total Amount</th>
                                    <th>Profit</th>
                                    <th>Interviewer Amount</th>
                                    <th>Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentData && paymentData.map((data: any) => (

                                    <tr>
                                        <td>{data.scheduleData.date}</td>
                                        <td>{data.scheduleData.stack}</td>
                                        <td>{data.scheduleData.technology}</td>
                                        <td>{data.interviewerName}</td>
                                        <td>{data.scheduleData.price}</td>
                                        <td>{data.scheduleData.price * 0.1}</td>
                                        <td>{data.scheduleData.price - (data.scheduleData.price * 0.1)}</td>
                                        <td>
                                            <button
                                                className="bg-white p-2 rounded-full"
                                                onClick={() => handleToPay(data._id)}
                                            >
                                                PayToInterivewer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* pagination */}
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

        </div>
    )
}

export default AdminPaymentDetails;
