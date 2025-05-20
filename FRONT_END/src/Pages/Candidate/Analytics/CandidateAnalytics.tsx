import { useEffect, useState } from "react";
import SideBar from "../../../components/Candidate/SideBar"
import { FaBan, FaCalendarCheck, FaCheckCircle, FaDollarSign } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, } from 'recharts';
import { fetchScheduledInterviewCount, fetchTotalAmount } from "../../../Services/candidateService";
import { ICandidateScheduledAnalyiticsApiResponse } from "../../../Interface/candidateInterfaces/IApiResponce";
import toast, { Toaster } from "react-hot-toast";
import { GiMoneyStack } from "react-icons/gi";

const CandidateAnalytics = () => {

    const [scheduledInterviewCount, setScheduledInterviewCount] = useState<number>(0);
    const [completedInterviewCount, setCompletedInterviewCount] = useState<number>(0);
    const [cancelledInterviewCount, setCancelledInterviewCount] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [walletData, setWalletData] = useState<any>(null)


    useEffect(() => {
        const fetchCountOfTheData = async () => {
            try {
                const scheduledResponse: ICandidateScheduledAnalyiticsApiResponse = await fetchScheduledInterviewCount();
                const totalResponse: any = await fetchTotalAmount();

                if (!scheduledResponse || !totalResponse) {
                    throw new Error("data fetch have some issue");
                }

                setScheduledInterviewCount(scheduledResponse.counts.scheduledInterviewCounts);
                setCompletedInterviewCount(scheduledResponse.counts.completedInterviewCounts);
                setCancelledInterviewCount(scheduledResponse.counts.cancelledInterviewCounts);
                setTotalAmount(totalResponse.totalAmount.total);
                setWalletData(totalResponse.totalAmount.walletData);


            } catch (error: unknown) {
                error instanceof Error ? toast.error(error.message) : toast.error("An unknown error occurred.");
            }
        }
        fetchCountOfTheData();
    }, []);

    const pieData = [
        { name: 'Completed Interview', value: completedInterviewCount },
        { name: 'Scheduled Interview', value: scheduledInterviewCount },
        { name: 'Cancelled Interview', value: cancelledInterviewCount },
    ];
    const COLORS = ['#4CAF50', '#2196F3', '#FF0000'];

    return (
        <>
            <SideBar heading="Analytics">
                <Toaster position="top-right" />

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 px-6 py-4">
                    {/* <Breadcrumbs/> */}
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 ">
                        {[
                                                       {
                                title: 'Scheduled Interview',
                                value: `${scheduledInterviewCount}`,
                                icon: <FaCalendarCheck className="w-7 h-7" />,
                                color: 'bg-white border-l-4 border-blue-500',
                                iconColor: 'text-blue-500'
                            },
                            {
                                title: 'Cancelled Interview',
                                value: `${cancelledInterviewCount}`, // You may want a separate count here
                                icon: <FaBan className="w-7 h-7" />,
                                color: 'bg-white border-l-4 border-red-500',
                                iconColor: 'text-red-500'
                            },
                            {
                                title: 'Completed Interviews',
                                value: `${completedInterviewCount}`,
                                icon: <FaCheckCircle className="w-7 h-7" />,
                                color: 'bg-white border-l-4 border-green-500',
                                iconColor: 'text-green-500'
                            },
                            {
                                title: 'Total Payed Amount',
                                value: `${totalAmount}`,
                                icon: <FaDollarSign className="w-7 h-7" />,
                                color: 'bg-white border-l-4 border-purple-500',
                                iconColor: 'text-purple-500'
                            },
                            {
                                title: <span className="text-yellow-500 font-semibold">Wallet Amount</span>,
                                value: `${walletData?.balance ?? 0}`,
                                icon: <GiMoneyStack className="w-7 h-7" />,
                                color: 'bg-white border-l-4 border-yellow-500',
                                iconColor: 'text-yellow-500'
                            }

                        ].map((card, index) => (
                            <div key={index}
                                className={`${card.color} rounded-lg shadow-sm hover:shadow-md transition-all duration-300`}
                            >
                                <div className="lg:p-6 sm:p-4 p-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-gray-600 lg:text-base md:text-sm font-medium mb-1">{card.title}</h3>
                                            <p className="lg:text-2xl md:text-xl sm:text-lg font-bold text-gray-800">{card.value}</p>
                                        </div>
                                        <div className={`${card.iconColor}  opacity-80 group-hover:scale-110 transition-transform duration-300`}>
                                            {card.icon}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Graphs Section */}
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-1 gap-6">
                        {/* Pie Chart */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                            <h2 className="text-xl font-semibold mb-6 text-gray-700">Interview Distribution</h2>
                            <ResponsiveContainer width="100%" height={280}>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} fill="#ff7043" label>
                                        {pieData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                                data-tooltip={`Name: ${entry.name}, Value: ${entry.value}`}
                                            />
                                        ))}
                                    </Pie>

                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>


                        {/* Line Chart */}
                        {/* <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                            <h2 className="text-xl font-semibold mb-6 text-gray-700">Active Users Over Time</h2>
                            <ResponsiveContainer width="100%" height={280}>
                                <LineChart data={lineData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="users" stroke="#1E88E5" strokeWidth={3} dot={{ r: 5 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div> */}

                        <div className="mt-6 overflow-x-auto">
                            <table className="w-full table-auto border border-gray-200 rounded-md overflow-hidden shadow-sm">
                                <thead>
                                    <tr className="bg-gray-800 text-white text-sm text-center">
                                        <th className="p-4 border-r border-gray-200">Sl No</th>
                                        <th className="p-4 border-r border-gray-200">Date</th>
                                        <th className="p-4 border-r border-gray-200">Status</th>
                                        <th className="p-4">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white text-sm">
                                    {walletData?.walletHistory?.length > 0 ? (
                                        [...walletData.walletHistory].reverse().map((data: any, index: number) => (
                                            <tr
                                                key={index}
                                                className="border-b border-gray-200 hover:bg-gray-50 text-center"
                                            >
                                                <td className="p-4 border-r border-gray-100">{index + 1}</td>
                                                <td className="p-4 border-r border-gray-100">
                                                    {new Date(data.date).toISOString().split('T')[0]}
                                                </td>
                                                <td className="p-4 border-r border-gray-100 font-medium text-green-700">
                                                    {data.description}
                                                </td>
                                                <td className={`p-4 font-semibold ${data.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                    ₹ {data.amount}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="p-5 text-center text-gray-500">
                                                No wallet history available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>



                    </div>

                </main>
            </SideBar>

        </>
    )
}

export default CandidateAnalytics;
