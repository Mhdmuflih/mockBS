import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import SideBar from "../../../components/Admin/SideBar";
import { fetchStackList } from "../../../Services/adminService";
import AdminSideLoading from "../../../components/Admin/AdminSideLoading";

const AdminStackList = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate();
    const [stackList, setStackList] = useState<any[]>([]);

    useEffect(() => {

        setTimeout(()=> {
            setIsLoading(false);
        },2000);

        const fetchStackData = async () => {
            try {
                const response: any = await fetchStackList();
                if (response.success) {
                    console.log("Stack data fetched successfully");
                    setStackList(response.stackData);
                } else {
                    console.log("Failed to fetch stack data");
                }
            } catch (error: any) {
                console.log("Error fetching data:", error.message);
            }
        };
        fetchStackData();
    }, []);

    if(isLoading) {
        return <div><AdminSideLoading /></div>
    }

    const handleToAddStack = () => {
        navigate('/admin/add-stack');
    };

    return (
        <div className="flex">
            <SideBar heading="Stack">
                <div className="bg-[#30323A] ml-1 p-4 shadow-md mt-2 h-[475px] overflow-auto">
                    <div className="flex justify-end items-center space-x-3 p-1 rounded-lg cursor-pointer transition-all duration-300 group">
                        <span className="group-hover:scale-110 transition-transform duration-200 absolute mr-24">
                            <IoAddCircle />
                        </span>
                        <button
                            onClick={handleToAddStack}
                            className="pt-3 pb-3 pr-2 pl-10 bg-white font-bold rounded-xl hover:bg-black hover:text-white"
                        >
                            Add Stack
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {stackList.map((stack) => (
                            <div key={stack._id} className="bg-black text-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold">{stack.stackName}</h3>
                                <ul className="mt-2">
                                    {stack.technologies.map((tech: string) => (
                                        <li key={tech} className="text-sm">
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </SideBar>
        </div>
    );
};

export default AdminStackList;
