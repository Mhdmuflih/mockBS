import { FormEvent, useState } from "react";
import SideBar from "../../../components/Admin/SideBar";
import { IoIosAddCircle } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { addStack } from "../../../Services/adminService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { validateStackForm } from "../../../Validations/stackValidation";
import toast, { Toaster } from "react-hot-toast";

const AdminAddStack = () => {
    const navigate = useNavigate();
    const [stackName, setStackName] = useState("");
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [techInput, setTechInput] = useState("");
    const [errors, setErrors] = useState<any>({});

    const handleAddTechnology = () => {
        const trimmedInput = techInput.trim();

        if (!trimmedInput) {
            toast.error("Empty input is not allowed.");
            return;
        }

        if (technologies.includes(trimmedInput)) {
            toast.error("This technology is already added.");
            return;
        }

        setTechnologies([...technologies, trimmedInput]);
        setTechInput("");
    };

    const handleRemoveTechnology = (index: number) => {
        setTechnologies(technologies.filter((_, i) => i !== index));
    };

    const handleToSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const validation = validateStackForm(stackName, technologies);
        setErrors(validation.errors);

        if (!validation.isValid) return;

        try {
            const formData = { stackName, technologies };
            const response: any = await addStack(formData);
            if (response.success) {
                Swal.fire({
                    titleText: "Success!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: "OK",
                });
                navigate("/admin/stack");
            } else {
                Swal.fire({
                    titleText: "Error!",
                    text: response.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error: any) {
            console.log(error.message);
            Swal.fire({
                titleText: "Error!",
                text: error.message || "An unexpected error occurred.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="flex">
            <SideBar heading="Stack">
                <Toaster position="top-right" />
                <div className="bg-[#30323A] w-full p-4 min-h-screen overflow-auto">
                    <div className="flex justify-center mt-10 px-4">
                        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">
                            <form onSubmit={handleToSubmit} className="space-y-6">
                                {/* Stack Name */}
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Name of the Stack"
                                        className="bg-black text-white p-3 w-full rounded-md outline-none"
                                        value={stackName}
                                        onChange={(e) => setStackName(e.target.value)}
                                    />
                                    {errors.stackName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.stackName}</p>
                                    )}
                                </div>

                                {/* Technologies */}
                                <div>
                                    <label className="block text-sm mb-2">Add Technologies</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            className="bg-black text-white p-3 flex-grow rounded-md outline-none"
                                            placeholder="Enter technology name"
                                            value={techInput}
                                            onChange={(e) => setTechInput(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddTechnology}
                                            className="text-3xl text-black hover:text-blue-600"
                                            title="Add Technology"
                                        >
                                            <IoIosAddCircle />
                                        </button>
                                    </div>

                                    {technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-4 bg-black p-3 rounded-md">
                                            {technologies.map((tech, index) => (
                                                <div key={index} className="flex items-center bg-white text-black px-3 py-1 rounded-full">
                                                    <span>{tech}</span>
                                                    <IoCloseSharp
                                                        onClick={() => handleRemoveTechnology(index)}
                                                        className="ml-2 text-red-600 cursor-pointer hover:text-red-800"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {errors.technologies && (
                                        <p className="text-red-500 text-sm mt-1">{errors.technologies}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition"
                                    >
                                        Add Stack
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </SideBar>
        </div>
    );
};

export default AdminAddStack;
