import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/Admin/SideBar";

import { IoAddCircle } from "react-icons/io5";


const AdminStackList = () => {

    const navigate = useNavigate();

    const handleToAddStack = () => {
        navigate('/admin/add-stack');
    }

    return (
        <>
            <div className="flex">
                <SideBar heading="Stack">
                    <div className="bg-[#30323A] ml-1 p-4 shadow-md mt-2 h-[475px] overflow-auto">
                        <div className="flex justify-end items-center space-x-3 p-1 rounded-lg cursor-pointer transition-all duration-300 group ">
                            <span className="group-hover:scale-110 transition-transform duration-200 absolute mr-24">
                                <IoAddCircle />
                            </span>
                            <button onClick={handleToAddStack} className="pt-3 pb-3 pr-2 pl-10 bg-white font-bold rounded-xl hover:bg-black hover:text-white">Add Stack</button>
                        </div>

                        <div className="flex space-x-10">
                            <div className="bg-black w-40 h-40">
                            </div>
                            <div className="bg-black w-40 h-40">
                            </div>
                            <div className="bg-black w-40 h-40">
                            </div>
                        </div>

                    </div>
                </SideBar>
            </div>
        </>
    )
}

export default AdminStackList;
