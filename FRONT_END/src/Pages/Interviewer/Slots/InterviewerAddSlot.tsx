import { useNavigate } from "react-router-dom";
import { useState, useEffect, FormEvent } from "react";
import SideBar from "../../../components/Interviewer/Sidebar";
import { TiArrowBack } from "react-icons/ti";
import { addSlotInterviewer, fetchStackData } from "../../../Services/interviewerService";

import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { AddSlotValidation } from "../../../Validations/addSlotValidation";

const InterviewerAddSlot = () => {


    const convertTo12HourFormat = (time: string) => {
        const [hour, minute] = time.split(":").map(Number);
        const suffix = hour >= 12 ? "PM" : "AM";
        const newHour = hour % 12 || 12;
        return `${newHour}:${minute < 10 ? "0" + minute : minute} ${suffix}`;
    };


    const navigate = useNavigate();
    const [stacks, setStacks] = useState<{ _id: string; stackName: string; technologies: string[] }[]>([]);
    const [selectedStack, setSelectedStack] = useState<string>("");
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [selectedTechnology, setSelectedTechnology] = useState<string>("");

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [formData, setFormData] = useState({
        date: "",
        fromTime: "",
        toTime: "",
        title: "",
        price: "",
        description: ""
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        const { errors } = AddSlotValidation({ ...formData, [name]: value });
        setErrors(errors);
    };

    useEffect(() => {
        const fetchStacks = async () => {
            const response: any = await fetchStackData();
            if (response.success) {
                // console.log(response.stackData, 'this is stack Data');
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
        setSelectedTechnology("");

        if (!selected) {
            setErrors((prev) => ({ ...prev, stack: "Stack is required." }));
        } else {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.stack;
                return newErrors;
            });
        }
    };

    const handleToSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!selectedStack || !selectedTechnology || !formData.date || !formData.fromTime || !formData.toTime || !formData.title || !formData.price) {
            toast.error("Please fill all required fields.");
            return;
        }

        const { errors, valid } = AddSlotValidation(formData);

        if (!valid) {
            setErrors(errors);
            Object.values(errors).forEach((error) => toast.error(error));
            return;
        }

        const formattedFromTime = convertTo12HourFormat(formData.fromTime);
        const formattedToTime = convertTo12HourFormat(formData.toTime);

        const dataToSend = {
            stack: {
                stackName: selectedStack,
                technologies: selectedTechnology
            },
            date: formData.date,
            fromTime: formattedFromTime,
            toTime: formattedToTime,
            title: formData.title,
            price: formData.price,
            description: formData.description
        };
        try {
            const response: any = await addSlotInterviewer(dataToSend);
            if (response.success) {
                Swal.fire({
                    title: "Success!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: "OK",
                })
                .then(() => {
                    toast.success(response.message);
                    navigate('/interviewer/slot')
                })
            } else {
                toast.error(response.message);
            }
        } catch (error: any) {
            console.log(error.message);
            toast.error(error?.message || "An unexpected error occurred. Please try again later.");
        }
    }

    return (
        <div>
            <SideBar heading="Slots List">

                <Toaster position="top-right" reverseOrder={false} />

                <div className="bg-[#30323A] ml-1 p-6 rounded-b-lg shadow-md h-[73vh] overflow-y-auto">
                    <div>
                        <TiArrowBack className="text-white text-2xl cursor-pointer" onClick={() => navigate('/interviewer/slot')} />
                    </div>
                    <form className="space-y-6 mt-7 ml-8" onSubmit={handleToSubmit}>
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
                            {errors.stack && <p className="text-red-500 text-sm">{errors.stack}</p>}
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
                            <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="p-2 rounded-md bg-[#181A22] text-white border border-gray-600" />
                            {errors.date && <p className="text-red-500 error">{errors.date}</p>}
                        </div>
                        <div className="flex text-white space-x-10">
                            <div className="flex flex-col">
                                <label className="mb-1">From:</label>
                                <input type="time" name="fromTime" value={formData.fromTime} onChange={handleInputChange} className="p-2 rounded-md bg-[#181A22] text-white border border-gray-600" />
                                {errors.fromTime && <p className="text-red-500 error">{errors.fromTime}</p>}
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1">To:</label>
                                <input type="time" name="toTime" value={formData.toTime} onChange={handleInputChange} className="p-2 rounded-md bg-[#181A22] text-white border border-gray-600" />
                                {errors.toTime && <p className="text-red-500 error">{errors.toTime}</p>}
                            </div>

                        </div>
                        <div className="flex flex-col">
                            <label className="text-white mb-1">Title:</label>
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="p-2 rounded-md bg-[#181A22] text-white border border-gray-600" />
                            {errors.title && <p className="text-red-500 error">{errors.title}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-white mb-1">Price:</label>
                            <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="p-2 rounded-md bg-[#181A22] text-white border border-gray-600" />
                            {errors.price && <p className="text-red-500 error">{errors.price}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-white mb-1">Description:</label>
                            <textarea rows={4} name="description" value={formData.description} onChange={handleInputChange} className="p-2 rounded-md bg-[#181A22] text-white border border-gray-600 resize-none" />
                            {errors.description && <p className="text-red-500 error">{errors.description}</p>}
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
