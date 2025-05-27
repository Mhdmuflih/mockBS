import { useEffect, useState } from "react";
import SideBar from "../../../components/Admin/SideBar";
import { fetchInterview, fetchPayment, fetchUsers } from "../../../Services/adminService";
import { FaChartLine, FaClipboardList, FaUsers, FaWrench } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';
import { GrCompliance } from "react-icons/gr";

const AdminDashboard = () => {

    const [candidateCount, setCandidateCount] = useState<number>(0);
    const [premiumCandidateCount, setPremiumCandidateCount] = useState<number>(0);
    const [interviewerCount, setInterviewerCount] = useState<number>(0);
    const [unApprovedInterviewerCount, setUnApprovedInterviewerCount] = useState<number>(0);
    const [revenue, setRevenue] = useState<number>(0);
    const [profitInterview, setProfitInterview] = useState<number>(0);
    const [profitPremium, setProfitPremium] = useState<number>(0);
    const [interview, setInterview] = useState<number>(0);
    const [completedInterviewCount, setCompletedInterviewCount] = useState<number>(0);

    const pieData = [
        { name: 'Approved Interviewers', value: interviewerCount },
        { name: 'Unapproved Interviewers', value: unApprovedInterviewerCount },
        { name: 'Candidates', value: candidateCount },
        { name: 'Premium Candidates', value: premiumCandidateCount },
    ];

    const COLORS = ['#4CAF50', '#FF9800', '#2196F3'];

    // const barData = [
    //     { name: 'Jan', revenue: 12000 },
    //     { name: 'Feb', revenue: 15000 },
    //     { name: 'Mar', revenue: 18000 },
    //     { name: 'Apr', revenue: 22000 },
    // ];

    const chartData = [
        { name: "Total Revenue", revenue },
        { name: "Profit", revenue: profitInterview },
        { name: "Premium Profit", revenue: profitPremium },
    ];

    useEffect(() => {
        const fetchDatas = async () => {
            try {
                const usersResponse: any = await fetchUsers();
                const interviewResponse: any = await fetchInterview();
                const paymentResponse: any = await fetchPayment();
                if (!usersResponse || !paymentResponse || !interviewResponse) {
                    throw new Error("data fetch have some issue");
                }
                console.log(usersResponse, "user response");
                console.log(paymentResponse, "payment response");
                console.log(interviewResponse, "interview response");

                setCandidateCount(usersResponse.candidate);
                setPremiumCandidateCount(usersResponse.premiumCandidates);
                setInterviewerCount(usersResponse.interviewer);
                setUnApprovedInterviewerCount(usersResponse.unApprovedInterviewer)
                setRevenue(paymentResponse.revenue);
                setProfitInterview(paymentResponse.profit);
                setProfitPremium(paymentResponse.profitPremium);
                setInterview(interviewResponse.interview);
                setCompletedInterviewCount(interviewResponse.completedInterview)
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
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 px-6 py-4">
                    {/* <Breadcrumbs/> */}
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 ">
                        {[
                            {
                                title: 'Total Candidates',
                                value: `${candidateCount}`,
                                icon: <FaUsers className="w-7 h-7" />,
                                color: 'bg-white border-l-4 border-emerald-400',
                                iconColor: 'text-emerald-400'
                            },
                            {
                                title: 'Premium Candidates',
                                value: `${premiumCandidateCount}`,
                                icon: <FaUsers className="w-7 h-7" />,
                                color: 'bg-white border-l-4 border-emerald-400',
                                iconColor: 'text-emerald-400'
                            },
                            {
                                title: 'Total Interviewers',
                                value: `${interviewerCount}`,
                                icon: <FaUsers className="w-7 h-7" />,
                                color: 'bg-white border-l-4 border-emerald-400',
                                iconColor: 'text-emerald-400'
                            },
                            {
                                title: 'Revenue for Interview',
                                value: `${revenue}`,
                                icon: <FaChartLine className="w-7 h-7" />,
                                color: 'bg-white border-l-4 border-sky-400',
                                iconColor: 'text-sky-400'
                            },
                            {
                                title: 'Profit for Interview',
                                value: `${profitInterview}`,
                                icon: <FaChartLine className="w-7 h-7" />,
                                color: 'bg-white border-l-4 border-sky-400',
                                iconColor: 'text-sky-400'
                            },
                            {
                                title: 'Profit for Premium',
                                value: `${profitPremium}`,
                                icon: <FaChartLine className="w-7 h-7" />,
                                color: 'bg-white border-l-4 border-sky-400',
                                iconColor: 'text-sky-400'
                            },
                            {
                                title: 'Scheduled Interviews',
                                value: `${interview}`,
                                icon: <FaClipboardList className="w-7 h-7" />,
                                color: 'bg-white border-l-4 border-violet-400',
                                iconColor: 'text-violet-400'
                            },
                            {
                                title: 'completed Interview',
                                value: `${completedInterviewCount}`,
                                icon: <GrCompliance className="w-7 h-7" />,
                                color: 'bg-white border-l-4 border-amber-400',
                                iconColor: 'text-amber-400'
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
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Pie Chart */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border">
                            <h2 className="text-xl font-semibold mb-6 text-gray-700">User Distribution</h2>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
                                        {pieData.map((entry: any, index: any) => (
                                            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>

                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Bar Chart */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border">
                            <h2 className="text-xl font-semibold mb-6 text-gray-700">Revenue Comparison</h2>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={chartData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="revenue" fill="#2196F3" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                    </div>


                    {/* Latest Updates */}
                    <div className="mt-6 bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300 border">
                        <h2 className="text-xl font-semibold mb-6 text-gray-700 flex items-center">
                            <FaWrench className="mr-2 text-amber-400" /> Latest Updates
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { title: 'System Update v2.1', time: '1 day ago', desc: 'Major performance improvements' },
                                { title: 'Security Patch', time: '2 days ago', desc: 'Enhanced security measures' },
                                { title: 'Database Optimization', time: '3 days ago', desc: 'Improved query performance' }
                            ].map((update, index) => (
                                <div key={index}
                                    className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 
                            transition-all duration-200 cursor-pointer"
                                >
                                    <h3 className="font-semibold text-gray-800">{update.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{update.desc}</p>
                                    <p className="text-xs text-gray-500 mt-2">{update.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </SideBar>
        </div>
    );
};

export default AdminDashboard;
