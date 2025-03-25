import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../../../components/Admin/SideBar";
import { useEffect, useState } from "react";
import { fetchInterviewerAndCandidate } from "../../../Services/adminService";
import { TiArrowBack } from "react-icons/ti";
// import AdminSideLoading from "../../../components/Admin/AdminSideLoading";

const AdminInterviewDetails = () => {

    // const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [interviewerData, setInterviewerData] = useState<{ name: string, email: string, mobile: string, profileURL: string }>({
        name: "",
        email: "",
        mobile: "",
        profileURL: ""
    });
    const [candidateData, setCandidateData] = useState<{ name: string, email: string, mobile: string, profileURL: string }>({
        name: "",
        email: "",
        mobile: "",
        profileURL: ""
    });


    useEffect(() => {

        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 2000);

        const { candidateId, interviewerId }: { candidateId: string, interviewerId: string } = location.state;
        console.log(candidateId, interviewerId, 'this is that candidate and interviewer id');
        const ids: { candidateId: string, interviewerId: string } = {
            candidateId: candidateId,
            interviewerId: interviewerId
        }
        const fetchInterviewerAndCandidateData = async () => {
            try {
                const respose: any = await fetchInterviewerAndCandidate(ids)
                console.log(respose.interviewDetailsData, 'this is data')
                if (respose.success) {
                    const interviewerFormate = {
                        name: respose.interviewDetailsData[0].name,
                        email: respose.interviewDetailsData[0].email,
                        mobile: respose.interviewDetailsData[0].mobile,
                        profileURL: respose.interviewDetailsData[0].profileURL
                    }

                    const candidateFormate = {
                        name: respose.interviewDetailsData[1].name,
                        email: respose.interviewDetailsData[1].email,
                        mobile: respose.interviewDetailsData[1].mobile,
                        profileURL: respose.interviewDetailsData[1].profileURL
                    }
                    setInterviewerData(interviewerFormate);
                    setCandidateData(candidateFormate);
                } else {
                    console.log("not ok not ok");
                }
            } catch (error: any) {
                console.log("Error fetching data:", error.message);
            }
        }
        fetchInterviewerAndCandidateData();
    }, []);

    // if(isLoading) {
    //     return <div><AdminSideLoading /></div>
    // }

    return (
        <>
            <div className="flex">
                <SideBar heading="Interview Details">
                    <div className="bg-[#30323A]  p-4 shadow-md h-screen">
                        <div>
                            <TiArrowBack className="text-white text-2xl cursor-pointer" onClick={() => navigate('/admin/interviews')} />
                        </div>
                        <div className="flex justify-around mt-12">
                            {interviewerData && (
                                <div>
                                    <h1 className="text-white font-bold font-serif text-center">Interviewer</h1>
                                    <img src={interviewerData.profileURL} alt="" className="w-40 h-40 rounded-full mt-5" />
                                    <div className="text-white mt-5 font-thin">
                                        <h1>{interviewerData.name}</h1>
                                        <h1>{interviewerData.email}</h1>
                                        <h1>{interviewerData.mobile}</h1>
                                    </div>
                                </div>
                            )}
                            {candidateData && (
                                <div className="ml-20">
                                    <h1 className="text-white font-bold font-serif text-center">Candidate</h1>
                                    <img src={candidateData.profileURL} alt="" className="w-40 h-40 rounded-full mt-5" />
                                    <div className="text-white mt-5 font-thin">
                                        <h1>{candidateData.name}</h1>
                                        <h1>{candidateData.email}</h1>
                                        <h1>{candidateData.mobile}</h1>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </SideBar>
            </div>
        </>
    )
}

export default AdminInterviewDetails;
