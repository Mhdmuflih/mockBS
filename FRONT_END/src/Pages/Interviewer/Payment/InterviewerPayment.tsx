import SideBar from "../../../components/Interviewer/Sidebar";
import PaymentBackgroundImage from '../../../assets/payment baground image.jpeg';
import { useEffect, useState } from "react";
import { getPaymentData, wallterWithdraw } from "../../../Services/interviewerService";
// import PageLoading from "../../../components/PageLoading";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const InterviewerPayment = () => {

    // const [isLoading, setIsLoading] = useState(true);
    const [walletData, setWalletData] = useState<any | null>(null);
    const [isModal, setIsModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState<any | number>("");

    useEffect(() => {
        // setTimeout(() => setIsLoading(false), 2000);

        const fetchPaymentData = async () => {
            const response: any = await getPaymentData();
            if (response.success) {
                setWalletData(response.paymentData);
            } else {
                console.log("Failed to fetch payment data");
            }
        };
        fetchPaymentData();
    }, []);

    // if (isLoading) return <PageLoading />;

    const handleToWithdraw = () => setIsModal(true);
    const handleCloseModal = () => setIsModal(false);

    const handleWithdrawSubmit = async () => {
        if (!withdrawAmount || withdrawAmount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

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
            const response: any = await wallterWithdraw(withdrawAmount);
            if (response.success) {
                toast.success(response.message);
                setWalletData(response.walletData);
            } else {
                toast.error(response.message);
            }
        }

        setWithdrawAmount("");
        setIsModal(false);
    };

    if(!walletData) {
        return <div>Loading....</div>
    }

    return (
        <SideBar heading="Payment" subHeading="Track your earnings and manage your finances">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="bg-[#30323A] p-4 shadow-md min-h-screen text-white">
                <div className="relative w-full h-32 rounded-lg overflow-hidden">
                    <img src={PaymentBackgroundImage} alt="Payment Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-between px-6 bg-black bg-opacity-50">
                        <div>
                            <h2 className="text-lg font-semibold">Total Earnings  <span className={`text-3xl ml-4 font-bold ${walletData.balance > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {walletData.balance}
                            </span></h2>
                            <p className="text-sm">Last Updated: 25/12/2024</p>
                        </div>
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-md" onClick={handleToWithdraw}>Withdraw</button>
                    </div>
                </div>

                {/* Table */}
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full rounded-lg">
                        <thead>
                            <tr className="bg-black ">
                                <th className="p-3 ">Sl NO</th>
                                <th className="p-3 ">Date</th>
                                <th className="p-3 ">Status</th>
                                <th className="p-3 ">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-black">
                            {walletData?.walletHistory.map((data: any, index: number) => (
                                <tr key={index} className="text-center">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{new Date(data.date).toISOString().split('T')[0]}</td>
                                    <td className={`p-3 ${data.description === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                                        {data.description}
                                    </td>
                                    <td className={`p-3  ${data.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {data.amount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                {/* Withdrawal Modal */}
                {isModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-md shadow-md w-96 text-black">
                            <h2 className="text-xl font-semibold mb-4">Withdraw Funds</h2>
                            <label className="block mb-2 text-sm font-medium">Amount:</label>
                            <input type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(Number(e.target.value))} className="w-full border px-3 py-2 rounded-md" placeholder="Enter amount" />
                            <div className="flex justify-end mt-4">
                                <button className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2" onClick={handleCloseModal}>Cancel</button>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleWithdrawSubmit}>Withdraw</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SideBar>
    );
};

export default InterviewerPayment;
