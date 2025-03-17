import { useEffect, useState } from "react";
import SideBar from "../../../components/Candidate/SideBar";
import { getExpertInterviewerList, GetStack } from "../../../Services/candidateService";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import PageLoading from "../../../components/PageLoading";

const CandidateHome = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate();
    const [stacks, setStacks] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState<any>("");
    const [tech, setTech] = useState("");
    const [selectedStack, setSelectedStack] = useState<any>(null);
    const [technologies, setTechnologies] = useState<any>([]);
    const [interviewers, setInterviewers] = useState<any>([]);

    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        const paymentStatus = localStorage.getItem("paymentStatus");

        if (paymentStatus === "failed") {
            toast.error("Payment Failed! Please try again.");
            localStorage.removeItem("paymentStatus"); // Clear after showing toast
        }

        const fetchStack = async () => {
            try {
                const response: any = await GetStack();
                if (response.success) {
                    setStacks(response.stackData);
                } else {
                    console.log("not ready not ready");
                }
            } catch (error: any) {
                console.log("Error fetching data:", error.message);
            }
        };
        fetchStack();
    }, []);

    if(isLoading) {
        return <div><PageLoading /></div>
    }

    const handleStackClick = (stack: any) => {
        setSelectedStack(stack);
        setTechnologies(stack.technologies);
        setInterviewers([]);
        setSearchTerm("");
    };

    const handleTechClick = async (tech: string) => {
        try {
            setSearchTerm("");
            setTech(tech);
            const response: any = await getExpertInterviewerList(tech);
            if (response.success) {
                setInterviewers(response.matchedData.interviewers);
            } else {
                console.log("API Response Not Successful");
            }
        } catch (error: any) {
            console.log("Error fetching data:", error.message);
        }
    };

    // searching in 3 parts
    // ------------------------
    const filteredStacks = stacks.filter((stack: any) =>
        stack.stackName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredTechnologies = technologies.filter((tech: any) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredInterviewers = interviewers.filter((interviewer: any) =>
        interviewer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToNavigateInterviewerDetails = (interviewerId: string) => {
        navigate(`/candidate/interviewer-slot-details/${interviewerId}?selectedTech=${tech}`)
    }

    return (
        <div>

            <Toaster position="top-right" reverseOrder={false} />


            <SideBar heading="Request Interviews">
                <div className="bg-[#30323A] ml-1 p-4 rounded-b-lg shadow-md h-[439px] w-[1050px]">
                    <div className="mt-1">
                        <label htmlFor="search" className="sr-only">Search</label>
                        <div className="relative">
                            <input
                                type="text"
                                id="search"
                                placeholder="Search here..."
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                className="w-full p-2 pl-10 text-sm rounded-md bg-[#181A22] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                        </div>
                    </div>

                    {!selectedStack ? (
                        <div className="grid grid-cols-4 gap-10 mt-7 w-full">
                            {filteredStacks.map((stack: any) => (
                                <div
                                    key={stack.stackName}
                                    className="bg-white w-full text-center p-3 rounded-md hover:cursor-pointer hover:bg-[#999999] hover:text-white"
                                    onClick={() => handleStackClick(stack)}
                                >
                                    <h1 className="font-bold">{stack.stackName}</h1>
                                </div>
                            ))}
                        </div>
                    ) : null}

                    {selectedStack && technologies.length > 0 && interviewers.length === 0 && (
                        <div className="mt-7 w-full grid grid-cols-4 gap-10">
                            {filteredTechnologies.map((tech: any) => (
                                <div
                                    key={tech}
                                    className="bg-white w-full text-center p-3 rounded-md hover:cursor-pointer hover:bg-[#999999] hover:text-white"
                                    onClick={() => handleTechClick(tech)}
                                >
                                    <h1 className="font-bold">{tech}</h1>
                                </div>
                            ))}
                        </div>
                    )}

                    {tech && interviewers.length === 0 ? (
                        <div className="mt-7 text-white text-center">
                            <p className="text-gray-400">No interviewers available for {tech} at the moment.</p>
                        </div>
                    ) : interviewers.length > 0 ? (
                        <div className="mt-7 w-full">
                            <ul className="list-none text-white w-full">
                                {filteredInterviewers.map((interviewer: any, index: number) => (
                                    <li
                                        key={index}
                                        className="p-2 border border-gray-700 rounded-md mt-2 w-full hover:bg-slate-500 hover:cursor-pointer duration-500"
                                        onClick={() => handleToNavigateInterviewerDetails(interviewer.id)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={interviewer.profileURL}
                                                alt={interviewer.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div>
                                                <h3 className="font-bold">{interviewer.name}</h3>
                                                <p className="text-sm text-gray-300">{interviewer.currentDesignation} at {interviewer.organization}</p>
                                                <p className="text-sm text-gray-400">Experience: {interviewer.yearOfExperience} years</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}

                </div>
            </SideBar>
        </div>
    );
};

export default CandidateHome;
