import { useEffect, useState } from "react";
import SideBar from "../../../components/Candidate/SideBar"
import { FaUsers } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, } from 'recharts';
import { fetchScheduledInterviewCount, fetchTotalAmount } from "../../../Services/candidateService";
// import PageLoading from "../../../components/PageLoading";

const CandidateAnalytics = () => {

    const [scheduledInterviewCount, setScheduledInterviewCount] = useState<number>(0);
    const [completedInterviewCount, setCompletedInterviewCount] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
        const fetchCountOfTheData = async () => {
            const scheduledResponse: any = await fetchScheduledInterviewCount();
            const totalResponse: any = await fetchTotalAmount();
            if (!scheduledResponse || !totalResponse) {
                throw new Error("data fetch have some issue");
            }

            setScheduledInterviewCount(scheduledResponse.counts.scheduledInterviewCounts);
            setCompletedInterviewCount(scheduledResponse.counts.completedInterviewCounts);
            setTotalAmount(totalResponse.totalAmount);

            console.log(totalResponse, 'this is total')
        }
        fetchCountOfTheData();
    }, []);

    const pieData = [
        { name: 'Completed Interview', value: completedInterviewCount },
        { name: 'Scheduled Interview', value: scheduledInterviewCount },
    ];
    const COLORS = ['#4CAF50', '#FF9800', '#2196F3'];

    // const lineData = [
    //     { name: 'Week 1', users: 500 },
    //     { name: 'Week 2', users: 700 },
    //     { name: 'Week 3', users: 800 },
    //     { name: 'Week 4', users: 1000 },
    // ];

    return (
        <>
            <SideBar heading="Analytics">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 px-6 py-4">
                    {/* <Breadcrumbs/> */}
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 ">
                        {[
                            {
                                title: 'Scheduled Interview',
                                value: `${scheduledInterviewCount}`,
                                icon: <FaUsers className="w-7 h-7" />,
                                color: 'bg-white border-l-4 border-emerald-400',
                                iconColor: 'text-emerald-400'
                            },
                            {
                                title: 'Completed Interviews',
                                value: `${completedInterviewCount}`,
                                icon: <FaUsers className="w-7 h-7" />,
                                color: 'bg-white border-l-4 border-emerald-400',
                                iconColor: 'text-emerald-400'
                            },
                            {
                                title: 'Total Payed Amount',
                                value: `${totalAmount}`,
                                icon: <FaUsers className="w-7 h-7" />,
                                color: 'bg-white border-l-4 border-emerald-400',
                                iconColor: 'text-emerald-400'
                            },

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
                    </div>

                </main>
            </SideBar>

        </>
    )
}

export default CandidateAnalytics;
