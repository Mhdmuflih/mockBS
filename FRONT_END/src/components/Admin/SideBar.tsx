import { ReactNode, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Heading from "./Heading";

interface sideBarProps {
    handleToLogout: () => void;
    heading: string;
    children?: ReactNode;
}


const SideBar = (props: sideBarProps) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [activePath, setActivePath] = useState(location.pathname);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);


    return (
        <>
            <div className="bg-black h-screen flex">
                <div className=" bg-[#30323A] h-[450px] w-52 p-4 ml-1 mt-2 rounded-xl">
                    <div className="bg-white  w-12 h-12 ml-16 mt-2">
                        <img src="" alt="" /> icon
                    </div>
                    <h2 className="text-center font-bold mt-1 text-white">mock BS</h2>

                    {/* side bar start */}

                    <div className="pt-2">
                        <ul className="space-y-4">
                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/dashboard" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/dashboard");
                                        navigate("/admin/dashboard");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <FaHome />
                                    </span>
                                    <span >Dashboard</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/approval" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/approval");
                                        navigate("/admin/approval");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <FaHome />
                                    </span>
                                    <span >Approval</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/interviewers" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/interviewers");
                                        navigate("/admin/interviewers");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <FaHome />
                                    </span>
                                    <span >All Interviewers</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/candidates" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/candidates");
                                        navigate("/admin/candidates");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <FaHome />
                                    </span>
                                    <span >Candidates</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/interviews" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/interviews");
                                        navigate("/admin/interviews");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <FaHome />
                                    </span>
                                    <span >Interviews</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/stack" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/stack");
                                        navigate("/admin/stack");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <FaHome />
                                    </span>
                                    <span >Stack</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/communities" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/communitiess");
                                        navigate("/admin/communities");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <FaHome />
                                    </span>
                                    <span >Communities</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* New div outside sidebar but positioned at the bottom */}
                    <div className="absolute bottom-4 left-1 w-52 p-4 bg-[#30323A] text-white text-center rounded-xl">
                        <ul className="space-y-2">
                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/profile" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/profile");
                                        navigate("/admin/profile");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <FaHome />
                                    </span>
                                    <span >Admin</span>
                                </div>
                            </li>

                            <li>
                                <div className={`flex items-center space-x-3 text-white p-1 bg-[#FF3B30] rounded-lg cursor-pointer hover:bg-[#912626] transition-all duration-300 group 
                                ${activePath === "candidate/home" ? "bg-white text-black" : ""}`}
                                    onClick={props.handleToLogout}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <FaHome />
                                    </span>
                                    <span>Logout</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Heading heading={props.heading} children={props.children} />

            
        </>
    )
}

export default SideBar;
