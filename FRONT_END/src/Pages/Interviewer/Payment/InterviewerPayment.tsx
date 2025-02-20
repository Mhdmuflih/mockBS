import SideBar from "../../../components/Interviewer/Sidebar";
import PaymentBackgroundImage from '../../../assets/payment baground image.jpeg';
import Table from "../../../components/Interviewer/Table";

const InterviewerPayment = () => {

    const paymentTable = [
        { key: "date", label: "Date" },
        { key: "candidate", label: "Candidate" },
        { key: "slot", label: "slot" },
        { key: "amount", label: "Amount" },
    ];

    return (
        <>
            <SideBar heading="Payment" subHeading="Track your earnings and manage your finances" >
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
                                <h2 className="text-lg font-semibold">Total Earnings</h2>
                                <p className="text-sm">Last Updated: 25/12/2024</p>
                            </div>

                            {/* Right Button */}
                            <button className="bg-white hover:bg-[#4B4F60] hover:text-white text-black font-bold text-sm px-4 py-2 rounded-md">
                                Withdraw
                            </button>
                        </div>
                    </div>

                    {/* tabke part */}
                    
                    <Table columns={paymentTable} data={[]} />

                </div>
            </SideBar>
        </>
    )
}

export default InterviewerPayment;
