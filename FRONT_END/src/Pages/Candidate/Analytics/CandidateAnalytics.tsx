import { useEffect } from "react";
import SideBar from "../../../components/Candidate/SideBar"
// import PageLoading from "../../../components/PageLoading";

const CandidateAnalytics = () => {

    // const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(()=> {
        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 2000);
    }, []);

    // if(isLoading) {
    //     return <div><PageLoading /></div>
    // }

    return (
        <>
            <SideBar heading="Analytics">
                <div className="bg-gray-200 p-4 shadow-md h-screen">
                    <div className="ml-7 w-[990px]">

                    </div>
                </div>
            </SideBar>

        </>
    )
}

export default CandidateAnalytics;
