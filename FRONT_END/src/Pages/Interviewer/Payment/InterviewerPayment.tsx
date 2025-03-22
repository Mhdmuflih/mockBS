import SideBar from "../../../components/Interviewer/Sidebar";
import PaymentBackgroundImage from '../../../assets/payment baground image.jpeg';
import { useEffect, useState } from "react";
import { getPaymentData, wallterWithdraw } from "../../../Services/interviewerService";
import PageLoading from "../../../components/PageLoading";
import Swal from "sweetalert2";
import toast from "react-hot-toast"
import { Toaster } from "react-hot-toast";

const InterviewerPayment = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [walletData, setWalletData] = useState<any | null>(null);
    const [isModal, setIsModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState<number | "">("");

    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        const fetchPaymentData = async () => {
            const response: any = await getPaymentData();
            console.log(response, 'this is response')
            if (response.success) {
                // const formattedData: any = response.paymentData.walletHistory.map((walletData: any) => ({
                //     date: new Date(walletData.updatedAt).toISOString().split('T')[0], // Extracts only date part
                //     candidate: walletData.candidateId?.toString(), // Convert ObjectId to string if needed
                //     technology: walletData.scheduleData?.technology || "N/A", // Default value if missing
                //     slot: `${walletData?.scheduleData?.from || "N/A"} - ${walletData?.scheduleData?.to || "N/A"}`,
                //     amount: walletData.scheduleData?.price || 0, // Default to 0 if missing
                // }));

                console.log(response.paymentData, "this is payment data");

                setWalletData(response.paymentData);

                // console.log(response.paymentData, 'this is payment data');
                // setPaymentData(formattedData);
            } else {
                console.log("not ok not ok not ok");
            }
        }
        fetchPaymentData()
    }, [])

    if (isLoading) {
        return <div><PageLoading /></div>
    }

    // Handle opening and closing the modal
    const handleToWithdraw = () => setIsModal(true);
    const handleCloseModal = () => setIsModal(false);

    const handleWithdrawSubmit = async () => {
        setIsModal(true);
        try {
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
                console.log(response, 'this is response of send money');
                if (response.success) {
                    toast.success(response.message);
                    setWalletData(response.walletData);
                } else {
                    toast.error(response.message);
                }
            }

            // const responce: any = await wallterWithdraw(withdrawAmount);
            // if (responce.success) {
            //     console.log("set set set");
            // } else {
            //     console.log("not set not set");
            // }

            setWithdrawAmount(""); // Reset input
            setIsModal(false); // Close modal
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <>
            <SideBar heading="Payment" subHeading="Track your earnings and manage your finances" >
                <Toaster position="top-right" reverseOrder={false} />

                <div className="bg-[#30323A] ml-1 p-3 rounded-b-lg shadow-md h-[69vh]">
                    <div className="relative w-full h-32 rounded-lg overflow-hidden">
                        {/* Background Image */}
                        <img
                            src={PaymentBackgroundImage}
                            alt="paymentBackground"
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay Content */}
                        <div className="absolute inset-0 flex items-center justify-between px-6 text-white">
                            {/* Left Content */}
                            <div>
                                <h2 className="text-lg font-semibold">Total Earnings  <span className="text-3xl ml-4">{walletData.balance}</span></h2>
                                <p className="text-sm">Last Updated: 25/12/2024</p>
                            </div>

                            {/* Right Button */}
                            <button
                                className="bg-white hover:bg-[#4B4F60] hover:text-white text-black font-bold text-sm px-4 py-2 rounded-md"
                                onClick={handleToWithdraw}
                            >
                                Withdraw
                            </button>
                        </div>
                    </div>

                    {/* tabke part */}

                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sl NO</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {walletData && walletData.walletHistory.map((data: any, index: number) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{new Date(data.date).toISOString().split('T')[0]}</td>
                                        <td>{data.description}</td>
                                        <td>{data.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Withdrawal Modal */}
                    {isModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-md shadow-md w-96">
                                <h2 className="text-xl font-semibold mb-4">Withdraw Funds</h2>

                                <label className="block mb-2 text-sm font-medium">Amount:</label>
                                <input
                                    type="number"
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                                    className="w-full border px-3 py-2 rounded-md"
                                    placeholder="Enter amount"
                                />

                                <div className="flex justify-end mt-4">
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                                        onClick={handleCloseModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                        onClick={handleWithdrawSubmit}
                                    >
                                        Withdraw
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </SideBar>
        </>
    )
}

export default InterviewerPayment;
