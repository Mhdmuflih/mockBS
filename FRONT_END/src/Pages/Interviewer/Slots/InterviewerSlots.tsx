import { useCallback, useEffect, useState } from "react";
import SideBar from "../../../components/Interviewer/Sidebar";
import Table from "../../../components/Interviewer/Table";
import { getSlotData } from "../../../Services/interviewerService";
import { debounce } from "lodash";
import toast from "react-hot-toast";

const InterviewerSlots = () => {


    const [slotData, setSlotData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [rawSearchQuery, setRawSearchQuery] = useState("");
    const [editSlot, setEditSlot] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const limit = 4;

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            setSearchQuery(query);
        }, 500),
        []
    );

    useEffect(() => {
        debouncedSearch(rawSearchQuery);
        return () => {
            debouncedSearch.cancel();
        }
    }, [rawSearchQuery]);

    useEffect(() => {
        fetchSlotData();
    }, [searchQuery, currentPage]);

    const fetchSlotData = async () => {
        try {
            const response: any = await getSlotData(currentPage, limit, searchQuery);
            console.log(response.slotData, 'this is the response data in slot');
            console.log(response.slotData.totalPages, 'this is the response data in slot');
            if (response.success) {
                const formattedData = response.slotData.getSlotData
                    .map((slot: any) =>
                        slot.slots.flatMap((slotDetail: any) =>
                            slotDetail.schedules.map((schedule: any) => ({
                                stack: slot.stack.stackName,
                                technology: slot.stack.technologies,
                                date: new Date(slotDetail.date).toISOString().split('T')[0],
                                from: schedule.fromTime,
                                to: schedule.toTime,
                                title: schedule.title || "N/A",
                                price: schedule.price || "N/A",
                                description: schedule.description || "N/A",
                                status: schedule.status || "open"
                            }))
                        )
                    )
                    .flat();


                setSlotData(formattedData);
                setTotalPages(response.slotData.totalPages)
            } else {
                console.log("Failed to fetch interviewer slot data.");
            }
        } catch (error: any) {
            console.log("Error fetching data:", error.message);
        }
    }

    const handleChange = (_: unknown, value: number) => {
        setCurrentPage(value);
    };

    // const handleEdit = (row: any) => {
    //     setEditSlot(row);
    //     setIsModalOpen(true);
    // };

    // const handleDelete = async (row: any) => {
    //     const result = await Swal.fire({
    //         title: "Are you sure?",
    //         text: "You want to delete this slot?",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonText: "Yes, delete it!",
    //     });

    //     if (result.isConfirmed) {
    //         // await deleteSlot(row.id); // <-- add actual delete call
    //         toast.success("Slot deleted successfully.");
    //         fetchSlotData();
    //     }
    // };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditSlot(null);
    };

    const handleSaveChanges = async () => {
        try {
            // Format and send the updated data to your backend
            const updatedData = {
                ...editSlot,
                technology: Array.isArray(editSlot.technology) ? editSlot.technology : [editSlot.technology]
            };
            console.log(updatedData);

            // await updateSlot(editSlot.id, updatedData); // ← Add actual API call here
            toast.success("Slot updated successfully.");
            closeModal();
            fetchSlotData(); // Refresh table
        } catch (error: any) {
            toast.error("Failed to update slot.");
            console.error(error);
        }
    };


    const slotTable = [
        { key: "stack", label: "Stack Name" },
        { key: "technology", label: "Technology" },
        { key: "date", label: "Date" },
        { key: "from", label: "From" },
        { key: "to", label: "To" },
        { key: "title", label: "Title" },
        { key: "price", label: "Price" },
        { key: "description", label: "Description" },
        { key: "status", label: "Status" },
    ];

    return (
        <div>
            <SideBar heading="Slots List" addButton="Add Slot" subHeading="See information about all time slots" >
                <Table
                    columns={slotTable}
                    data={slotData}
                    handleChange={handleChange}
                    currentPage={currentPage}
                    totalPages={totalPage}
                    searchQuery={rawSearchQuery}
                    setSearchQuery={setRawSearchQuery}
                    // actions={(row: any) => (
                    //     <div className="flex justify-center gap-2">
                    //         <button
                    //             onClick={() => handleEdit(row)}
                    //             className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                    //         >
                    //             Edit
                    //         </button>
                    //         {/* <button
                    //             onClick={() => handleDelete(row)}
                    //             className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                    //         >
                    //             Delete
                    //         </button> */}
                    //     </div>
                    // )}
                    
                />

                {isModalOpen && editSlot && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto space-y-4">
                            <h2 className="text-xl font-bold mb-2 text-center">Edit Slot</h2>

                            <div>
                                <label className="block font-semibold mb-1">Stack:</label>
                                <input
                                    type="text"
                                    value={editSlot.stack}
                                    onChange={(e) => setEditSlot({ ...editSlot, stack: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Technology:</label>
                                <input
                                    type="text"
                                    value={
                                        Array.isArray(editSlot.technology)
                                            ? editSlot.technology.join(", ")
                                            : editSlot.technology
                                    }
                                    onChange={(e) =>
                                        setEditSlot({
                                            ...editSlot,
                                            technology: e.target.value.split(",").map((t: string) => t.trim()),
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Date:</label>
                                <input
                                    type="date"
                                    value={editSlot.date}
                                    onChange={(e) => setEditSlot({ ...editSlot, date: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className="flex gap-3">
                                <div className="w-1/2">
                                    <label className="block font-semibold mb-1">From:</label>
                                    <input
                                        type="time"
                                        value={editSlot.from}
                                        onChange={(e) => setEditSlot({ ...editSlot, from: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block font-semibold mb-1">To:</label>
                                    <input
                                        type="time"
                                        value={editSlot.to}
                                        onChange={(e) => setEditSlot({ ...editSlot, to: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Title:</label>
                                <input
                                    type="text"
                                    value={editSlot.title}
                                    onChange={(e) => setEditSlot({ ...editSlot, title: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Price:</label>
                                <input
                                    type="number"
                                    value={editSlot.price}
                                    onChange={(e) => setEditSlot({ ...editSlot, price: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Description:</label>
                                <textarea
                                    rows={3}
                                    value={editSlot.description}
                                    onChange={(e) => setEditSlot({ ...editSlot, description: e.target.value })}
                                    className="w-full p-2 border rounded resize-none"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Status:</label>
                                <select
                                    value={editSlot.status}
                                    onChange={(e) => setEditSlot({ ...editSlot, status: e.target.value })}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="open">Open</option>
                                    <option value="booked">Booked</option>
                                </select>
                            </div>


                            <div className="flex justify-between pt-2">
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveChanges}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </SideBar>
        </div>
    )
};

export default InterviewerSlots;
