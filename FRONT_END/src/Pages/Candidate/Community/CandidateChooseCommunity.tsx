import { useEffect } from "react";
import SideBar from "../../../components/Candidate/SideBar";
// import PageLoading from "../../../components/PageLoading";

const CandidateChooseCommunity = () => {

    // const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 2000);
    }, []);

    // if (isLoading) {
    //     return <div><PageLoading /></div>
    // }

    return (
        <>
            <SideBar heading="Community">
                <div className="bg-gray-200 p-4 shadow-md h-screen">
                    <div className="ml-7 w-[990px]">
                        <div>
                            <h1 className="text-center font-bold text-3xl">Choose Your Perfect Plan</h1>
                            <h3 className="text-center text-sm">Unlock your potential with our tailored subscription options.</h3>
                        </div>

                        <div className="flex justify-evenly mt-10">
                            <div className="bg-[#93d1ff] w-96 h-80">
                                <div className="ml-5">
                                    <h1>min-pro</h1>
                                    <h1>1 / month</h1>
                                </div>

                                <div className="mt-14 ml-5">
                                    <h2>Perfect for getting started</h2>
                                    <ul className="mt-5">
                                        <li>Allow free users to book a certain number of mock interview slots per month.</li>
                                        <li>Receive basic feedback from interviewers without detailed analysis.</li>
                                        <li>Basic email support for technical issues.</li>
                                    </ul>
                                </div>
                                <div className="mt-5 flex justify-center">
                                    <button>Subscribe</button>
                                </div>
                            </div>


                            <div className="bg-[#93d1ff] w-96 h-80">
                                <div className="ml-5">
                                    <h1>Pro</h1>
                                    <h1>499 / year</h1>
                                </div>

                                <div className="mt-14 ml-5">
                                    <h2>For serious learners and professionals</h2>
                                    <ul className="mt-5">
                                        <li>Access to dedicated chat rooms where premium members can discuss interview experiences and share tips</li>
                                        <li>Connect with other candidates who have attended similar interviews.</li>
                                        <li>Receive faster responses from customer support</li>
                                    </ul>
                                </div>
                                <div className="flex justify-center ">
                                    <button>Subscribe</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </SideBar>

        </>
    )
}

export default CandidateChooseCommunity;
