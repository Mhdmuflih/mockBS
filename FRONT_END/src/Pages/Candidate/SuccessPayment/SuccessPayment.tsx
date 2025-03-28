import { useNavigate, useSearchParams } from "react-router-dom";
import SideBar from "../../../components/Candidate/SideBar";
import { useEffect, useRef, useState } from "react";
import { updatePaymentStatus } from "../../../Services/candidateService";
import PageLoading from "../../../components/PageLoading";

const SuccessPayment = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [searchParams] = useSearchParams();
    const sessionId: any = searchParams.get("transaction_id");
    const status: any = searchParams.get("status");


    const navigate = useNavigate();
    const hasFetched = useRef(false); // Prevent multiple API calls

    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        console.log(status, 'this is status')
        if (status === "cancelled") {
            localStorage.setItem("paymentStatus", "failed"); // Store failed status
            navigate("/candidate/home");
            return;
        }

        if (!sessionId || hasFetched.current) return; // Prevent re-calling
        hasFetched.current = true;


        const checkPaymentStatus = async () => {
            const response: any = await updatePaymentStatus(sessionId);
            if (response.success) {
                console.log("Updated payment status");
            } else {
                console.log("Payment status is not updated");
            }
        };
        checkPaymentStatus();
    }, [sessionId, status]); // Only run when sessionId changes

    if (isLoading) {
        return <div><PageLoading /></div>
    }

    const handleToHomePage = () => {
        navigate('/candidate/home');
    };

    const handleToDetailsPage = () => {
        navigate('/candidate/outsourced-interviews');
    };

    return (
        <SideBar heading="Success Payment">
            <div className="bg-[#30323A] p-4 rounded-b-lg shadow-md h-screen flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                    <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-4">
                        <path fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                        </path>
                    </svg>
                    <h3 className="md:text-2xl text-lg text-gray-900 font-semibold">Payment Successful!</h3>
                    <p className="text-gray-600 mt-2">We have received your payment.</p>
                    <p className="text-gray-600">We’ll be in touch shortly!</p>
                    <div className="mt-6">
                        <div className="flex justify-between">
                            <button
                                onClick={handleToHomePage}
                                className="p-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg"
                            >
                                Home
                            </button>
                            <button
                                onClick={handleToDetailsPage}
                                className="p-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </SideBar>
    );
};

export default SuccessPayment;
