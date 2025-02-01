import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBar from "../../../components/Interviewer/Sidebar";
import { TiArrowBack } from "react-icons/ti";
import { fetchStackData } from "../../../Services/interviewerService";

const InterviewerAddSlot = () => {
    const navigate = useNavigate();
    const [stacks, setStacks] = useState<{ _id: string; stackName: string; technologies: string[] }[]>([]);
    const [selectedStack, setSelectedStack] = useState<string>("");
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [selectedTechnology, setSelectedTechnology] = useState<string>("");

    useEffect(() => {
        const fetchStacks = async () => {
            const response: any = await fetchStackData();
            if (response.success) {
                console.log(response.stackData, 'this is stack Data');
                setStacks(response.stackData);
            } else {
                console.log('failed failed');
            }
        };
        fetchStacks();
    }, []);

    const handleStackChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setSelectedStack(selected);
        const stack = stacks.find((s) => s.stackName === selected);
        setTechnologies(stack ? stack.technologies : []);
        setSelectedTechnology(""); // Reset technology selection
    };

    return (
        <div>
            <SideBar heading="Slots List">
                <div className="bg-[#30323A] ml-1 p-6 rounded-b-lg shadow-md h-[73vh] overflow-y-auto">
                    <div>
                        <TiArrowBack className="text-white text-2xl cursor-pointer" onClick={() => navigate('/interviewer/slot')} />
                    </div>
                    <form className="space-y-6 mt-7 ml-8">
                        <div className="flex flex-col">
                            <label className="text-white mb-1">Stack:</label>
                            <select
                                className="p-2 rounded-md bg-[#181A22] text-white border border-gray-600"
                                value={selectedStack}
                                onChange={handleStackChange}
                            >
                                <option value="">Select Stack</option>
                                {stacks.map((stack) => (
                                    <option key={stack._id} value={stack.stackName}>{stack.stackName}</option>
                                ))}

                            </select>
                        </div>

                        {selectedStack && (
                            <div className="flex flex-col">
                                <label className="text-white mb-1">Technology:</label>
                                <select
                                    className="p-2 rounded-md bg-[#181A22] text-white border border-gray-600"
                                    value={selectedTechnology}
                                    onChange={(event) => setSelectedTechnology(event.target.value)}
                                >
                                    <option value="">Select Technology</option>
                                    {technologies.map((tech) => (
                                        <option key={tech} value={tech}>{tech}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="flex flex-col">
                            <label className="text-white mb-1">Date:</label>
                            <input type="date" className="p-2 rounded-md bg-[#181A22] text-white border border-gray-600" />
                        </div>
                        <div className="flex text-white space-x-10">
                            <div className="flex flex-col">
                                <label className="mb-1">From:</label>
                                <input type="time" className="p-2 rounded-md bg-[#181A22] text-white border border-gray-600" />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1">To:</label>
                                <input type="time" className="p-2 rounded-md bg-[#181A22] text-white border border-gray-600" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white mb-1">Title:</label>
                            <input type="text" className="p-2 rounded-md bg-[#181A22] text-white border border-gray-600" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white mb-1">Price:</label>
                            <input type="number" className="p-2 rounded-md bg-[#181A22] text-white border border-gray-600" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white mb-1">Description:</label>
                            <textarea rows={4} className="p-2 rounded-md bg-[#181A22] text-white border border-gray-600 resize-none" />
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="bg-white text-black p-3 rounded-xl hover:bg-[#4B4F60] hover:text-white duration-500">
                                Add Slot
                            </button>
                        </div>
                    </form>
                </div>
            </SideBar>
        </div>
    );
}

export default InterviewerAddSlot;
