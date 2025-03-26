import { useEffect, useState } from "react";
import SideBar from "../../../components/Admin/SideBar";
import { fetchInterview, fetchPayment, fetchUsers } from "../../../Services/adminService";

const AdminDashboard = () => {

    const [countData, setCountData] = useState<{candidateCount: number, interviewerCount: number, profit: number, interview: number} | null>(null);

    useEffect(() => {
        const fetchDatas = async() => {
            try {
                const usersResponse: any = await fetchUsers();
                const paymentResponse: any = await fetchPayment();
                const interviewResponse: any = await fetchInterview();
                if(!usersResponse || !paymentResponse || ! interviewResponse) {
                    throw new Error("data fetch have some issue");
                }
                console.log(usersResponse, "user response");
                console.log(paymentResponse, "payment response");
                console.log(interviewResponse, "interview response");

                const formattedData = {
                    candidateCount: usersResponse.candidate,
                    interviewerCount: usersResponse.interviewer,
                    profit: paymentResponse.totalAmount,
                    interview: interviewResponse.interview, 
                }
                setCountData(formattedData);
            } catch (error: any) {
                console.log(error.message);
            }
        }
        fetchDatas();
    }, []);

    return (
        <div className="flex">
            {/* Sidebar */}
            <SideBar heading="Dashboard" >
                <div className="bg-[#30323A]  p-4 shadow-md h-screen">

                    <div className="flex justify-around mt-10">
                        <div className="bg-white w-32 h-32 rounded-3xl">
                            <h1 className="mt-4 ml-1 font-medium text-center">Total Interivewer</h1>
                            {countData && <>{countData.interviewerCount}</>}
                        </div>
                        <div className="bg-white w-32 h-32 rounded-3xl">
                            <h1 className="mt-4 ml-1 font-medium text-center">Total Candidate</h1>
                            {countData && <>{countData.candidateCount}</>}
                        </div>
                        <div className="bg-white w-32 h-32 rounded-3xl">
                            <h1 className="mt-4 ml-1 font-medium text-center">Scheduled Interivewer</h1>
                            {countData && <>{countData.interview}</>}
                        </div>
                    </div>


                    <div className="flex justify-around mt-10">
                        <div className="bg-white w-32 h-32 rounded-3xl">
                            <h1 className="mt-4 ml-1 font-medium text-center">Profit</h1>
                            {countData && <>{countData.profit}</>}
                        </div>
                        <div className="bg-white w-32 h-32 rounded-3xl">
                            <h1 className="mt-4 ml-1 font-medium text-center"></h1>
                        </div>
                        <div className="bg-white w-32 h-32 rounded-3xl">
                            <h1 className="mt-4 ml-1 font-medium text-center"></h1>
                        </div>
                    </div>

                </div>
            </SideBar>
        </div>
    );
};

export default AdminDashboard;
