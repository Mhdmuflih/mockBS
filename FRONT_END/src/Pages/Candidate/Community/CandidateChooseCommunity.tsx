import { useEffect, useState } from "react";
import SideBar from "../../../components/Candidate/SideBar";
import PageLoading from "../../../components/PageLoading";

const CandidateChooseCommunity = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    if (isLoading) {
        return <div><PageLoading /></div>
    }

    return (
        <>
            <SideBar heading="Community">
                <div className="bg-[#30323A] ml-1 p-4 rounded-b-lg shadow-md h-[439px]">
                    <div className="ml-7 w-[990px]">

                    </div>
                </div>
            </SideBar>

        </>
    )
}

export default CandidateChooseCommunity;
