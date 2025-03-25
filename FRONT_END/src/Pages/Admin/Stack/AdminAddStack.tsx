import { FormEvent, useState } from "react";
import SideBar from "../../../components/Admin/SideBar";
import { IoIosAddCircle } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { addStack } from "../../../Services/adminService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { validateStackForm } from "../../../Validations/stackValidation";

import toast from "react-hot-toast"
import { Toaster } from "react-hot-toast";

const AdminAddStack = () => {

    const navigate = useNavigate();
    const [stackName, setStackName] = useState("");
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [techInput, setTechInput] = useState("");

    const [errors, setErrors] = useState<any>({})

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

        if (!validation.isValid) {
            return;
        }


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
                navigate('/admin/stack');
            } else {
                Swal.fire({
                    titleText: "Error!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
        } catch (error: any) {
            console.log(error.message);
            Swal.fire({
                titleText: "Error!",
                text: error.message || "An unexpected error occurred. Please try again later.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    }


    return (
        <>
            <div className="flex">
                <SideBar heading="Stack">

                    <Toaster position="top-right" reverseOrder={false} />

                    <div className="bg-[#30323A]  p-4 shadow-md h-screen overflow-auto">

                        <div className="flex justify-center mt-16">
                            <div className="bg-white p-10">
                                <form className="space-y-6" onSubmit={handleToSubmit}>
                                    <div className="">
                                        <input
                                            type="text"
                                            placeholder="Name of the Stack"
                                            className="bg-black p-2 w-80 text-white"
                                            value={stackName}
                                            onChange={(e) => setStackName(e.target.value)}
                                        />
                                        {errors.stackName && (
                                            <p className="text-red-500 text-sm ">{errors.stackName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <div className="mb-3">
                                            <span>add Technology :</span>
                                        </div>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                className="bg-black p-2 w-72 text-white"
                                                value={techInput}
                                                onChange={(e) => setTechInput(e.target.value)}
                                            />
                                            <div className="mt-3 ml-3">
                                                <IoIosAddCircle className="hover:cursor-pointer" onClick={handleAddTechnology} />
                                            </div>

                                        </div>
                                        <div className="grid grid-cols-3 gap-3 bg-black w-72 p-3 ">
                                            {technologies.map((tech, index) => (
                                                <div key={index} className="flex items-center gap-2 ">
                                                    <span className="bg-white text-black rounded-xl px-3 py-1">
                                                        {tech}
                                                    </span>
                                                    <IoCloseSharp
                                                        className="text-white cursor-pointer"
                                                        onClick={() => handleRemoveTechnology(index)}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {errors.technologies && (
                                            <p className="text-red-500 text-sm ">{errors.technologies}</p>
                                        )}
                                    </div>

                                    <div className="ml-64">
                                        <button className="p-4 rounded-xl bg-black text-white" >Add Stack</button>
                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>
                </SideBar>
            </div>
        </>
    )
}

export default AdminAddStack;
