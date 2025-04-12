import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Candidate/SideBar";
import { getExpertInterviewerList, GetStack } from "../../../Services/candidateService";
import { NavigateFunction, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ICandidateHomeApiResponse, ICandidateHomeInterviewerApiResponse } from "../../../Interface/candidateInterfaces/IApiResponce";
import { IInterviewer, IStack } from "../../../Interface/candidateInterfaces/interface";

const CandidateHome: React.FC = () => {

    const navigate:  NavigateFunction = useNavigate();
    const [stacks, setStacks] = useState<IStack[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [tech, setTech] = useState<string>("");
    const [selectedStack, setSelectedStack] = useState<IStack | null>(null);
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [interviewers, setInterviewers] = useState<IInterviewer[]>([]);

    useEffect(() => {

        const paymentStatus = localStorage.getItem("paymentStatus");
        if (paymentStatus === "failed") {
            toast.error("Payment Failed! Please try again.");
            localStorage.removeItem("paymentStatus");
        }

        const fetchStack = async (): Promise<void> => {
            try {
                const response: ICandidateHomeApiResponse = await GetStack();
                if (response.success) {
                    setStacks(response.stackData);
                } else {
                    console.log("Stack data not available.");
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Error fetching stack data:", error.message);
                } else {
                    console.error("An unknown error occurred while fetching stack data.");
                }
            }
        };
        fetchStack();
    }, []);


    const handleStackClick = (stack: IStack): void => {
        setSelectedStack(stack);
        setTechnologies(stack.technologies);
        setInterviewers([]);
        setSearchTerm("");
    };

    const handleTechClick = async (tech: string): Promise<void> => {
        try {
            setSearchTerm("");
            setTech(tech);
            const response: ICandidateHomeInterviewerApiResponse = await getExpertInterviewerList(tech);
            if (response.success) {
                setInterviewers(response.matchedData.interviewers);
            } else {
                console.log("API Response Not Successful");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Error fetching data:", error.message);
            } else {
                console.log("An unknown error occurred.");
            }
        }
    };

    // searching in 3 parts
    // ------------------------
    const filteredStacks: IStack[] = stacks.filter((stack: IStack) =>
        stack.stackName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredTechnologies: string[] = technologies.filter((tech: string) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredInterviewers: IInterviewer[] = interviewers.filter((interviewer: IInterviewer) =>
        interviewer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToNavigateInterviewerDetails = (interviewerId: string): void => {
        navigate(`/candidate/interviewer-slot-details/${interviewerId}?selectedTech=${tech}`)
    }

    return (
        <div>

            <Toaster position="top-right" reverseOrder={false} />

            <SideBar heading="Request Interviews">
                <div className="bg-gray-200 p-4 shadow-md h-screen">
                    <div className="mt-1">
                        <label htmlFor="search" className="sr-only">Search</label>
                        <div className="relative">
                            <input
                                type="text"
                                id="search"
                                placeholder="Search here..."
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                className="w-full p-2 pl-10 text-sm rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                        </div>
                    </div>

                    {!selectedStack ? (
                        <div className="grid grid-cols-4 gap-10 mt-7 w-full">
                            {filteredStacks.map((stack: any) => (
                                <div
                                    key={stack.stackName}
                                    className="bg-white w-full text-center p-3 rounded-md hover:cursor-pointer hover:bg-gray-800 hover:text-white"
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
                                    className="bg-white w-full text-center p-3 rounded-md hover:cursor-pointer hover:bg-gray-800 hover:text-white"
                                    onClick={() => handleTechClick(tech)}
                                >
                                    <h1 className="font-bold">{tech}</h1>
                                </div>
                            ))}
                        </div>
                    )}

                    {tech && interviewers.length === 0 ? (
                        <div className="mt-7 text-white text-center">
                            <p className="text-gray-800">No interviewers available for {tech} at the moment.</p>
                        </div>
                    ) : interviewers.length > 0 ? (
                        <div className="mt-7 w-full">
                            <ul className="list-none text-white w-full">
                                {filteredInterviewers.map((interviewer: any, index: number) => (
                                    <li
                                        key={index}
                                        className="p-2 bg-gray-800 border border-gray-700 rounded-md mt-2 w-full hover:bg-slate-500 hover:cursor-pointer duration-500"
                                        onClick={() => handleToNavigateInterviewerDetails(interviewer.id)}
                                    >
                                        <div className="flex items-center gap-8">
                                            <img
                                                src={interviewer.profileURL}
                                                alt={interviewer.name}
                                                className="w-10 h-10 rounded-full ml-5"
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
