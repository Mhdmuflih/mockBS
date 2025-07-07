import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import SideBar from "../../../components/Admin/SideBar";
import { fetchStackList, updateStack } from "../../../Services/adminService";
import { IoCloseSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const AdminStackList = () => {
    const navigate = useNavigate();
    const [stackList, setStackList] = useState<any[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null);
    const [stackName, setStackName] = useState("");
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [techInput, setTechInput] = useState("");

    const fetchStackData = async () => {
        try {
            const response: any = await fetchStackList();
            if (response.success) {
                setStackList(response.stackData);
            }
        } catch (error: any) {
            console.log("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchStackData();
    }, []);

    const handleToAddStack = () => {
        navigate('/admin/add-stack');
    };

    const openEditModal = (stack: any) => {
        setEditData(stack);
        setStackName(stack.stackName);
        setTechnologies([...stack.technologies]);
        setIsEditModalOpen(true);
    };

    const closeModal = () => {
        setIsEditModalOpen(false);
        setStackName("");
        setTechnologies([]);
        setTechInput("");
    };

    const handleAddTechnology = () => {
        const trimmed = techInput.trim();
        if (!trimmed) {
            toast.error("Empty input not allowed.");
            return;
        }
        if (technologies.includes(trimmed)) {
            toast.error("Technology already added.");
            return;
        }
        setTechnologies([...technologies, trimmed]);
        setTechInput("");
    };

    const handleRemoveTechnology = (index: number) => {
        setTechnologies(technologies.filter((_, i) => i !== index));
    };

    const isFormValid = () => {
        if (!stackName.trim()) {
            toast.error("Stack name cannot be empty");
            return false;
        }

        if (technologies.length === 0) {
            toast.error("Please add at least one technology");
            return false;
        }

        const isSameStackName = stackName.trim() === editData?.stackName;
        const isSameTechs = JSON.stringify(technologies.sort()) === JSON.stringify(editData?.technologies.sort());

        if (isSameStackName && isSameTechs) {
            toast.error("No changes detected to update");
            return false;
        }

        return true;
    };


    const handleEditSubmit = async () => {
        if (!isFormValid()) return;
        try {
            const formData = { stackName, technologies };
            const response: any = await updateStack(editData._id, formData);
            console.log(response, 'this is response')
            if (response.success) {
                toast.success("Stack updated successfully");
                closeModal();
                fetchStackData();
            } else {
                toast.error(response.message || "Update failed");
            }
        } catch (error: any) {
            toast.error(error.message || "Unexpected error");
        }
    };

    const handleDelete = async (id: string) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this stack?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                // const response: any = await deleteStack(id);
                // if (response.success) {
                //     toast.success("Stack deleted successfully");
                //     fetchStackData();
                // } else {
                //     toast.error("Delete failed");
                // }
            } catch (err: any) {
                toast.error("Error: " + err.message);
            }
        }
    };

    return (
        <div className="flex">
            <Toaster position="top-right" />
            <SideBar heading="Stack">
                <div className="bg-[#30323A] p-4 shadow-md h-screen overflow-auto">
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={handleToAddStack}
                            className="flex items-center bg-white text-black font-bold py-2 px-4 rounded-lg hover:bg-black hover:text-white"
                        >
                            <IoAddCircle className="mr-2 text-xl" />
                            Add Stack
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {stackList.map((stack) => (
                            <div key={stack._id} className="bg-black text-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold">{stack.stackName}</h3>
                                <ul className="mt-2">
                                    {stack.technologies.map((tech: string) => (
                                        <li key={tech} className="text-sm">{tech}</li>
                                    ))}
                                </ul>
                                <div className="flex justify-end space-x-3 mt-3">
                                    <button
                                        onClick={() => openEditModal(stack)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(stack._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Edit Modal */}
                    {isEditModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                            <div className="bg-white w-full max-w-md p-6 rounded-xl relative">
                                <button onClick={closeModal} className="absolute top-3 right-3 text-red-600">
                                    <IoCloseSharp size={24} />
                                </button>

                                <h2 className="text-xl font-bold mb-4">Edit Stack</h2>
                                <input
                                    type="text"
                                    value={stackName}
                                    onChange={(e) => setStackName(e.target.value)}
                                    className="w-full p-2 border rounded mb-3"
                                    placeholder="Stack Name"
                                />

                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="text"
                                        value={techInput}
                                        onChange={(e) => setTechInput(e.target.value)}
                                        className="flex-grow p-2 border rounded"
                                        placeholder="Add Technology"
                                    />
                                    <button
                                        onClick={handleAddTechnology}
                                        className="bg-black text-white px-3 rounded"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {technologies.map((tech, index) => (
                                        <div key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
                                            <span>{tech}</span>
                                            <IoCloseSharp
                                                onClick={() => handleRemoveTechnology(index)}
                                                className="ml-2 text-red-600 cursor-pointer"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={handleEditSubmit}
                                    className="bg-green-600 w-full text-white py-2 rounded hover:bg-green-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </SideBar>
        </div>
    );
};

export default AdminStackList;
